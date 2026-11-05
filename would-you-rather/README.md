# 🤔 Would You Rather? — Kuis Receh 2 Pemain

> Game kuis **Would You Rather** ala Indonesia — edisi receh, absurd, dan bikin ketawa bareng teman!

## 🎮 Deskripsi

Game web berbasis HTML/CSS/JS vanilla tanpa framework. Dua pemain bergantian menjawab 15+ dilema hidup absurd (makanan, kerja, medsos, asmara, dll.). Di akhir, masing-masing pemain mendapatkan **diagnosa kepribadian absurd** berdasarkan kecenderungan pilihan mereka, plus **skor kecocokan otak** antar-pemain!

### Fitur Utama
- ✅ 2 Pemain bergantian (oper HP / satu perangkat)
- ✅ **Bank 50 pertanyaan absurd** (diacak & rolling 15 soal berbeda tiap main/refresh)
- ✅ Hasil kepribadian random berdasarkan kecenderungan jawaban
- ✅ Skor kecocokan otak 2 pemain
- ✅ Share hasil ke WhatsApp
- ✅ Riwayat kuis tersimpan di LocalStorage
- ✅ Dark Mode / Light Mode toggle
- ✅ Confetti saat hasil muncul 🎊
- ✅ Animasi transisi halus antar pertanyaan
- ✅ 100% client-side, tanpa backend

---

## 🚀 Cara Menjalankan Lokal

### Opsi 1: Buka File Langsung
Cukup double-click atau buka file `index.html` di browser:
```
would-you-rather/index.html
```

### Opsi 2: Pakai VS Code Live Server
1. Install extension **Live Server** di VS Code
2. Klik kanan `index.html` → **Open with Live Server**
3. Game terbuka otomatis di `http://127.0.0.1:5500`

### Opsi 3: Pakai Python Simple HTTP Server
```bash
cd would-you-rather
python -m http.server 8080
```
Buka `http://localhost:8080` di browser.

---

## 🌐 Cara Deploy

### Deploy ke Netlify (Drag & Drop)
1. Buka https://app.netlify.com
2. Login / Sign up
3. Di dashboard, tarik/drag folder `would-you-rather/` ke area deploy
4. Tunggu beberapa detik — site langsung live!

> Konfigurasi sudah disiapkan di `netlify.toml`.

### Deploy ke Vercel (CLI)
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Masuk ke folder project:
   ```bash
   cd would-you-rather
   ```
3. Jalankan deploy:
   ```bash
   vercel
   ```
4. Ikuti prompt yang muncul, selesai!

> Konfigurasi sudah disiapkan di `vercel.json`.

---

## 📁 Struktur File

```
would-you-rather/
├── index.html        # Struktur HTML lengkap (semua screen)
├── style.css         # Semua styling, animasi, dark mode
├── script.js         # Logika game, data pertanyaan, hasil, confetti
├── netlify.toml      # Konfigurasi deploy Netlify
├── vercel.json       # Konfigurasi deploy Vercel
└── README.md         # Dokumentasi ini
```

---

## ✏️ Cara Menambah Pertanyaan

Buka `script.js`, cari array `questions`, lalu tambahkan objek baru:

```javascript
{
  id: 17, // Nomor unik
  category: "🎮 Gaming & Hobi",
  prompt: "Pertanyaan dilema kamu di sini...",
  a: { text: "Teks opsi A", emoji: "🕹️" },
  b: { text: "Teks opsi B", emoji: "🎮" }
}
```

> Tidak perlu ubah apapun yang lain — progress bar dan logika otomatis menyesuaikan jumlah pertanyaan.

---

## ✏️ Cara Menambah Hasil Random

Buka `script.js`, cari objek `hasilRandom`. Ada 3 kategori:

| Key | Kapan Muncul |
|---|---|
| `typeA` | Pemain lebih sering pilih A |
| `typeB` | Pemain lebih sering pilih B |
| `balanced` | Pilihan A dan B seimbang |

Tambahkan objek baru di dalam array yang sesuai:

```javascript
{
  title: "Kamu 95% Judul Absurd Baru",
  desc: "Deskripsi penjelasan konyol yang muncul di kartu hasil."
}
```

---

## 📄 Hak Cipta

&copy; 2026 **aldigabut** &bull; Kuis Receh "Would You Rather"

Proyek ini bebas dimainkan dan dibagikan. Selamat bermain! 🎉
