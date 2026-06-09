// SUSAssist - Lógica do Protótipo Interativo

// --- BANCO DE DADOS DOS CONTEÚDOS DAS AULAS ---
const lessonsContent = {
    "1-1": {
        title: "Aula 1.1: O que são Órteses e Próteses (O&P)?",
        html: `
            <p>Para atuar na Atenção Primária, é fundamental diferenciar as tecnologias assistivas concedidas pelo SUS:</p>
            <h4>Órtese</h4>
            <p>É um dispositivo aplicado externamente ao corpo para modificar as características estruturais ou funcionais dos sistemas neuromuscular e esquelético. Ela <strong>alinha, previne ou corrige deformidades</strong>, apoia membros fracos ou melhora a função de partes móveis. Exemplos: palmilhas, talas, órteses de tornozelo-pé (AFO), coletes ortopédicos.</p>
            <h4>Prótese</h4>
            <p>É um dispositivo aplicado externamente para <strong>substituir total ou parcialmente</strong> um membro, órgão ou tecido ausente ou deficiente. Exemplos: próteses transtibiais, transfemorais (para amputações de perna), próteses de braço ou mão.</p>
            <blockquote>
                <strong>Dica de Prática:</strong> A órtese <em>apoia</em> o segmento corporal existente. A prótese <em>substitui</em> o segmento ausente.
            </blockquote>
        `
    },
    "1-2": {
        title: "Aula 1.2: A legislação e o papel do SUS na Tecnologia Assistiva",
        html: `
            <p>A concessão de órteses, próteses e materiais especiais (OPME) não-cirúrgicos é assegurada por portarias do Ministério da Saúde no âmbito da Rede de Cuidados à Pessoa com Deficiência.</p>
            <h4>Principais Diretrizes:</h4>
            <ul>
                <li><strong>Portaria de Consolidação nº 2/2017:</strong> Regulamenta as diretrizes nacionais para a atenção à saúde das pessoas com deficiência.</li>
                <li><strong>Integralidade do Cuidado:</strong> O SUS é responsável por todo o ciclo: avaliação médica, prescrição, confecção/aquisição, adaptação, reabilitação física e manutenção periódica do dispositivo.</li>
                <li><strong>Gratuidade Total:</strong> Nenhum profissional do SUS pode orientar a compra privada ou cobrar taxas adicionais para aceleração de pedidos. A prescrição deve seguir a Tabela de Procedimentos, Medicamentos e OPM do SUS.</li>
            </ul>
        `
    },
    "1-3": {
        title: "Aula 1.3: Fluxo de Regulação e o CER (Centro Especializado)",
        html: `
            <p>Como o paciente recebe uma cadeira de rodas ou uma prótese no SUS? O fluxo regulatório segue passos estritos de referência:</p>
            <ol>
                <li><strong>Acolhimento na UBS:</strong> O paciente é avaliado pelo médico de família ou fisioterapeuta da equipe multiprofissional (eSF/eMulti).</li>
                <li><strong>Prescrição e Laudo:</strong> O profissional preenche o laudo de solicitação de OPM com a descrição detalhada e o código da Tabela SUS.</li>
                <li><strong>Sistema de Regulação (SISREG):</strong> A solicitação é inserida no sistema de regulação municipal/estadual.</li>
                <li><strong>Atendimento no CER:</strong> O paciente é chamado para o CER (Centro Especializado em Reabilitação), onde uma equipe especializada (médico fisiatra, terapeuta ocupacional, fisioterapeuta, protesista) faz a avaliação final, tirada de moldes, entrega e adaptação do dispositivo.</li>
            </ol>
        `
    },
    "2-1": {
        title: "Aula 2.1: Tipos de Cadeira de Rodas no SUS e Adequação Postural",
        html: `
            <p>A prescrição de cadeiras de rodas deve considerar o grau de autonomia, força e estabilidade do usuário. A tabela do SUS inclui:</p>
            <ul>
                <li><strong>Cadeira de Rodas Monobloco / Dobrável em X:</strong> Para usuários ativos ou passivos. A de alumínio (mais leve) facilita a autopropulsão e o transporte.</li>
                <li><strong>Cadeira de Rodas para Obeso:</strong> Reforçada para suportar cargas acima de 100-120kg.</li>
                <li><strong>Cadeira de Rodas Motorizada:</strong> Indicada para pessoas com grave comprometimento motor nos quatro membros (ex: tetraplegia) que possuem função cognitiva preservada para controlar o joystick de forma segura.</li>
                <li><strong>Cadeira de Rodas Postural (Tetra):</strong> Possui apoios de cabeça, tronco e abdômen, indicada para pacientes com controle de tronco nulo ou espasticidade severa.</li>
            </ul>
        `
    },
    "2-2": {
        title: "Aula 2.2: Tomada de Medidas Antropométricas",
        html: `
            <p>Prescrever uma cadeira de rodas sem medir o paciente é como comprar um sapato sem saber o tamanho. As medidas principais a serem tomadas com o paciente sentado em superfície firme são:</p>
            <ol>
                <li><strong>Largura do Assento:</strong> Medir a distância entre os pontos mais largos do quadril/trocanteres e somar +2cm a +4cm de folga.</li>
                <li><strong>Profundidade do Assento:</strong> Distância da região posterior do glúteo até a dobra posterior do joelho (fossa poplítea), subtraindo 3cm a 5cm para não garrotear a circulação.</li>
                <li><strong>Altura do Encosto:</strong> Depende do controle de tronco. Para usuários ativos, mede-se da base do assento até abaixo da escápula. Para passivos, vai até os ombros ou cabeça.</li>
            </ol>
        `
    },
    "2-3": {
        title: "Aula 2.3: Prevenção de Úlceras por Pressão (Escaras)",
        html: `
            <p>Pacientes com perda de sensibilidade ou mobilidade (como paraplégicos) correm altíssimo risco de desenvolver feridas graves. A prevenção na cadeira envolve:</p>
            <ul>
                <li><strong>Almofadas Especiais:</strong> O SUS fornece almofadas de espuma de alta densidade revestida ou células de ar (tipo Roho) para redistribuição de pressão nos ossos do quadril (ísquios).</li>
                <li><strong>Mapeamento de Pressão:</strong> Encontrar pontos vermelhos na pele após o uso.</li>
                <li><strong>Alívio de Pressão:</strong> Orientar o paciente a realizar alívios de pressão (erguer o corpo com os braços ou inclinar o tronco) a cada 20-30 minutos.</li>
            </ul>
        `
    },
    "3-1": {
        title: "Aula 3.1: Indicações de Órtese de Tornozelo-Pé (AFO)",
        html: `
            <p>A órtese tornozelo-pé (ou <strong>AFO - Ankle Foot Orthosis</strong>) é um dos dispositivos mais prescritos na reabilitação neurológica.</p>
            <h4>Indicações principais:</h4>
            <ul>
                <li><strong>Pé Caído (Flácido ou Espástico):</strong> Comum após Acidente Vascular Cerebral (AVC), lesão medular incompleta ou lesões de nervos periféricos (ex: nervo fibular). A AFO segura o pé em 90 graus para que o paciente não tropece ao caminhar.</li>
                <li><strong>Instabilidade de Tornozelo:</strong> Previne torções e desvios em varo ou valgo.</li>
            </ul>
            <h4>Tipos de AFO:</h4>
            <p>Podem ser rígidas (bloqueiam o movimento para dar estabilidade máxima) ou dinâmicas/articuladas (permitem a dorsiflexão natural do tornozelo na marcha).</p>
        `
    },
    "3-2": {
        title: "Aula 3.2: Quando indicar a Órtese Joelho-Tornozelo-Pé (KAFO)",
        html: `
            <p>A órtese joelho-tornozelo-pé (ou <strong>KAFO - Knee Ankle Foot Orthosis</strong>), popularmente chamada de tutor longo, abrange toda a perna.</p>
            <h4>Indicações:</h4>
            <p>Utilizada quando o paciente apresenta fraqueza ou paralisia não apenas no tornozelo, mas também no músculo quadríceps (joelho), impedindo-o de manter o joelho estendido durante a marcha. Ex: sequelas de poliomielite, lesões medulares baixas, paralisia cerebral grave.</p>
            <blockquote>
                <strong>Critério de Uso:</strong> O paciente precisa ter força preservada nos membros superiores (para usar muletas ou andador como apoio) e força nos músculos flexores do quadril para conseguir dar o passo.
            </blockquote>
        `
    },
    "3-3": {
        title: "Aula 3.3: Avaliação de Marcha para Adaptação de Órtese",
        html: `
            <p>Antes de confeccionar a órtese no CER, o profissional deve analisar a marcha do paciente em três fases chaves:</p>
            <ol>
                <li><strong>Fase de Toque de Calcanhar:</strong> Avaliar se o calcanhar toca primeiro o solo ou se o paciente toca com a ponta do pé (marcha equina).</li>
                <li><strong>Fase de Apoio Médio:</strong> Observar se há hiperextensão do joelho (recurvato) como compensação da fraqueza.</li>
                <li><strong>Fase de Oscilação:</strong> Verificar se o paciente precisa fazer um movimento de circundução (marcha ceifante) para que o pé não arraste no chão. A órtese corrigirá essa necessidade.</li>
            </ol>
        `
    },
    "4-1": {
        title: "Aula 4.1: O Treino de Marcha e Uso de Próteses",
        html: `
            <p>A prótese não funciona sozinha. O processo de protetização exige um rigoroso treinamento de reabilitação:</p>
            <ul>
                <li><strong>Dessensibilização do Coto:</strong> Massagens, batidinhas e enfaixamento compressivo do coto de amputação para prepará-lo para a pressão do encaixe da prótese.</li>
                <li><strong>Treinamento de Equilíbrio:</strong> Exercícios em barras paralelas para o paciente transferir o peso corporal para a prótese sem medo.</li>
                <li><strong>Treinamento de Marcha:</strong> Corrigir desvios posturais e ensinar o padrão correto de caminhada em rampas, escadas e terrenos irregulares.</li>
            </ul>
        `
    },
    "4-2": {
        title: "Aula 4.2: Visita Domiciliar e Acompanhamento Multiprofissional",
        html: `
            <p>O sucesso da reabilitação depende do ambiente doméstico. Na visita domiciliar da equipe de saúde da família:</p>
            <ul>
                <li><strong>Eliminação de Barreiras:</strong> Orientar a remoção de tapetes soltos, instalação de barras de apoio no banheiro e rampas de acesso simples.</li>
                <li><strong>Inspeção Diária do Coto:</strong> O paciente e a família devem ser instruídos a olhar o coto todos os dias. Vermelhidão que não some após 15 minutos sem a prótese indica risco de ferida.</li>
                <li><strong>Higiene:</strong> Lavagem diária do coto com sabão neutro e secagem completa para evitar infecções fúngicas ou bacterianas.</li>
            </ul>
        `
    },
    "4-3": {
        title: "Aula 4.3: Manutenção, Reparos e Substituição no SUS",
        html: `
            <p>Órteses e próteses sofrem desgaste natural com o uso regular. O fluxo do SUS também cobre essa demanda:</p>
            <ul>
                <li><strong>Manutenção Periódica:</strong> Troca de tiras de velcro, solados, liners de silicone ou lubrificação de articulações metálicas devem ser feitas no CER de referência.</li>
                <li><strong>Substituição por Desgaste ou Crescimento:</strong> Em crianças, a substituição de órteses é frequente devido ao crescimento rápido. Em adultos, a vida útil de uma prótese bem cuidada varia de 2 a 5 anos.</li>
                <li><strong>Nova Solicitação:</strong> Se o dispositivo quebrar ou não servir mais, o profissional da UBS reinicia o processo no SISREG com o laudo de "Substituição/Manutenção de OPM".</li>
            </ul>
        `
    }
};

