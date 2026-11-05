/**
 * ====================================================================
 * WOULD YOU RATHER? — Kuis Receh 2 Pemain
 * script.js — Game State, Data Pertanyaan, Hasil Absurd, Confetti, dll.
 * ====================================================================
 */

// ==========================================
// 1. BANK SOAL (50 PERTANYAAN ABSURD)
// Setiap game hanya ambil 15 secara acak (rolling)
// ==========================================
const QUESTIONS_PER_GAME = 15;

const allQuestions = [
  {
    id: 1,
    category: "🍜 Kuliner & Selera",
    prompt: "Saat makan mie instan tengah malam, mending...",
    a: { text: "Makan Indomie kuah tapi kuahnya tinggal 2 sendok", emoji: "🍜" },
    b: { text: "Makan Indomie goreng tapi bumbunya lupa dimasukkan setengah", emoji: "🍝" }
  },
  {
    id: 2,
    category: "📱 Media Sosial & HP",
    prompt: "Tiba-tiba HP kamu error dan harus milih salah satu...",
    a: { text: "History chat WA kamu dibacakan kencang di speaker masjid/kantor", emoji: "📢" },
    b: { text: "Galeri foto aib masa kecil kamu diunggah ke feed Instagram tanpa caption", emoji: "📸" }
  },
  {
    id: 3,
    category: "💼 Dunia Kerja & Kuliah",
    prompt: "Dalam urusan rezeki dan waktu luang...",
    a: { text: "Gaji 50 juta sebulan tapi kerja 18 jam sehari tanpa hari libur", emoji: "💼" },
    b: { text: "Gaji 4 juta sebulan tapi kerja cuma 2 jam seminggu dan tidur seharian", emoji: "🛌" }
  },
  {
    id: 4,
    category: "🛌 Gaya Hidup & Rebahan",
    prompt: "Ketika harus menghadapi hari libur...",
    a: { text: "Rebahan di kasur 48 jam nonstop tapi gak boleh megang HP sama sekali", emoji: "🧘" },
    b: { text: "Jalan kaki keliling komplek dari pagi sampai malam sambil live TikTok", emoji: "🚶" }
  },
  {
    id: 5,
    category: "💔 Hubungan & Asmara",
    prompt: "Punya pasangan idaman tapi punya satu kekurangan...",
    a: { text: "Cakep & tajir melintir tapi tiap ketawa bunyinya mirip knalpot bobokan", emoji: "🏍️" },
    b: { text: "Biasa aja tapi super romantis, cuma hobinya ngirim voice note nyanyi fals 10 menit", emoji: "🎤" }
  },
  {
    id: 6,
    category: "🛸 Hidup Absurd",
    prompt: "Dapat kemampuan super dari makhluk asing...",
    a: { text: "Bisa telepati tapi cuma bisa denger pikiran kucing yang lagi overthinking", emoji: "🐱" },
    b: { text: "Bisa teleportasi tapi setiap sampai tujuan celana kamu selalu ketinggalan", emoji: "🩳" }
  },
  {
    id: 7,
    category: "🌶️ Makanan Ekstrem",
    prompt: "Harus hidup makan menu yang sama seumur hidup...",
    a: { text: "Makan seblak level 10 setiap sarapan pagi tanpa air minum dingin", emoji: "🔥" },
    b: { text: "Makan bubur diaduk pake sedotan boba setiap hari", emoji: "🥣" }
  },
  {
    id: 8,
    category: "🚗 Mobilitas & Jalanan",
    prompt: "Terjebak di jalanan ibukota saat jam pulang...",
    a: { text: "Naik motor kehujanan badai tanpa jas hujan bareng gebetan", emoji: "🌧️" },
    b: { text: "Macet total 4 jam di tol tapi di mobil bareng mantan dan ortunya", emoji: "🚗" }
  },
  {
    id: 9,
    category: "💰 Finansial & Dompet",
    prompt: "Saldo ATM menipis di akhir bulan, mending...",
    a: { text: "Pinjam uang 100 ribu ke teman tapi harus sungkem cium tangan di depan umum", emoji: "🤝" },
    b: { text: "Makan kerupuk kaleng + kecap manis selama 4 hari berturut-turut", emoji: "🍘" }
  },
  {
    id: 10,
    category: "🤡 Momen Memalukan",
    prompt: "Harus ngalamin kejadian canggung seumur hidup...",
    a: { text: "Tiap kali salaman sama bos/dosen selalu keceplosan manggil 'Sayang'", emoji: "🙈" },
    b: { text: "Tiap kali mau ngomong serius harus diawali dengan tarian TikTok dulu", emoji: "💃" }
  },
  {
    id: 11,
    category: "🛒 Belanja & Foya-Foya",
    prompt: "Dapat rezeki nomplok saldo e-wallet 20 juta tapi...",
    a: { text: "Harus dihabiskan dalam 1 jam buat beli cilok dan gorengan", emoji: "🍡" },
    b: { text: "Cuma boleh dipakai buat checkout keranjang Shopee akun teman acak", emoji: "🎁" }
  },
  {
    id: 12,
    category: "🚿 Kebersihan & Mandi",
    prompt: "Dilema pagi hari sebelum beraktivitas...",
    a: { text: "Gak mandi selama seminggu tapi disemprot parfum mahal sebotol", emoji: "🧴" },
    b: { text: "Mandi air es kutub utara jam 4 subuh sambil disetel lagu horor", emoji: "🧊" }
  },
  {
    id: 13,
    category: "🧠 Pikiran Random",
    prompt: "Mengetahui rahasia alam semesta...",
    a: { text: "Tahu tanggal kematian semua kecoak di rumahmu secara presisi", emoji: "🪳" },
    b: { text: "Bisa tahu siapa yang pernah stalking profil kamu tapi gak bisa negur", emoji: "👀" }
  },
  {
    id: 14,
    category: "📶 Teknologi & Kuota",
    prompt: "Ketika dunia kiamat internet...",
    a: { text: "Baterai HP selalu 100% tapi sinyal mentok di EDGE / 1 bar selamanya", emoji: "🔋" },
    b: { text: "Internet secepat kilat (1 Gbps) tapi baterai HP ngedrop tiap 5 menit", emoji: "⚡" }
  },
  {
    id: 15,
    category: "👑 Status Sosial",
    prompt: "Diakui di mata masyarakat sebagai...",
    a: { text: "Presiden Paguyuban Rebahan Nasional yang dipuja sejuta kaum mager", emoji: "👑" },
    b: { text: "Duta Gorengan Internasional yang kebal minyak panas mendidih", emoji: "🥟" }
  },
  {
    id: 16,
    category: "☕ Kafe & Nongkrong",
    prompt: "Saat nongkrong estetik di kafe mahal...",
    a: { text: "Salah sebut menu kopi 'Caramel Macchiato' jadi 'Caramel Macaroni' dengan lantang", emoji: "☕" },
    b: { text: "Gak sengaja numpahin es kopi ke laptop orang sebelah yang lagi meeting", emoji: "💻" }
  },
  {
    id: 17,
    category: "🎮 Gaming & Hobi",
    prompt: "Kamu dikasih hadiah gaming tapi ada syaratnya...",
    a: { text: "Dapat PS5 gratis tapi cuma bisa main game edukasi anak TK selamanya", emoji: "🎮" },
    b: { text: "Jago semua game online tapi tiap menang harus kayang 30 detik", emoji: "🏆" }
  },
  {
    id: 18,
    category: "🐾 Hewan & Alam",
    prompt: "Punya hewan peliharaan spesial...",
    a: { text: "Punya kucing yang bisa ngomong tapi cuma ngomongin aib kamu ke tamu", emoji: "🐱" },
    b: { text: "Punya anjing yang bisa baca pikiran tapi suka judgmental lewat tatapan", emoji: "🐶" }
  },
  {
    id: 19,
    category: "🏫 Sekolah & Kampus",
    prompt: "Flashback masa-masa sekolah...",
    a: { text: "Presentasi di depan kelas tapi suara kamu tiba-tiba jadi suara Doraemon", emoji: "🎤" },
    b: { text: "Ketahuan guru lagi gambar karikatur wajah guru di buku tulis", emoji: "✏️" }
  },
  {
    id: 20,
    category: "🎬 Hiburan & Pop Culture",
    prompt: "Ditawarin jadi artis dadakan...",
    a: { text: "Jadi figuran sinetron yang kerjanya cuma bilang 'APA?!' sambil zoom in dramatis", emoji: "📺" },
    b: { text: "Jadi penyanyi dangdut terkenal tapi cuma boleh nyanyi satu lagu seumur hidup", emoji: "🎶" }
  },
  {
    id: 21,
    category: "🍕 Jajan & Street Food",
    prompt: "Soal jajanan pinggir jalan favorit...",
    a: { text: "Makan bakso yang isinya ternyata bola ping pong tapi kuahnya juara", emoji: "🍲" },
    b: { text: "Makan nasi goreng paling enak sedunia tapi pedasnya bikin nangis 2 jam", emoji: "🍛" }
  },
  {
    id: 22,
    category: "✈️ Liburan & Traveling",
    prompt: "Dapat tiket liburan gratis tapi...",
    a: { text: "Liburan ke Bali 1 minggu tapi gak boleh foto/posting apapun di medsos", emoji: "🏝️" },
    b: { text: "Gak kemana-mana tapi boleh edit foto seolah-olah liburan ke Eropa dan semua percaya", emoji: "🗼" }
  },
  {
    id: 23,
    category: "👔 Penampilan & Fashion",
    prompt: "Soal gaya penampilan sehari-hari...",
    a: { text: "Selalu tampil stylish tapi harus pakai sandal jepit kemana-mana termasuk meeting", emoji: "🩴" },
    b: { text: "Boleh pakai sepatu mahal tapi bajunya wajib kaos oblong bolong terus", emoji: "👕" }
  },
  {
    id: 24,
    category: "🎂 Ulang Tahun & Event",
    prompt: "Di hari ulang tahunmu...",
    a: { text: "Dapat surprise party meriah tapi semua tamu nyanyi fals dan lupa lirik", emoji: "🎉" },
    b: { text: "Gak ada yang inget ultahmu tapi dapet transfer 5 juta dari orang misterius", emoji: "💸" }
  },
  {
    id: 25,
    category: "🏠 Rumah & Tetangga",
    prompt: "Masalah klasik kehidupan bertetangga...",
    a: { text: "Tetangga sebelah karaoke dangdut tiap malam tapi sering kirimin makanan enak", emoji: "🎤" },
    b: { text: "Tetangga super hening & sopan tapi suka pinjam barang dan gak pernah balikin", emoji: "🤫" }
  },
  {
    id: 26,
    category: "🚌 Transportasi Umum",
    prompt: "Pengalaman naik transportasi umum...",
    a: { text: "Selalu dapat duduk di angkot tapi harus dengerin curhat sopir soal mantannya", emoji: "🚐" },
    b: { text: "Naik KRL selalu tepat waktu tapi kamu selalu berdiri di gerbong paling penuh", emoji: "🚃" }
  },
  {
    id: 27,
    category: "💤 Tidur & Mimpi",
    prompt: "Soal kehidupan tidur dan mimpi...",
    a: { text: "Bisa tidur kapan aja dalam 5 detik tapi pasti ngorok sekencang klakson truk", emoji: "😴" },
    b: { text: "Gak pernah ngorok tapi tiap tidur pasti mimpi dikejar-kejar dosbing skripsi", emoji: "😱" }
  },
  {
    id: 28,
    category: "🎓 Wisuda & Akademik",
    prompt: "Momen wisuda paling bersejarah...",
    a: { text: "Wisuda cumlaude tapi pidato singkatmu viral karena salah sebut nama rektor", emoji: "🎓" },
    b: { text: "Wisuda biasa aja tapi fotomu sama rektor jadi meme nasional yang wholesome", emoji: "📸" }
  },
  {
    id: 29,
    category: "🧹 Pekerjaan Rumah",
    prompt: "Soal bersih-bersih rumah...",
    a: { text: "Rumah selalu bersih berkilau tapi kamu harus nyapu sambil nyanyi opera keras-keras", emoji: "🧹" },
    b: { text: "Gak pernah perlu bersih-bersih tapi tiap tamu datang pasti nemu kaus kaki nyasar", emoji: "🧦" }
  },
  {
    id: 30,
    category: "🍳 Masak & Dapur",
    prompt: "Kemampuan memasak ajaib...",
    a: { text: "Jago masak semua masakan tapi tiap masak dapur pasti berantakan kayak kapal pecah", emoji: "🍳" },
    b: { text: "Cuma bisa masak mie instan tapi hasilnya selalu rasa bintang 5 dan cantik plating-nya", emoji: "🍜" }
  },
  {
    id: 31,
    category: "📷 Foto & Selfie",
    prompt: "Soal kehidupan ber-selfie ria...",
    a: { text: "Selalu fotogenik dari sudut manapun tapi tiap difoto pasti keringetan parah", emoji: "📷" },
    b: { text: "Gak pernah fotogenik tapi tiap upload selalu dapat 10ribu likes dalam 1 jam", emoji: "❤️" }
  },
  {
    id: 32,
    category: "🎵 Musik & Playlist",
    prompt: "Soal selera musik kamu...",
    a: { text: "Bisa main semua alat musik tapi tiap main pasti ada kucing ikut ngeong bareng", emoji: "🎸" },
    b: { text: "Suara nyanyi merdu banget tapi cuma aktif pas lagi di kamar mandi", emoji: "🚿" }
  },
  {
    id: 33,
    category: "📚 Buku & Membaca",
    prompt: "Dapat kemampuan membaca super...",
    a: { text: "Bisa baca 1 buku dalam 5 menit tapi langsung lupa isinya setelah 1 jam", emoji: "📖" },
    b: { text: "Ingat setiap detail buku yang pernah dibaca tapi cuma bisa baca 1 halaman per hari", emoji: "🧠" }
  },
  {
    id: 34,
    category: "🏋️ Olahraga & Fitness",
    prompt: "Soal kehidupan olahraga...",
    a: { text: "Punya badan sixpack sempurna tapi harus olahraga tiap hari jam 4 subuh sambil hujan", emoji: "💪" },
    b: { text: "Gak perlu olahraga dan tetap sehat tapi tubuhmu selalu berbentuk tahu bulat", emoji: "🟡" }
  },
  {
    id: 35,
    category: "🐔 Hewan Absurd",
    prompt: "Ketemu hewan ajaib di halaman rumah...",
    a: { text: "Punya ayam yang bisa bertelur emas tapi tiap berkokok bunyinya 'SKRIPSI KAPAN?!'", emoji: "🐔" },
    b: { text: "Punya ikan yang bisa ngobrol tapi topiknya selalu soal teori konspirasi bumi datar", emoji: "🐟" }
  },
  {
    id: 36,
    category: "🧑‍💻 WFH & Remote",
    prompt: "Kehidupan kerja dari rumah...",
    a: { text: "WFH selamanya tapi setiap meeting Zoom wajah kamu selalu pakai filter kucing", emoji: "😺" },
    b: { text: "WFO tiap hari tapi boleh tidur siang 2 jam di bawah meja kantor", emoji: "🏢" }
  },
  {
    id: 37,
    category: "🛍️ Online Shopping",
    prompt: "Kecanduan belanja online...",
    a: { text: "Semua barang di keranjang gratis tapi dikirimnya selalu 3 bulan kemudian", emoji: "📦" },
    b: { text: "Paket selalu sampai dalam 1 jam tapi isinya selalu ketuker sama pesanan orang lain", emoji: "🔀" }
  },
  {
    id: 38,
    category: "🌮 Kuliner Malam",
    prompt: "Lapar tengah malam dan cuma ada dua pilihan...",
    a: { text: "Martabak manis full topping tapi harus makan sendirian di kuburan jam 12 malam", emoji: "🌙" },
    b: { text: "Nasi padang komplit tapi harus makan pakai tangan kiri sambil berdiri satu kaki", emoji: "🦩" }
  },
  {
    id: 39,
    category: "🤳 Konten Kreator",
    prompt: "Tiba-tiba viral di internet...",
    a: { text: "Video kamu nyanyi di kamar mandi bocor dan ditonton 50 juta orang", emoji: "🎬" },
    b: { text: "Foto kamu tidur ngiler di angkot jadi sticker WhatsApp yang dipakai se-Indonesia", emoji: "😪" }
  },
  {
    id: 40,
    category: "🏪 Warung & Abang-Abang",
    prompt: "Hubungan dengan abang penjual jajanan...",
    a: { text: "Abang bakso selalu kasih porsi double gratis tapi manggil kamu 'Dek Cantik' padahal cowok", emoji: "🍜" },
    b: { text: "Abang gorengan hafal pesananmu tapi tiap ketemu selalu tanya 'Kapan nikah?'", emoji: "💍" }
  },
  {
    id: 41,
    category: "⏰ Manajemen Waktu",
    prompt: "Dapat kekuatan mengatur waktu...",
    a: { text: "Bisa menghentikan waktu 1 jam per hari tapi tiap pakai rambut kamu jadi ubanan satu helai", emoji: "⏸️" },
    b: { text: "Bisa mundur waktu 5 menit tapi tiap pakai kamu kecegukan selama 30 menit", emoji: "⏪" }
  },
  {
    id: 42,
    category: "🧊 Cuaca & Musim",
    prompt: "Kalau bisa pilih cuaca selamanya...",
    a: { text: "Hujan sepanjang tahun tapi selalu ada pelangi ganda setiap selesai hujan", emoji: "🌈" },
    b: { text: "Panas terik selamanya tapi kamu bisa bikin es batu dari ujung jari kapanpun", emoji: "🧊" }
  },
  {
    id: 43,
    category: "📞 Telepon & Chat",
    prompt: "Soal kebiasaan komunikasi...",
    a: { text: "Semua chat kamu selalu diread dan dibalas dalam 1 detik tapi balasannya cuma emoji jempol", emoji: "👍" },
    b: { text: "Chat sering di-read doang tapi kalau dibalas selalu panjang penuh perhatian dan sayang", emoji: "💌" }
  },
  {
    id: 44,
    category: "🎒 Nostalgia Masa Kecil",
    prompt: "Kembali ke masa kecil tapi...",
    a: { text: "Jadi anak kecil lagi selama setahun tapi harus ulang semua PR dan ujian SD", emoji: "✏️" },
    b: { text: "Tetap dewasa tapi bisa main di timezone sepuasnya gratis seumur hidup", emoji: "🕹️" }
  },
  {
    id: 45,
    category: "🧲 Keberuntungan",
    prompt: "Dapat keberuntungan tapi ada harganya...",
    a: { text: "Selalu menang undian doorprize tapi hadiahnya selalu rice cooker (udah punya 47)", emoji: "🍚" },
    b: { text: "Selalu hoki di segala hal tapi tiap hari Senin pasti kesialan kecil menimpa", emoji: "🗓️" }
  },
  {
    id: 46,
    category: "🎭 Drama & Gossip",
    prompt: "Soal dunia per-gosipan...",
    a: { text: "Tahu semua gosip terbaru tapi gak boleh cerita ke siapapun seumur hidup", emoji: "🤐" },
    b: { text: "Gak pernah tahu gosip apapun tapi semua orang selalu cerita rahasia mereka ke kamu", emoji: "👂" }
  },
  {
    id: 47,
    category: "🏆 Kompetisi & Lomba",
    prompt: "Ikut lomba paling absurd...",
    a: { text: "Menang lomba makan kerupuk nasional dan dapat piala setinggi lemari", emoji: "🏅" },
    b: { text: "Menang lomba joget TikTok dan videonya dijadikan kurikulum sekolah", emoji: "💃" }
  },
  {
    id: 48,
    category: "🧳 Pindah & Tempat Tinggal",
    prompt: "Ditawari tempat tinggal gratis...",
    a: { text: "Rumah mewah di puncak gunung tapi sinyal HP cuma ada kalau berdiri satu kaki di atap", emoji: "🏔️" },
    b: { text: "Apartemen kecil di tengah kota tapi tetangga sebelah latihan drum setiap subuh", emoji: "🥁" }
  },
  {
    id: 49,
    category: "🤖 Masa Depan & AI",
    prompt: "Robot AI jadi asisten pribadi kamu tapi...",
    a: { text: "Robot-nya super canggih tapi tiap ngomong pakai logat Betawi dan suka ngelawak garing", emoji: "🤖" },
    b: { text: "Robot-nya biasa aja tapi selalu roasting penampilanmu setiap pagi sebagai alarm bangun", emoji: "⏰" }
  },
  {
    id: 50,
    category: "🌍 Kalau Jadi Penguasa",
    prompt: "Jadi presiden dunia selama 1 hari...",
    a: { text: "Mewajibkan semua rapat kantor di dunia maksimal 10 menit dan harus sambil rebahan", emoji: "🛋️" },
    b: { text: "Mengganti semua bel sekolah di dunia jadi lagu 'Balonku Ada Lima' remix EDM", emoji: "🎈" }
  }
];

