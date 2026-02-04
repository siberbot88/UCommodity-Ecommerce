<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="Ucomodity - Belanja Tanaman Hias & Perkebunan Berkualitas Online. Gratis Ongkir, Garansi Hidup, dan Konsultasi Perawatan Gratis!">
    <meta name="keywords" content="jual tanaman hias, tanaman perkebunan, tanaman online, belanja tanaman">
    <meta name="author" content="Ucomodity">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Ucomodity - Marketplace Tanaman Terpercaya">
    <meta property="og:description" content="Belanja Tanaman Hias & Perkebunan Berkualitas dengan Harga Terbaik">
    <meta property="og:image" content="{{ asset('images/og-image.jpg') }}">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">

    <title>Ucomodity - Marketplace Tanaman Hias & Perkebunan Terpercaya</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

    <style>
        /* Custom Home Page Styles */
        .hero {
            position: relative;
            background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
            color: white;
            padding: var(--space-20) 0;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') bottom center no-repeat;
            background-size: cover;
            opacity: 0.3;
        }

        .hero-content {
            position: relative;
            z-index: 1;
            max-width: 600px;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            padding: var(--space-2) var(--space-4);
            border-radius: var(--radius-full);
            font-size: var(--text-sm);
            font-weight: 600;
            margin-bottom: var(--space-4);
        }

        .category-card {
            background: white;
            border-radius: var(--radius-2xl);
            padding: var(--space-6);
            text-align: center;
            box-shadow: var(--shadow-lg);
            transition: all var(--transition-base);
            cursor: pointer;
        }

        .category-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-2xl);
        }

        .category-icon {
            font-size: 3rem;
            margin-bottom: var(--space-3);
        }

        .product-card-price {
            font-size: var(--text-2xl);
            font-weight: 700;
            color: var(--color-primary-600);
            margin: var(--space-3) 0;
        }

        .product-card-rating {
            display: flex;
            align-items: center;
            gap: var(--space-2);
            font-size: var(--text-sm);
            color: var(--color-secondary-500);
        }

        .feature-item {
            display: flex;
            gap: var(--space-4);
            padding: var(--space-4);
            background: white;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-sm);
        }

        .feature-icon {
            flex-shrink: 0;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
            color: white;
            border-radius: var(--radius-lg);
            font-size: 1.5rem;
        }

        .navbar {
            background: white;
            box-shadow: var(--shadow-md);
            position: sticky;
            top: 0;
            z-index: var(--z-sticky);
        }

        .navbar-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--space-4) 0;
        }

        .navbar-brand {
            font-family: var(--font-heading);
            font-size: var(--text-2xl);
            font-weight: 700;
            color: var(--color-primary-600);
        }

        .navbar-nav {
            display: flex;
            gap: var(--space-6);
            list-style: none;
        }

        .navbar-nav a {
            font-weight: 500;
            color: var(--color-text-primary);
            transition: color var(--transition-fast);
        }

        .navbar-nav a:hover {
            color: var(--color-primary-600);
        }

        .navbar-actions {
            display: flex;
            gap: var(--space-4);
            align-items: center;
        }

        .cart-badge {
            position: relative;
        }

        .cart-count {
            position: absolute;
            top: -8px;
            right: -8px;
            background: var(--color-error);
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--text-xs);
            font-weight: 700;
        }

        .footer {
            background: var(--color-neutral-900);
            color: var(--color-neutral-300);
            padding: var(--space-12) 0 var(--space-6);
            margin-top: var(--space-20);
        }

        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--space-8);
            margin-bottom: var(--space-8);
        }

        .footer-title {
            color: white;
            font-weight: 600;
            margin-bottom: var(--space-4);
        }

        .footer-link {
            color: var(--color-neutral-300);
            display: block;
            margin-bottom: var(--space-2);
        }

        .footer-link:hover {
            color: var(--color-primary-400);
        }

        .footer-bottom {
            border-top: 1px solid var(--color-neutral-700);
            padding-top: var(--space-6);
            text-align: center;
            color: var(--color-neutral-400);
        }
    </style>
</head>