// --- DADOS DAS SIMULAÇÕES CLÍNICAS (CASOS CLÍNICOS) ---
const simulationsData = {
    1: {
        moduleId: 1,
        title: "Caso Clínico 1: O Encaminhamento do Lucas",
        description: `<strong>Paciente:</strong> Lucas, 8 anos, diagnosticado com Paralisia Cerebral. Ele consegue caminhar utilizando um andador comum na escola, mas seus professores notam que ele está tropeçando frequentemente. 
        <br><br>
        <strong>Avaliação na UBS:</strong> Você observa que Lucas apresenta um padrão de marcha equina (caminha na ponta dos pés de forma dinâmica), com encurtamento do tendão de Aquiles que se desfaz passivamente. O médico da família deseja saber como proceder pelo SUS para ajudar o Lucas.`,
        options: [
            { text: "Prescrever uma cadeira de rodas postural motorizada no SISREG para evitar que Lucas caminhe e se canse.", correct: false, feedback: "Incorreto. Lucas tem potencial de marcha e o uso de cadeira de rodas motorizada diminuiria sua autonomia funcional desnecessariamente." },
            { text: "Encaminhar Lucas para o CER via SISREG para avaliação de órtese do tipo AFO (tornozelo-pé) para alinhar o tornozelo durante a marcha e solicitar a manutenção/adequação do andador.", correct: true, feedback: "Excelente! A órtese AFO rígida ou articulada ajudará a manter o tornozelo em posição funcional (90 graus) na fase de oscilação, reduzindo os tropeços, enquanto o andador garante o apoio. O encaminhamento via UBS ao CER segue o fluxo regulatório correto do SUS." },
            { text: "Solicitar exames de ressonância magnética de urgência e recomendar repouso absoluto no leito por 6 meses.", correct: false, feedback: "Incorreto. O repouso causará perda de força muscular e piora do encurtamento do Lucas. A conduta correta é reabilitação e prescrição de órtese." },
            { text: "Orientar a família de que o SUS não fornece órteses para crianças em idade escolar e sugerir que comprem em uma loja particular.", correct: false, feedback: "Incorreto! A concessão de OPMs para pessoas com deficiência física de todas as idades é garantida por lei e coberta integralmente pelo SUS." }
        ]
    },
    2: {
        moduleId: 2,
        title: "Caso Clínico 2: A Cadeira de Rodas do Seu Francisco",
        description: `<strong>Paciente:</strong> Seu Francisco, 72 anos, amputado transtibial esquerdo por diabetes. Ele está em cadeira de rodas há 6 meses.
        <br><br>
        <strong>Avaliação na UBS:</strong> Durante a visita domiciliar, você identifica que Seu Francisco está usando uma cadeira de rodas emprestada de ferro, muito estreita e sem almofada. Ele queixa-se de dores fortes no quadril e você nota uma área avermelhada na região sacral que não desaparece. Qual a conduta correta de prescrição?`,
        options: [
            { text: "Prescrever uma cadeira de rodas de ferro comum tamanho padrão e recomendar pomadas cicatrizantes.", correct: false, feedback: "Incorreto. Usar uma cadeira estreita e sem redistribuição de pressão perpetuará a lesão sacral, que pode evoluir para uma úlcera grave." },
            { text: "Recomendar que ele pare de usar a cadeira de rodas e passe a se arrastar pelo chão da casa para evitar a pressão no quadril.", correct: false, feedback: "Incorreto. Essa conduta expõe o idoso a infecções, perda da dignidade e riscos graves de acidentes." },
            { text: "Prescrever uma cadeira de alumínio leve adaptada às medidas do Seu Francisco, acompanhada de almofada de células de ar ou espuma de alta densidade para alívio de pressão, além de encaminhar para o CER para treino de prótese.", correct: true, feedback: "Perfeito! A adequação das medidas previne escaras (úlceras por pressão) nas proeminências ósseas, e o alumínio facilita a mobilidade. A almofada especial é essencial para o alívio de pressão. O encaminhamento ao CER prepara o idoso para futura protetização." },
            { text: "Solicitar uma cadeira motorizada pesada diretamente, ignorando que o paciente tem diabetes descompensada e falta de força em membros superiores.", correct: false, feedback: "Incorreto. Cadeira motorizada exige avaliação específica cognitiva e motora e, neste caso, o mais urgente é o alívio de pressão no quadril e adequação postural simples." }
        ]
    },
    3: {
        moduleId: 3,
        title: "Caso Clínico 3: O Pé Caído de Dona Maria",
        description: `<strong>Paciente:</strong> Dona Maria, 62 anos, hemiparesia espástica à direita pós-AVC há 1 ano. 
        <br><br>
        <strong>Avaliação na UBS:</strong> Dona Maria consegue andar sem andador dentro de casa, mas arrasta a ponta do pé direito, precisando erguer muito o quadril (marcha ceifante/escarvante) para evitar tropeçar. Ela já caiu duas vezes no último mês. Que órtese deve ser prescrita pelo SUS para resolver este problema?`,
        options: [
            { text: "Uma órtese longa articulada de metal (KAFO) que trava o joelho em extensão completa.", correct: false, feedback: "Incorreto. Dona Maria tem controle do joelho; uma KAFO seria pesada, limitante e inadequada para sua marcha atual." },
            { text: "Uma órtese tornozelo-pé (AFO) em polipropileno sob medida para manter o pé neutro em 90 graus na fase de oscilação da marcha.", correct: true, feedback: "Excelente escolha! A órtese AFO de polipropileno (tipo rígida ou mola de Codivilla) estabiliza o tornozelo em 90 graus, evitando que a ponta do pé arraste e eliminando o risco de quedas. É o dispositivo ideal para pé caído pós-AVC." },
            { text: "Nenhuma órtese, recomendando apenas o uso de sapatos de sola de borracha antiderrapante pesados.", correct: false, feedback: "Incorreto. O sapato antiderrapante não resolve a queda do pé e pode até aumentar os tropeços devido ao atrito do calçado arrastando no chão." },
            { text: "Uma prótese de pé estético de silicone para calçar por dentro da meia.", correct: false, feedback: "Incorreto. Dona Maria tem o membro íntegro (apenas paralisado/espástico). Próteses substituem partes ausentes; ela necessita de uma órtese." }
        ]
    },
    4: {
        moduleId: 4,
        title: "Caso Clínico 4: A Adaptação da Dona Cleide",
        description: `<strong>Paciente:</strong> Dona Cleide, 45 anos, amputada transtibial direita. Ela recebeu sua prótese confeccionada no CER há duas semanas.
        <br><br>
        <strong>Avaliação na UBS:</strong> Ela procura a UBS relatando que tentou caminhar em casa, mas sente dores extremas na ponta do osso do coto (tíbia) e a pele local está muito vermelha, quente e quase abrindo uma ferida. Qual a conduta imediata da equipe da UBS?`,
        options: [
            { text: "Orientar Dona Cleide a continuar usando a prótese e caminhando para calejamento natural da pele.", correct: false, feedback: "Perigoso! Caminhar com ponto de hiperpressão em coto de amputação pode causar necrose tecidual e feridas graves que inviabilizam o uso da prótese por meses." },
            { text: "Suspender o uso da prótese temporariamente, tratar a inflamação na UBS e encaminhar Dona Cleide ao CER com laudo solicitando ajuste urgente no encaixe (liner/soquete) da prótese.", correct: true, feedback: "Espetacular! A conduta correta é proteger a integridade do coto suspendendo o uso até o ajuste, e acionar o CER (oficina ortopédica) para desgastar ou readequar o soquete no local de hiperpressão óssea." },
            { text: "Orientar a paciente a preencher o encaixe da prótese com várias meias grossas ou jornal até a dor passar por completo.", correct: false, feedback: "Incorreto. Encher o encaixe de material sem critério pode apertar ainda mais o coto ou desalinhar a marcha, agravando a lesão." },
            { text: "Encaminhá-la de volta ao cirurgião que fez a amputação para realizar uma nova cirurgia de encurtamento do osso.", correct: false, feedback: "Incorreto. A cirurgia é o último recurso. Na grande maioria dos casos, pequenos ajustes mecânicos no soquete de resina resolvem os pontos de pressão." }
        ]
    }
};