// Pertanyaan aktif yang dipilih untuk sesi game ini (diisi saat initGame)
let activeQuestions = [];

// ==========================================
// 2. DATA HASIL ABSURD (MINIMAL 20 VARIASI)
// Dikategorikan: Tipe Dominan A, Tipe Dominan B, Tipe Seimbang
// ==========================================
const hasilRandom = {
  // Dominan memilih opsi A (Lebih nekat, ambisius, serampangan, chaos)
  typeA: [
    {
      title: "Kamu 89% Cocok Jadi Duta Chaos Peradaban",
      desc: "Pilihanmu mencerminkan jiwa pemberani yang sering lupa mikir akibatnya. Hidupmu bagaikan kuah seblak level 10: panas, bikin keringetan, tapi bikin nagih."
    },
    {
      title: "Kamu 94% Spesies Alien Penyuka Bakso Urat",
      desc: "Logikamu di luar nalar manusia bumi. Ilmuwan NASA bahkan bingung mendeteksi pola gelombang otakmu saat mengambil keputusan penting."
    },
    {
      title: "Kamu 82% Berbakat Jadi CEO Paguyuban Nekat",
      desc: "Prinsip hidupmu: 'Gas dulu, bingungnya pas udah mentok.' Sangat disukai teman tongkrongan tapi sering bikin malaikat pelindungmu overwork."
    },
    {
      title: "Kamu 91% Titisan Pendekar Micin Abad 21",
      desc: "Kecerdasan emosionalmu tinggi, tapi dipenuhi energi micin yang membara. Kamu lebih memilih hidup seru penuh drama daripada tenang tapi sepi."
    },
    {
      title: "Kamu 88% Detektif Kasus Kulkas Rusak",
      desc: "Selalu curiga pada hal-hal kecil tapi sering mengabaikan hal penting. Insting survival-mu liar banget kayak kucing oren rebutan ikan asin."
    },
    {
      title: "Kamu 96% Tokoh Utama Anime tapi Salah Server",
      desc: "Penuh semangat juang 45, padahal masalah yang dihadapi cuma milih sarapan apa atau cara ngabisin paket kuota malam."
    },
    {
      title: "Kamu 85% Filsuf Warung Kopi Jam 3 Pagi",
      desc: "Suka perdebatan absurd yang gak ada ujungnya. Jika ada jalan pintas yang berbahaya, kamu pasti penasaran ingin mencobanya."
    },
    {
      title: "Kamu 93% Pemain Akrobat Kehidupan",
      desc: "Sering mepet deadline dan suka bikin orang terdekat senam jantung, tapi anehnya selalu selamat di detik-detik terakhir."
    }
  ],

  // Dominan memilih opsi B (Santai, kaum rebahan, realistis konyol, introvert pragmatis)
  typeB: [
    {
      title: "Kamu 92% Ahli Waris Kasur Busa Nasional",
      desc: "Setiap langkah hidupmu diperhitungkan agar energi fisik terbuang seminimal mungkin. Gravitasi kasurmu 10 kali lebih kuat daripada planet bumi."
    },
    {
      title: "Kamu 86% Petapa Dingin Penghindar Drama",
      desc: "Pilihanmu tenang, realistis, dan cinta damai. Kamu rela mengalah daripada harus debat 2 jam bareng orang yang batu."
    },
    {
      title: "Kamu 95% Penjaga Kedamaian Galaksi Sambil Ngemil",
      desc: "Motto hidupmu: 'Kalo bisa santai, kenapa harus panik?' Kehidupan yang damai ditemani cemilan asin adalah surga dunia bagimu."
    },
    {
      title: "Kamu 87% Profesor Rebahan Bersertifikat Internasional",
      desc: "Kamu punya bakat luar biasa menemukan posisi paling nyaman di sembarang tempat. Tidur adalah hobi, karir, dan panggilan jiwamu."
    },
    {
      title: "Kamu 89% Penganut Filosofi Air Mengalir Santuy",
      desc: "Bukannya gak peduli masa depan, kamu cuma yakin rezeki udah diatur semesta. Masalah berat cukup dibasmi pakai tidur siang 15 menit."
    },
    {
      title: "Kamu 90% Ninja Penghilang Diri dari Tongkrongan",
      desc: "Sangat ahli pamit pulang secara gaib saat tagihan kafe mau dibagi rata atau saat baterai sosialmu tiba-tiba drop ke 1%."
    },
    {
      title: "Kamu 84% Kolektor Saldo Kenyamanan Hidup",
      desc: "Gak butuh pengakuan orang lain, yang penting WiFi lancar, camilan aman, dan gak ada yang nelepon pas lagi nonton series favorit."
    },
    {
      title: "Kamu 93% Pemegang Rekor Dunia 'Besok Aja Deh'",
      desc: "Prokrastinasi bagimu bukan kelemahan, melainkan seni menunda hal yang belum mendesak demi menjaga stabilitas hormon bahagia."
    }
  ],

  // Pilihan A dan B seimbang (Bunglon, misterius, overthinker sejati)
  balanced: [
    {
      title: "Kamu 90% Bunglon Peradaban Multi-Dimensi",
      desc: "Otak kanan dan kirimu sering berantem rebutan kemudi. Di satu sisi pengen sukses tajir melintir, di sisi lain pengen jadi ubi rebus di pegunungan."
    },
    {
      title: "Kamu 88% Agen Rahasia Berkedok Orang Bingung",
      desc: "Pilihanmu seimbang sempurna antara kenekatan dan rasa takut. Orang lain sulit menebak langkahmu karena kamu sendiri pun gak tahu mau ngapain."
    },
    {
      title: "Kamu 91% Juara Bertahan Overthinking Malam Hari",
      desc: "Keseimbangan pilihanmu membuktikan bahwa kamu mikirin semua skenario terburuk sebelum memencet tombol. Otakmu butuh cooling pad!"
    },
    {
      title: "Kamu 85% Diplomat Netral Antar-Galaksi",
      desc: "Kamu selalu bisa melihat sisi baik dan konyol dari dua pilihan mustahil. Bakat alaminya cocok jadi penengah drama keluarga pas lebaran."
    },
    {
      title: "Kamu 94% Penikmat Hidup Setengah Gila Setengah Waras",
      desc: "Separuh harimu dihabiskan untuk kerja keras bagai kuda, separuhnya lagi dihabiskan menatap cicak di langit-langit sambil melamun."
    },
    {
      title: "Kamu 89% Laboratorium Berjalan Ide-Ide Random",
      desc: "Kadang bijak seperti kakek guru kungfu, kadang konyol seperti anak kecil main ujan-ujanan. Gak ada yang bisa nebak mood kamu 1 jam ke depan."
    },
    {
      title: "Kamu 87% Pecinta Keseimbangan Yin dan Yang Receh",
      desc: "Kalau makan gorengan asin, minumnya harus manis. Kalau seharian capek bersosialisasi, malamnya wajib me-time sampai subuh."
    },
    {
      title: "Kamu 92% Navigator Badai Kehidupan",
      desc: "Fleksibel dan tahan banting. Lempar kamu ke situasi apapun, kamu tetap bisa tertawa kecil sambil menikmati kerusuhan yang ada."
    }
  ]
};

