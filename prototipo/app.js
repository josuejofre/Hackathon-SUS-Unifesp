// Trilha Digital em Tecnologia Assistiva — Lógica do Aplicativo
// 5 Eixos | 14 Unidades | Gamificação | Quebra-Cabeça Interativo | Widget Flutuante E.V.A.

const state = {
    completedLessons: new Set(),
    completedSimulations: new Set(),
    completedPuzzles: new Set(),
    userXP: 0,
    userLevel: 1,
    unlockedBadges: new Set(),
    puzzleCurrentPhase: 1,
    currentSimModuleId: null
};

const lessonsContent = {
    "E1U1T1": {
        title: "1.1 O que é Tecnologia Assistiva",
        html: `<p>Tecnologia Assistiva (TA) é uma área interdisciplinar que reúne produtos, recursos, metodologias, estratégias, serviços e práticas para promover autonomia, independência e qualidade de vida para pessoas com deficiência ou mobilidade reduzida.</p><h4>Definição da LBI (Lei 13.146/2015)</h4><p>Dispositivos e serviços visando à inclusão social e autonomia.</p>`
    },
    "E1U1T2": {
        title: "1.2 O que são OPM",
        html: `<p><strong>OPM</strong>: Órteses, Próteses e Meios Auxiliares de Locomoção no SUS (Tabela SIGTAP).</p>`
    },
    "E1U1T3": {
        title: "1.3 Diferença entre Órtese, Prótese e Recurso Auxiliar",
        html: `<p><strong>Órtese:</strong> Apoia segmento existente (ex: AFO, colete).<br><strong>Prótese:</strong> Substitui membro ausente (ex: prótese transtibial).<br><strong>Recurso Auxiliar:</strong> Equipamento de deslocamento (ex: cadeira de rodas, andador).</p>`
    },
    "E1U1T4": {
        title: "1.4 Quem participa do processo de cuidado",
        html: `<p>Equipe multiprofissional (UBS, eMulti, CER) e o protagonismo da pessoa com deficiência e sua família.</p>`
    },
    "E1U1T5": {
        title: "1.5 OPM no contexto do SUS",
        html: `<p>Acesso gratuito garantido por lei via Rede de Cuidados à Pessoa com Deficiência (RCPD).</p>`
    }
};