// --- DIALOGOS MOCKADOS DA IA EVA ---
const evaResponses = {
    "ola": "Olá, João Paulo! Como vai seu dia na UBS? Sou a E.V.A. (Educação em Vida Assistiva). Estou pronta para ajudar você a decifrar a prescrição e os fluxos de órteses e próteses no SUS. Qual a sua dúvida?",
    "oi": "Olá! Sou a E.V.A., sua tutora virtual de aprendizagem em órteses e próteses. Lembre-se: capacitar-se em tecnologia assistiva melhora diretamente a vida dos nossos pacientes na comunidade. Como posso ajudar?",
    "preceptora": "Um preceptor ou preceptora na saúde é um profissional experiente que atua como orientador e tutor de estudantes ou recém-formados na prática clínica do dia a dia (como em hospitais e UBSs). No SUSAssist, eu, E.V.A., funciono como a sua preceptora digital, te guiando no aprendizado prático e tirando suas dúvidas sobre órteses e próteses!",
    "cadeira de rodas": "O SUS concede cadeiras de rodas através da tabela do SIA/SUS (procedimento OPM). Os modelos disponíveis incluem: Cadeira Dobrável em X, Cadeira Monobloco (ativa, leve), Cadeira para Obesos, Cadeira Postural (Tetraplegia) e Cadeira Motorizada. <strong>Importante:</strong> Para cadeira motorizada, o paciente deve passar por avaliação cognitiva e ter controle motor do membro superior funcional para operar o joystick com segurança.",
    "afo": "A órtese tornozelo-pé (AFO) é uma das tecnologias assistivas mais prescritas no SUS. Ela serve para manter o tornozelo em 90 graus (neutro) e é indicada para <strong>pé caído</strong> decorrente de AVC, paralisia cerebral, sequelas de trauma ou poliomielite. Ela evita tropeços e previne o encurtamento do tendão de Aquiles.",
    "fluxo": "O fluxo regulatório no SUS começa na <strong>Atenção Primária (UBS)</strong>: o profissional preenche o laudo de solicitação de OPM. O pedido é inserido no <strong>SISREG</strong>. O sistema direciona o paciente para a avaliação e confecção no <strong>CER (Centro Especializado em Reabilitação)</strong> de referência da sua região.",
    "regulacao": "O fluxo regulatório no SUS começa na <strong>Atenção Primária (UBS)</strong>: o profissional preenche o laudo de solicitação de OPM. O pedido é inserido no <strong>SISREG</strong>. O sistema direciona o paciente para a avaliação e confecção no <strong>CER (Centro Especializado em Reabilitação)</strong> de referência da sua região.",
    "escaras": "Para pacientes usuários de cadeira de rodas, a prevenção de úlceras por pressão (escaras) é vital. Na prescrição, certifique-se de solicitar também uma <strong>almofada de redistribuição de pressão</strong> (espuma selada ou células de ar), que é fornecida pelo SUS sob o código OPM adequado.",
    "ajuda": "Você pode me perguntar sobre: 'Cadeira de rodas', 'Órtese AFO', 'Fluxo de regulação no SUS', 'Prevenção de escaras' ou detalhes sobre indicação de próteses.",
    "protese": "As próteses no SUS (como transtibial ou transfemoral) são prescritas e confeccionadas nos CERs. O sucesso da protetização depende da preparação do coto (enfaixamento compressivo e dessensibilização) e do treino de marcha continuado na UBS e no CER."
};