// ==========================================
// 3. GAME STATE MANAGEMENT
// ==========================================
const gameState = {
  players: [
    { name: "Pemain 1", answers: [] }, // answers: ['A', 'B', ...]
    { name: "Pemain 2", answers: [] }
  ],
  currentPlayerIndex: 0, // 0 = Player 1, 1 = Player 2
  currentQuestionIndex: 0,
  isTransitioning: false,
  results: [null, null],
  compatibilityScore: 0
};

// ==========================================
// 4. DOM ELEMENTS
// ==========================================
const elements = {
  // Screens
  startScreen: document.getElementById("start-screen"),
  intermissionScreen: document.getElementById("intermission-screen"),
  gameScreen: document.getElementById("game-screen"),
  resultScreen: document.getElementById("result-screen"),

  // Start Screen Elements
  player1Input: document.getElementById("player1-input"),
  player2Input: document.getElementById("player2-input"),
  startGameBtn: document.getElementById("start-game-btn"),

  // Intermission Screen Elements
  intermissionTitle: document.getElementById("intermission-title"),
  intermissionDesc: document.getElementById("intermission-desc"),
  nextPlayerName: document.getElementById("next-player-name"),
  intermissionContinueBtn: document.getElementById("intermission-continue-btn"),

  // Game Screen Elements
  turnBadge: document.getElementById("turn-badge"),
  currentPlayerAvatar: document.getElementById("current-player-avatar"),
  currentPlayerName: document.getElementById("current-player-name"),
  questionProgressText: document.getElementById("question-progress-text"),
  progressBar: document.getElementById("progress-bar"),
  questionCard: document.getElementById("question-card"),
  questionCategory: document.getElementById("question-category"),
  questionPrompt: document.getElementById("question-prompt"),
  choiceABtn: document.getElementById("choice-a-btn"),
  choiceBBtn: document.getElementById("choice-b-btn"),
  choiceAEmoji: document.getElementById("choice-a-emoji"),
  choiceAText: document.getElementById("choice-a-text"),
  choiceBEmoji: document.getElementById("choice-b-emoji"),
  choiceBText: document.getElementById("choice-b-text"),

  // Result Screen Elements
  resP1Name: document.getElementById("res-p1-name"),
  resP1Badge: document.getElementById("res-p1-badge"),
  resP1Desc: document.getElementById("res-p1-desc"),
  resP1StatA: document.getElementById("res-p1-stat-a"),
  resP1StatB: document.getElementById("res-p1-stat-b"),
  resP2Name: document.getElementById("res-p2-name"),
  resP2Badge: document.getElementById("res-p2-badge"),
  resP2Desc: document.getElementById("res-p2-desc"),
  resP2StatA: document.getElementById("res-p2-stat-a"),
  resP2StatB: document.getElementById("res-p2-stat-b"),
  compatibilityScore: document.getElementById("compatibility-score"),
  compatibilityQuote: document.getElementById("compatibility-quote"),
  shareWaBtn: document.getElementById("share-wa-btn"),
  restartGameBtn: document.getElementById("restart-game-btn"),
  viewAnswersBtn: document.getElementById("view-answers-btn"),
  breakdownSection: document.getElementById("breakdown-section"),
  breakdownList: document.getElementById("breakdown-list"),

  // Theme, Sound & History Modal
  themeToggle: document.getElementById("theme-toggle"),
  soundToggle: document.getElementById("sound-toggle"),
  ambientParticles: document.getElementById("ambient-particles"),
  historyBtn: document.getElementById("history-btn"),
  historyModal: document.getElementById("history-modal"),
  closeHistoryBtn: document.getElementById("close-history-btn"),
  closeModalFooterBtn: document.getElementById("close-modal-footer-btn"),
  historyContent: document.getElementById("history-content"),
  clearHistoryBtn: document.getElementById("clear-history-btn"),

  // Confetti Canvas
  confettiCanvas: document.getElementById("confetti-canvas")
};

