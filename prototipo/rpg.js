// ================================================================
// SUSAssist RPG — rpg.js
// Jogo educativo: mapa canvas + diálogos + quiz clínico + XP/badges
// ================================================================

'use strict';

// ----------------------------------------------------------------
// DADOS DAS MISSÕES (casos clínicos reais)
// ----------------------------------------------------------------
const MISSIONS = [
  {
    id: 1,
    patient: {
      name: 'Dona Maria',
      age: 72,
      avatar: '👵',
      condition: 'Pós-AVC Isquêmico · Pé Caído à Esquerda',
      room: 'Consultório 1',
      missionLabel: 'MISSÃO 1',
      dialogLines: [
        'Bom dia, doutor(a). Tive um AVC há 6 meses e meu pé esquerdo ficou "caído"...',
        'Estou fazendo fisioterapia na UBS, mas quando tento caminhar, a ponta do meu pé esquerdo raspa no chão e tenho medo de cair.',
        'O fisioterapeuta disse que uma órtese pode ajudar na estabilização do meu tornozelo durante o treino de marcha. O que o senhor(a) recomenda?'
      ],
      evaHint: 'Dona Maria apresenta fraqueza nos dorsiflexores do tornozelo (pé caído) pós-AVC. A prescrição de uma Órtese Tornozelo-Pé (AFO) alinhada a 90° estabiliza o tornozelo na fase de balanço e previne o arrasto do pé.',
      question: 'Qual a conduta e recurso de Tecnologia Assistiva mais adequado para auxiliar Dona Maria no treino de marcha na UBS?',
      options: [
        { text: 'Prescrever Órtese Tornozelo-Pé (AFO) alinhada a 90° e orientar uso com calçado fechado adequado', correct: true, feedback: 'Excelente decisão clínica! A AFO mantém o tornozelo em posição funcional a 90°, evita o arrasto do pé na marcha e reduz significativamente o risco de quedas.' },
        { text: 'Recomendar apenas uso de bengala simples sem órtese de tornozelo', correct: false, feedback: 'Incorreto. A bengala simples não corrige o déficit de dorsiflexão nem estabiliza a articulação do tornozelo no pé caído.' },
        { text: 'Recomendar repouso prolongado no leito sem intervenção ortótica', correct: false, feedback: 'Incorreto. O repouso prolongado favorece a atrofia muscular e o encurtamento do tríceps sural.' },
        { text: 'Imobilizar todo o membro inferior com gesso rígido por 6 meses', correct: false, feedback: 'Incorreto. A imobilização gessada sem indicação cirúrgica gera rigidez articular permanente e perda funcional.' }
      ],
      badge: { name: 'Especialista em Marcha', icon: '🏆', desc: 'Prescreveu a Órtese AFO com precisão, estabilizando o tornozelo e garantindo marcha segura pós-AVC.' },
      xp: 150,
      canvasPos: { xFrac: 0.8, yFrac: 0.28 }
    }
  },
  {
    id: 2,
    patient: {
      name: 'Lucas',
      age: 8,
      avatar: '👦',
      condition: 'Paralisia Cerebral Espástica · Diplegia',
      room: 'Consultório 2',
      missionLabel: 'MISSÃO 2',
      dialogLines: [
        'Oi, doutor! A minha mãe disse que você pode me ajudar a andar melhor...',
        'Ela diz que eu ando na ponta dos pés e caio bastante. Minhas pernas ficam duras.',
        'Na escola, tenho dificuldade nas atividades físicas. Posso melhorar?'
      ],
      evaHint: 'Lucas tem PC espástica, diplegia. A marcha digitígrada (ponta dos pés) bilateral é a principal queixa funcional. Indicação primária: órtese AFO rígida bilateral para posicionamento do pé + encaminhamento ao CER para fisioterapia especializada (Bobath, Therasuit).',
      question: 'Qual a conduta mais adequada para Lucas no SUS?',
      options: [
        { text: 'AFO bilateral rígida + encaminhar ao CER para reabilitação especializada', correct: true, feedback: 'Perfeito! A AFO rígida bilateral corrige a marcha digitígrada e o CER oferecerá fisioterapia em neurodesenvolvimento, fundamental para o progresso funcional de Lucas.' },
        { text: 'Cadeira de rodas motorizada como solução principal', correct: false, feedback: 'Lucas tem capacidade de marcha funcional. A cadeira motorizada restringiria seu desenvolvimento motor e não é indicada como primeira linha para diplegia com marcha preservada.' },
        { text: 'KAFO (joelho-tornozelo-pé) unilateral direito', correct: false, feedback: 'A diplegia afeta ambos os membros inferiores. Intervir unilateralmente criará desequilíbrio pélvico e não resolverá o padrão de marcha.' },
        { text: 'Apenas fisioterapia domiciliar, sem órtese por enquanto', correct: false, feedback: 'A fisioterapia isolada sem órtese é insuficiente. A AFO é fundamental para manter o posicionamento correto do pé e prevenir contraturas irreversíveis.' }
      ],
      badge: { name: 'Especialista Infantil', icon: '⭐', desc: 'Indicou corretamente a AFO bilateral e o encaminhamento ao CER para paralisia cerebral espástica.' },
      xp: 200,
      canvasPos: { xFrac: 0.8, yFrac: 0.68 }
    }
  },
  {
    id: 3,
    patient: {
      name: 'Roberto',
      age: 45,
      avatar: '👨',
      condition: 'Amputação Transtibial D. · Pós-op 2m',
      room: 'Corredor',
      missionLabel: 'MISSÃO 3',
      dialogLines: [
        'Doutor, perdi minha perna direita abaixo do joelho num acidente de trabalho, faz 2 meses.',
        'A ferida já fechou, mas ainda não tenho nenhuma prótese. Estou usando muletas.',
        'O que posso fazer pelo SUS? Tem como conseguir uma prótese?'
      ],
      evaHint: 'Roberto é amputado transtibial em fase pós-operatória tardia. O coto ainda está em processo de maturação. A conduta correta é encaminhar ao CER para: avaliação do coto, moldagem, prescrição da prótese provisória e início do treino de marcha. A prótese definitiva vem após essa etapa.',
      question: 'Qual o primeiro e mais importante passo para Roberto no SUS?',
      options: [
        { text: 'Prescrever a prótese definitiva imediatamente', correct: false, feedback: 'A prótese definitiva não pode ser prescrita sem avaliação do coto. Prescrevê-la prematuramente resultará em mau ajuste e abandono do equipamento — um dos maiores problemas no SUS.' },
        { text: 'Encaminhar ao CER para avaliação, moldagem e prótese provisória', correct: true, feedback: 'Correto! O CER avaliará o coto, fará a moldagem, prescreverá a prótese provisória e iniciará o treino de marcha. Só então a prótese definitiva será indicada — este é o fluxo correto no SUS.' },
        { text: 'Prescrever cadeira de rodas como solução permanente', correct: false, feedback: 'A cadeira pode ser útil temporariamente, mas não é o objetivo. Roberto tem potencial funcional completo com prótese transtibial. Adotar a cadeira como permanente limitaria sua autonomia desnecessariamente.' },
        { text: 'Orientar uso de muletas por mais 6 meses e reavaliação', correct: false, feedback: 'Adiar o encaminhamento ao CER prejudica a reabilitação. A preparação do coto e o início do treino com prótese provisória devem começar o quanto antes para melhores resultados.' }
      ],
      badge: { name: 'Mestre do Fluxo SUS', icon: '🎯', desc: 'Domina o fluxo de encaminhamento e reabilitação para pacientes amputados no SUS.' },
      xp: 250,
      canvasPos: { xFrac: 0.47, yFrac: 0.72 }
    }
  }
];

