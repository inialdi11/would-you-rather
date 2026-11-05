/**
 * ====================================================================
 * WOULD YOU RATHER? — Premium Edition
 * script.js — Game State, Data Pertanyaan, Hasil, Confetti
 * Version: 0.2.0 (Premium UI)
 * ====================================================================
 */

const APP_VERSION = "0.2.0";
const APP_BUILD_DATE = "2026-11-06";

// ==========================================
// 1. BANK SOAL (50 PERTANYAAN)
// ==========================================
const QUESTIONS_PER_GAME = 15;

const allQuestions = [
  { id: 1, category: "🍜 Kuliner & Selera", prompt: "Saat makan mie instan tengah malam, mending...", a: { text: "Makan Indomie kuah tapi kuahnya tinggal 2 sendok", emoji: "🥣" }, b: { text: "Makan Indomie goreng tapi bumbunya lupa dimasukkan setengah", emoji: "🥢" } },
  { id: 2, category: "📱 Media Sosial & HP", prompt: "Tiba-tiba HP kamu error dan harus milih salah satu...", a: { text: "History chat WA kamu dibacakan kencang di speaker masjid/kantor", emoji: "🔊" }, b: { text: "Galeri foto aib masa kecil kamu diunggah ke feed Instagram tanpa caption", emoji: "🖼️" } },
  { id: 3, category: "💼 Dunia Kerja & Kuliah", prompt: "Dalam urusan rezeki dan waktu luang...", a: { text: "Gaji 50 juta sebulan tapi kerja 18 jam sehari tanpa hari libur", emoji: "💼" }, b: { text: "Gaji 4 juta sebulan tapi kerja cuma 2 jam seminggu dan tidur seharian", emoji: "🛏️" } },
  { id: 4, category: "🛌 Gaya Hidup & Rebahan", prompt: "Ketika harus menghadapi hari libur...", a: { text: "Rebahan di kasur 48 jam nonstop tapi gak boleh megang HP sama sekali", emoji: "🛋️" }, b: { text: "Jalan kaki keliling komplek dari pagi sampai malam sambil live TikTok", emoji: "🚶" } },
  { id: 5, category: "💔 Hubungan & Asmara", prompt: "Punya pasangan idaman tapi punya satu kekurangan...", a: { text: "Cakep & tajir melintir tapi tiap ketawa bunyinya mirip knalpot bobokan", emoji: "🏍️" }, b: { text: "Biasa aja tapi super romantis, cuma hobinya ngirim voice note nyanyi fals 10 menit", emoji: "🎤" } },
  { id: 6, category: "🛸 Hidup Absurd", prompt: "Dapat kemampuan super dari makhluk asing...", a: { text: "Bisa telepati tapi cuma bisa denger pikiran kucing yang lagi overthinking", emoji: "🐱" }, b: { text: "Bisa teleportasi tapi setiap sampai tujuan celana kamu selalu ketinggalan", emoji: "👖" } },
  { id: 7, category: "🌶️ Makanan Ekstrem", prompt: "Harus hidup makan menu yang sama seumur hidup...", a: { text: "Makan seblak level 10 setiap sarapan pagi tanpa air minum dingin", emoji: "🌶️" }, b: { text: "Makan bubur diaduk pake sedotan boba setiap hari", emoji: "🥤" } },
  { id: 8, category: "🚗 Mobilitas & Jalanan", prompt: "Terjebak di jalanan ibukota saat jam pulang...", a: { text: "Naik motor kehujanan badai tanpa jas hujan bareng gebetan", emoji: "🌧️" }, b: { text: "Macet total 4 jam di tol tapi di mobil bareng mantan dan ortunya", emoji: "🚗" } },
  { id: 9, category: "💰 Finansial & Dompet", prompt: "Saldo ATM menipis di akhir bulan, mending...", a: { text: "Pinjam uang 100 ribu ke teman tapi harus sungkem cium tangan di depan umum", emoji: "🤝" }, b: { text: "Makan kerupuk kaleng + kecap manis selama 4 hari berturut-turut", emoji: "🥫" } },
  { id: 10, category: "🤡 Momen Memalukan", prompt: "Harus ngalamin kejadian canggung seumur hidup...", a: { text: "Tiap kali salaman sama bos/dosen selalu keceplosan manggil 'Sayang'", emoji: "🫣" }, b: { text: "Tiap kali mau ngomong serius harus diawali dengan tarian TikTok dulu", emoji: "🕺" } },
  { id: 11, category: "🛒 Belanja & Foya-Foya", prompt: "Dapat rezeki nomplok saldo e-wallet 20 juta tapi...", a: { text: "Harus dihabiskan dalam 1 jam buat beli cilok dan gorengan", emoji: "🍢" }, b: { text: "Cuma boleh dipakai buat checkout keranjang Shopee akun teman acak", emoji: "🛍️" } },
  { id: 12, category: "🚿 Kebersihan & Mandi", prompt: "Dilema pagi hari sebelum beraktivitas...", a: { text: "Gak mandi selama seminggu tapi disemprot parfum mahal sebotol", emoji: "🧴" }, b: { text: "Mandi air es kutub utara jam 4 subuh sambil disetel lagu horor", emoji: "🧊" } },
  { id: 13, category: "🧠 Pikiran Random", prompt: "Mengetahui rahasia alam semesta...", a: { text: "Tahu tanggal kematian semua kecoak di rumahmu secara presisi", emoji: "🪳" }, b: { text: "Bisa tahu siapa yang pernah stalking profil kamu tapi gak bisa negur", emoji: "👁️" } },
  { id: 14, category: "📶 Teknologi & Kuota", prompt: "Ketika dunia kiamat internet...", a: { text: "Baterai HP selalu 100% tapi sinyal mentok di EDGE / 1 bar selamanya", emoji: "🔋" }, b: { text: "Internet secepat kilat (1 Gbps) tapi baterai HP ngedrop tiap 5 menit", emoji: "⚡" } },
  { id: 15, category: "👑 Status Sosial", prompt: "Diakui di mata masyarakat sebagai...", a: { text: "Presiden Paguyuban Rebahan Nasional yang dipuja sejuta kaum mager", emoji: "👑" }, b: { text: "Duta Gorengan Internasional yang kebal minyak panas mendidih", emoji: "🍩" } }
];