const simulationsData = {
    1: {
        moduleId: 1,
        title: "Quiz Módulo 1 — Tecnologia Assistiva & OPM no SUS",
        description: "Qual das afirmativas sobre Tecnologia Assistiva (TA) no SUS é VERDADEIRA?",
        options: [
            { text: "A TA refere-se apenas a dispositivos físicos e exclui serviços.", correct: false, feedback: "Incorreto. Pela LBI, TA inclui produtos, metodologias, práticas e serviços." },
            { text: "Toda OPM faz parte do campo da Tecnologia Assistiva, que engloba também outros recursos.", correct: true, feedback: "Excelente! OPM é um subgrupo essencial de Tecnologia Assistiva." }
        ]
    },
    2: {
        moduleId: 2,
        title: "Simulação Módulo 2 — Funcionalidade & CIF",
        description: "Ao prescrever uma OPM para um paciente pós-AVC que mora sozinho, qual deve ser o foco prioritário?",
        options: [
            { text: "Independência funcional na marcha e prevenção de quedas no ambiente domiciliar.", correct: true, feedback: "Perfeito! A prioridade é garantir segurança e autonomia em AVDs." },
            { text: "Apenas a estética da peça.", correct: false, feedback: "A funcionalidade vem em primeiro lugar." }
        ]
    },
    3: {
        moduleId: 3,
        title: "Simulação Módulo 3 — Avaliação Inicial",
        description: "Qual elemento NÃO pode faltar no laudo de solicitação de OPM via SISREG?",
        options: [
            { text: "Descrição clara da limitação funcional e do objetivo terapêutico pretendido.", correct: true, feedback: "Exato! Sem justificativa funcional a regulação não aprova o pedido." },
            { text: "Apenas a marca comercial do fabricante.", correct: false, feedback: "No SUS prescreve-se por código SIGTAP." }
        ]
    },
    4: {
        moduleId: 4,
        title: "Quiz Oficial Módulo 4 — Critérios para Prescrever",
        description: "Qual é o significado de 'Objetivo de curto prazo' na prescrição de OPM?",
        options: [
            { text: "Resultado esperado nas primeiras etapas do tratamento (ex: estabilização e alívio de dor).", correct: true, feedback: "Gabarito Oficial! O objetivo de curto prazo busca ganhos nas etapas iniciais." },
            { text: "Duração estimada de utilização da OPM ao longo de anos.", correct: false, feedback: "Isso se refere ao Tempo Previsto de Uso." }
        ]
    },
    5: {
        moduleId: 5,
        title: "Quiz Oficial Módulo 5 — Erros Comuns na Prescrição",
        description: "Qual é considerado um dos ERROS mais prejudiciais na provisão de OPM?",
        options: [
            { text: "Prescrever o recurso sem definir um objetivo funcional claro e sem avaliar o ambiente de vida.", correct: true, feedback: "Gabarito Oficial! Gera alto índice de abandono do recurso." },
            { text: "Realizar o acompanhamento longitudinal do paciente.", correct: false, feedback: "Acompanhar é essencial." }
        ]
    },
    6: {
        moduleId: 6,
        title: "🧩 Desafio Quebra-Cabeça de OPMs (8 Fases)",
        description: "Você ativou o módulo didático de montagem de OPMs! Clique abaixo para iniciar o Quebra-Cabeça Interativo de 8 Fases.",
        isPuzzleLauncher: true,
        options: [
            { text: "🚀 Iniciar Quebra-Cabeça de OPMs", correct: true, feedback: "Abrindo módulo interativo..." }
        ]
    },
    7: {
        moduleId: 7,
        title: "Simulação Módulo 7 — Escolha de Órteses",
        description: "Para uma adolescente com escoliose idiopática (curva de 32° Cobb, Risser 2), qual a indicação correta?",
        options: [
            { text: "Colete de Boston (TLSO) para tratamento conservador tridimensional.", correct: true, feedback: "Correto! Colete de Boston é o padrão para escoliose em fase de crescimento." },
            { text: "Colar cervical rígido.", correct: false, feedback: "Incorreto." }
        ]
    },
    8: {
        moduleId: 8,
        title: "Simulação Módulo 8 — Componentes de Próteses",
        description: "Qual componente da prótese distribui a pressão no coto residual?",
        options: [
            { text: "Encaixe (Socket).", correct: true, feedback: "Exato! O soquete é a interface de carga." },
            { text: "Pé protético SACH.", correct: false, feedback: "Incorreto." }
        ]
    },
    9: {
        moduleId: 9,
        title: "Simulação Módulo 9 — Fabricação Tradicional",
        description: "No método tradicional, como é obtido o modelo positivo?",
        options: [
            { text: "Por vazamento de gesso dentro da atadura gessada moldada no paciente.", correct: true, feedback: "Correto!" },
            { text: "Por fatiamento CAM em impressora 3D.", correct: false, feedback: "Isso é do fluxo 3D." }
        ]
    },
    10: {
        moduleId: 10,
        title: "Simulação Módulo 10 — Parametrização de Fatiamento 3D",
        description: "Qual filamento deve ser selecionado para obter elasticidade e conforto em órteses dinâmicas?",
        options: [
            { text: "TPU (Poliuretano Termoplástico flexível).", correct: true, feedback: "Perfeito!" },
            { text: "PLA rígido.", correct: false, feedback: "PLA é rígido." }
        ]
    },
    11: {
        moduleId: 11,
        title: "Simulação Módulo 11 — Comparação de Métodos",
        description: "Qual a vantagem do Fluxo 3D em termos de reposição?",
        options: [
            { text: "Salvamento do arquivo CAD 3D em nuvem para reimpressão sem nova moldagem.", correct: true, feedback: "Excelente!" },
            { text: "O arquivo digital se apaga.", correct: false, feedback: "Incorreto." }
        ]
    },
    12: {
        moduleId: 12,
        title: "Simulação Módulo 12 — Prova e Adaptação",
        description: "Após 15 min de uso, o usuário apresenta vermelhidão no maléolo. Qual a conduta?",
        options: [
            { text: "Realizar o alívio de pressão local antes de liberar o uso.", correct: true, feedback: "Correto! Evita úlceras por pressão." },
            { text: "Orientar o uso contínuo mesmo com dor.", correct: false, feedback: "Perigoso." }
        ]
    },
    13: {
        moduleId: 13,
        title: "Simulação Módulo 13 — Seguimento Clínico",
        description: "Criança usando AFO há 10 meses refere dor nos dedos por crescimento. Qual a conduta?",
        options: [
            { text: "Reavaliar o comprimento e confeccionar nova órtese dimensionada.", correct: true, feedback: "Exato!" },
            { text: "Cortar a ponta sem reavaliar.", correct: false, feedback: "Incorreto." }
        ]
    },
    14: {
        moduleId: 14,
        title: "🎯 Árvore de Decisão — Caso Integrativo Final",
        description: "Paciente José Carlos, 73 anos (pós-AVC, pé caído). Indicaria AFO articulada neste momento?",
        options: [
            { text: "Sim. A AFO articulada compensa o déficit de dorsiflexão e reduz o risco de quedas.", correct: true, feedback: "Decisão Clínica Correta! Parabéns pela conclusão da Trilha Digital!" },
            { text: "Não. Aguardar sem intervenção.", correct: false, feedback: "Incorreto." }
        ]
    }
};