// ----------------------------------------------------------------
// ESTADO DO JOGO
// ----------------------------------------------------------------
const state = {
  xp: 0,
  level: 1,
  completedMissions: new Set(),
  currentMission: null,
  dialogIndex: 0,
  selectedOption: null,
  earnedBadges: [],
  phase: 'intro' // 'intro' | 'map' | 'dialog' | 'quiz' | 'badge' | 'victory'
};

// ----------------------------------------------------------------
// CANVAS + CONTEXTO
// ----------------------------------------------------------------
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  if (state.phase === 'map') drawMap();
}

window.addEventListener('resize', resize);

// ----------------------------------------------------------------
// UTILITÁRIOS
// ----------------------------------------------------------------
function $(id) { return document.getElementById(id); }
function show(id) { $(id).classList.remove('hidden'); }
function hide(id) { $(id).classList.add('hidden'); }
function setText(id, text) { $(id).textContent = text; }

// ----------------------------------------------------------------
// INTRO: animação de partículas e texto
// ----------------------------------------------------------------
function initIntro() {
  createIntroParticles();
  animateNarrativeLines();
}

function createIntroParticles() {
  const container = $('intro-particles');
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'intro-particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      animation-duration: ${Math.random() * 12 + 6}s;
      animation-delay: ${Math.random() * 8}s;
      opacity: ${Math.random() * 0.7 + 0.1};
    `;
    container.appendChild(p);
  }
}

function animateNarrativeLines() {
  const lines = [1, 2, 3, 4, 5];
  lines.forEach((n, i) => {
    setTimeout(() => {
      const el = $(`narrative-line-${n}`);
      if (el) el.style.opacity = '1';
    }, 600 + i * 700);
  });
  setTimeout(() => {
    show('btn-start-game');
    $('btn-start-game').classList.remove('hidden');
  }, 600 + lines.length * 700 + 300);
}

$('btn-start-game').addEventListener('click', startGame);

// ----------------------------------------------------------------
// INICIAR JOGO
// ----------------------------------------------------------------
function startGame() {
  const intro = $('intro-screen');
  intro.style.transition = 'opacity 0.6s ease';
  intro.style.opacity = '0';
  setTimeout(() => {
    intro.style.display = 'none';
    state.phase = 'map';
    resize();
    show('game-hud');
    show('map-hint');
    updateHUD();
    startMapPulse();
  }, 600);
}

// ----------------------------------------------------------------
// MAPA DA UBS (Canvas 2D)
// ----------------------------------------------------------------
function drawMap() {
  if (!W || !H) return;
  const TOP = 60; // HUD height
  const mapH = H - TOP;

  // === FUNDO GERAL (corredor) ===
  ctx.fillStyle = '#c8b89a';
  ctx.fillRect(0, TOP, W, mapH);

  // === GRADE DE PISO (corredor) ===
  ctx.strokeStyle = 'rgba(0,0,0,0.06)';
  ctx.lineWidth = 1;
  const tileSize = 40;
  for (let x = 0; x < W; x += tileSize) {
    ctx.beginPath(); ctx.moveTo(x, TOP); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = TOP; y < H; y += tileSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // === RECEPÇÃO (esquerda) ===
  const recW = W * 0.24;
  const recH = mapH * 0.42;
  drawRoom(0, TOP, recW, recH, '#f0e8d8', '#c8a878', 'RECEPÇÃO');

  // Balcão de recepção
  ctx.fillStyle = '#b08050';
  ctx.fillRect(20, TOP + 20, recW - 40, 40);
  ctx.fillStyle = '#8b6035';
  ctx.fillRect(20, TOP + 55, recW - 40, 8);
  // Computador
  drawComputer(recW / 2 - 10, TOP + 18);
  // Cadeira da recepcionista
  drawChair(recW * 0.5 - 10, TOP + 72);

  // === SALA DE ESPERA (esquerda, baixo) ===
  const waitY = TOP + recH + 12;
  const waitH = mapH - recH - 24;
  drawRoom(0, waitY, recW, waitH, '#f5ede0', '#c8a878', 'SALA DE ESPERA');

  // Cadeiras de espera
  for (let i = 0; i < 3; i++) {
    drawChair(28 + i * 52, waitY + 40, '#9ab8d8');
  }
  // Planta decorativa
  drawPlant(recW - 36, waitY + waitH - 60);
  // Sinalização
  drawSign(recW / 2, waitY + waitH / 2, '👥 Aguarde');

  // === CONSULTÓRIO 1 (direita, cima) ===
  const consulX = W * 0.72;
  const consulW = W - consulX;
  const consul1H = mapH * 0.44;
  drawRoom(consulX, TOP, consulW, consul1H, '#e8f0e8', '#6a9a6a', 'CONSULTÓRIO 1');

  // Mobiliário consultório
  ctx.fillStyle = '#7a9a5a';
  ctx.fillRect(consulX + 16, TOP + 16, consulW - 32, 36); // Mesa
  ctx.fillStyle = '#5a7a3a';
  ctx.fillRect(consulX + 16, TOP + 48, consulW - 32, 6);
  drawComputer(consulX + consulW / 2 - 10, TOP + 12);
  // Maca
  ctx.fillStyle = '#c8e0c8';
  ctx.fillRect(consulX + 20, TOP + consul1H - 70, consulW - 40, 52);
  ctx.fillStyle = '#a0c0a0';
  ctx.fillRect(consulX + 20, TOP + consul1H - 70, 20, 52); // Travesseiro

  // === CONSULTÓRIO 2 (direita, baixo) ===
  const consul2Y = TOP + consul1H + 12;
  const consul2H = mapH - consul1H - 24;
  drawRoom(consulX, consul2Y, consulW, consul2H, '#e8e0f5', '#7a6aaa', 'CONSULTÓRIO 2');

  // Mobiliário
  ctx.fillStyle = '#8a7abb';
  ctx.fillRect(consulX + 16, consul2Y + 16, consulW - 32, 36);
  ctx.fillStyle = '#6a5a9a';
  ctx.fillRect(consulX + 16, consul2Y + 48, consulW - 32, 6);
  drawComputer(consulX + consulW / 2 - 10, consul2Y + 12);
  // Maca
  ctx.fillStyle = '#d0c8f0';
  ctx.fillRect(consulX + 20, consul2Y + consul2H - 70, consulW - 40, 52);
  ctx.fillStyle = '#b0a0d8';
  ctx.fillRect(consulX + 20, consul2Y + consul2H - 70, 20, 52);

  // === CORREDOR CENTRAL (sinalização) ===
  const corrX = recW + 8;
  const corrW = consulX - recW - 16;
  // Linha central do corredor
  ctx.setLineDash([20, 10]);
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(corrX + corrW / 2, TOP + 20);
  ctx.lineTo(corrX + corrW / 2, H - 20);
  ctx.stroke();
  ctx.setLineDash([]);

  // Sinalização do corredor
  drawSign(corrX + corrW / 2, TOP + mapH * 0.2, '🏥 UBS Resolve Santana (SJC)');
  drawSign(corrX + corrW / 2, TOP + mapH * 0.55, '⬆ Consultórios');

  // Planta no corredor
  drawPlant(corrX + 20, H - 80);
  drawPlant(consulX - 50, H - 80);

  // === PACIENTES ===
  MISSIONS.forEach(m => {
    const p = m.patient;
    const px = W * p.canvasPos.xFrac;
    const py = H * p.canvasPos.yFrac;
    const done = state.completedMissions.has(m.id);
    drawPatient(px, py, p.avatar, p.name, done, m.id);
  });

  // === MAPA LEGENDA ===
  drawLegend();
}

function drawRoom(x, y, w, h, floorColor, borderColor, label) {
  // Sombra
  ctx.shadowColor = 'rgba(0,0,0,0.2)';
  ctx.shadowBlur = 12;
  ctx.fillStyle = floorColor;
  ctx.fillRect(x, y, w, h);
  ctx.shadowBlur = 0;

  // Borda
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);

  // Piso texturizado
  ctx.strokeStyle = 'rgba(0,0,0,0.04)';
  ctx.lineWidth = 1;
  for (let tx = x + 20; tx < x + w; tx += 20) {
    ctx.beginPath(); ctx.moveTo(tx, y); ctx.lineTo(tx, y + h); ctx.stroke();
  }
  for (let ty = y + 20; ty < y + h; ty += 20) {
    ctx.beginPath(); ctx.moveTo(x, ty); ctx.lineTo(x + w, ty); ctx.stroke();
  }

  // Label da sala
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.font = `bold 11px 'Inter', sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(label, x + w / 2, y + 12);
}