let activeQuestions = [];

// ==========================================
// 2. DATA HASIL ABSURD (Premium Wording)
// ==========================================
const hasilRandom = {
  typeA: [
    { title: "Tipe Visioner Agresif", desc: "Kamu cenderung mengambil risiko tinggi tanpa memikirkan dampak jangka panjang. Gaya hidupmu penuh adrenalin, seperti mengendarai motor tanpa rem di jalan menurun." },
    { title: "Logika Di Luar Nalar Manusia", desc: "Cara berpikirmu sangat unik hingga para ilmuwan kebingungan. Kamu adalah pemecah masalah yang tidak konvensional dan penuh kejutan." },
    { title: "Eksekutor Tanpa Rencana", desc: "Prinsip hidupmu adalah 'Bertindak dulu, sesali nanti.' Kamu sangat spontan dan berani, namun sering mengabaikan detail penting di sekitarmu." }
  ],
  typeB: [
    { title: "Arsitek Kenyamanan Hidup", desc: "Kamu sangat menghargai efisiensi energi dan kenyamanan. Kamu tahu persis bagaimana menikmati hidup tanpa harus membuang tenaga secara berlebihan." },
    { title: "Diplomat Penghindar Konflik", desc: "Pilihanmu menunjukkan bahwa kamu lebih menyukai kedamaian, stabilitas, dan hidup yang minim drama. Kamu pandai menghindari masalah yang tidak perlu." },
    { title: "Filsuf Kontemplatif Modern", desc: "Kamu cenderung realistis dan tenang dalam mengambil keputusan. Bagi kamu, ketenangan batin dan waktu istirahat jauh lebih berharga daripada ambisi yang melelahkan." }
  ],
  balanced: [
    { title: "Kepribadian Ambidextrous", desc: "Kamu memiliki keseimbangan sempurna antara keberanian mengambil risiko dan kehati-hatian. Kamu fleksibel dan bisa beradaptasi di situasi apapun." },
    { title: "Navigator Kehidupan yang Bijak", desc: "Kamu tidak mudah terombang-ambing. Kamu tahu kapan harus maju dan kapan harus mengalah. Ini adalah tanda kecerdasan emosional yang matang." },
    { title: "Sintesis Logika dan Intuisi", desc: "Keputusanmu adalah hasil dari pertimbangan yang mendalam. Kamu adalah pemikir sejati yang tidak mudah terburu-buru dalam memilih jalan." }
  ]
};

// ==========================================
// 3. PLAYER CONFIGURATION (Premium Icons)
// ==========================================
const PLAYER_CONFIG = [
  { id: 1, defaultName: "Pemain 1", avatar: "👤", colorVar: "--p1-color", bgVar: "--p1-bg", badgeClass: "p1-badge", cardClass: "p1-card", pillClass: "pill-p1", ansClass: "ans-p1" },
  { id: 2, defaultName: "Pemain 2", avatar: "👥", colorVar: "--p2-color", bgVar: "--p2-bg", badgeClass: "p2-badge", cardClass: "p2-card", pillClass: "pill-p2", ansClass: "ans-p2" },
  { id: 3, defaultName: "Pemain 3", avatar: "🎭", colorVar: "--p3-color", bgVar: "--p3-bg", badgeClass: "p3-badge", cardClass: "p3-card", pillClass: "pill-p3", ansClass: "ans-p3" },
  { id: 4, defaultName: "Pemain 4", avatar: "🎯", colorVar: "--p4-color", bgVar: "--p4-bg", badgeClass: "p4-badge", cardClass: "p4-card", pillClass: "pill-p4", ansClass: "ans-p4" },
  { id: 5, defaultName: "Pemain 5", avatar: "💎", colorVar: "--p5-color", bgVar: "--p5-bg", badgeClass: "p5-badge", cardClass: "p5-card", pillClass: "pill-p5", ansClass: "ans-p5" }
];

// ==========================================
// 4. GAME STATE MANAGEMENT
// ==========================================
const gameState = {
  players: [], currentPlayerIndex: 0, currentQuestionIndex: 0, isTransitioning: false, gameEnded: false, results: [], compatibilityMatrix: [], completedPlayers: 0
};

const elements = {};