const puzzleData = [
    { phase: 1, title: "Fase 1 — Mão", question: "Qual material é mais indicado para confeccionar órtese de posicionamento para mão espástica?", options: [{ text: "Termoplástico de baixa temperatura", correct: true, desc: "Muito bem! O termoplástico é moldado diretamente no paciente." }], icon: "🖐️", pieceName: "Órtese de Repouso para Mão" },
    { phase: 2, title: "Fase 2 — Dinâmica", question: "Qual componente fornece a força de tração dinâmica?", options: [{ text: "Elástico / Mola de Tração", correct: true, desc: "Perfeito!" }], icon: "🦾", pieceName: "Tração Dinâmica Flexora/Extensora" },
    { phase: 3, title: "Fase 3 — Punho", question: "Objetivo de uma órtese estática de punho:", options: [{ text: "Imobilizar ou estabilizar a articulação na posição funcional", correct: true, desc: "Correto!" }], icon: "🤚", pieceName: "Órtese Cock-up de Punho" },
    { phase: 4, title: "Fase 4 — AFO", question: "Órtese indicada para pé caído pós-AVC:", options: [{ text: "AFO (Órtese Tornozelo-Pé)", correct: true, desc: "Excelente!" }], icon: "🦶", pieceName: "Órtese Tornozelo-Pé (AFO)" },
    { phase: 5, title: "Fase 5 — Material", question: "Propriedade do termoplástico:", options: [{ text: "Amolece em água quente (60–70°C) e endurece ao esfriar", correct: true, desc: "Correto!" }], icon: "♨️", pieceName: "Placa Termoplástica Moldável" },
    { phase: 6, title: "Fase 6 — Prótese", question: "Função principal da exoprótese:", options: [{ text: "Substituir um segmento corporal ausente", correct: true, desc: "Exato!" }], icon: "🦵", pieceName: "Prótese Transtibial" },
    { phase: 7, title: "Fase 7 — Bengala", question: "Meio auxiliar com MENOR base de apoio:", options: [{ text: "Bengala simples", correct: true, desc: "Correto!" }], icon: "🦯", pieceName: "Bengala Canadense" },
    { phase: 8, title: "Fase 8 — Andador", question: "Paciente que necessita da maior base de apoio:", options: [{ text: "Idoso com grande déficit de equilíbrio", correct: true, desc: "Parabéns!" }], icon: "♿", pieceName: "Andador com Assento e Rodas" }
];

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    setupViewNavigation();
    setupLessonButtons();
    setupSimulationButtons();
    setupEvaFloatingWidget();
    setupPuzzleModal();
    setupThemeToggle();
    updateUIProgress();
}

function setupViewNavigation() {
    const navTrilha = document.getElementById('nav-btn-trilha');
    const navConquistas = document.getElementById('nav-btn-conquistas');

    if (navTrilha) navTrilha.addEventListener('click', () => showView('trilha'));
    if (navConquistas) navConquistas.addEventListener('click', () => showView('conquistas'));
}