// --- ESTADO GERAL DO APLICATIVO ---
let appState = {
    theme: "light",
    lessonsRead: [], // Lista de lessonIds lidos
    modulesCompleted: [], // Lista de números dos módulos concluídos (1 a 4)
    activeSimulationModule: null, // Módulo da simulação aberta no momento
    selectedOptionIndex: null // Opção selecionada no quiz
};

// --- ELEMENTOS DO DOM ---
const bodyEl = document.body;
const themeToggleBtn = document.getElementById("theme-toggle");
const overallPercentageEl = document.getElementById("overall-percentage");
const overallProgressBarEl = document.getElementById("overall-progress-bar");
const badgeCountTextEl = document.getElementById("badge-count-text");

// Modal de Aula
const lessonModalEl = document.getElementById("lesson-modal");
const lessonTitleEl = document.getElementById("lesson-modal-title");
const lessonContentEl = document.getElementById("lesson-modal-content");
const finishLessonBtn = document.getElementById("btn-finish-lesson");
const closeLessonBtn = document.getElementById("btn-close-lesson");

// Modal de Simulação
const simModalEl = document.getElementById("simulation-modal");
const simCaseTextEl = document.getElementById("sim-case-text");
const simOptionsEl = document.getElementById("sim-options");
const simFeedbackEl = document.getElementById("sim-feedback");
const submitSimBtn = document.getElementById("btn-submit-sim");
const nextModuleBtn = document.getElementById("btn-next-module");
const closeSimBtn = document.getElementById("btn-close-sim");

