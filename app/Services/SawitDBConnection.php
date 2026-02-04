<?php

namespace App\Services;

use Exception;

/**
 * SawitDB Connection Service
 * Connector untuk komunikasi antara Laravel (PHP) dengan SawitDB Server (Node.js)
 * Menggunakan TCP Socket untuk komunikasi
 */
class SawitDBConnection
{
    private $socket;
    private string $host;
    private int $port;
    private bool $connected = false;
    private int $timeout = 30;

    public function __construct(
        string $host = '127.0.0.1',
        int $port = 7878,
        int $timeout = 30
    ) {
        $this->host = $host;
        $this->port = $port;
        $this->timeout = $timeout;
    }

    /**
     * Buka koneksi ke SawitDB Server
     */
    public function connect(): void
    {
        if ($this->connected) {
            return;
        }

        $this->socket = @fsockopen(
            $this->host,
            $this->port,
            $errno,
            $errstr,
            $this->timeout
        );

        if (!$this->socket) {
            throw new Exception(
                "Gagal terhubung ke SawitDB Server di {$this->host}:{$this->port}. Error: {$errstr} ({$errno})"
            );
        }

        stream_set_timeout($this->socket, $this->timeout);
        $this->connected = true;
    }

    /**
     * Tutup koneksi
     */
    public function disconnect(): void
    {
        if ($this->connected && $this->socket) {
            fclose($this->socket);
            $this->connected = false;
        }
    }

    /**
     * Execute query SawitDB (mendukung AQL dan Generic syntax)
     * 
     * @param string $query Query dalam format AQL atau Generic SQL-like
     * @return array Result dari query
     */
    public function query(string $query): array
    {
        if (!$this->connected) {
            $this->connect();
        }

        // Kirim query ke server
        $payload = json_encode([
            'type' => 'query',
            'query' => $query,
            'timestamp' => time(),
        ]);

        fwrite($this->socket, $payload . "\n");

        // Baca response
        $response = '';
        while (!feof($this->socket)) {
            $line = fgets($this->socket);
            if ($line === false) {
                break;
            }
            $response .= $line;
            if (strpos($response, "\n") !== false) {
                break;
            }
        }

        if (empty($response)) {
            throw new Exception('Tidak ada response dari SawitDB Server');
        }

        $result = json_decode($response, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON response dari SawitDB: ' . json_last_error_msg());
        }

        if (isset($result['error'])) {
            throw new Exception('SawitDB Error: ' . $result['error']);
        }

        return $result['data'] ?? [];
    }

    /**
     * Execute multiple queries dalam transaction (AKAD)
     * 
     * @param array $queries Array of queries
     * @return bool Success status
     */
    public function transaction(array $queries): bool
    {
        try {
            $this->query('MULAI AKAD'); // BEGIN TRANSACTION

            foreach ($queries as $query) {
                $this->query($query);
            }

            $this->query('SAHKAN'); // COMMIT
            return true;
        } catch (Exception $e) {
            $this->query('BATALKAN'); // ROLLBACK
            throw $e;
        }
    }

    /**
     * Insert data (helper method)
     * Menggunakan AQL syntax: TANAM KE
     */
    public function insert(string $table, array $data): array
    {
        $columns = implode(', ', array_keys($data));
        $values = implode(', ', array_map(function ($val) {
            if (is_null($val)) return 'NULL';
            if (is_numeric($val)) return $val;
            return "'" . addslashes($val) . "'";
        }, array_values($data)));

        $query = "TANAM KE {$table} ({$columns}) BIBIT ({$values})";
        return $this->query($query);
    }

    /**
     * Select data (helper method)
     * Menggunakan AQL syntax: PANEN
     */
    public function select(
        string $table,
        array $columns = ['*'],
        ?string $where = null,
        ?string $orderBy = null,
        ?int $limit = null,
        ?int $offset = null
    ): array {
        $cols = implode(', ', $columns);
        $query = "PANEN {$cols} DARI {$table}";

        if ($where) {
            $query .= " DIMANA {$where}";
        }

        if ($orderBy) {
            $query .= " ORDER BY {$orderBy}";
        }

        if ($limit) {
            $query .= " LIMIT {$limit}";
        }

        if ($offset) {
            $query .= " OFFSET {$offset}";
        }

        return $this->query($query);
    }

    /**
     * Update data (helper method)
     * Menggunakan AQL syntax: PUPUK
     */
    public function update(string $table, array $data, string $where): array
    {
        $sets = [];
        foreach ($data as $key => $val) {
            if (is_null($val)) {
                $sets[] = "{$key}=NULL";
            } elseif (is_numeric($val)) {
                $sets[] = "{$key}={$val}";
            } else {
                $sets[] = "{$key}='" . addslashes($val) . "'";
            }
        }

        $setClause = implode(', ', $sets);
        $query = "PUPUK {$table} DENGAN {$setClause} DIMANA {$where}";
        
        return $this->query($query);
    }

    /**
     * Delete data (helper method)
     * Menggunakan AQL syntax: GUSUR
     */
    public function delete(string $table, string $where): array
    {
        $query = "GUSUR DARI {$table} DIMANA {$where}";
        return $this->query($query);
    }

    /**
     * Create table (helper method)
     * Menggunakan AQL syntax: LAHAN
     */
    public function createTable(string $table, array $schema): array
    {
        $columns = [];
        foreach ($schema as $column => $definition) {
            $columns[] = "{$column} {$definition}";
        }

        $columnsStr = implode(', ', $columns);
        $query = "LAHAN {$table} ({$columnsStr})";
        
        return $this->query($query);
    }

    /**
     * Drop table (helper method)
     * Menggunakan AQL syntax: BAKAR LAHAN
     */
    public function dropTable(string $table): array
    {
        $query = "BAKAR LAHAN {$table}";
        return $this->query($query);
    }

    public function __destruct()
    {
        $this->disconnect();
    }
}