// ==========================================
// 5. HELPER FUNCTIONS
// ==========================================

/**
 * Berpindah tampilan layar aktif dengan efek transisi halus
 * @param {HTMLElement} targetScreen 
 */
function switchScreen(targetScreen) {
  const screens = [
    elements.startScreen,
    elements.intermissionScreen,
    elements.gameScreen,
    elements.resultScreen
  ];

  screens.forEach((scr) => {
    if (scr === targetScreen) {
      scr.classList.add("active");
      scr.classList.add("slide-in");
      setTimeout(() => scr.classList.remove("slide-in"), 500);
    } else {
      scr.classList.remove("active");
    }
  });

  // Scroll ke atas layar saat berganti halaman
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Mengacak array menggunakan algoritma Fisher-Yates
 * @param {Array} array
 * @returns {Array}
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Mengambil elemen acak dari sebuah array
 * @param {Array} array 
 * @returns {*}
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// ==========================================
// 6. LOGIKA PERMAINAN (GAMEPLAY FLOW)
// ==========================================

/**
 * Mulai game: validasi nama pemain & inisialisasi state
 * Mengocok 15 pertanyaan acak dari total 50 pertanyaan (rolling)
 */
function initGame() {
  const p1Name = elements.player1Input.value.trim() || "Pemain 1";
  const p2Name = elements.player2Input.value.trim() || "Pemain 2";

  // Kocok 50 pertanyaan dan ambil 15 pertanyaan untuk ronde ini
  activeQuestions = shuffleArray(allQuestions).slice(0, QUESTIONS_PER_GAME);

  gameState.players[0] = { name: p1Name, answers: [] };
  gameState.players[1] = { name: p2Name, answers: [] };
  gameState.currentPlayerIndex = 0;
  gameState.currentQuestionIndex = 0;
  gameState.isTransitioning = false;
  gameState.results = [null, null];

  // Sembunyikan breakdown jawaban bila sebelumnya terbuka
  elements.breakdownSection.classList.add("hidden");

  // Siapkan giliran Pemain 1
  setupPlayerTurn();
  switchScreen(elements.gameScreen);
}

/**
 * Menyiapkan tampilan header/status untuk pemain yang sedang aktif
 */
function setupPlayerTurn() {
  const isP1 = gameState.currentPlayerIndex === 0;
  const curPlayer = gameState.players[gameState.currentPlayerIndex];

  elements.currentPlayerName.textContent = curPlayer.name;
  elements.currentPlayerAvatar.textContent = isP1 ? "😎" : "🤪";

  if (isP1) {
    elements.turnBadge.classList.remove("p2-badge");
    elements.turnBadge.classList.add("p1-badge");
  } else {
    elements.turnBadge.classList.remove("p1-badge");
    elements.turnBadge.classList.add("p2-badge");
  }

  renderQuestion();
}

/**
 * Menampilkan pertanyaan dan opsi A & B sesuai index saat ini
 */
function renderQuestion() {
  const q = activeQuestions[gameState.currentQuestionIndex];
  const total = activeQuestions.length;
  const currentNum = gameState.currentQuestionIndex + 1;

  // Update progress
  elements.questionProgressText.textContent = `Pertanyaan ${currentNum}/${total}`;
  const progressPercent = (currentNum / total) * 100;
  elements.progressBar.style.width = `${progressPercent}%`;

  // Update kartu pertanyaan dengan efek flip
  elements.questionCard.classList.remove("card-flip-enter");
  void elements.questionCard.offsetWidth; // Trigger reflow
  elements.questionCard.classList.add("card-flip-enter");

  elements.questionCategory.textContent = q.category;
  elements.questionPrompt.textContent = q.prompt;

  // Update pilihan tombol A & B
  elements.choiceAEmoji.textContent = q.a.emoji;
  elements.choiceAText.textContent = q.a.text;

  elements.choiceBEmoji.textContent = q.b.emoji;
  elements.choiceBText.textContent = q.b.text;

  // Reset status tampilan tombol
  resetChoiceButtons();
  gameState.isTransitioning = false;
}

/**
 * Reset efek tombol pilihan ke keadaan normal
 */
function resetChoiceButtons() {
  [elements.choiceABtn, elements.choiceBBtn].forEach((btn) => {
    btn.classList.remove("clicked", "selected-a", "selected-b", "dimmed");
    btn.disabled = false;
  });
}

/**
 * Handle ketika pemain memilih opsi A atau B
 * @param {'A' | 'B'} choice 
 */
function handleChoice(choice) {
  if (gameState.isTransitioning) return;
  gameState.isTransitioning = true;

  // Efek suara pop interaktif
  SoundFX.playPop(choice === "A" ? 520 : 620);

  const currentP = gameState.players[gameState.currentPlayerIndex];
  currentP.answers.push(choice);

  // Animasi feedback tombol
  if (choice === "A") {
    elements.choiceABtn.classList.add("clicked", "selected-a");
    elements.choiceBBtn.classList.add("dimmed");
  } else {
    elements.choiceBBtn.classList.add("clicked", "selected-b");
    elements.choiceABtn.classList.add("dimmed");
  }

  // Delay sejenak untuk transisi pertanyaan berikutnya
  setTimeout(() => {
    gameState.currentQuestionIndex++;

    if (gameState.currentQuestionIndex < activeQuestions.length) {
      // Masih ada pertanyaan untuk pemain yang sama
      SoundFX.playWhoosh();
      renderQuestion();
    } else {
      // Pertanyaan habis untuk pemain ini
      handleTurnFinished();
    }
  }, 440);
}

/**
 * Handle selesai giliran: ganti pemain atau langsung ke hasil
 */
function handleTurnFinished() {
  if (gameState.currentPlayerIndex === 0) {
    // Pemain 1 selesai, siapkan intermission ke Pemain 2
    gameState.currentPlayerIndex = 1;
    gameState.currentQuestionIndex = 0;

    const p1Name = gameState.players[0].name;
    const p2Name = gameState.players[1].name;

    elements.intermissionTitle.textContent = `Mantap, ${p1Name}! Giliranmu Selesai!`;
    elements.nextPlayerName.textContent = p2Name;
    elements.intermissionDesc.innerHTML = `Sekarang oper gadget ini ke <strong class="highlight-text">${p2Name}</strong>. Jawaban ${p1Name} aman terkunci rahasia!`;

    SoundFX.playWhoosh();
    switchScreen(elements.intermissionScreen);
  } else {
    // Pemain 2 selesai, hitung hasil akhir kedua pemain!
    calculateFinalResults();
  }
}

// ==========================================
// 7. HASIL AKHIR & KEPRIBADIAN ABSURD
// ==========================================

/**
 * Menghasilkan diagnosa absurd berdasarkan kecenderungan jawaban
 * @param {Array<string>} answers 
 * @returns {{ title: string, desc: string, countA: number, countB: number }}
 */
function generateAbsurdResult(answers) {
  const countA = answers.filter((a) => a === "A").length;
  const countB = answers.filter((a) => a === "B").length;

  let pool;
  if (countA > countB + 2) {
    // Dominan A
    pool = hasilRandom.typeA;
  } else if (countB > countA + 2) {
    // Dominan B
    pool = hasilRandom.typeB;
  } else {
    // Seimbang / Netral
    pool = hasilRandom.balanced;
  }

  const selected = getRandomItem(pool);
  return {
    title: selected.title,
    desc: selected.desc,
    countA,
    countB
  };
}

/**
 * Menghitung tingkat kecocokan jawaban kedua pemain
 * @returns {{ percent: number, quote: string }}
 */
function calculateCompatibility(answersP1, answersP2) {
  let matches = 0;
  const total = answersP1.length;

  for (let i = 0; i < total; i++) {
    if (answersP1[i] === answersP2[i]) {
      matches++;
    }
  }

  const percent = Math.round((matches / total) * 100);

  let quote = "";
  if (percent >= 80) {
    quote = "Frekuensi otak kalian identik! Kemungkinan besar kalian adalah kloningan dari laboratorium rahasia yang sama.";
  } else if (percent >= 55) {
    quote = "Kalian cocok jadi partner kriminal absurd: satu orang bikin onar, satu orang lagi yang dokumentasiin.";
  } else if (percent >= 30) {
    quote = "Kombinasi bumi dan langit! Yang satu pengen rebahan, yang satu pengen keliling dunia, tapi anehnya tetep nyambung.";
  } else {
    quote = "Level kecocokan kalian sangat langka (kebalikan 100%). Kalau kalian disatukan di satu ruangan, bisa memicu perang dunia ketiga!";
  }

  return { percent, quote };
}

/**
 * Hitung dan tampilkan layar hasil akhir
 */
function calculateFinalResults() {
  const p1 = gameState.players[0];
  const p2 = gameState.players[1];

  const res1 = generateAbsurdResult(p1.answers);
  const res2 = generateAbsurdResult(p2.answers);
  const comp = calculateCompatibility(p1.answers, p2.answers);

  gameState.results = [res1, res2];
  gameState.compatibilityScore = comp.percent;

  // Tampilkan data Pemain 1
  elements.resP1Name.textContent = p1.name;
  elements.resP1Badge.textContent = res1.title;
  elements.resP1Desc.textContent = res1.desc;
  elements.resP1StatA.textContent = `Pilihan A: ${res1.countA}`;
  elements.resP1StatB.textContent = `Pilihan B: ${res1.countB}`;

  // Tampilkan data Pemain 2
  elements.resP2Name.textContent = p2.name;
  elements.resP2Badge.textContent = res2.title;
  elements.resP2Desc.textContent = res2.desc;
  elements.resP2StatA.textContent = `Pilihan A: ${res2.countA}`;
  elements.resP2StatB.textContent = `Pilihan B: ${res2.countB}`;

  // Tampilkan Skor Kecocokan dengan animasi rolling counter
  animateScoreCounter(0, comp.percent, 1300);
  elements.compatibilityQuote.textContent = `"${comp.quote}"`;

  // Siapkan rincian breakdown per pertanyaan
  renderBreakdownList();

  // Simpan hasil ke LocalStorage
  saveGameToHistory(p1.name, p2.name, res1, res2, comp.percent);

  // Pindah ke Screen Result
  switchScreen(elements.resultScreen);

  // Jalankan efek animasi kartu & letuskan confetti
  const p1Box = document.getElementById("p1-result-box");
  const p2Box = document.getElementById("p2-result-box");
  if (p1Box && p2Box) {
    p1Box.classList.remove("card-reveal");
    p2Box.classList.remove("card-reveal");
    void p1Box.offsetWidth;
    p1Box.classList.add("card-reveal");
    setTimeout(() => p2Box.classList.add("card-reveal"), 150);
  }

  // Efek confetti meriah & nada kemenangan
  startConfetti(3400);
  SoundFX.playFanfare();
}

/**
 * Animasi rolling counter angka persentase kecocokan
 */
function animateScoreCounter(start, end, duration = 1200) {
  const el = elements.compatibilityScore;
  if (!el) return;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Easing out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.round(start + (end - start) * easeProgress);

    el.textContent = `${currentVal}%`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      el.textContent = `${end}%`;
    }
  }

  requestAnimationFrame(updateCounter);
}