// Chat da Eva
const chatContainerEl = document.getElementById("chat-container");
const chatFormEl = document.getElementById("chat-form");
const chatInputEl = document.getElementById("chat-input");

// --- CARREGAMENTO INICIAL ---
document.addEventListener("DOMContentLoaded", () => {
    loadSavedState();
    setupEventListeners();
    updateUI();
});

// Salvar/Carregar Estado no LocalStorage
function saveState() {
    localStorage.setItem("susassist_state", JSON.stringify({
        lessonsRead: appState.lessonsRead,
        modulesCompleted: appState.modulesCompleted,
        theme: appState.theme
    }));
}

function loadSavedState() {
    const saved = localStorage.getItem("susassist_state");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            appState.lessonsRead = parsed.lessonsRead || [];
            appState.modulesCompleted = parsed.modulesCompleted || [];
            appState.theme = parsed.theme || "light";
            
            if (appState.theme === "dark") {
                bodyEl.classList.add("dark-mode");
            }
        } catch (e) {
            console.error("Erro ao carregar estado salvo", e);
        }
    }
}

// Configurar ouvintes de eventos
function setupEventListeners() {
    // Alternar Tema
    themeToggleBtn.addEventListener("click", () => {
        bodyEl.classList.toggle("dark-mode");
        appState.theme = bodyEl.classList.contains("dark-mode") ? "dark" : "light";
        saveState();
    });

    // Ler botões de Aula
    document.querySelectorAll(".btn-read-lesson").forEach(button => {
        button.addEventListener("click", (e) => {
            const lessonItem = e.target.closest(".lesson-item");
            const lessonId = lessonItem.getAttribute("data-lesson-id");
            openLessonModal(lessonId);
        });
    });

    // Fechar modal de aula
    closeLessonBtn.addEventListener("click", closeLessonModal);
    finishLessonBtn.addEventListener("click", finishLesson);

    // Botões de Simulação da Trilha
    document.getElementById("btn-sim-1").addEventListener("click", () => startSimulation(1));
    document.getElementById("btn-sim-2").addEventListener("click", () => startSimulation(2));
    document.getElementById("btn-sim-3").addEventListener("click", () => startSimulation(3));
    document.getElementById("btn-sim-4").addEventListener("click", () => startSimulation(4));

    // Ações de Simulação
    closeSimBtn.addEventListener("click", closeSimModal);
    submitSimBtn.addEventListener("click", evaluateSimulationAnswer);
    nextModuleBtn.addEventListener("click", advanceToNextModule);

    // Enviar mensagem no Chat
    chatFormEl.addEventListener("submit", (e) => {
        e.preventDefault();
        handleUserChatMessage();
    });

    // Botões rápidos de pergunta
    document.querySelectorAll(".quick-question-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const question = e.target.getAttribute("data-question");
            chatInputEl.value = question;
            handleUserChatMessage();
        });
    });

    // Clicar no item do menu Simulador Clínico
    document.getElementById("nav-sim").addEventListener("click", (e) => {
        e.preventDefault();
        // Achar o primeiro módulo ativo e não completo para abrir
        let activeM = 1;
        for (let m = 1; m <= 4; m++) {
            if (!appState.modulesCompleted.includes(m)) {
                activeM = m;
                break;
            }
        }
        startSimulation(activeM);
    });
}