// ==========================================
// 5. HELPER FUNCTIONS
// ==========================================
function switchScreen(targetScreen) {
  [elements.startScreen, elements.intermissionScreen, elements.gameScreen, elements.resultScreen].forEach((scr) => {
    if (scr === targetScreen) { scr.classList.add("active", "slide-in"); setTimeout(() => scr.classList.remove("slide-in"), 500); }
    else { scr.classList.remove("active"); }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr;
}
function getRandomItem(array) { return array[Math.floor(Math.random() * array.length)]; }
function getPlayerConfig(index) { return PLAYER_CONFIG[index] || PLAYER_CONFIG[0]; }
function getPlayerClasses(index) {
  const config = getPlayerConfig(index);
  return { badgeClass: config.badgeClass, cardClass: config.cardClass, pillClass: config.pillClass, ansClass: config.ansClass, avatar: config.avatar, colorVar: config.colorVar, bgVar: config.bgVar };
}

// ==========================================
// 6. START SCREEN
// ==========================================
let selectedPlayerCount = 2;
const playerNameInputs = [];

function initPlayerCountSelector() {
  const buttons = elements.playerCountSelector.querySelectorAll(".player-count-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => { selectPlayerCount(parseInt(btn.dataset.count, 10)); SoundFX.playPop(520); });
  });
}

function selectPlayerCount(count) {
  selectedPlayerCount = count;
  const buttons = elements.playerCountSelector.querySelectorAll(".player-count-btn");
  buttons.forEach((btn) => {
    const isActive = parseInt(btn.dataset.count, 10) === count;
    btn.classList.toggle("active", isActive); btn.setAttribute("aria-pressed", isActive);
  });
  elements.playerCountBadge.textContent = `👥 Mode ${count} Pemain`;
  renderPlayerInputs(count);
}

function renderPlayerInputs(count) {
  const container = elements.playerInputsContainer;
  container.innerHTML = ""; playerNameInputs.length = 0;
  const existingVs = container.querySelector(".vs-divider"); if (existingVs) existingVs.remove();

  for (let i = 0; i < count; i++) {
    const config = getPlayerConfig(i);
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group"; inputGroup.dataset.playerIndex = i;

    if (count === 2 && i === 1) {
      const vsDivider = document.createElement("div"); vsDivider.className = "vs-divider";
      vsDivider.innerHTML = `<span class="vs-line"></span><span class="vs-badge">VS</span><span class="vs-line"></span>`;
      container.appendChild(vsDivider);
    }

    inputGroup.innerHTML = `
      <label for="player${i+1}-input">
        <span class="player-icon ${i === 0 ? "p1-bg" : i === 1 ? "p2-bg" : i === 2 ? "p3-bg" : i === 3 ? "p4-bg" : "p5-bg"}">${config.avatar}</span>
        Pemain ${i + 1}
      </label>
      <input type="text" id="player${i+1}-input" class="form-input" placeholder="Nama Pemain ${i + 1}" maxlength="20" value="${config.defaultName}" required autocomplete="off" />
    `;
    container.appendChild(inputGroup);
    playerNameInputs.push(inputGroup.querySelector("input"));
  }
}

function getPlayerNames() {
  return playerNameInputs.map((input, i) => input.value.trim() || getPlayerConfig(i).defaultName);
}

// ==========================================
// 7. GAMEPLAY FLOW
// ==========================================
function initGame() {
  const names = getPlayerNames();
  activeQuestions = shuffleArray(allQuestions).slice(0, QUESTIONS_PER_GAME);
  gameState.players = names.map((name, i) => ({ name, answers: [], config: getPlayerConfig(i) }));
  gameState.currentPlayerIndex = 0; gameState.currentQuestionIndex = 0; gameState.isTransitioning = false; gameState.gameEnded = false; gameState.results = []; gameState.compatibilityMatrix = []; gameState.completedPlayers = 0;
  
  elements.breakdownSection.classList.add("hidden");
  elements.compatibilityMatrixSection.classList.add("hidden");
  setupPlayerTurn(); switchScreen(elements.gameScreen);
}

function setupPlayerTurn() {
  const curPlayer = gameState.players[gameState.currentPlayerIndex];
  const classes = getPlayerClasses(gameState.currentPlayerIndex);
  elements.currentPlayerName.textContent = curPlayer.name;
  elements.currentPlayerAvatar.textContent = classes.avatar;
  elements.turnBadge.className = "turn-badge"; elements.turnBadge.classList.add(classes.badgeClass);
  renderQuestion();
}

function renderQuestion() {
  const q = activeQuestions[gameState.currentQuestionIndex];
  const total = activeQuestions.length; const currentNum = gameState.currentQuestionIndex + 1;
  const playerNum = gameState.currentPlayerIndex + 1; const totalPlayers = gameState.players.length;

  elements.questionProgressText.textContent = `Pemain ${playerNum}/${totalPlayers} • Soal ${currentNum}/${total}`;
  const overallProgress = ((gameState.currentPlayerIndex * total) + currentNum) / (totalPlayers * total) * 100;
  elements.progressBar.style.width = `${overallProgress}%`;

  elements.questionCard.classList.remove("card-flip-enter"); void elements.questionCard.offsetWidth; elements.questionCard.classList.add("card-flip-enter");
  elements.questionCategory.textContent = q.category; elements.questionPrompt.textContent = q.prompt;
  elements.choiceAEmoji.textContent = q.a.emoji; elements.choiceAText.textContent = q.a.text;
  elements.choiceBEmoji.textContent = q.b.emoji; elements.choiceBText.textContent = q.b.text;

  resetChoiceButtons(); gameState.isTransitioning = false;
}

function resetChoiceButtons() {
  [elements.choiceABtn, elements.choiceBBtn].forEach((btn) => { btn.classList.remove("clicked", "selected-a", "selected-b", "dimmed"); btn.disabled = false; });
}

function handleChoice(choice) {
  if (gameState.isTransitioning || gameState.gameEnded) return;
  gameState.isTransitioning = true;
  elements.choiceABtn.disabled = true; elements.choiceBBtn.disabled = true;
  SoundFX.playPop(choice === "A" ? 520 : 620);

  const currentP = gameState.players[gameState.currentPlayerIndex];
  currentP.answers.push(choice);

  if (choice === "A") { elements.choiceABtn.classList.add("clicked", "selected-a"); elements.choiceBBtn.classList.add("dimmed"); }
  else { elements.choiceBBtn.classList.add("clicked", "selected-b"); elements.choiceABtn.classList.add("dimmed"); }

  setTimeout(() => {
    if (gameState.gameEnded) return;
    gameState.currentQuestionIndex++;
    if (gameState.currentQuestionIndex < activeQuestions.length) { SoundFX.playWhoosh(); renderQuestion(); }
    else { handleTurnFinished(); }
  }, 440);
}

function handleTurnFinished() {
  gameState.isTransitioning = false; gameState.completedPlayers++; gameState.currentQuestionIndex = 0;
  if (gameState.currentPlayerIndex < gameState.players.length - 1) {
    const currentName = gameState.players[gameState.currentPlayerIndex].name;
    const nextIndex = gameState.currentPlayerIndex + 1; const nextName = gameState.players[nextIndex].name;
    elements.intermissionTitle.textContent = `Selesai, ${currentName}!`;
    elements.nextPlayerName.textContent = nextName;
    elements.intermissionDesc.innerHTML = `Oper perangkat ke <strong class="highlight-text">${nextName}</strong>. Jawaban ${currentName} aman terkunci.`;
    elements.completedCount.textContent = gameState.completedPlayers; elements.totalPlayers.textContent = gameState.players.length;
    elements.intermissionProgressBar.style.width = `${(gameState.completedPlayers / gameState.players.length) * 100}%`;
    elements.intermissionProgress.classList.remove("hidden");
    SoundFX.playWhoosh(); switchScreen(elements.intermissionScreen);
  } else { calculateFinalResults(); }
}

function continueToNextPlayer() { gameState.currentPlayerIndex++; setupPlayerTurn(); switchScreen(elements.gameScreen); }

// ==========================================
// 8. HASIL AKHIR
// ==========================================
function generateAbsurdResult(answers) {
  const countA = answers.filter((a) => a === "A").length; const countB = answers.filter((a) => a === "B").length;
  let pool = (countA > countB + 2) ? hasilRandom.typeA : (countB > countA + 2) ? hasilRandom.typeB : hasilRandom.balanced;
  const selected = getRandomItem(pool);
  return { title: selected.title, desc: selected.desc, countA, countB };
}

function calculateCompatibility(answersP1, answersP2) {
  let matches = 0;
  for (let i = 0; i < answersP1.length; i++) { if (answersP1[i] === answersP2[i]) matches++; }
  const percent = Math.round((matches / answersP1.length) * 100);
  let quote = "";
  if (percent >= 80) quote = "Frekuensi otak kalian identik! Sangat jarang menemukan dua orang yang sepikiran seperti ini.";
  else if (percent >= 55) quote = "Kalian cocok jadi partner. Satu orang inisiatif, satu orang lagi memberikan dukungan.";
  else if (percent >= 30) quote = "Perbedaan kalian cukup unik, namun justru itu yang membuat hubungan kalian seimbang.";
  else quote = "Kalian sangat berbeda, bahkan bagaikan langit dan bumi. Namun perbedaan ini bisa jadi daya tarik tersendiri.";
  return { percent, quote };
}

function calculateFinalResults() {
  gameState.isTransitioning = false; 
  gameState.gameEnded = true;
  
  try {
    const totalPlayers = gameState.players.length;
    
    // 1. Generate hasil untuk masing-masing pemain
    gameState.results = gameState.players.map((p) => generateAbsurdResult(p.answers));
    
    // 2. Sembunyikan matriks karena kita buang fitur ini agar tidak error
    if (elements.compatibilityMatrixSection) {
      elements.compatibilityMatrixSection.classList.add("hidden");
    }

    // 3. RENDER KARTU PEMAIN LANGSUNG
    renderResultsGrid();
    
    // 4. Render detail jawaban (Adu Jawaban)
    renderBreakdownList(); 
    
    // 5. Simpan ke riwayat
    saveGameToHistory(); 
    
    // 6. Animasi dan suara
    animateResultCards();
    startConfetti(3400); 
    SoundFX.playFanfare();

  } catch (err) { 
    console.error("Error fatal di hasil akhir:", err); 
  } finally { 
    // 7. PASTIKAN PINDAH KE LAYAR HASIL APAPUN YANG TERJADI
    switchScreen(elements.resultScreen); 
  }
}

function renderResultsGrid() {
  try {
    const grid = elements.resultsGrid; if (!grid) return;
    grid.innerHTML = ""; grid.className = "results-grid";
    if (gameState.players.length === 3) grid.classList.add("has-3-players");
    else if (gameState.players.length === 4) grid.classList.add("has-4-players");
    else if (gameState.players.length === 5) grid.classList.add("has-5-players");

    gameState.players.forEach((player, idx) => {
      const result = gameState.results?.[idx]; if (!result) return;
      const classes = getPlayerClasses(idx); const playerNum = idx + 1;

      const card = document.createElement("div");
      card.className = `card player-result-card ${classes.cardClass}`; card.id = `result-box-p${playerNum}`;

      card.innerHTML = `
        <div class="player-result-header">
          <span class="avatar-circle" style="background: var(${classes.bgVar}); color: var(${classes.colorVar}); border-color: var(${classes.colorVar});">${classes.avatar}</span>
          <div>
            <span class="player-role-label">PEMAIN ${playerNum}</span>
            <h3 class="player-result-name">${escapeHtml(player.name)}</h3>
          </div>
        </div>
        <div class="absurd-title-badge" style="background: linear-gradient(135deg, var(${classes.colorVar}), var(--accent));">${escapeHtml(result.title)}</div>
        <p class="absurd-desc">${escapeHtml(result.desc)}</p>
        <div class="stat-pills">
          <span class="pill ${classes.pillClass}" style="background: var(${classes.bgVar}); color: var(${classes.colorVar}); border-color: var(${classes.colorVar});">Opsi A: ${result.countA}</span>
          <span class="pill ${classes.pillClass === 'pill-p1' ? 'pill-b' : 'pill-a'}" style="background: var(${classes.bgVar}); color: var(${classes.colorVar}); border-color: var(${classes.colorVar});">Opsi B: ${result.countB}</span>
        </div>
      `;
      grid.appendChild(card);
    });

    if (gameState.players.length === 2) {
      const comp = gameState.compatibilityMatrix?.[0]?.[1];
      if (comp) {
        const compatCard = document.createElement("div");
        compatCard.className = "card compatibility-card text-center";
        compatCard.innerHTML = `
          <div class="compatibility-title">Tingkat Kecocokan</div>
          <div class="compatibility-score-wrapper">
            <div class="score-glow-ring"></div>
            <div class="compatibility-score" id="compatibility-score">0%</div>
          </div>
          <p class="compatibility-quote" id="compatibility-quote">"${escapeHtml(comp.quote)}"</p>
        `;
        grid.appendChild(compatCard); setTimeout(() => animateScoreCounter(0, comp.percent, 1300), 300);
      }
    }
  } catch (err) { console.error("Error render grid:", err); }
}

function renderCompatibilityMatrix() {
  try {
    const matrix = elements.compatibilityMatrix; const section = elements.compatibilityMatrixSection;
    if (!matrix || !section) return;
    const players = gameState.players; const n = players.length; if (n < 3) return;

    let html = '<table class="compatibility-table"><thead><tr><th>↓ / →</th>';
    for (let j = 0; j < n; j++) {
      const classes = getPlayerClasses(j);
      html += `<th><span class="avatar-circle" style="background: var(${classes.bgVar}); color: var(${classes.colorVar}); border-color: var(${classes.colorVar});">${classes.avatar}</span> ${escapeHtml(players[j].name)}</th>`;
    }
    html += '</tr></thead><tbody>';

    for (let i = 0; i < n; i++) {
      const classes = getPlayerClasses(i);
      html += `<tr><td><span class="avatar-circle" style="background: var(${classes.bgVar}); color: var(${classes.colorVar}); border-color: var(${classes.colorVar});">${classes.avatar}</span> ${escapeHtml(players[i].name)}</td>`;
      for (let j = 0; j < n; j++) {
        const comp = gameState.compatibilityMatrix?.[i]?.[j]; if (!comp) continue;
        let cellClass = "compat-cell";
        if (i === j) cellClass += " self"; else if (comp.percent >= 70) cellClass += " high"; else if (comp.percent >= 40) cellClass += " medium"; else cellClass += " low";
        html += `<td class="${cellClass}">${comp.percent}%</td>`;
      }
      html += '</tr>';
    }
    html += '</tbody></table>'; matrix.innerHTML = html;
  } catch (err) { console.error("Error matriks:", err); }
}

function animateResultCards() {
  const cards = elements.resultsGrid.querySelectorAll(".player-result-card");
  cards.forEach((card, idx) => { card.classList.remove("card-reveal"); void card.offsetWidth; setTimeout(() => card.classList.add("card-reveal"), idx * 150); });
}

function animateScoreCounter(start, end, duration = 1200) {
  const el = document.getElementById("compatibility-score"); if (!el) return;
  const startTime = performance.now();
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime; const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); const currentVal = Math.round(start + (end - start) * easeProgress);
    el.textContent = `${currentVal}%`;
    if (progress < 1) requestAnimationFrame(updateCounter); else el.textContent = `${end}%`;
  }
  requestAnimationFrame(updateCounter);
}