/**
 * Render rincian komparasi jawaban pemain per nomor
 */
function renderBreakdownList() {
  elements.breakdownList.innerHTML = "";
  const p1 = gameState.players[0];
  const p2 = gameState.players[1];

  activeQuestions.forEach((q, idx) => {
    const ans1 = p1.answers[idx];
    const ans2 = p2.answers[idx];
    const isSame = ans1 === ans2;

    const item = document.createElement("div");
    item.className = "breakdown-item";

    item.innerHTML = `
      <span class="breakdown-q-number">Soal #${idx + 1} &bull; ${q.category}</span>
      <p class="breakdown-q-text">${q.prompt}</p>
      <div class="breakdown-answers">
        <span class="breakdown-ans ${isSame ? 'ans-match' : 'ans-diff-p1'}">
          ${p1.name}: Opsi ${ans1} (${ans1 === 'A' ? q.a.text : q.b.text})
        </span>
        <span class="breakdown-ans ${isSame ? 'ans-match' : 'ans-diff-p2'}">
          ${p2.name}: Opsi ${ans2} (${ans2 === 'A' ? q.a.text : q.b.text})
        </span>
      </div>
    `;
    elements.breakdownList.appendChild(item);
  });
}

// ==========================================
// 8. SHARE WHATSAPP
// ==========================================