// --- ATUALIZAÇÕES DA INTERFACE ---
function updateUI() {
    // 1. Atualizar lições lidas na tela
    appState.lessonsRead.forEach(lessonId => {
        const item = document.querySelector(`[data-lesson-id="${lessonId}"]`);
        if (item) {
            item.classList.add("read");
            const icon = item.querySelector(".lesson-status-icon");
            if (icon) icon.textContent = "✓";
        }
    });

    // 2. Verificar se destrava botões de simulação
    for (let m = 1; m <= 4; m++) {
        const modCard = document.getElementById(`modulo-${m}`);
        const simBtn = document.getElementById(`btn-sim-${m}`);
        const statusBadge = modCard.querySelector(".status-badge");
        
        // Se o módulo está completo
        if (appState.modulesCompleted.includes(m)) {
            modCard.classList.remove("locked", "active");
            modCard.classList.add("completed");
            simBtn.classList.remove("locked");
            simBtn.textContent = "Simulação Concluída ✓";
            simBtn.disabled = true;
            simBtn.style.background = "var(--success)";
            if (statusBadge) {
                statusBadge.textContent = "Concluído";
                statusBadge.className = "status-badge status-concluido";
            }
            
            // Destravar o próximo módulo
            const nextMod = document.getElementById(`modulo-${m + 1}`);
            if (nextMod && !appState.modulesCompleted.includes(m + 1)) {
                nextMod.classList.remove("locked");
                nextMod.classList.add("active");
                const nextBadge = nextMod.querySelector(".status-badge");
                if (nextBadge) {
                    nextBadge.textContent = "Em Progresso";
                    nextBadge.className = "status-badge status-em-progresso";
                }
            }
        } else {
            // Se não está completo, checar se as lições dele foram lidas
            const lessons = document.querySelectorAll(`#modulo-${m} .lesson-item`);
            let allRead = true;
            lessons.forEach(l => {
                const lid = l.getAttribute("data-lesson-id");
                if (!appState.lessonsRead.includes(lid)) {
                    allRead = false;
                }
            });

            if (allRead && !modCard.classList.contains("locked")) {
                simBtn.classList.remove("locked");
                simBtn.disabled = false;
            } else {
                simBtn.classList.add("locked");
                simBtn.disabled = true;
            }
        }
    }

    // 3. Atualizar Badges (Gamificação)
    appState.modulesCompleted.forEach(m => {
        const badge = document.getElementById(`badge-${m}`);
        if (badge) {
            badge.classList.remove("locked");
            badge.classList.add("unlocked");
        }
    });

    // 4. Progresso Geral
    const progressPercent = appState.modulesCompleted.length * 25;
    overallPercentageEl.textContent = `${progressPercent}%`;
    overallProgressBarEl.style.width = `${progressPercent}%`;
    badgeCountTextEl.textContent = `${appState.modulesCompleted.length} / 4`;
}