<body>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="container navbar-container">
            <a href="/" class="navbar-brand">🌱 Ucomodity</a>

            <ul class="navbar-nav">
                <li><a href="/">Beranda</a></li>
                <li><a href="/products">Produk</a></li>
                <li><a href="/categories">Kategori</a></li>
                <li><a href="/blog">Tips Perawatan</a></li>
                <li><a href="/about">Tentang Kami</a></li>
            </ul>

            <div class="navbar-actions">
                <a href="/search" class="btn btn-sm btn-outline">🔍 Cari</a>
                <a href="/cart" class="cart-badge">
                    🛒
                    <span class="cart-count">0</span>
                </a>
                <a href="/login" class="btn btn-sm btn-primary">Masuk</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content animate-fade-in">
                <div class="hero-badge">
                    ✨ Gratis Ongkir untuk Pembelian Pertama!
                </div>

                <h1 style="color: white; font-size: var(--text-6xl); margin-bottom: var(--space-4);">
                    Wujudkan Rumah Hijau Impianmu
                </h1>

                <p style="color: rgba(255,255,255,0.9); font-size: var(--text-xl); margin-bottom: var(--space-8);">
                    Belanja tanaman hias & perkebunan berkualitas dengan harga terbaik. Garansi hidup 100%, konsultasi
                    gratis, dan pengiriman aman ke seluruh Indonesia.
                </p>

                <div style="display: flex; gap: var(--space-4);">
                    <a href="/products" class="btn btn-lg" style="background: white; color: var(--color-primary-600);">
                        🌿 Mulai Belanja
                    </a>
                    <a href="/categories" class="btn btn-lg btn-outline" style="border-color: white; color: white;">
                        📚 Lihat Katalog
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="container py-12">
        <div class="text-center mb-8">
            <h2>Kategori Pilihan</h2>
            <p class="text-secondary">Temukan tanaman impianmu dari berbagai kategori</p>
        </div>

        <div class="grid grid-cols-4">
            <div class="category-card">
                <div class="category-icon">🌺</div>
                <h4>Tanaman Hias</h4>
                <p class="text-secondary text-sm">1,234 Produk</p>
            </div>

            <div class="category-card">
                <div class="category-icon">🌴</div>
                <h4>Tanaman Perkebunan</h4>
                <p class="text-secondary text-sm">856 Produk</p>
            </div>

            <div class="category-card">
                <div class="category-icon">🌵</div>
                <h4>Kaktus & Sukulen</h4>
                <p class="text-secondary text-sm">523 Produk</p>
            </div>

            <div class="category-card">
                <div class="category-icon">🛠️</div>
                <h4>Alat & Perlengkapan</h4>
                <p class="text-secondary text-sm">349 Produk</p>
            </div>
        </div>
    </section>

    <!-- Featured Products -->
    <section class="container py-12">
        <div class="text-center mb-8">
            <h2>Tanaman Favorit Minggu Ini</h2>
            <p class="text-secondary">Koleksi pilihan yang paling banyak diminati</p>
        </div>

        <div class="grid grid-cols-4">
            <!-- Product Card 1 -->
            <div class="card">
                <img src="https://placehold.co/400x400/22c55e/white?text=Monstera+Deliciosa" alt="Monstera Deliciosa"
                    class="card-img">
                <div class="card-body">
                    <div class="badge badge-success mb-2">Bestseller</div>
                    <h4 class="card-title">Monstera Deliciosa</h4>
                    <div class="product-card-rating mb-2">
                        ⭐ 4.8 <span class="text-muted">(234 ulasan)</span>
                    </div>
                    <div class="product-card-price">Rp 125.000</div>
                    <p class="text-sm text-muted">Tinggi 30-40 cm</p>
                    <button class="btn btn-primary" style="width: 100%; margin-top: var(--space-3);">
                        🛒 Tambah ke Keranjang
                    </button>
                </div>
            </div>

            <!-- Product Card 2 -->
            <div class="card">
                <img src="https://placehold.co/400x400/16a34a/white?text=Lidah+Mertua" alt="Lidah Mertua"
                    class="card-img">
                <div class="card-body">
                    <div class="badge badge-warning mb-2">Mudah Dirawat</div>
                    <h4 class="card-title">Lidah Mertua</h4>
                    <div class="product-card-rating mb-2">
                        ⭐ 4.9 <span class="text-muted">(189 ulasan)</span>
                    </div>
                    <div class="product-card-price">Rp 45.000</div>
                    <p class="text-sm text-muted">Tinggi 25-30 cm</p>
                    <button class="btn btn-primary" style="width: 100%; margin-top: var(--space-3);">
                        🛒 Tambah ke Keranjang
                    </button>
                </div>
            </div>

            <!-- Product Card 3 -->
            <div class="card">
                <img src="https://placehold.co/400x400/22c55e/white?text=Bibit+Kelapa+Sawit" alt="Bibit Kelapa Sawit"
                    class="card-img">
                <div class="card-body">
                    <div class="badge badge-success mb-2">Kualitas Premium</div>
                    <h4 class="card-title">Bibit Kelapa Sawit</h4>
                    <div class="product-card-rating mb-2">
                        ⭐ 4.7 <span class="text-muted">(98 ulasan)</span>
                    </div>
                    <div class="product-card-price">Rp 85.000</div>
                    <p class="text-sm text-muted">Tinggi 40-50 cm</p>
                    <button class="btn btn-primary" style="width: 100%; margin-top: var(--space-3);">
                        🛒 Tambah ke Keranjang
                    </button>
                </div>
            </div>

            <!-- Product Card 4 -->
            <div class="card">
                <img src="https://placehold.co/400x400/fbbf24/white?text=Pakis+Boston" alt="Pakis Boston"
                    class="card-img">
                <div class="card-body">
                    <div class="badge badge-success mb-2">Baru</div>
                    <h4 class="card-title">Pakis Boston</h4>
                    <div class="product-card-rating mb-2">
                        ⭐ 4.6 <span class="text-muted">(156 ulasan)</span>
                    </div>
                    <div class="product-card-price">Rp 65.000</div>
                    <p class="text-sm text-muted">Diameter pot 20 cm</p>
                    <button class="btn btn-primary" style="width: 100%; margin-top: var(--space-3);">
                        🛒 Tambah ke Keranjang
                    </button>
                </div>
            </div>
        </div>

        <div class="text-center mt-8">
            <a href="/products" class="btn btn-lg btn-outline">Lihat Semua Produk →</a>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-12" style="background: white;">
        <div class="container">
            <div class="text-center mb-8">
                <h2>Kenapa Belanja di Ucomodity?</h2>
                <p class="text-secondary">Pengalaman belanja tanaman terbaik hanya untuk kamu</p>
            </div>

            <div class="grid grid-cols-2" style="gap: var(--space-6);">
                <div class="feature-item">
                    <div class="feature-icon">🚚</div>
                    <div>
                        <h4>Pengiriman Aman & Gratis</h4>
                        <p class="text-secondary">Packing super aman dengan garansi tanaman sampai dengan selamat.
                            Gratis ongkir untuk pembelian pertama!</p>
                    </div>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">🌱</div>
                    <div>
                        <h4>Garansi Hidup 100%</h4>
                        <p class="text-secondary">Tanaman mati dalam 7 hari? Kami ganti tanpa ribet. Kepuasan pelanggan
                            adalah prioritas kami.</p>
                    </div>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">💬</div>
                    <div>
                        <h4>Konsultasi Gratis</h4>
                        <p class="text-secondary">Bingung cara merawat? Tanya langsung ke ahli tanaman kami via chat
                            atau WhatsApp. Gratis selamanya!</p>
                    </div>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">⭐</div>
                    <div>
                        <h4>Produk Berkualitas Premium</h4>
                        <p class="text-secondary">Semua tanaman dipilih dan dirawat langsung oleh petani berpengalaman.
                            Dijamin segar dan sehat!</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="container py-12">
        <div
            style="background: linear-gradient(135deg, #16a34a, #22c55e); padding: var(--space-12); border-radius: var(--radius-2xl); text-align: center; color: white;">
            <h2 style="color: white; font-size: var(--text-4xl); margin-bottom: var(--space-4);">
                Siap Mulai Perjalanan Hijaumu?
            </h2>
            <p style="font-size: var(--text-xl); margin-bottom: var(--space-6); opacity: 0.9;">
                Daftar sekarang dan dapatkan voucher 50.000 untuk pembelian pertamamu!
            </p>
            <a href="/register" class="btn btn-lg" style="background: white; color: var(--color-primary-600);">
                📝 Daftar Gratis Sekarang
            </a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                    <h3 class="footer-title">🌱 Ucomodity</h3>
                    <p style="line-height: 1.8;">
                        Marketplace tanaman hias dan perkebunan terpercaya di Indonesia. Wujudkan rumah hijau impianmu
                        bersama kami.
                    </p>
                </div>

                <div>
                    <h4 class="footer-title">Produk</h4>
                    <a href="/category/tanaman-hias" class="footer-link">Tanaman Hias</a>
                    <a href="/category/tanaman-perkebunan" class="footer-link">Tanaman Perkebunan</a>
                    <a href="/category/kaktus" class="footer-link">Kaktus & Sukulen</a>
                    <a href="/category/alat" class="footer-link">Alat & Perlengkapan</a>
                </div>

                <div>
                    <h4 class="footer-title">Bantuan</h4>
                    <a href="/help/shipping" class="footer-link">Cara Pemesanan</a>
                    <a href="/help/payment" class="footer-link">Metode Pembayaran</a>
                    <a href="/help/guarantee" class="footer-link">Garansi & Retur</a>
                    <a href="/help/faq" class="footer-link">FAQ</a>
                </div>

                <div>
                    <h4 class="footer-title">Hubungi Kami</h4>
                    <p>📧 cs@ucomodity.id</p>
                    <p>📱 0812-3456-7890</p>
                    <p>📍 Jakarta, Indonesia</p>
                    <div style="display: flex; gap: var(--space-3); margin-top: var(--space-4);">
                        <a href="#" class="footer-link">Facebook</a>
                        <a href="#" class="footer-link">Instagram</a>
                        <a href="#" class="footer-link">TikTok</a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 Ucomodity. Semua hak cipta dilindungi. Made with 💚 in Indonesia</p>
                <p>Powered by <strong>SawitDB</strong> - Database Buatan Indonesia</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>