function renderBreakdownList() {
  elements.breakdownList.innerHTML = ""; const players = gameState.players;
  activeQuestions.forEach((q, idx) => {
    const item = document.createElement("div"); item.className = "breakdown-item";
    let answersHtml = "";
    players.forEach((p, pIdx) => {
      const ans = p.answers[idx]; const ansText = ans === "A" ? q.a.text : q.b.text;
      const classes = getPlayerClasses(pIdx);
      answersHtml += `<span class="breakdown-ans ${classes.ansClass}">${escapeHtml(p.name)}: ${ans} (${escapeHtml(ansText)})</span>`;
    });
    item.innerHTML = `<span class="breakdown-q-number">Soal #${idx + 1} &bull; ${escapeHtml(q.category)}</span><p class="breakdown-q-text">${escapeHtml(q.prompt)}</p><div class="breakdown-answers">${answersHtml}</div>`;
    elements.breakdownList.appendChild(item);
  });
}

// ==========================================
// 9. SHARE WHATSAPP & LOCALSTORAGE
// ==========================================
function shareToWhatsApp() {
  const players = gameState.players; const results = gameState.results; const matrix = gameState.compatibilityMatrix;
  if (!results.length) return;
  const textLines = [`✨ *HASIL KUIS WOULD YOU RATHER* ✨`, `👥 ${players.length} Pemain • v${APP_VERSION}`, `--------------------------------------`];
  
  players.forEach((p, idx) => {
    const res = results[idx]; const classes = getPlayerClasses(idx);
    textLines.push(`${classes.avatar} *${escapeHtml(p.name)}*:`, `👉 ${escapeHtml(res.title)}`, `📊 Pilihan: ${res.countA} A | ${res.countB} B`, ``);
  });

  if (players.length === 2) {
    const comp = matrix[0][1]; textLines.push(`🧠 *Tingkat Kecocokan:* ${comp.percent}%!`, `--------------------------------------`);
  } else {
    textLines.push(`🧠 *Matriks Kecocokan:*`);
    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) { textLines.push(`${players[i].name} ↔ ${players[j].name}: ${matrix[i][j].percent}%`); }
    }
    textLines.push(`--------------------------------------`);
  }
  textLines.push(`Mainkan kuisnya sekarang!`);
  window.open(`https://wa.me/?text=${encodeURIComponent(textLines.join("\n"))}`, "_blank", "noopener,noreferrer");
}

