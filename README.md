# 🌱 Ucomodity - Marketplace Tanaman Terpercaya

Platform e-commerce modern untuk penjualan tanaman hias dan tanaman perkebunan menggunakan teknologi buatan Indonesia.

## 🚀 Teknologi Stack

### Backend
- **Framework**: Laravel 12 (PHP)
- **Database**: [SawitDB](https://github.com/WowoEngine/SawitDB) - Database buatan Indonesia dengan Agricultural Query Language (AQL)
- **Server**: PHP Built-in Server / Apache / Nginx

### Frontend
- **UI Framework**: Custom Component Library
- **CSS**: Custom Design System dengan prinsip desain Indonesia
- **JavaScript**: Vanilla ES6+ untuk interaktivitas
- **Fonts**: Poppins (heading) + Inter (body)

### Payment Gateway
- **Midtrans**: Payment gateway buatan Indonesia

## ✨ Fitur Utama

### Customer Features
- 🛍️ Katalog produk dengan filter canggih
- 🛒 Keranjang belanja dengan auto-calculation
- 💳 Checkout 3 langkah yang mudah
- 💰 Multiple payment methods (Bank Transfer, E-wallet, QRIS)
- 📦 Real-time order tracking
- ⭐ Review dan rating produk
- ❤️ Wishlist / Favorit produk
- 📱 Responsive mobile-first design

### Admin Features
- 📊 Dashboard analytics dengan statistik lengkap
- 📦 Manajemen produk (CRUD)
- 🏷️ Manajemen kategori
- 📋 Manajemen order dengan update status
- 👥 Manajemen customer
- 🖨️ Cetak invoice dan resi (PDF)

## 📋 Prerequisites

- **Node.js** >= 18.x
- **PHP** >= 8.2
- **Composer** >= 2.x
- **Git**

## 🔧 Instalasi & Setup

### 1. Clone Repository

```bash
cd e:\myapp\Ucomodity
```

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 3. Setup SawitDB

SawitDB sudah di-clone di folder `sawitdb/`. Install dependencies-nya:

```bash
cd sawitdb
npm install
cd ..
```

### 4. Konfigurasi Environment

Copy file `.env.example` menjadi `.env`:

```bash
copy .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Update `.env` dengan konfigurasi SawitDB:

```env
# SawitDB Configuration
SAWIT_HOST=127.0.0.1
SAWIT_PORT=7878
SAWIT_DB_PATH=./storage/database/ucomodity.sawit

# Application
APP_NAME=Ucomodity
APP_URL=http://localhost:8000
```

### 5. Buat Storage Directory

```bash
mkdir storage\database
```

### 6. Jalankan SawitDB Server

Buka terminal pertama dan jalankan:

```bash
node sawit-server.js
```

Anda akan melihat output:
```
═══════════════════════════════════════════════════════
🌴 SawitDB Server - Ucomodity E-Commerce
═══════════════════════════════════════════════════════
📡 Server berjalan di: 0.0.0.0:7878
💾 Database file: ./storage/database/ucomodity.sawit
🔄 Cluster mode: NONAKTIF
👥 Max connections: 100
═══════════════════════════════════════════════════════
✅ Server siap menerima koneksi!
```

### 7. Inisialisasi Database

Buka terminal kedua dan jalankan:

```bash
node scripts/init-database.js
```

Output:
```
🌱 Memulai inisialisasi database Ucomodity...
✅ Terhubung ke SawitDB Server

[1/9] Membuat tabel users...
✅ Tabel users berhasil dibuat
...
🎉 Database Ucomodity siap digunakan!
```

### 8. Seed Data Dummy (Opsional)

```bash
node scripts/seed-database.js
```

Output:
```
🌾 Memulai seeding database Ucomodity...
...
🎉 Database seeding completed successfully!
📊 Summary:
  - 2 Users (1 Admin, 1 Customer)
  - 6 Categories
  - 5 Products
  - 1 Address
  - 1 Review
```

### 9. Jalankan Laravel Server

Buka terminal ketiga dan jalankan:

```bash
php artisan serve
```

### 10. Akses Aplikasi

Buka browser dan akses:
- **Homepage**: http://localhost:8000
- **Admin Login**: http://localhost:8000/admin/login
  - Email: `admin@ucomodity.id`
  - Password: `admin123`

## 🎨 Design System

### Color Palette

- **Primary (Hijau Alam)**: `#16a34a` - `#22c55e`
- **Secondary (Orange Tropis)**: `#fbbf24`
- **Background**: `#f4f1de` (warm beige)
- **Text**: `#1f2937` (dark gray)

### Typography

- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)