function showView(viewName) {
    const trilhaView = document.getElementById('trilha-view');
    const conquistasView = document.getElementById('conquistas-view');
    const navTrilha = document.getElementById('nav-btn-trilha');
    const navConquistas = document.getElementById('nav-btn-conquistas');

    if (viewName === 'trilha') {
        if (trilhaView) trilhaView.classList.add('active-view');
        if (conquistasView) conquistasView.classList.remove('active-view');
        if (navTrilha) navTrilha.classList.add('active');
        if (navConquistas) navConquistas.classList.remove('active');
    } else if (viewName === 'conquistas') {
        if (trilhaView) trilhaView.classList.remove('active-view');
        if (conquistasView) conquistasView.classList.add('active-view');
        if (navTrilha) navTrilha.classList.remove('active');
        if (navConquistas) navConquistas.classList.add('active');
    }
}

function setupLessonButtons() {
    document.querySelectorAll('.btn-read-lesson').forEach(btn => {
        btn.addEventListener('click', () => {
            const lessonItem = btn.closest('.lesson-item');
            const lessonId = lessonItem.getAttribute('data-lesson-id');
            openLessonModal(lessonId);
        });
    });

    document.getElementById('btn-close-lesson')?.addEventListener('click', closeLessonModal);
    document.getElementById('btn-finish-lesson')?.addEventListener('click', finishCurrentLesson);
}

let currentActiveLessonId = null;

function openLessonModal(lessonId) {
    currentActiveLessonId = lessonId;
    const lessonData = lessonsContent[lessonId];
    const modal = document.getElementById('lesson-modal');
    
    if (lessonData) {
        document.getElementById('lesson-modal-title').innerText = lessonData.title;
        document.getElementById('lesson-modal-content').innerHTML = lessonData.html;
    } else {
        document.getElementById('lesson-modal-title').innerText = "Aula da Trilha Digital";
        document.getElementById('lesson-modal-content').innerHTML = "<p>Conteúdo pedagógico em expansão.</p>";
    }
    
    modal?.classList.add('open');
}

function closeLessonModal() {
    document.getElementById('lesson-modal')?.classList.remove('open');
}

function finishCurrentLesson() {
    if (currentActiveLessonId) {
        state.completedLessons.add(currentActiveLessonId);
        const item = document.querySelector(`[data-lesson-id="${currentActiveLessonId}"]`);
        if (item) {
            item.classList.add('completed');
            item.querySelector('.lesson-status-icon').innerText = '✓';
        }
        addXP(15);
    }
    closeLessonModal();
    updateUIProgress();
}

function setupSimulationButtons() {
    for (let i = 1; i <= 14; i++) {
        const btn = document.getElementById(`btn-sim-${i}`);
        if (btn) {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('locked')) {
                    alert(`Conclua as etapas anteriores para desbloquear a Unidade ${i}!`);
                    return;
                }
                if (simulationsData[i] && simulationsData[i].isPuzzleLauncher) {
                    openPuzzleModal();
                } else {
                    openSimulationModal(i);
                }
            });
        }
    }

    document.getElementById('btn-close-sim')?.addEventListener('click', closeSimModal);
    document.getElementById('btn-submit-sim')?.addEventListener('click', submitSimulation);
    document.getElementById('btn-next-module')?.addEventListener('click', unlockNextModuleCard);
}

function openSimulationModal(modId) {
    state.currentSimModuleId = modId;
    const simData = simulationsData[modId];
    if (!simData) return;

    document.getElementById('sim-title').innerText = simData.title;
    document.getElementById('sim-case-text').innerHTML = simData.description;
    
    const optionsContainer = document.getElementById('sim-options');
    optionsContainer.innerHTML = '';
    
    simData.options.forEach((opt, idx) => {
        const optCard = document.createElement('div');
        optCard.className = 'sim-option-card';
        optCard.setAttribute('data-opt-index', idx);
        optCard.innerText = opt.text;
        optCard.addEventListener('click', () => {
            document.querySelectorAll('.sim-option-card').forEach(c => c.classList.remove('selected'));
            optCard.classList.add('selected');
        });
        optionsContainer.appendChild(optCard);
    });

    document.getElementById('sim-feedback').style.display = 'none';
    document.getElementById('btn-submit-sim').style.display = 'inline-block';
    document.getElementById('btn-next-module').style.display = 'none';

    document.getElementById('simulation-modal')?.classList.add('open');
}

function closeSimModal() {
    document.getElementById('simulation-modal')?.classList.remove('open');
}

