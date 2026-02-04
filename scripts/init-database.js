#!/usr/bin/env node
/**
 * Database Schema Initialization untuk Ucomodity
 * Script ini akan membuat semua tabel yang diperlukan menggunakan SawitDB
 */

const { SawitClient } = require('../sawitdb/src/SawitClient');

const client = new SawitClient({
  host: process.env.SAWIT_HOST || '127.0.0.1',
  port: parseInt(process.env.SAWIT_PORT || '7878'),
});

async function initializeDatabase() {
  try {
    console.log('🌱 Memulai inisialisasi database Ucomodity...\n');

    await client.connect();
    console.log('✅ Terhubung ke SawitDB Server\n');

    // 1. Tabel Users
    console.log('[1/9] Membuat tabel users...');
    await client.query(`
      LAHAN users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('customer', 'admin') DEFAULT 'customer',
        email_verified_at DATETIME,
        phone_verified_at DATETIME,
        remember_token VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabel users berhasil dibuat\n');

    // 2. Tabel Categories
    console.log('[2/9] Membuat tabel categories...');
    await client.query(`
      LAHAN categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        type ENUM('tanaman_hias', 'tanaman_perkebunan', 'alat_perlengkapan') NOT NULL,
        parent_id INT,
        image VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabel categories berhasil dibuat\n');

    // 3. Tabel Products
    console.log('[3/9] Membuat tabel products...');
    await client.query(`
      LAHAN products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        category_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        price DECIMAL(15,2) NOT NULL,
        stock INT DEFAULT 0,
        sku VARCHAR(100) UNIQUE,
        description TEXT,
        specification JSON,
        care_level ENUM('mudah', 'sedang', 'sulit'),
        images JSON,
        is_featured BOOLEAN DEFAULT FALSE,
        is_available BOOLEAN DEFAULT TRUE,
        weight INT COMMENT 'Berat dalam gram',
        rating_avg DECIMAL(3,2) DEFAULT 0.00,
        rating_count INT DEFAULT 0,
        sold_count INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabel products berhasil dibuat\n');

    // 4. Tabel Addresses
    console.log('[4/9] Membuat tabel addresses...');
    await client.query(`
      LAHAN addresses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        label VARCHAR(50) COMMENT 'Rumah, Kantor, dll',
        recipient_name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        province VARCHAR(100) NOT NULL,
        postal_code VARCHAR(10) NOT NULL,
        is_default BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabel addresses berhasil dibuat\n');

    // 5. Tabel Cart
    console.log('[5/9] Membuat tabel cart...');
    await client.query(`
      LAHAN cart (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabel cart berhasil dibuat\n');

    // 6. Tabel Orders
    console.log('[6/9] Membuat tabel orders...');
    await client.query(`
      LAHAN orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_number VARCHAR(100) UNIQUE NOT NULL,
        user_id INT NOT NULL,
        address_id INT NOT NULL,
        subtotal DECIMAL(15,2) NOT NULL,
        shipping_cost DECIMAL(15,2) DEFAULT 0,
        discount DECIMAL(15,2) DEFAULT 0,
        total DECIMAL(15,2) NOT NULL,
        status ENUM('pending', 'paid', 'processed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        payment_method VARCHAR(50),
        shipping_courier VARCHAR(50),
        shipping_service VARCHAR(100),
        tracking_number VARCHAR(255),
        notes TEXT,
        paid_at DATETIME,
        processed_at DATETIME,
        shipped_at DATETIME,
        delivered_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabel orders berhasil dibuat\n');

    // 7. Tabel Order Items
    console.log('[7/9] Membuat tabel order_items...');
    await client.query(`
      LAHAN order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        product_image VARCHAR(255),
        quantity INT NOT NULL,
        price DECIMAL(15,2) NOT NULL,
        subtotal DECIMAL(15,2) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabel order_items berhasil dibuat\n');

    // 8. Tabel Payments
    console.log('[8/9] Membuat tabel payments...');
    await client.query(`
      LAHAN payments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        payment_type VARCHAR(50),
        payment_method VARCHAR(50),
        transaction_id VARCHAR(255) UNIQUE,
        snap_token VARCHAR(255),
        status ENUM('pending', 'success', 'failed', 'expired') DEFAULT 'pending',
        payment_proof VARCHAR(255),
        midtrans_response JSON,
        paid_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabel payments berhasil dibuat\n');

    // 9. Tabel Reviews
    console.log('[9/9] Membuat tabel reviews...');
    await client.query(`
      LAHAN reviews (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT NOT NULL,
        user_id INT NOT NULL,
        order_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        images JSON,
        is_verified BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabel reviews berhasil dibuat\n');

    // Create Indexes
    console.log('📑 Membuat indexes...');
    await client.query('INDEKS products PADA category_id');
    await client.query('INDEKS products PADA slug');
    await client.query('INDEKS products PADA is_featured');
    await client.query('INDEKS orders PADA user_id');
    await client.query('INDEKS orders PADA status');
    await client.query('INDEKS cart PADA user_id');
    await client.query('INDEKS reviews PADA product_id');
    console.log('✅ Indexes berhasil dibuat\n');

    console.log('════════════════════════════════════════');
    console.log('🎉 Database Ucomodity siap digunakan!');
    console.log('════════════════════════════════════════\n');

    await client.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error saat inisialisasi database:', error.message);
    process.exit(1);
  }
}

initializeDatabase();
