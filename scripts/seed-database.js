#!/usr/bin/env node
/**
 * Database Seeder untuk Ucomodity
 * Script ini akan mengisi database dengan data contoh
 */

const { SawitClient } = require('../sawitdb/src/SawitClient');

const client = new SawitClient({
    host: process.env.SAWIT_HOST || '127.0.0.1',
    port: parseInt(process.env.SAWIT_PORT || '7878'),
});

async function seedDatabase() {
    try {
        console.log('🌾 Memulai seeding database Ucomodity...\n');

        await client.connect();
        console.log('✅ Terhubung ke SawitDB Server\n');

        // 1. Seed Admin User
        console.log('[1/5] Seeding users...');
        await client.query(`
      TANAM KE users (name, email, phone, password, role, email_verified_at) 
      BIBIT (
        'Admin Ucomodity', 
        'admin@ucomodity.id', 
        '081234567890',
        '${hashPassword('admin123')}',
        'admin',
        CURRENT_TIMESTAMP
      )
    `);

        await client.query(`
      TANAM KE users (name, email, phone, password, role, email_verified_at) 
      BIBIT (
        'Budi Santoso', 
        'budi@example.com', 
        '081234567891',
        '${hashPassword('password123')}',
        'customer',
        CURRENT_TIMESTAMP
      )
    `);
        console.log('✅ Users seeded\n');

        // 2. Seed Categories
        console.log('[2/5] Seeding categories...');
        const categories = [
            { name: 'Tanaman Hias Indoor', slug: 'tanaman-hias-indoor', type: 'tanaman_hias', parent_id: 'NULL' },
            { name: 'Tanaman Hias Outdoor', slug: 'tanaman-hias-outdoor', type: 'tanaman_hias', parent_id: 'NULL' },
            { name: 'Kaktus & Sukulen', slug: 'kaktus-sukulen', type: 'tanaman_hias', parent_id: 'NULL' },
            { name: 'Tanaman Perkebunan', slug: 'tanaman-perkebunan', type: 'tanaman_perkebunan', parent_id: 'NULL' },
            { name: 'Alat Berkebun', slug: 'alat-berkebun', type: 'alat_perlengkapan', parent_id: 'NULL' },
            { name: 'Pupuk & Media Tanam', slug: 'pupuk-media-tanam', type: 'alat_perlengkapan', parent_id: 'NULL' },
        ];

        for (const cat of categories) {
            await client.query(`
        TANAM KE categories (name, slug, type, parent_id, description) 
        BIBIT (
          '${cat.name}', 
          '${cat.slug}', 
          '${cat.type}', 
          ${cat.parent_id},
          'Kategori ${cat.name}'
        )
      `);
        }
        console.log('✅  Categories seeded\n');

        // 3. Seed Products
        console.log('[3/5] Seeding products...');
        const products = [
            {
                name: 'Monstera Deliciosa',
                slug: 'monstera-deliciosa',
                category_id: 1,
                price: 125000,
                stock: 50,
                sku: 'MON-DEL-001',
                care_level: 'mudah',
                description: 'Tanaman hias populer dengan daun berlubang yang ikonik. Cocok untuk dekorasi ruangan modern.',
                specification: JSON.stringify({ tinggi: '30-40 cm', diameter_pot: '15 cm', media_tanam: 'Campuran humus' }),
                images: JSON.stringify(['/images/products/monstera-1.jpg', '/images/products/monstera-2.jpg']),
                is_featured: true,
                is_available: true,
                weight: 2000,
                rating_avg: 4.8,
                rating_count: 234,
                sold_count: 450
            },
            {
                name: 'Lidah Mertua (Sansevieria)',
                slug: 'lidah-mertua',
                category_id: 1,
                price: 45000,
                stock: 100,
                sku: 'SAN-001',
                care_level: 'mudah',
                description: 'Tanaman super mudah dirawat, cocok untuk pemula. Dapat membersihkan udara dan tahan kering.',
                specification: JSON.stringify({ tinggi: '25-30 cm', diameter_pot: '12 cm', media_tanam: 'Tanah + pasir' }),
                images: JSON.stringify(['/images/products/sansevieria-1.jpg']),
                is_featured: true,
                is_available: true,
                weight: 1500,
                rating_avg: 4.9,
                rating_count: 189,
                sold_count: 780
            },
            {
                name: 'Bibit Kelapa Sawit Unggul',
                slug: 'bibit-kelapa-sawit',
                category_id: 4,
                price: 85000,
                stock: 200,
                sku: 'SAWIT-001',
                care_level: 'sedang',
                description: 'Bibit kelapa sawit varietas unggul dengan produktivitas tinggi. Cocok untuk perkebunan skala kecil hingga besar.',
                specification: JSON.stringify({ tinggi: '40-50 cm', umur_bibit: '6 bulan', jenis: 'DxP Tenera' }),
                images: JSON.stringify(['/images/products/sawit-1.jpg']),
                is_featured: true,
                is_available: true,
                weight: 3000,
                rating_avg: 4.7,
                rating_count: 98,
                sold_count: 156
            },
            {
                name: 'Pakis Boston',
                slug: 'pakis-boston',
                category_id: 1,
                price: 65000,
                stock: 75,
                sku: 'PAK-BOS-001',
                care_level: 'sedang',
                description: 'Tanaman gantung yang cantik dengan daun rimbun. Cocok untuk area dengan kelembaban tinggi.',
                specification: JSON.stringify({ diameter_pot: '20 cm', kebutuhan_cahaya: 'Teduh - Semi teduh' }),
                images: JSON.stringify(['/images/products/pakis-1.jpg']),
                is_featured: true,
                is_available: true,
                weight: 1800,
                rating_avg: 4.6,
                rating_count: 156,
                sold_count: 234
            },
            {
                name: 'Kaktus Mini Assorted',
                slug: 'kaktus-mini-assorted',
                category_id: 3,
                price: 35000,
                stock: 150,
                sku: 'KAK-MIN-001',
                care_level: 'mudah',
                description: 'Koleksi kaktus mini berbagai jenis. Perawatan sangat mudah, cocok untuk meja kerja.',
                specification: JSON.stringify({ tinggi: '5-10 cm', diameter_pot: '8 cm', jenis: 'Random' }),
                images: JSON.stringify(['/images/products/kaktus-1.jpg']),
                is_featured: false,
                is_available: true,
                weight: 500,
                rating_avg: 4.5,
                rating_count: 89,
                sold_count: 312
            },
        ];

        for (const product of products) {
            await client.query(`
        TANAM KE products (
          name, slug, category_id, price, stock, sku, care_level, 
          description, specification, images, is_featured, is_available, 
          weight, rating_avg, rating_count, sold_count
        ) 
        BIBIT (
          '${product.name}',
          '${product.slug}',
          ${product.category_id},
          ${product.price},
          ${product.stock},
          '${product.sku}',
          '${product.care_level}',
          '${product.description}',
          '${product.specification}',
          '${product.images}',
          ${product.is_featured},
          ${product.is_available},
          ${product.weight},
          ${product.rating_avg},
          ${product.rating_count},
          ${product.sold_count}
        )
      `);
        }
        console.log('✅ Products seeded\n');

        // 4. Seed Sample Address
        console.log('[4/5] Seeding addresses...');
        await client.query(`
      TANAM KE addresses (
        user_id, label, recipient_name, phone, address, city, province, postal_code, is_default
      )
      BIBIT (
        2,
        'Rumah',
        'Budi Santoso',
        '081234567891',
        'Jl. Merdeka No. 123',
        'Jakarta Selatan',
        'DKI Jakarta',
        '12345',
        true
      )
    `);
        console.log('✅ Addresses seeded\n');

        // 5. Seed Sample Reviews
        console.log('[5/5] Seeding reviews...');
        await client.query(`
      TANAM KE reviews (product_id, user_id, order_id, rating, comment, is_verified)
      BIBIT (
        1,
        2,
        1,
        5,
        'Tanaman sampai dengan sehat! Packingnya rapih banget. Puas deh belanja di sini 🌿',
        true
      )
    `);
        console.log('✅ Reviews seeded\n');

        console.log('════════════════════════════════════════');
        console.log('🎉 Database seeding completed successfully!');
        console.log('════════════════════════════════════════\n');
        console.log('📊 Summary:');
        console.log('  - 2 Users (1 Admin, 1 Customer)');
        console.log('  - 6 Categories');
        console.log('  - 5 Products');
        console.log('  - 1 Address');
        console.log('  - 1 Review');
        console.log('');

        await client.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error saat seeding database:', error.message);
        process.exit(1);
    }
}

// Simple password hashing (dalam production gunakan bcrypt)
function hashPassword(password) {
    // Untuk demo, gunakan simple hash
    // Di production, gunakan bcrypt atau argon2
    return `hashed_${password}`;
}

seedDatabase();