const HISTORY_STORAGE_KEY = "wyr_kuis_history_v2";
function saveGameToHistory() {
  try {
    const existing = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || [];
    const newRecord = {
      id: Date.now(), date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      version: APP_VERSION, playerCount: gameState.players.length,
      players: gameState.players.map((p, i) => ({ name: p.name, avatar: getPlayerClasses(i).avatar, title: gameState.results[i].title, countA: gameState.results[i].countA, countB: gameState.results[i].countB })),
      compatibility: gameState.players.length === 2 ? gameState.compatibilityMatrix[0][1].percent : gameState.compatibilityMatrix.flat().filter(c => c.percent < 100).reduce((a, b) => a + b.percent, 0) / (gameState.players.length * (gameState.players.length - 1))
    };
    existing.unshift(newRecord); if (existing.length > 10) existing.pop(); localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {}
}

function openHistoryModal() {
  try {
    const records = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || []; elements.historyContent.innerHTML = "";
    if (records.length === 0) {
      elements.historyContent.innerHTML = `<div class="history-empty"><p>Belum ada riwayat.</p></div>`;
    } else {
      records.forEach((rec) => {
        const item = document.createElement("div"); item.className = "history-item";
        let playersHtml = "";
        if (rec.players) rec.players.forEach((p) => { playersHtml += `<div>${p.avatar} ${escapeHtml(p.name)}: <em>${escapeHtml(p.title)}</em></div>`; });
        item.innerHTML = `<div class="history-date">📅 ${rec.date} &bull; v${rec.version} &bull; ${rec.playerCount}P</div><div class="history-results">${playersHtml}</div>`;
        elements.historyContent.appendChild(item);
      });
    }
    elements.historyModal.classList.remove("hidden");
  } catch (err) {}
}

function closeHistoryModal() { elements.historyModal.classList.add("hidden"); }
function clearAllHistory() { if (confirm("Hapus seluruh riwayat?")) { localStorage.removeItem(HISTORY_STORAGE_KEY); openHistoryModal(); } }

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function (m) {
    switch (m) {
      case '&': return '&amp;'; case '<': return '&lt;'; case '>': return '&gt;'; case '"': return '&quot;'; default: return '&#039;';
    }
  });
}