/**
 * Format teks hasil dan buka WhatsApp Web / App
 */
function shareToWhatsApp() {
  const p1 = gameState.players[0];
  const p2 = gameState.players[1];
  const res1 = gameState.results[0];
  const res2 = gameState.results[1];
  const score = gameState.compatibilityScore;

  if (!res1 || !res2) return;

  const textLines = [
    `🔥 *HASIL KUIS RECEH WOULD YOU RATHER* 🔥`,
    `--------------------------------------`,
    `😎 *${p1.name}*:`,
    `👉 ${res1.title}`,
    `📊 Pilihan: ${res1.countA} A | ${res1.countB} B`,
    ``,
    `🤪 *${p2.name}*:`,
    `👉 ${res2.title}`,
    `📊 Pilihan: ${res2.countA} A | ${res2.countB} B`,
    ``,
    `🧠 *Kecocokan Frekuensi Otak:* ${score}%!`,
    `--------------------------------------`,
    `Coba kuis absurd ini bareng temanmu sekarang juga! 🚀`
  ];

  const fullText = textLines.join("\n");
  const waUrl = `https://wa.me/?text=${encodeURIComponent(fullText)}`;
  window.open(waUrl, "_blank", "noopener,noreferrer");
}

// ==========================================
// 9. LOCALSTORAGE: RIWAYAT KUIS
// ==========================================
const HISTORY_STORAGE_KEY = "wyr_kuis_history_v1";