function submitSimulation() {
    const selected = document.querySelector('.sim-option-card.selected');
    if (!selected) {
        alert('Por favor, selecione uma opção de decisão!');
        return;
    }

    const idx = parseInt(selected.getAttribute('data-opt-index'));
    const simData = simulationsData[state.currentSimModuleId];
    const opt = simData.options[idx];
    
    const feedbackPanel = document.getElementById('sim-feedback');
    feedbackPanel.style.display = 'block';
    
    if (opt.correct) {
        feedbackPanel.className = 'sim-feedback-panel sim-feedback-success';
        feedbackPanel.innerHTML = `<strong>Decisão Correta!</strong><br>${opt.feedback}`;
        state.completedSimulations.add(state.currentSimModuleId);
        addXP(50);
        checkBadgeUnlocks(state.currentSimModuleId);
        
        document.getElementById('btn-submit-sim').style.display = 'none';
        document.getElementById('btn-next-module').style.display = 'inline-block';
    } else {
        feedbackPanel.className = 'sim-feedback-panel sim-feedback-error';
        feedbackPanel.innerHTML = `<strong>Atenção:</strong><br>${opt.feedback}`;
    }
    updateUIProgress();
}

function unlockNextModuleCard() {
    closeSimModal();
    const currId = state.currentSimModuleId;
    const currCard = document.getElementById(`modulo-${currId}`);
    if (currCard) {
        const badge = currCard.querySelector('.status-badge');
        if (badge) {
            badge.className = 'status-badge status-concluido';
            badge.innerText = 'Concluído';
        }
    }

    const nextId = currId + 1;
    if (nextId <= 14) {
        const nextCard = document.getElementById(`modulo-${nextId}`);
        if (nextCard) {
            nextCard.classList.remove('locked');
            nextCard.classList.add('active');
            const badge = nextCard.querySelector('.status-badge');
            if (badge) {
                badge.className = 'status-badge status-em-progresso';
                badge.innerText = 'Em Progresso';
            }
            const btnSim = document.getElementById(`btn-sim-${nextId}`);
            if (btnSim) btnSim.classList.remove('locked');
        }
    }
    updateUIProgress();
}

function setupPuzzleModal() {
    document.getElementById('btn-close-puzzle')?.addEventListener('click', closePuzzleModal);
    document.getElementById('btn-next-puzzle-phase')?.addEventListener('click', nextPuzzlePhase);
}

function openPuzzleModal() {
    state.puzzleCurrentPhase = 1;
    renderPuzzlePhase(state.puzzleCurrentPhase);
    document.getElementById('puzzle-modal')?.classList.add('open');
}

function closePuzzleModal() {
    document.getElementById('puzzle-modal')?.classList.remove('open');
}

function renderPuzzlePhase(phaseNum) {
    const data = puzzleData[phaseNum - 1];
    if (!data) return;

    document.getElementById('puzzle-phase-num').innerText = `${phaseNum}`;
    document.getElementById('puzzle-question-text').innerHTML = `<strong>${data.title}</strong><br><br>${data.question}`;
    
    const optionsList = document.getElementById('puzzle-options-list');
    optionsList.style.display = 'flex';
    optionsList.innerHTML = '';
    document.getElementById('puzzle-assembly-area').style.display = 'none';

    data.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'sim-option-card';
        btn.innerText = opt.text;
        btn.addEventListener('click', () => {
            if (opt.correct) {
                showPuzzleSuccess(data, opt.desc);
            } else {
                alert('Resposta incorreta. Tente novamente!');
            }
        });
        optionsList.appendChild(btn);
    });
}

function showPuzzleSuccess(data, desc) {
    document.getElementById('puzzle-options-list').style.display = 'none';
    const assemblyArea = document.getElementById('puzzle-assembly-area');
    assemblyArea.style.display = 'block';
    
    document.getElementById('puzzle-assembly-icon').innerText = data.icon;
    document.getElementById('puzzle-assembly-title').innerText = `🧩 Peça Encaixada: ${data.pieceName}`;
    document.getElementById('puzzle-assembly-desc').innerText = desc || "Muito bem!";
    
    state.completedPuzzles.add(data.phase);
    addXP(30);
}