// ==========================================
// 10. TEMA & SOUND & CONFETTI
// ==========================================
const THEME_STORAGE_KEY = "wyr_theme_preference";
function initTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved) applyTheme(saved); else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) applyTheme("dark"); else applyTheme("light");
}
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme); localStorage.setItem(THEME_STORAGE_KEY, theme);
  elements.themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  const metaTheme = document.querySelector('meta[name="theme-color"]'); if (metaTheme) metaTheme.setAttribute("content", theme === "dark" ? "#000000" : "#FFFFFF");
}
function toggleTheme() { applyTheme((document.documentElement.getAttribute("data-theme") || "light") === "dark" ? "light" : "dark"); SoundFX.playPop(580); }

const SoundFX = {
  ctx: null, enabled: true,
  init() { const saved = localStorage.getItem("wyr_sound_enabled"); this.enabled = saved !== null ? saved === "true" : true; this.updateToggleIcon(); },
  getContext() { if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); if (this.ctx && this.ctx.state === "suspended") this.ctx.resume(); return this.ctx; },
  toggle() { this.enabled = !this.enabled; localStorage.setItem("wyr_sound_enabled", this.enabled); this.updateToggleIcon(); if (this.enabled) this.playPop(560); },
  updateToggleIcon() { if (elements.soundToggle) elements.soundToggle.textContent = this.enabled ? "🔊" : "🔇"; },
  playPop(freq = 480) { if (!this.enabled) return; try { const ctx = this.getContext(); if (!ctx) return; const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = "sine"; osc.frequency.setValueAtTime(freq, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(freq * 1.4, ctx.currentTime + 0.08); gain.gain.setValueAtTime(0.12, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12); osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.12); } catch (_) {} },
  playWhoosh() { if (!this.enabled) return; try { const ctx = this.getContext(); if (!ctx) return; const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = "triangle"; osc.frequency.setValueAtTime(280, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.14); gain.gain.setValueAtTime(0.08, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16); osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.16); } catch (_) {} },
  playFanfare() { if (!this.enabled) return; try { const ctx = this.getContext(); if (!ctx) return; [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => { const time = ctx.currentTime + idx * 0.12; const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = "triangle"; osc.frequency.setValueAtTime(freq, time); gain.gain.setValueAtTime(0.14, time); gain.gain.exponentialRampToValueAtTime(0.001, time + 0.38); osc.connect(gain); gain.connect(ctx.destination); osc.start(time); osc.stop(time + 0.38); }); } catch (_) {} }
};