/**
 * Menyimpan rekap kuis ke LocalStorage (Maksimal 10 riwayat terbaru)
 */
function saveGameToHistory(p1Name, p2Name, res1, res2, compScore) {
  try {
    const existing = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || [];
    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      p1Name,
      p2Name,
      p1Title: res1.title,
      p2Title: res2.title,
      compatibility: compScore
    };

    // Tambah di awal dan batasi 10 item
    existing.unshift(newRecord);
    if (existing.length > 10) existing.pop();

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn("Gagal menyimpan ke localStorage:", err);
  }
}

/**
 * Menampilkan modal riwayat kuis
 */
function openHistoryModal() {
  try {
    const records = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || [];
    elements.historyContent.innerHTML = "";

    if (records.length === 0) {
      elements.historyContent.innerHTML = `
        <div class="history-empty">
          <p>Belum ada riwayat kuis tersimpan.</p>
          <small>Selesaikan satu ronde kuis untuk melihat riwayat di sini!</small>
        </div>
      `;
    } else {
      records.forEach((rec) => {
        const item = document.createElement("div");
        item.className = "history-item";
        item.innerHTML = `
          <div class="history-date">📅 ${rec.date} &bull; Kecocokan: <strong>${rec.compatibility}%</strong></div>
          <div class="history-names">⚡ ${escapeHtml(rec.p1Name)} VS ${escapeHtml(rec.p2Name)}</div>
          <div class="history-results">
            <div>😎 ${escapeHtml(rec.p1Name)}: <em>${escapeHtml(rec.p1Title)}</em></div>
            <div>🤪 ${escapeHtml(rec.p2Name)}: <em>${escapeHtml(rec.p2Title)}</em></div>
          </div>
        `;
        elements.historyContent.appendChild(item);
      });
    }

    elements.historyModal.classList.remove("hidden");
  } catch (err) {
    console.error("Gagal membaca riwayat:", err);
  }
}

function closeHistoryModal() {
  elements.historyModal.classList.add("hidden");
}