// --- CONTROLE DE AULAS (MODAL) ---
let currentOpenLessonId = null;

function openLessonModal(lessonId) {
    currentOpenLessonId = lessonId;
    const content = lessonsContent[lessonId];
    if (content) {
        lessonTitleEl.textContent = content.title;
        lessonContentEl.innerHTML = content.html;
        
        // Se a lição já foi lida, muda o botão
        if (appState.lessonsRead.includes(lessonId)) {
            finishLessonBtn.textContent = "Lição Concluída (Fechar)";
            finishLessonBtn.classList.replace("btn-primary", "btn-success");
        } else {
            finishLessonBtn.textContent = "Marcar como Concluída";
            finishLessonBtn.classList.replace("btn-success", "btn-primary");
        }
        
        lessonModalEl.classList.add("open");
    }
}

function closeLessonModal() {
    lessonModalEl.classList.remove("open");
    currentOpenLessonId = null;
}

function finishLesson() {
    if (currentOpenLessonId) {
        if (!appState.lessonsRead.includes(currentOpenLessonId)) {
            appState.lessonsRead.push(currentOpenLessonId);
            saveState();
            
            // Adicionar uma notificação legal no chat da Eva informando que a lição foi concluída
            addEvaMessage(`Muito bem! Você concluiu a aula: <em>${lessonsContent[currentOpenLessonId].title}</em>. Continue assim!`);
        }
        closeLessonModal();
        updateUI();
    }
}

// --- CONTROLE DE SIMULAÇÕES (MODAL) ---
function startSimulation(moduleId) {
    // Impedir se o módulo estiver bloqueado
    const modCard = document.getElementById(`modulo-${moduleId}`);
    if (modCard.classList.contains("locked")) return;

    appState.activeSimulationModule = moduleId;
    appState.selectedOptionIndex = null;
    
    const sim = simulationsData[moduleId];
    if (sim) {
        simCaseTextEl.innerHTML = `<h3>${sim.title}</h3><br>${sim.description}`;
        
        // Renderizar opções
        simOptionsEl.innerHTML = "";
        sim.options.forEach((opt, idx) => {
            const btn = document.createElement("button");
            btn.className = "sim-option-card";
            btn.innerHTML = opt.text;
            btn.addEventListener("click", () => selectSimOption(idx));
            simOptionsEl.appendChild(btn);
        });

        // Resetar botões do rodapé
        simFeedbackEl.style.display = "none";
        submitSimBtn.style.display = "inline-block";
        nextModuleBtn.style.display = "none";
        
        simModalEl.classList.add("open");
    }
}