function initAmbientParticles() {
  const container = elements.ambientParticles; if (!container) return; container.innerHTML = "";
  const symbols = ["✦", "✧", "⋆", "◦", "○", "△", "□"]; // Premium geometric shapes
  const particleCount = window.innerWidth < 600 ? 14 : 22;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("span"); p.className = "floating-particle"; p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = (Math.random() * 94 + 3).toFixed(1) + "%"; p.style.fontSize = (Math.random() * 0.7 + 0.85).toFixed(2) + "rem";
    p.style.setProperty("--drift-duration", (Math.random() * 8 + 14).toFixed(1) + "s"); p.style.animationDelay = (Math.random() * -20).toFixed(1) + "s";
    p.style.setProperty("--sway-x", (Math.random() * 60 - 30).toFixed(0) + "px"); p.style.setProperty("--particle-max-opacity", (Math.random() * 0.35 + 0.25).toFixed(2));
    container.appendChild(p);
  }
}

let confettiAnimationId = null;
function startConfetti(duration = 3000) {
  const canvas = elements.confettiCanvas; if (!canvas) return;
  const ctx = canvas.getContext("2d"); let width = (canvas.width = window.innerWidth); let height = (canvas.height = window.innerHeight);
  window.addEventListener("resize", () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });
  const colors = ["#6366F1", "#06B6D4", "#EC4899", "#FBBF24", "#8B5CF6", "#10B981"];
  const particles = [];
  for (let i = 0; i < 100; i++) particles.push({ x: Math.random() * width, y: Math.random() * height - height, size: Math.random() * 8 + 6, color: colors[Math.floor(Math.random() * colors.length)], speedY: Math.random() * 3.5 + 2, speedX: (Math.random() - 0.5) * 3.5, rotation: Math.random() * 360, rotSpeed: (Math.random() - 0.5) * 7, shape: Math.random() > 0.4 ? "rect" : "circle", opacity: 1 });
  const startTime = Date.now(); if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
  function render() {
    const elapsed = Date.now() - startTime; ctx.clearRect(0, 0, width, height); let stillActive = false;
    particles.forEach((p) => {
      p.y += p.speedY; p.x += p.speedX; p.rotation += p.rotSpeed;
      if (elapsed > duration * 0.6) p.opacity = Math.max(0, 1 - (elapsed - duration * 0.6) / (duration * 0.4));
      if (p.y < height && p.opacity > 0) stillActive = true;
      ctx.save(); ctx.globalAlpha = p.opacity; ctx.translate(p.x, p.y); ctx.rotate((p.rotation * Math.PI) / 180); ctx.fillStyle = p.color;
      if (p.shape === "circle") { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
      else { ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.75); }
      ctx.restore();
    });
    if (elapsed < duration && stillActive) confettiAnimationId = requestAnimationFrame(render);
    else { ctx.clearRect(0, 0, width, height); confettiAnimationId = null; }
  }
  render();
}