function drawComputer(x, y) {
  ctx.fillStyle = '#333';
  ctx.fillRect(x, y, 20, 14);
  ctx.fillStyle = '#555';
  ctx.fillRect(x + 1, y + 1, 18, 12);
  ctx.fillStyle = '#7af';
  ctx.fillRect(x + 2, y + 2, 16, 10);
  ctx.fillStyle = '#444';
  ctx.fillRect(x + 8, y + 14, 4, 4);
  ctx.fillRect(x + 4, y + 18, 12, 2);
}

function drawChair(x, y, color = '#a08060') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 36, 28);
  ctx.fillStyle = '#8a6a48';
  ctx.fillRect(x - 2, y + 28, 5, 14);
  ctx.fillRect(x + 33, y + 28, 5, 14);
}

function drawPlant(x, y) {
  ctx.fillStyle = '#5a8a5a';
  ctx.beginPath();
  ctx.arc(x, y - 20, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#4a7a4a';
  ctx.beginPath();
  ctx.arc(x - 10, y - 30, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + 12, y - 28, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#8b5e3c';
  ctx.fillRect(x - 10, y - 5, 20, 24);
}

function drawSign(x, y, text) {
  ctx.fillStyle = 'rgba(0,79,159,0.85)';
  const w = ctx.measureText(text).width + 24;
  ctx.fillRect(x - w / 2, y - 14, w, 28);
  ctx.fillStyle = '#fff';
  ctx.font = `600 11px 'Inter', sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y + 5);
}

function drawLegend() {
  const lx = 30, ly = H - 70;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(lx - 10, ly - 10, 200, 65);
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.font = `bold 11px 'Inter', sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('🟠 Paciente aguardando', lx, ly + 8);
  ctx.fillText('✅ Missão concluída', lx, ly + 28);
  ctx.fillText('👆 Clique para interagir', lx, ly + 48);
}

// ----------------------------------------------------------------
// PERSONAGENS PACIENTES (canvas)
// ----------------------------------------------------------------
const pulseOffset = { value: 0 };
let pulseAnimFrame;

function startMapPulse() {
  function animate() {
    if (state.phase !== 'map') return;
    pulseOffset.value = (pulseOffset.value + 0.06) % (Math.PI * 2);
    drawMap();
    pulseAnimFrame = requestAnimationFrame(animate);
  }
  animate();
}

function drawPatient(x, y, avatar, name, done, missionId) {
  const radius = 30;
  const pulse = done ? 0 : Math.sin(pulseOffset.value + missionId) * 6;

  // Sombra
  ctx.shadowColor = done ? 'rgba(39,174,96,0.4)' : 'rgba(245,166,35,0.5)';
  ctx.shadowBlur = 20 + pulse;

  // Círculo de fundo
  ctx.beginPath();
  ctx.arc(x, y, radius + pulse * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = done ? '#27ae60' : '#f5a623';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius - 2 + pulse * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = done ? '#2ecc71' : '#fff';
  ctx.fill();

  ctx.shadowBlur = 0;

  // Avatar emoji
  ctx.font = done ? `${radius * 1.0}px serif` : `${radius * 1.1}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(done ? '✅' : avatar, x, y);
  ctx.textBaseline = 'alphabetic';

  // Nome
  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  ctx.font = `bold 12px 'Inter', sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(name, x, y + radius + 14);

  // Indicador de missão (! pulsante)
  if (!done) {
    const badgeX = x + radius;
    const badgeY = y - radius - 4 + pulse * 0.3;
    ctx.beginPath();
    ctx.arc(badgeX, badgeY, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = `bold 14px 'Inter', sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('!', badgeX, badgeY + 5);
  }
}

// ----------------------------------------------------------------
// CLIQUES NO MAPA
// ----------------------------------------------------------------
canvas.addEventListener('click', (e) => {
  if (state.phase !== 'map') return;
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  MISSIONS.forEach(m => {
    if (state.completedMissions.has(m.id)) return;
    const px = W * m.patient.canvasPos.xFrac;
    const py = H * m.patient.canvasPos.yFrac;
    const dist = Math.hypot(mx - px, my - py);
    if (dist < 50) {
      openDialog(m);
    }
  });
});

canvas.addEventListener('mousemove', (e) => {
  if (state.phase !== 'map') return;
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  let hovering = false;
  MISSIONS.forEach(m => {
    if (state.completedMissions.has(m.id)) return;
    const px = W * m.patient.canvasPos.xFrac;
    const py = H * m.patient.canvasPos.yFrac;
    if (Math.hypot(mx - px, my - py) < 50) hovering = true;
  });
  canvas.style.cursor = hovering ? 'pointer' : 'default';
});

// ----------------------------------------------------------------
// SISTEMA DE DIÁLOGO
// ----------------------------------------------------------------
function openDialog(mission) {
  state.phase = 'dialog';
  state.currentMission = mission;
  state.dialogIndex = 0;
  cancelAnimationFrame(pulseAnimFrame);
  hide('map-hint');

  const p = mission.patient;
  setText('dialog-patient-name', p.name);
  setText('dialog-patient-meta', `${p.age} anos · ${p.condition}`);
  setText('dialog-mission-tag', p.missionLabel);
  $('dialog-patient-avatar').textContent = p.avatar;
  hide('dialog-eva-hint');

  buildProgressDots(p.dialogLines.length + 1); // +1 for EVA hint
  showDialogLine();
  show('dialog-overlay');
}

function buildProgressDots(count) {
  const container = $('dialog-progress-dots');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'dialog-dot' + (i === 0 ? ' active' : '');
    dot.id = `dlg-dot-${i}`;
    container.appendChild(dot);
  }
}

function updateDialogDots(index, total) {
  for (let i = 0; i < total; i++) {
    const dot = $(`dlg-dot-${i}`);
    if (!dot) continue;
    dot.className = 'dialog-dot' +
      (i < index ? ' past' : '') +
      (i === index ? ' active' : '');
  }
}

function showDialogLine() {
  const p = state.currentMission.patient;
  const total = p.dialogLines.length;

  if (state.dialogIndex < total) {
    // Mostrar linha de diálogo do paciente
    hide('dialog-eva-hint');
    animateText('dialog-text', p.dialogLines[state.dialogIndex]);
    setText('btn-dialog-next', state.dialogIndex < total - 1 ? 'Continuar →' : 'Ver dica da E.V.A. →');
    updateDialogDots(state.dialogIndex, total + 1);
  } else {
    // Mostrar dica da E.V.A.
    setText('dialog-text', 'Com base na história clínica, veja minha análise:');
    setText('eva-hint-text', p.evaHint);
    show('dialog-eva-hint');
    setText('btn-dialog-next', 'Iniciar Desafio Clínico ⚕️');
    updateDialogDots(total, total + 1);
  }
}

function animateText(elementId, text) {
  const el = $(elementId);
  el.textContent = '';
  let i = 0;
  const cursor = $('speech-cursor');
  if (cursor) cursor.style.display = 'inline';

  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i++];
    } else {
      clearInterval(interval);
      if (cursor) cursor.style.display = 'none';
    }
  }, 22);
}

$('btn-dialog-next').addEventListener('click', () => {
  const p = state.currentMission.patient;
  const total = p.dialogLines.length;
  state.dialogIndex++;

  if (state.dialogIndex <= total) {
    showDialogLine();
  } else {
    // Avançar para quiz
    hide('dialog-overlay');
    openQuiz(state.currentMission);
  }
});

// ----------------------------------------------------------------
// SISTEMA DE QUIZ
// ----------------------------------------------------------------
function openQuiz(mission) {
  state.phase = 'quiz';
  state.selectedOption = null;
  const p = mission.patient;

  setText('quiz-question', p.question);
  buildQuizOptions(p.options);
  hide('quiz-feedback-panel');
  show('quiz-confirm-bar');
  $('btn-confirm-quiz').disabled = true;
  setText('quiz-selection-hint', 'Selecione uma opção acima');

  // Reset options visual
  document.querySelectorAll('.quiz-option').forEach(el => {
    el.classList.remove('selected', 'correct', 'wrong');
  });

  show('quiz-overlay');
}

function buildQuizOptions(options) {
  const grid = $('quiz-options-grid');
  grid.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-option';
    div.setAttribute('role', 'radio');
    div.setAttribute('aria-label', `Opção ${letters[i]}: ${opt.text}`);
    div.innerHTML = `
      <div class="option-letter">${letters[i]}</div>
      <div class="option-text">${opt.text}</div>
    `;
    div.addEventListener('click', () => selectOption(i, div, options));
    grid.appendChild(div);
  });
}

function selectOption(index, clickedEl, options) {
  // Remove seleção anterior
  document.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
  clickedEl.classList.add('selected');
  state.selectedOption = index;
  $('btn-confirm-quiz').disabled = false;
  setText('quiz-selection-hint', `Opção selecionada: ${['A','B','C','D'][index]}`);
}

$('btn-confirm-quiz').addEventListener('click', () => {
  if (state.selectedOption === null) return;
  const options = state.currentMission.patient.options;
  const chosen = options[state.selectedOption];
  const letters = ['A', 'B', 'C', 'D'];

  // Marcar corretas e erradas
  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    el.style.pointerEvents = 'none';
    if (options[i].correct) el.classList.add('correct');
    else if (i === state.selectedOption && !chosen.correct) el.classList.add('wrong');
  });

  // Mostrar feedback
  const isCorrect = chosen.correct;
  $('feedback-result-icon').textContent = isCorrect ? '✅' : '❌';
  setText('feedback-title', isCorrect ? 'Decisão Correta!' : 'Decisão Incorreta');
  setText('feedback-text', chosen.feedback);
  hide('quiz-confirm-bar');
  show('quiz-feedback-panel');
  setText('btn-after-feedback', isCorrect ? 'Ver Badge Conquistado 🏆' : 'Tentar Novamente →');

  $('btn-after-feedback').onclick = () => {
    if (isCorrect) {
      hide('quiz-overlay');
      showBadge(state.currentMission);
    } else {
      retryQuiz();
    }
  };
});

function retryQuiz() {
  state.selectedOption = null;
  document.querySelectorAll('.quiz-option').forEach(el => {
    el.style.pointerEvents = 'auto';
    el.classList.remove('selected', 'correct', 'wrong');
  });
  hide('quiz-feedback-panel');
  show('quiz-confirm-bar');
  $('btn-confirm-quiz').disabled = true;
  setText('quiz-selection-hint', 'Selecione uma opção acima');
}

// ----------------------------------------------------------------
// BADGE / CELEBRAÇÃO
// ----------------------------------------------------------------
function showBadge(mission) {
  const p = mission.patient;
  state.phase = 'badge';

  $('badge-icon-xl').textContent = p.badge.icon;
  setText('badge-name-display', p.badge.name);
  setText('badge-desc-display', p.badge.desc);
  setText('xp-amount', p.xp);

  state.earnedBadges.push(p.badge);
  addXP(p.xp);
  state.completedMissions.add(mission.id);
  updateHUD();

  // Confete
  spawnConfetti();

  const isLast = state.completedMissions.size >= MISSIONS.length;
  setText('next-btn-text', isLast ? 'Ver Resultado Final 🎉' : 'Próxima Missão →');

  $('btn-next-mission').onclick = () => {
    hide('badge-overlay');
    if (isLast) {
      showFinalVictory();
    } else {
      returnToMap();
    }
  };

  show('badge-overlay');
}

function spawnConfetti() {
  const container = $('badge-confetti-container');
  container.innerHTML = '';
  const colors = ['#f5a623','#27ae60','#00a599','#004f9f','#e74c3c','#fff'];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${-Math.random() * 20}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${Math.random() * 8 + 5}px;
      height: ${Math.random() * 8 + 5}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${Math.random() * 1.5 + 1.5}s;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    container.appendChild(piece);
  }
}

// ----------------------------------------------------------------
// VOLTAR AO MAPA
// ----------------------------------------------------------------
function returnToMap() {
  state.phase = 'map';
  state.currentMission = null;

  // Atualizar dots do HUD
  MISSIONS.forEach((m, i) => {
    const dot = $(`dot-${i + 1}`);
    if (dot && state.completedMissions.has(m.id)) {
      dot.classList.add('complete');
    }
  });

  show('map-hint');
  resize();
  startMapPulse();
}

// ----------------------------------------------------------------
// VITÓRIA FINAL
// ----------------------------------------------------------------
function showFinalVictory() {
  state.phase = 'victory';
  setText('final-xp-val', state.xp);
  setText('final-level-val', state.level);

  // Badges
  const row = $('final-badges-row');
  row.innerHTML = '';
  state.earnedBadges.forEach(b => {
    const div = document.createElement('div');
    div.className = 'final-badge-item';
    div.innerHTML = `<span>${b.icon}</span><span>${b.name}</span>`;
    row.appendChild(div);
  });

  // Confete final
  spawnFinalConfetti();

  MISSIONS.forEach((m, i) => {
    const dot = $(`dot-${i + 1}`);
    if (dot) dot.classList.add('complete');
  });

  show('final-overlay');
}

function spawnFinalConfetti() {
  const container = $('final-confetti');
  container.innerHTML = '';
  const colors = ['#f5a623','#27ae60','#00a599','#004f9f','#e74c3c','#ffffff','#ff69b4'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${-20 - Math.random() * 40}px;
      width: ${Math.random() * 10 + 4}px;
      height: ${Math.random() * 10 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
      animation: confettiFall ${Math.random() * 2 + 2}s ${Math.random() * 1}s linear forwards;
      pointer-events: none;
    `;
    container.appendChild(piece);
  }
}

$('btn-play-again').addEventListener('click', resetGame);

function resetGame() {
  state.xp = 0;
  state.level = 1;
  state.completedMissions = new Set();
  state.currentMission = null;
  state.earnedBadges = [];
  state.phase = 'map';

  hide('final-overlay');
  [$('dot-1'), $('dot-2'), $('dot-3')].forEach(d => { if (d) d.classList.remove('complete'); });

  updateHUD();
  returnToMap();
}

// ----------------------------------------------------------------
// SISTEMA DE XP / NÍVEL
// ----------------------------------------------------------------
function addXP(amount) {
  const XP_PER_LEVEL = 300;
  state.xp += amount;
  const newLevel = Math.floor(state.xp / XP_PER_LEVEL) + 1;
  if (newLevel > state.level) {
    state.level = newLevel;
    showLevelUpToast(newLevel);
  }
}

function showLevelUpToast(level) {
  const toast = $('levelup-toast');
  setText('levelup-new-level', `Agora você é Nível ${level}!`);
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.style.transition = 'opacity 0.5s';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.classList.add('hidden');
      toast.style.opacity = '1';
    }, 500);
  }, 3000);
}

function updateHUD() {
  const XP_PER_LEVEL = 300;
  setText('hud-xp', state.xp);
  setText('hud-level', state.level);
  setText('hud-missions', state.completedMissions.size);

  const xpInLevel = state.xp % XP_PER_LEVEL;
  const pct = Math.min(100, (xpInLevel / XP_PER_LEVEL) * 100);
  $('hud-xp-bar').style.width = pct + '%';

  MISSIONS.forEach((m, i) => {
    const dot = $(`dot-${i + 1}`);
    if (dot) dot.classList.toggle('complete', state.completedMissions.has(m.id));
  });
}

// ----------------------------------------------------------------
// INIT
// ----------------------------------------------------------------
window.addEventListener('load', () => {
  resize();
  initIntro();
});