function nextPuzzlePhase() {
    if (state.puzzleCurrentPhase < 8) {
        state.puzzleCurrentPhase++;
        renderPuzzlePhase(state.puzzleCurrentPhase);
    } else {
        alert("🎉 Parabéns! Você concluiu as 8 Fases do Quebra-Cabeça de Órteses & Próteses!");
        closePuzzleModal();
        state.completedSimulations.add(6);
        checkBadgeUnlocks(6);
        unlockNextModuleCard();
    }
}

// ============================================================
// FLOATING E.V.A. AI WIDGET
// ============================================================
function setupEvaFloatingWidget() {
    const fabBtn = document.getElementById('btn-eva-fab');
    const pill = document.getElementById('eva-widget-pill');
    const popup = document.getElementById('eva-chat-popup');
    const closeBtn = document.getElementById('btn-close-eva-popup');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');

    const togglePopup = () => {
        if (popup) popup.classList.toggle('open');
    };

    if (fabBtn) fabBtn.addEventListener('click', togglePopup);
    if (pill) pill.addEventListener('click', togglePopup);
    if (closeBtn) closeBtn.addEventListener('click', () => popup?.classList.remove('open'));

    if (form && input) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = input.value.trim();
            if (!msg) return;

            appendMsg('user', msg);
            input.value = '';

            setTimeout(() => {
                const reply = getEvaReply(msg);
                appendMsg('eva', reply);
            }, 450);
        });
    }

    document.querySelectorAll('.quick-question-btn').forEach(b => {
        b.addEventListener('click', () => {
            const q = b.getAttribute('data-question');
            if (input) {
                input.value = q;
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
}

function appendMsg(sender, text) {
    const container = document.getElementById('chat-container');
    if (!container) return;
    const div = document.createElement('div');
    div.className = `chat-message ${sender}-msg`;
    div.innerHTML = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function getEvaReply(userMsg) {
    const lower = userMsg.toLowerCase();
    if (lower.includes('afo') || lower.includes('pé')) {
        return "A AFO (Órtese Tornozelo-Pé) é indicada para controle do pé caído, prevenindo tropeços na marcha.";
    } else if (lower.includes('3d') || lower.includes('impressão')) {
        return "No fluxo digital 3D, utilizamos scanner 3D sem gesso, modelagem CAD e fatiamento CAM em TPU/PLA!";
    } else if (lower.includes('sus') || lower.includes('cer')) {
        return "O atendimento em OPM no SUS é regulado pelo SISREG: da UBS/eMulti para o Centro Especializado em Reabilitação (CER).";
    } else {
        return "Estou à disposição para tirar dúvidas sobre Tecnologia Assistiva, OPM e impressão 3D!";
    }
}

function addXP(amount) {
    state.userXP += amount;
    state.userLevel = Math.floor(state.userXP / 100) + 1;
    
    const xpDisp = document.getElementById('user-xp-display');
    const lvlDisp = document.getElementById('user-level-display');
    if (xpDisp) xpDisp.innerText = state.userXP;
    if (lvlDisp) lvlDisp.innerText = state.userLevel;
}

function checkBadgeUnlocks(modId) {
    const badgeMap = { 1: "badge-1", 2: "badge-2", 3: "badge-3", 4: "badge-4", 5: "badge-5", 6: "badge-6", 7: "badge-7" };
    if (badgeMap[modId]) {
        state.unlockedBadges.add(badgeMap[modId]);
        const el = document.getElementById(badgeMap[modId]);
        if (el) el.classList.remove('locked');
    }

    if (state.completedSimulations.size >= 5) {
        state.unlockedBadges.add("badge-decisao");
        document.getElementById("badge-decisao")?.classList.remove('locked');
    }

    if (state.completedSimulations.size >= 14) {
        state.unlockedBadges.add("badge-supremo");
        document.getElementById("badge-supremo")?.classList.remove('locked');
    }

    updateUIProgress();
}

function updateUIProgress() {
    const totalUnits = 14;
    const progress = Math.round((state.completedSimulations.size / totalUnits) * 100);
    
    const percentageEl = document.getElementById('overall-percentage');
    const progressBar = document.getElementById('overall-progress-bar');
    const badgeText = document.getElementById('badge-count-text');

    if (percentageEl) percentageEl.innerText = `${progress}%`;
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (badgeText) badgeText.innerText = `${state.unlockedBadges.size} / 10 Badges`;
}

function setupThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }
}