// ==========================================
// 11. INITIALIZATION
// ==========================================
function setupEventListeners() {
  elements.startGameBtn.addEventListener("click", () => { SoundFX.playPop(520); initGame(); });
  elements.intermissionContinueBtn.addEventListener("click", () => { SoundFX.playPop(580); continueToNextPlayer(); });
  elements.choiceABtn.addEventListener("click", () => handleChoice("A"));
  elements.choiceBBtn.addEventListener("click", () => handleChoice("B"));
  elements.shareWaBtn.addEventListener("click", () => { SoundFX.playPop(600); shareToWhatsApp(); });
  elements.restartGameBtn.addEventListener("click", () => { SoundFX.playPop(520); restartGame(); });
  elements.viewAnswersBtn.addEventListener("click", () => { SoundFX.playPop(560); toggleBreakdown(); });
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.soundToggle.addEventListener("click", () => SoundFX.toggle());
  elements.historyBtn.addEventListener("click", openHistoryModal);
  elements.closeHistoryBtn.addEventListener("click", closeHistoryModal);
  elements.closeModalFooterBtn.addEventListener("click", closeHistoryModal);
  elements.clearHistoryBtn.addEventListener("click", clearAllHistory);
  elements.historyModal.addEventListener("click", (e) => { if (e.target === elements.historyModal) closeHistoryModal(); });
  document.addEventListener("keydown", (e) => {
    if (elements.gameScreen.classList.contains("active") && !gameState.isTransitioning) {
      if (e.key === "1" || e.key.toLowerCase() === "a") handleChoice("A");
      if (e.key === "2" || e.key.toLowerCase() === "b") handleChoice("B");
    }
    if (e.key === "Escape") closeHistoryModal();
    if (e.key === " " && elements.intermissionScreen.classList.contains("active")) { e.preventDefault(); continueToNextPlayer(); }
  });
  initPlayerCountSelector();
  if (elements.footerVersion) elements.footerVersion.textContent = APP_VERSION;
}

function restartGame() {
  gameState.gameEnded = false; gameState.isTransitioning = false;
  playerNameInputs.forEach((input, i) => { input.value = getPlayerConfig(i).defaultName; });
  selectPlayerCount(2); switchScreen(elements.startScreen);
}

function toggleBreakdown() {
  const isHidden = elements.breakdownSection.classList.contains("hidden");
  elements.breakdownSection.classList.toggle("hidden", !isHidden);
  elements.viewAnswersBtn.querySelector("span").textContent = isHidden ? "Sembunyikan Jawaban" : "Lihat Detail Jawaban";
}

function init() {
  elements.startScreen = document.getElementById("start-screen"); elements.intermissionScreen = document.getElementById("intermission-screen");
  elements.gameScreen = document.getElementById("game-screen"); elements.resultScreen = document.getElementById("result-screen");
  elements.playerCountSelector = document.getElementById("player-count-selector"); elements.playerCountBadge = document.getElementById("player-count-badge");
  elements.playerInputsContainer = document.getElementById("player-inputs-container"); elements.startGameBtn = document.getElementById("start-game-btn");
  elements.intermissionTitle = document.getElementById("intermission-title"); elements.intermissionDesc = document.getElementById("intermission-desc");
  elements.nextPlayerName = document.getElementById("next-player-name"); elements.intermissionContinueBtn = document.getElementById("intermission-continue-btn");
  elements.intermissionProgress = document.getElementById("intermission-progress"); elements.completedCount = document.getElementById("completed-count");
  elements.totalPlayers = document.getElementById("total-players"); elements.intermissionProgressBar = document.getElementById("intermission-progress-bar");
  elements.turnBadge = document.getElementById("turn-badge"); elements.currentPlayerAvatar = document.getElementById("current-player-avatar");
  elements.currentPlayerName = document.getElementById("current-player-name"); elements.questionProgressText = document.getElementById("question-progress-text");
  elements.progressBar = document.getElementById("progress-bar"); elements.questionCard = document.getElementById("question-card");
  elements.questionCategory = document.getElementById("question-category"); elements.questionPrompt = document.getElementById("question-prompt");
  elements.choiceABtn = document.getElementById("choice-a-btn"); elements.choiceBBtn = document.getElementById("choice-b-btn");
  elements.choiceAEmoji = document.getElementById("choice-a-emoji"); elements.choiceAText = document.getElementById("choice-a-text");
  elements.choiceBEmoji = document.getElementById("choice-b-emoji"); elements.choiceBText = document.getElementById("choice-b-text");
  elements.resultsGrid = document.getElementById("results-grid"); elements.compatibilityMatrixSection = document.getElementById("compatibility-matrix-section");
  elements.compatibilityMatrix = document.getElementById("compatibility-matrix"); elements.shareWaBtn = document.getElementById("share-wa-btn");
  elements.restartGameBtn = document.getElementById("restart-game-btn"); elements.viewAnswersBtn = document.getElementById("view-answers-btn");
  elements.breakdownSection = document.getElementById("breakdown-section"); elements.breakdownList = document.getElementById("breakdown-list");
  elements.themeToggle = document.getElementById("theme-toggle"); elements.soundToggle = document.getElementById("sound-toggle");
  elements.ambientParticles = document.getElementById("ambient-particles"); elements.historyBtn = document.getElementById("history-btn");
  elements.historyModal = document.getElementById("history-modal"); elements.closeHistoryBtn = document.getElementById("close-history-btn");
  elements.closeModalFooterBtn = document.getElementById("close-modal-footer-btn"); elements.historyContent = document.getElementById("history-content");
  elements.clearHistoryBtn = document.getElementById("clear-history-btn"); elements.confettiCanvas = document.getElementById("confetti-canvas");
  elements.footerVersion = document.getElementById("footer-version");

  if (elements.footerVersion) elements.footerVersion.textContent = APP_VERSION;
  initTheme(); SoundFX.init(); initAmbientParticles(); setupEventListeners(); renderPlayerInputs(2);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();