### Component Library

Semua component styles ada di `public/css/style.css`:
- Buttons (Primary, Secondary, Outline)
- Cards dengan hover effects
- Badges & Tags
- Grid system (responsive)
- Form components
- Utilities

## 📁 Struktur Project

```
Ucomodity/
├── app/
│   ├── Http/Controllers/     # Controllers
│   ├── Models/               # Models
│   └── Services/             # Services (termasuk SawitDBConnection)
├── public/
│   ├── css/
│   │   └── style.css         # Custom design system
│   └── js/
│       └── app.js            # Main JavaScript
├── resources/
│   └── views/
│       └── home.blade.php    # Homepage
├── sawitdb/                  # SawitDB source code
├── scripts/
│   ├── init-database.js      # Database initialization
│   └── seed-database.js      # Database seeder
├── sawit-server.js           # SawitDB server entry point
└── package.json
```

## 🔌 SawitDB Integration

### PHP Connector

File `app/Services/SawitDBConnection.php` menyediakan connector untuk komunikasi PHP-SawitDB:

```php
use App\Services\SawitDBConnection;

$db = new SawitDBConnection();

// Insert (menggunakan AQL syntax)
$db->insert('products', [
    'name' => 'Monstera',
    'price' => 125000,
    'stock' => 50
]);

// Select
$products = $db->select('products', ['*'], 'stock > 0', 'name ASC', 10);

// Update
$db->update('products', ['stock' => 45], 'id = 1');

// Delete
$db->delete('products', 'id = 999');

// Raw Query (AQL atau Generic SQL-like)
$db->query('PANEN * DARI products DIMANA stock > 0');
```

### Agricultural Query Language (AQL)

SawitDB mendukung dua syntax:

| Generic SQL | AQL (Indonesian) |
|-------------|------------------|
| `CREATE TABLE` | `LAHAN` |
| `INSERT INTO` | `TANAM KE` |
| `SELECT FROM` | `PANEN DARI` |
| `UPDATE SET` | `PUPUK DENGAN` |
| `DELETE FROM` | `GUSUR DARI` |
| `BEGIN TRANSACTION` | `MULAI AKAD` |
| `COMMIT` | `SAHKAN` |
| `ROLLBACK` | `BATALKAN` |

## 🚀 Development Workflow

### Run Development Server (All-in-one)

```bash
npm run dev
```

Ini akan menjalankan:
1. SawitDB Server (port 7878)
2. Laravel Server (port 8000)

### Menambah Produk Baru

1. Akses admin dashboard
2. Navigate ke "Produk" > "Tambah Produk"
3. Isi form dengan data produk
4. Upload gambar
5. Submit

Atau via SawitDB query:

```javascript
await client.query(`
  TANAM KE products (name, category_id, price, stock, slug) 
  BIBIT ('Tanaman Baru', 1, 50000, 100, 'tanaman-baru')
`);
```

## 📝 TODO / Roadmap

- [ ] Implementasi autentikasi user (Laravel Sanctum)
- [ ] Integrasi Midtrans payment gateway
- [ ] Sistem notifikasi (email & WhatsApp)
- [ ] Live chat dengan admin
- [ ] Blog / tips perawatan tanaman
- [ ] Wishlist functionality
- [ ] Advanced product filtering
- [ ] Admin dashboard dengan charts
- [ ] PDF generation untuk invoice
- [ ] SEO optimization
- [ ] Google Analytics integration

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - Made with 💚 in Indonesia

## 👥 Team

**Ucomodity Development Team**

## 🙏 Acknowledgments

- [SawitDB](https://github.com/WowoEngine/SawitDB) - Database buatan Indonesia
- [Laravel](https://laravel.com) - PHP Framework
- [Midtrans](https://midtrans.com) - Payment Gateway Indonesia

---

**Powered by SawitDB** - The First Agricultural-Based Database 🌾
