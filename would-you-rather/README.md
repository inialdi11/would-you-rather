# 🤔 Would You Rather? — Kuis Receh Multiplayer 2-5 Pemain

> Game kuis **Would You Rather** ala Indonesia — edisi receh, absurd, dan bikin ketawa bareng teman! Sekarang support **2 sampai 5 pemain**!

## 🎮 Deskripsi

Game web berbasis HTML/CSS/JS vanilla tanpa framework. **2-5 pemain** bergantian menjawab 15 dilema hidup absurd (makanan, kerja, medsos, asmara, dll.) yang **SAMA untuk semua pemain**. Di akhir, masing-masing pemain mendapatkan **diagnosa kepribadian absurd** berdasarkan kecenderungan pilihan mereka, plus **matriks kecocokan otak** antar semua pemain!

### Fitur Utama
- ✅ **Multiplayer 2-5 Pemain** (baru di v0.1.2!)
- ✅ **Pertanyaan yang SAMA** untuk semua pemain — fair & seru dibandingin jawaban
- ✅ **Giliran bergantian**: Pemain 1 jawab 1..15, lalu Pemain 2, dst.
- ✅ **Warna tema unik per pemain**: Biru, Orange, Hijau, Ungu, Pink — konsisten dari game sampai hasil
- ✅ **Bank 50 pertanyaan absurd** (diacak & rolling 15 soal berbeda tiap main/refresh)
- ✅ **Hasil kepribadian random** berdasarkan kecenderungan jawaban (8 variasi per tipe)
- ✅ **Matriks kecocokan** pairwise untuk 3+ pemain, skor ringkas untuk 2 pemain
- ✅ **Share hasil ke WhatsApp** — format rapi semua pemain dalam satu pesan
- ✅ **Riwayat kuis** tersimpan di LocalStorage (max 10)
- ✅ **Dark Mode / Light Mode** toggle (Super Black / Super White)
- ✅ **Confetti** saat hasil muncul 🎊
- ✅ **Animasi transisi halus** antar pertanyaan & screen
- ✅ **Web Audio API** sound effects (pop, whoosh, fanfare)
- ✅ **Ambient background** animated orbs & floating particles
- ✅ **Professional versioning**: badge versi, changelog, footer version, metadata
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
├── style.css         # Semua styling, animasi, dark mode, player colors
├── script.js         # Logika game, data pertanyaan, hasil, confetti, state multiplayer
├── CHANGELOG.md      # Riwayat versi (Keep a Changelog format)
├── README.md         # Dokumentasi ini
├── netlify.toml      # Konfigurasi deploy Netlify
└── vercel.json       # Konfigurasi deploy Vercel
```

---

## 🎯 Alur Main Multiplayer (v0.1.2)

1. **Start Screen**: Pilih jumlah pemain (2/3/4/5) → Isi nama (default: Pemain 1, Pemain 2, dst.) → Klik "Mulai Main"
2. **Game Screen**: Pemain 1 jawab 15 pertanyaan → Intermission "Oper HP ke Pemain 2" → Pemain 2 jawab 15 pertanyaan **yang sama** → dst.
3. **Result Screen**: Grid card hasil semua pemain + Matriks kecocokan (3+ pemain) / Skor kecocokan (2 pemain) → Confetti! → Share WhatsApp / Main Lagi

---

## ✏️ Cara Menambah Pertanyaan

Buka `script.js`, cari array `allQuestions`, lalu tambahkan objek baru:

```javascript
{
  id: 51, // Nomor unik (lanjutkan dari terakhir)
  category: "🎮 Kategori Baru",
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
| `typeA` | Pemain lebih sering pilih A (dominan A > B + 2) |
| `typeB` | Pemain lebih sering pilih B (dominan B > A + 2) |
| `balanced` | Pilihan A dan B seimbang (selisih ≤ 2) |

Tambahkan objek baru di dalam array yang sesuai:

```javascript
{
  title: "Kamu 95% Judul Absurd Baru",
  desc: "Deskripsi penjelasan konyol yang muncul di kartu hasil."
}
```

---

## 🎨 Kustomisasi Warna Pemain

Warna 5 pemain didefinisikan di **CSS Custom Properties** (`style.css`):

```css
/* Light Mode */
--p1-color: #6366F1;  --p1-bg: rgba(99, 102, 241, 0.12);   /* Biru */
--p2-color: #F97316;  --p2-bg: rgba(249, 115, 22, 0.12);   /* Orange */
--p3-color: #10B981;  --p3-bg: rgba(16, 185, 129, 0.12);   /* Hijau */
--p4-color: #8B5CF6;  --p4-bg: rgba(139, 92, 246, 0.12);   /* Ungu */
--p5-color: #EC4899;  --p5-bg: rgba(236, 72, 153, 0.12);   /* Pink */

/* Dark Mode (Neon variants) */
[data-theme="dark"] {
  --p1-color: #A78BFA;  --p1-bg: rgba(139, 92, 246, 0.22);
  --p2-color: #FF856B;  --p2-bg: rgba(255, 107, 74, 0.22);
  --p3-color: #34D399;  --p3-bg: rgba(16, 185, 129, 0.22);
  --p4-color: #C084FC;  --p4-bg: rgba(192, 132, 252, 0.22);
  --p5-color: #FB7185;  --p5-bg: rgba(251, 113, 133, 0.22);
}
```

---

## 📦 Versioning System (v0.1.2+)

Project ini menggunakan **Semantic Versioning** + **Keep a Changelog**:

- **Version badge** di header (klik untuk info)
- **CHANGELOG.md** format standar
- **Footer** menampilkan versi saat ini
- **HTML meta tags**: `application-version`, `build-date`
- **JS constant**: `APP_VERSION`, `APP_BUILD_DATE`

### Release Checklist
1. Update `APP_VERSION` & `APP_BUILD_DATE` di `script.js`
2. Update version badge di `index.html` (otomatis via JS)
3. Update footer version di `index.html` (otomatis via JS)
4. Tambah entry di `CHANGELOG.md`
5. Commit & tag: `git tag v0.1.2`

---

## 📄 Hak Cipta

© 2026 **aldigabut** • Kuis Receh "Would You Rather" v0.1.2

Proyek ini bebas dimainkan dan dibagikan. Selamat bermain! 🎉

---

## 🔗 Links

- [Changelog](CHANGELOG.md) — Riwayat perubahan lengkap
- [Deploy ke Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/aldigabut/would-you-rather)
- [Deploy ke Vercel](https://vercel.com/new/clone?repository-url=https://github.com/aldigabut/would-you-rather)