function clearAllHistory() {
  if (confirm("Yakin ingin menghapus seluruh riwayat kuis?")) {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    openHistoryModal(); // Refresh tampilan modal
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function (m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      default: return '&#039;';
    }
  });
}

// ==========================================
// 10. TEMA GELAP (SUPER BLACK) & TERANG (SUPER WHITE)
// ==========================================
const THEME_STORAGE_KEY = "wyr_theme_preference";

function initTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  elements.themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  elements.themeToggle.title = theme === "dark" ? "Ganti ke Tema Terang (Super White)" : "Ganti ke Tema Gelap (Super Black)";

  // Sesuaikan status bar / browser tab bar dengan tema
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", theme === "dark" ? "#000000" : "#FFFFFF");
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  SoundFX.playPop(580);
}

// ==========================================
// 11. SISTEM EFEK SUARA (WEB AUDIO SYNTHESIZER)
// ==========================================
const SoundFX = {
  ctx: null,
  enabled: true,

  init() {
    const saved = localStorage.getItem("wyr_sound_enabled");
    this.enabled = saved !== null ? saved === "true" : true;
    this.updateToggleIcon();
  },

  getContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem("wyr_sound_enabled", this.enabled);
    this.updateToggleIcon();
    if (this.enabled) {
      this.playPop(560);
    }
  },

  updateToggleIcon() {
    if (elements.soundToggle) {
      elements.soundToggle.textContent = this.enabled ? "🔊" : "🔇";
      elements.soundToggle.title = this.enabled ? "Matikan Efek Suara" : "Aktifkan Efek Suara";
    }
  },

  playPop(freq = 480) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (_) {}
  },

  playWhoosh() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(280, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch (_) {}
  },

  playFanfare() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const time = ctx.currentTime + idx * 0.12;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.14, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.38);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.38);
      });
    } catch (_) {}
  }
};

// ==========================================
// 12. ANIMASI PARTIKEL MENGAPUNG (AMBIENT)
// ==========================================
function initAmbientParticles() {
  const container = elements.ambientParticles;
  if (!container) return;

  container.innerHTML = "";
  const symbols = ["?", "✨", "⭐", "💫", "🤔", "🔥", "💭", "⚡", "🔮", "🍕", "🍔"];
  const particleCount = window.innerWidth < 600 ? 14 : 22;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("span");
    p.className = "floating-particle";
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const left = (Math.random() * 94 + 3).toFixed(1) + "%";
    const size = (Math.random() * 0.7 + 0.85).toFixed(2) + "rem";
    const duration = (Math.random() * 8 + 14).toFixed(1) + "s";
    const delay = (Math.random() * -20).toFixed(1) + "s";
    const sway = (Math.random() * 60 - 30).toFixed(0) + "px";
    const maxOpacity = (Math.random() * 0.35 + 0.25).toFixed(2);

    p.style.left = left;
    p.style.fontSize = size;
    p.style.setProperty("--drift-duration", duration);
    p.style.animationDelay = delay;
    p.style.setProperty("--sway-x", sway);
    p.style.setProperty("--particle-max-opacity", maxOpacity);

    container.appendChild(p);
  }
}

// ==========================================
// 13. EFEK CONFETTI VANILLA CANVAS
// ==========================================
let confettiAnimationId = null;

function startConfetti(duration = 3000) {
  const canvas = elements.confettiCanvas;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = ["#8B5CF6", "#00F0FF", "#F43F5E", "#FBBF24", "#FF6B4A", "#2ED573", "#A78BFA", "#EC4899"];
  const particleCount = 110;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3.5 + 2,
      speedX: (Math.random() - 0.5) * 3.5,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 7,
      shape: Math.random() > 0.4 ? "rect" : "circle",
      opacity: 1
    });
  }

  const startTime = Date.now();

  if (confettiAnimationId) {
    cancelAnimationFrame(confettiAnimationId);
  }

  function render() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, width, height);

    let stillActive = false;

    particles.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      // Perlahan kurangi opacity setelah separuh durasi
      if (elapsed > duration * 0.6) {
        p.opacity = Math.max(0, 1 - (elapsed - duration * 0.6) / (duration * 0.4));
      }

      if (p.y < height && p.opacity > 0) {
        stillActive = true;
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.75);
      }

      ctx.restore();
    });

    if (elapsed < duration && stillActive) {
      confettiAnimationId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, width, height);
      confettiAnimationId = null;
    }
  }

  render();
}

// ==========================================
// 14. EVENT LISTENERS
// ==========================================
function setupEventListeners() {
  // 1. Start Game
  elements.startGameBtn.addEventListener("click", () => {
    SoundFX.playPop(520);
    initGame();
  });

  // 2. Intermission Continue
  elements.intermissionContinueBtn.addEventListener("click", () => {
    SoundFX.playPop(580);
    setupPlayerTurn();
    switchScreen(elements.gameScreen);
  });

  // 3. Tombol Pilihan A & B
  elements.choiceABtn.addEventListener("click", () => handleChoice("A"));
  elements.choiceBBtn.addEventListener("click", () => handleChoice("B"));

  // 4. Tombol WhatsApp Share
  elements.shareWaBtn.addEventListener("click", () => {
    SoundFX.playPop(640);
    shareToWhatsApp();
  });

  // 5. Tombol Main Lagi
  elements.restartGameBtn.addEventListener("click", () => {
    SoundFX.playWhoosh();
    switchScreen(elements.startScreen);
  });

  // 6. Toggle Breakdown Jawaban ("Adu Jawaban")
  elements.viewAnswersBtn.addEventListener("click", () => {
    SoundFX.playPop(480);
    elements.breakdownSection.classList.toggle("hidden");
    if (!elements.breakdownSection.classList.contains("hidden")) {
      elements.breakdownSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  // 7. Dark Mode & Sound Toggle
  elements.themeToggle.addEventListener("click", toggleTheme);
  if (elements.soundToggle) {
    elements.soundToggle.addEventListener("click", () => SoundFX.toggle());
  }

  // 8. Riwayat Modal
  elements.historyBtn.addEventListener("click", () => {
    SoundFX.playPop(480);
    openHistoryModal();
  });
  elements.closeHistoryBtn.addEventListener("click", closeHistoryModal);
  elements.closeModalFooterBtn.addEventListener("click", closeHistoryModal);
  elements.clearHistoryBtn.addEventListener("click", clearAllHistory);

  // Tutup modal jika klik di area luar modal box
  elements.historyModal.addEventListener("click", (e) => {
    if (e.target === elements.historyModal) {
      closeHistoryModal();
    }
  });

  // Keyboard shortcut: Escape untuk tutup modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !elements.historyModal.classList.contains("hidden")) {
      closeHistoryModal();
    }
  });
}

// ==========================================
// 15. BOOTSTRAP APP ON LOAD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  SoundFX.init();
  initAmbientParticles();
  setupEventListeners();
});