function selectSimOption(index) {
    appState.selectedOptionIndex = index;
    
    // Atualizar visual
    const optionsBtns = simOptionsEl.querySelectorAll(".sim-option-card");
    optionsBtns.forEach((btn, idx) => {
        if (idx === index) {
            btn.classList.add("selected");
        } else {
            btn.classList.remove("selected");
        }
    });
}

function evaluateSimulationAnswer() {
    if (appState.selectedOptionIndex === null) {
        alert("Por favor, selecione uma conduta clínica antes de confirmar.");
        return;
    }

    const sim = simulationsData[appState.activeSimulationModule];
    const selectedOpt = sim.options[appState.selectedOptionIndex];

    simFeedbackEl.style.display = "block";
    
    if (selectedOpt.correct) {
        simFeedbackEl.className = "sim-feedback-panel sim-feedback-success";
        simFeedbackEl.innerHTML = `<strong>Resposta Correta!</strong><br>${selectedOpt.feedback}`;
        
        // Salvar módulo completo
        if (!appState.modulesCompleted.includes(appState.activeSimulationModule)) {
            appState.modulesCompleted.push(appState.activeSimulationModule);
            saveState();
        }

        // Mostrar botão para avançar
        submitSimBtn.style.display = "none";
        nextModuleBtn.style.display = "inline-block";
        
        // Parabenizar via Chat da Eva
        setTimeout(() => {
            addEvaMessage(`🎉 <strong>Parabéns!</strong> Você resolveu o Caso Clínico do Módulo ${appState.activeSimulationModule} com sucesso e desbloqueou uma nova medalha: <em>${document.getElementById(`badge-${appState.activeSimulationModule}`).querySelector('h5').innerText}</em>!`);
        }, 500);

    } else {
        simFeedbackEl.className = "sim-feedback-panel sim-feedback-error";
        simFeedbackEl.innerHTML = `<strong>Decisão Clínica Inadequada:</strong><br>${selectedOpt.feedback}<br><br><em>Dica: Revise as aulas do módulo ou tire suas dúvidas no chat com a Eva ao lado! Tente selecionar outra opção.</em>`;
    }
}

function advanceToNextModule() {
    closeSimModal();
    updateUI();
    
    // Rolar a tela suavemente para o próximo módulo
    const nextModNum = appState.activeSimulationModule + 1;
    const nextModEl = document.getElementById(`modulo-${nextModNum}`);
    if (nextModEl) {
        setTimeout(() => {
            nextModEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

function closeSimModal() {
    simModalEl.classList.remove("open");
    appState.activeSimulationModule = null;
}

// --- LOGICA DE CHAT DA IA EVA ---
function handleUserChatMessage() {
    const text = chatInputEl.value.trim();
    if (!text) return;

    // Adicionar mensagem do usuário no chat
    addUserMessage(text);
    chatInputEl.value = "";

    // Simular digitação da Eva
    showEvaTypingIndicator();

    setTimeout(() => {
        removeEvaTypingIndicator();
        
        // Análise de palavra-chave simples
        const cleanText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let responseText = "";

        // Busca correspondência no banco de diálogos
        let matched = false;
        for (const key in evaResponses) {
            if (cleanText.includes(key)) {
                responseText = evaResponses[key];
                matched = true;
                break;
            }
        }

        if (!matched) {
            // Resposta fallback genérica e didática baseada na prática clínica do SUS
            responseText = `Compreendo sua dúvida sobre "${text}". Na prática de Tecnologia Assistiva do SUS, toda conduta deve priorizar a funcionalidade e a prevenção de deformidades. 
            <br><br>
            Você pode tentar me perguntar sobre palavras-chave específicas como:
            <br>
            • <strong>cadeira de rodas</strong> (tipos e prescrição)
            <br>
            • <strong>órtese AFO</strong> (indicações para pé caído)
            <br>
            • <strong>fluxo</strong> (o caminho da UBS ao CER)
            <br>
            • <strong>escaras</strong> (cuidados posturais e almofadas)`;
        }

        addEvaMessage(responseText);
    }, 1000);
}

function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.className = "chat-message user-msg";
    msg.textContent = text;
    chatContainerEl.appendChild(msg);
    scrollChatToBottom();
}

function addEvaMessage(htmlContent) {
    const msg = document.createElement("div");
    msg.className = "chat-message eva-msg";
    msg.innerHTML = htmlContent;
    chatContainerEl.appendChild(msg);
    scrollChatToBottom();
}

function showEvaTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "chat-message eva-msg typing-indicator-msg";
    indicator.id = "eva-typing-indicator";
    indicator.innerHTML = "<span></span><span></span><span></span>";
    chatContainerEl.appendChild(indicator);
    scrollChatToBottom();
}

function removeEvaTypingIndicator() {
    const indicator = document.getElementById("eva-typing-indicator");
    if (indicator) {
        indicator.remove();
    }
}

function scrollChatToBottom() {
    chatContainerEl.scrollTop = chatContainerEl.scrollHeight;
}
