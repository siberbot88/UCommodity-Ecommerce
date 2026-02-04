#!/usr/bin/env node
/**
 * SawitDB Server untuk Ucomodity E-Commerce
 * Server database menggunakan SawitDB - database buatan Indonesia
 */

const { SawitServer } = require('./sawitdb/src/SawitServer');

// Konfigurasi server
const config = {
    host: process.env.SAWIT_HOST || '0.0.0.0',
    port: parseInt(process.env.SAWIT_PORT || '7878'),
    dbPath: process.env.SAWIT_DB_PATH || './storage/database/ucomodity.sawit',
    clusterMode: process.env.SAWIT_CLUSTER === 'true',
    maxConnections: parseInt(process.env.SAWIT_MAX_CONNECTIONS || '100'),
};

// Buat instance server
const server = new SawitServer(config);

// Event handlers
server.on('ready', () => {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🌴 SawitDB Server - Ucomodity E-Commerce');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`📡 Server berjalan di: ${config.host}:${config.port}`);
    console.log(`💾 Database file: ${config.dbPath}`);
    console.log(`🔄 Cluster mode: ${config.clusterMode ? 'AKTIF' : 'NONAKTIF'}`);
    console.log(`👥 Max connections: ${config.maxConnections}`);
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ Server siap menerima koneksi!');
    console.log('');
});

server.on('error', (error) => {
    console.error('❌ Server error:', error);
    process.exit(1);
});

server.on('connection', (clientId) => {
    console.log(`🔌 Client terhubung: ${clientId}`);
});

server.on('disconnection', (clientId) => {
    console.log(`🔌 Client terputus: ${clientId}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Mematikan server...');
    await server.close();
    console.log('✅ Server berhasil dimatikan');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Mematikan server...');
    await server.close();
    console.log('✅ Server berhasil dimatikan');
    process.exit(0);
});

// Start server
server.start().catch((error) => {
    console.error('❌ Gagal memulai server:', error);
    process.exit(1);
});
