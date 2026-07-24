// Digitrilha em Tecnologia Assistiva — Lógica do Aplicativo
// 5 Eixos | 14 Unidades | Gamificação | Quebra-Cabeça Interativo | Waze-SUS | Certificado | Efeitos Sonoros Web Audio

const state = {
    completedLessons: new Set(),
    completedSimulations: new Set(),
    completedPuzzles: new Set(),
    userXP: 0,
    userLevel: 1,
    unlockedBadges: new Set(),
    puzzleCurrentPhase: 1,
    currentSimModuleId: null,
    soundEnabled: true
};

// ============================================================================
// SINTETIZADOR DE EFEITOS SONOROS (WEB AUDIO API - ZERO DEPENDÊNCIAS)
// ============================================================================
let audioCtx = null;

function initAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playTone(freq, duration, type = 'sine', gainVal = 0.1) {
    if (!state.soundEnabled) return;
    try {
        initAudioContext();
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.log('Audio synth error:', e);
    }
}

function playClickSound() {
    playTone(1200, 0.05, 'sine', 0.08);
}

function playSuccessSound() {
    playTone(523.25, 0.15, 'sine', 0.1);
    setTimeout(() => playTone(659.25, 0.15, 'sine', 0.1), 100);
    setTimeout(() => playTone(783.99, 0.25, 'sine', 0.12), 200);
}

function playErrorSound() {
    playTone(220, 0.2, 'sawtooth', 0.08);
    setTimeout(() => playTone(207.65, 0.25, 'sawtooth', 0.08), 120);
}

function playLevelUpSound() {
    playTone(261.63, 0.12, 'triangle', 0.12);
    setTimeout(() => playTone(329.63, 0.12, 'triangle', 0.12), 90);
    setTimeout(() => playTone(392.00, 0.12, 'triangle', 0.12), 180);
    setTimeout(() => playTone(523.25, 0.4, 'triangle', 0.15), 270);
}

function playBadgeSound() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        setTimeout(() => playTone(freq, 0.2, 'sine', 0.1), idx * 80);
    });
}

// ============================================================================
// MATRIZ CURRICULAR COMPLETA — 5 EIXOS / 14 UNIDADES
// ============================================================================
const lessonsContent = {
    // EIXO 1
    "E1U1T1": {
        title: "1.1 O que é Tecnologia Assistiva",
        html: `<p><strong>Tecnologia Assistiva (TA)</strong> é uma área do conhecimento interprofissional que engloba produtos, recursos, metodologias, estratégias, práticas e serviços para promover a funcionalidade, independência, autonomia e inclusão social de pessoas com deficiência ou mobilidade reduzida.</p><h4>Base Legal (Lei 13.146/2015 — LBI)</h4><p>A Lei Brasileira de Inclusão da Pessoa com Deficiência (LBI) garante o acesso universal e gratuito a recursos de TA no SUS como um direito humano fundamental.</p>`
    },
    "E1U1T2": {
        title: "1.2 O que são OPM",
        html: `<p><strong>OPM</strong> é a sigla oficial do SUS para <em>Órteses, Próteses e Meios Auxiliares de Locomoção</em>, previstos na Tabela de Procedimentos do SIGTAP.</p><ul><li><strong>Órteses:</strong> Dispositivos aplicados a um segmento corporal existente para alinhar, imobilizar ou melhorar a função.</li><li><strong>Próteses:</strong> Equipamentos destinados a substituir total ou parcialmente um membro ausente.</li><li><strong>Meios Auxiliares:</strong> Recursos de deslocamento como cadeiras de rodas, andadores e bengalões.</li></ul>`
    },
    "E1U1T3": {
        title: "1.3 Diferença entre Órtese, Prótese e Recurso Auxiliar",
        html: `<p><strong>Órtese (ex: AFO, Colete de Boston):</strong> Suporta, alinha, previne deformidades ou compensa a fraqueza em um segmento corporal existente.</p><p><strong>Prótese (ex: Prótese Transtibial):</strong> Substitui a estrutura anatômica e função biomecânica de um membro amputado.</p><p><strong>Recurso Auxiliar (ex: Cadeira de Rodas Postural):</strong> Amplia a mobilidade física e permite participação nas Atividades da Vida Diária (AVDs).</p>`
    },
    "E1U1T4": {
        title: "1.4 Quem participa do processo de cuidado",
        html: `<p>O cuidado em Tecnologia Assistiva no SUS é centrado na pessoa e demanda atuação multiprofissional:</p><ul><li><strong>Atenção Primária (UBS / eMulti):</strong> Identificação precoce na comunidade, triagem funcional, orientação à família e acompanhamento domiciliar.</li><li><strong>Atenção Especializada (CER):</strong> Avaliação médica/fisioterapêutica/terapêutica ocupacional especializada, moldagem, prescrição e dispensação.</li><li><strong>Usuário e Família:</strong> Protagonistas que definem as prioridades de uso no seu cotidiano.</li></ul>`
    },
    "E1U1T5": {
        title: "1.5 OPM no contexto do SUS",
        html: `<p>A provisão no SUS é regulada pela <strong>Rede de Cuidados à Pessoa com Deficiência (RCPD)</strong> (Portaria MS nº 2/2017). O fluxo integra a Atenção Primária ao SISREG e aos Centros Especializados em Reabilitação (CER).</p>`
    },
    "E1U2T1": {
        title: "2.1 Função vs Estrutura Corporal (CIF)",
        html: `<p>A <strong>Classificação Internacional de Funcionalidade, Incapacidade e Saúde (CIF)</strong> da OMS ensina que a incapacidade não é apenas uma doença, mas a interação entre limitações no corpo e o ambiente:</p><ul><li><strong>Estrutura Corporal:</strong> Alteração anatômica (ex: hipotrofia muscular ou amputação).</li><li><strong>Função Corporal:</strong> Impacto fisiológico (ex: perda de força dorsiflexora ou instabilidade no pé).</li><li><strong>Atividade e Participação:</strong> Capacidade de caminhar, trabalhar ou ir à feira.</li></ul>`
    },
    "E1U2T2": {
        title: "2.2 Objetivo Terapêutico na Prescrição",
        html: `<p>Toda OPM deve ser prescrita com metas claras e mensuráveis (Metas SMART): <em>Prevenir deformidades? Permitir transferência independente? Reduzir gasto energético durante a marcha?</em></p>`
    },
    "E1U2T3": {
        title: "2.3 Participação e Autonomia",
        html: `<p>O sucesso da prescrição é medido pelo ganho de <strong>autonomia e participação social</strong> do indivíduo em seu território, e não apenas pelo alinhamento mecânico do dispositivo.</p>`
    },
    "E1U2T4": {
        title: "2.4 Barreiras Ambientais",
        html: `<p>Avaliar o ambiente de vida do paciente é indispensável: largura de portas, presença de degraus, inclinação de rampas, tipo de piso e facilidade de acesso ao transporte público local.</p>`
    },
    "E1U2T5": {
        title: "2.5 Adesão ao Tratamento e Prevenção de Abandono",
        html: `<p>Dispositivos pesados, desconfortáveis ou desalinhados com a realidade da família são frequentemente abandonados. A adesão exige escuta atenta, orientação de uso progressivo e revisões periódicas.</p>`
    },

    // EIXO 2
    "E2U3T1": {
        title: "3.1 Investigação da Demanda & Escuta na UBS",
        html: `<p>A acolhida na UBS deve mapear o histórico da lesão, queixa funcional principal, expectativas do paciente e disponibilidade de cuidador antes do encaminhamento regulado.</p>`
    },
    "E2U3T2": {
        title: "3.2 Exame Biomecânico e Funcional",
        html: `<p>Exame físico voltado para OPM inclui: amplitude de movimento (ADM) articular, teste de força muscular, classificação de tônus espástico (Escala de Ashworth) e integridade da pele.</p>`
    },
    "E2U3T3": {
        title: "3.3 Análise da Rotina Domiciliar e Comunitária",
        html: `<p>Entender como o paciente se desloca em casa (cadeira, arrasto, marcha com apoio) orienta a escolha precisa entre um meio auxiliar simples ou uma cadeira postural com reclinamento.</p>`
    },
    "E2U3T4": {
        title: "3.4 Critérios de Encaminhamento Regulado (SISREG)",
        html: `<p>Para aprovação no SISREG, o laudo emitido pela UBS deve conter: diagnóstico funcional detalhado, objetivo terapêutico específico, código SIGTAP pretendido e laudo médico assinado.</p>`
    },
    "E2U4T1": {
        title: "4.1 Indicações Clínicas e Funcionais Frequentes",
        html: `<p>Indica-se OPM em quadros de: instabilidade articular por fraqueza muscular, hipertonia espástica flexível, encurtamento miotendíneo, amputações e lesões medulares.</p>`
    },
    "E2U4T2": {
        title: "4.2 Contraindicações Formais e Deformidades Rígidas",
        html: `<p>Contraindica-se a força de correção em deformidades ósseas fixadas/rígidas (que geram dor e úlceras se forçadas), lesões cutâneas ativas na área de contato ou falta de suporte familiar em dependência grave.</p>`
    },
    "E2U4T3": {
        title: "4.3 Metas de Curto vs Longo Prazo",
        html: `<p><strong>Curto Prazo:</strong> Cicatrização do coto, alívio de dor e proteção articular.<br><strong>Longo Prazo:</strong> Treino de marcha independente, retorno ao trabalho e participação comunitária.</p>`
    },
    "E2U4T4": {
        title: "4.4 Alinhamento de Expectativas com a Família",
        html: `<p>Explicar claramente os limites funcionais do equipamento evita frustrações. O alinhamento transparente reforça a parceria entre a equipe de saúde e o usuário.</p>`
    },
    "E2U5T1": {
        title: "5.1 Os 5 Erros Frequentes na Provisão de OPM",
        html: `<p>Estudos indicam que o abandono de OPM no SUS ocorre por: 1) Prescrição sem objetivo claro; 2) Falta de avaliação ambiental; 3) Erro no tamanho da peça; 4) Falta de treino de uso; 5) Ausência de retorno de seguimento.</p>`
    },
    "E2U5T2": {
        title: "5.2 Ignorar o Ambiente Domiciliar e Acessibilidade",
        html: `<p>Prescrever uma cadeira de rodas larga para um paciente cujas portas do banheiro medem 60 cm inviabiliza o uso diário, gerando o imediato encostamento do equipamento.</p>`
    },
    "E2U5T3": {
        title: "5.3 Prescrever sem Avaliar Espasticidade e Pele",
        html: `<p>Aplicar apoio rígido sobre proeminências ósseas em pacientes espásticos sem alívio de pressão gera hiperemia imediata e rápida evolução para úlceras por pressão (escaras).</p>`
    },
    "E2U5T4": {
        title: "5.4 Falta de Reavaliação e Seguimento Longitudinal",
        html: `<p>Uma OPM dispensada não é o fim do tratamento. Sem consultas periódicas de reavaliação, perdem-se os ajustes necessários ao longo da evolução clínica do paciente.</p>`
    },

    // EIXO 3
    "E3U6T1": {
        title: "6.1 Objetivos Biomecânicos das Órteses",
        html: `<p>As órteses atuam sobre o sistema musculoesquelético para: <strong>Estabilizar</strong> segmentos instáveis, <strong>Posicionar</strong> em postura funcional, <strong>Corrigir</strong> deformidades flexíveis e <strong>Aliviar carga</strong> articular.</p>`
    },
    "E3U6T2": {
        title: "6.2 Sistema de 3 Pontos de Pressão Biomecânica",
        html: `<p>Princípio biomecânico fundamental: aplica-se uma força principal de correção no ápice da curva/deformidade e duas forças de oposição nas extremidades opostas para controle articular estático.</p>`
    },
    "E3U6T3": {
        title: "6.3 Materiais Moldáveis (Termoplásticos)",
        html: `<p>Termoplásticos de baixa temperatura amolecem entre 60°C e 70°C e são moldados diretamente no paciente. Termoplásticos de alta temperatura (Polipropileno) exigem molde em gesso e aquecimento a 180°C.</p>`
    },
    "E3U7T1": {
        title: "7.1 Órteses de Membro Inferior (AFO, KAFO, GRAFO)",
        html: `<p><strong>AFO (Tornozelo-Pé):</strong> Estabiliza o tornozelo e previne o arrasto do pé na marcha.<br><strong>KAFO (Joelho-Tornozelo-Pé):</strong> Indicada quando há fraqueza associada do quadríceps.<br><strong>GRAFO:</strong> Utiliza o apoio anterior de tíbia para controlar a curvatura em flexão do joelho.</p>`
    },
    "E3U7T2": {
        title: "7.2 Órteses de Membro Superior (MMSS)",
        html: `<p><strong>Cock-up de Punho:</strong> Mantém a extensão funcional do punho nas paralisias nervosas.<br><strong>Órtese de Repouso para Mão:</strong> Mantém a abertura da arcada palmar em pacientes hemiplégicos espásticos.</p>`
    },
    "E3U7T3": {
        title: "7.3 Órteses de Coluna (Colete de Boston, TLSO)",
        html: `<p>Indicados para o tratamento conservador de escolioses idiopáticas em jovens em crescimento (curvas entre 20° e 40° Cobb) ou para apoio postural em deformidades paralíticas de tronco.</p>`
    },
    "E3U8T1": {
        title: "8.1 Exopróteses vs Endopróteses",
        html: `<p><strong>Exopróteses:</strong> Dispositivos externos aplicados ao coto de amputação.<br><strong>Endopróteses:</strong> Implantes cirúrgicos internos (ex: prótese total de quadril ou joelho).</p>`
    },
    "E3U8T2": {
        title: "8.2 Componentes Protéticos (Membro Inferior)",
        html: `<p>Uma prótese transtibial compreende: 1) <strong>Soquete/Encaixe:</strong> Interface de carga;<br>2) <strong>Liner de Silicone:</strong> Conforto e adesão;<br>3) <strong>Adaptadores/Tubos:</strong> Alinhamento;<br>4) <strong>Pé Protético:</strong> Absorção de impacto (ex: Pé SACH ou de fibra de carbono).</p>`
    },
    "E3U8T3": {
        title: "8.3 Meios Auxiliares de Locomoção",
        html: `<p>Cadeiras de rodas (padrão, postural ou motorizada), andadores e bengalas expandem a base de apoio do corpo e distribuem as forças de reação do solo durante a locomoção.</p>`
    },

    // EIXO 4
    "E4U9T1": {
        title: "9.1 Moldagem Negativa com Atadura Gessada",
        html: `<p>No método tradicional, o técnico aplica ataduras gessadas sobre o membro do paciente para capturar o formato anatômico exato (obtenção do molde negativo).</p>`
    },
    "E4U9T2": {
        title: "9.2 Preenchimento e Modelo Positivo em Gesso",
        html: `<p>O molde negativo é preenchido com gesso líquido. Após a secagem, retira-se a casca externa obtendo-se a réplica exata do membro (modelo positivo de gesso).</p>`
    },
    "E4U9T3": {
        title: "9.3 Retificação Manual e Termoformagem sob Vácuo",
        html: `<p>O modelo positivo é esculpido manualmente para alívio de proeminências ósseas e preenchimento de pontos de pressão. Em seguida, a placa de polipropileno aquecida é termoformada a vácuo sobre ele.</p>`
    },
    "E4U10T1": {
        title: "10.1 Escaneamento Anatômico 3D sem Gesso",
        html: `<p>No fluxo digital moderno, um scanner 3D óptico ou de luz estruturada captura as coordenadas tridimensionais do membro do paciente em poucos segundos, sem necessidade de sujeira ou gesso.</p>`
    },
    "E4U10T2": {
        title: "10.2 Modelagem CAD Personalizada",
        html: `<p>O modelo tridimensional do paciente é importado em um software CAD (ex: Blender, Fusion 360). O projetista desenha a órtese sob medida, aplicando espessuras, janelas de alívio e ranhuras de ventilação.</p>`
    },
    "E4U10T3": {
        title: "10.3 Fatiamento CAM e Impressão FDM em TPU",
        html: `<p>O arquivo CAD é fatiado em código G-code e impresso em 3D. Materiais flexíveis como **TPU (Poliuretano Termoplástico)** oferecem memória elástica incomparável para órteses dinâmicas e sob medida.</p>`
    },
    "E4U11T1": {
        title: "11.1 Matriz Comparativa: Gesso vs Impressão 3D",
        html: `<table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:0.88rem;"><tr style="background:#e0f2fe; color:#004f9f; text-align:left;"><th>Atributo</th><th>Gesso Tradicional</th><th>Manufatura 3D</th></tr><tr><td><strong>Conforto na Coleta</strong></td><td>Molde gessado frio/sujo</td><td>Scanner óptico sem contato</td></tr><tr><td><strong>Armazenamento</strong></td><td>Ocupa espaço físico</td><td>Arquivo digital CAD na nuvem</td></tr><tr><td><strong>Reimpressão</strong></td><td>Exige nova moldagem</td><td>Reimpressão direta com 1 clique</td></tr></table>`
    },
    "E4U11T2": {
        title: "11.2 Repositório Digital CAD e Reimpressão",
        html: `<p>Com o arquivo digital armazenado no prontuário do e-SUS, caso a órtese seja danificada ou necessite de ajuste de tamanho, o laboratório pode imprimir uma nova peça sem que o paciente precise retornar para ser moldado.</p>`
    },
    "E4U11T3": {
        title: "11.3 Aceitação do Usuário e Personalização Estética",
        html: `<p>Órteses 3D permitem padronagens vazadas mais leves, respiráveis e personalizadas com cores escolhidas pelas crianças, reduzindo significativamente o estigma visual e o abandono.</p>`
    },

    // EIXO 5
    "E5U12T1": {
        title: "12.1 Condução da Prova Física e Ajustes",
        html: `<p>Na sessão de entrega da OPM, realiza-se a prova estática e dinâmica: verificar estabilidade de marcha, fixação dos velcros, facilidade de colocação e alinhamento dos eixos mecânicos com os eixos anatômicos.</p>`
    },
    "E5U12T2": {
        title: "12.2 Inspeção Cutânea e Prevenção de Escaras",
        html: `<p>Após 15 minutos de uso inicial, remover a OPM e inspecionar a pele. Áreas de hiperemia (vermelhidão) que não somem após 15 minutos indicam **ponto de pressão excessiva** e exigem desgaste/alívio imediato no dispositivo.</p>`
    },
    "E5U12T3": {
        title: "13.3 Orientação de Uso Gradual e Higiene",
        html: `<p>Instruir o paciente a adotar um esquema gradual de uso: 2 horas no 1º dia, aumentando 1 hora por dia até o uso contínuo, além de orientar a limpeza com sabão neutro e secagem à sombra.</p>`
    },
    "E5U13T1": {
        title: "13.1 Protocolo de Acompanhamento no SUS",
        html: `<p>Recomenda-se acompanhamento longitudinal em 30, 90 e 180 dias após a dispensação para verificar se os objetivos terapêuticos iniciais estão sendo atingidos no cotidiano do usuário.</p>`
    },
    "E5U13T2": {
        title: "13.2 Monitoramento de Crescimento Infantil",
        html: `<p>Em crianças, o crescimento físico rápido exige monitoramento constante para substituição da órtese antes que o comprimento reduzido cause lesões na pele ou deformidades compensatórias.</p>`
    },
    "E5U13T3": {
        title: "13.3 Manutenção Preventiva de Componentes",
        html: `<p>Substituição periódica de velcros desgastados, substituição de solados de EVA, alinhamento de articulações de joelho/tornozelo e lubrificação de peças móveis.</p>`
    },
    "E5U14T1": {
        title: "14.1 Caso 1: José Carlos (73 anos, AVC, Pé Caído & AFO)",
        html: `<p>Paciente idoso pós-AVC com espasticidade leve de tríceps sural e marcha em ceifa. Decisão clínica: prescrição de AFO articulada com bloqueio da flexão plantar a 90° e treino de marcha na UBS.</p>`
    },
    "E5U14T2": {
        title: "14.2 Caso 2: Sofia (6 anos, Paralisia Cerebral Espástica)",
        html: `<p>Criança com equinismo flexível bilateral durante a marcha. Decisão clínica: AFOs rígidas noturnas para ganho de ADM e AFOs dinâmicas em TPU 3D diurnas para estipular apoio de calcanhar.</p>`
    },
    "E5U14T3": {
        title: "14.3 Caso 3: Ana Paula (34 anos, Amputação Transradial & 3D)",
        html: `<p>Trabalhadora autônoma com amputação de antebraço. Decisão clínica: prótese cosmética e funcional impressa em 3D com encaixe ajustável em TPU e garra mecânica acionada por cabo de tração de ombro.</p>`
    }
};


const simulationsData = {
    1: {
        moduleId: 1,
        title: "Quiz Unidade 1 — Tecnologia Assistiva & OPM no SUS",
        description: "Qual das afirmativas sobre Tecnologia Assistiva (TA) no SUS é VERDADEIRA?",
        options: [
            { text: "A TA refere-se apenas a dispositivos físicos e exclui serviços.", correct: false, feedback: "Incorreto. Pela LBI, TA inclui produtos, metodologias, práticas e serviços." },
            { text: "Toda OPM faz parte do campo da Tecnologia Assistiva, que engloba também outros recursos.", correct: true, feedback: "Excelente! OPM é um subgrupo essencial de Tecnologia Assistiva." }
        ]
    },
    2: {
        moduleId: 2,
        title: "Quiz Unidade 2 — Funcionalidade & Avaliação CIF",
        description: "Ao prescrever uma OPM para um paciente pós-AVC que mora sozinho, qual deve ser a prioridade segundo a CIF?",
        options: [
            { text: "Independência funcional na marcha e segurança nas Atividades da Vida Diária (AVDs).", correct: true, feedback: "Perfeito! A prioridade é garantir autonomia com segurança." },
            { text: "Apenas a estética do dispositivo.", correct: false, feedback: "A funcionalidade e a segurança vêm em primeiro lugar." }
        ]
    },
    3: {
        moduleId: 3,
        title: "Quiz Unidade 3 — Avaliação Inicial & Triagem UBS",
        description: "Qual elemento NÃO pode faltar no laudo de solicitação de OPM encaminhado ao SISREG?",
        options: [
            { text: "Descrição clara da limitação funcional e do objetivo terapêutico pretendido.", correct: true, feedback: "Exato! Sem justificativa funcional a regulação não aprova o pedido." },
            { text: "Apenas a marca comercial do fabricante.", correct: false, feedback: "No SUS prescreve-se por código da Tabela SIGTAP." }
        ]
    },
    4: {
        moduleId: 4,
        title: "Quiz Unidade 4 — Critérios para Prescrever OPM",
        description: "Qual é o significado de 'Objetivo de curto prazo' na prescrição de OPM?",
        options: [
            { text: "Resultado esperado nas primeiras etapas do tratamento (ex: estabilização e alívio de dor).", correct: true, feedback: "Gabarito Oficial! O objetivo de curto prazo busca ganhos nas etapas iniciais." },
            { text: "Duração estimada de utilização da OPM ao longo de anos.", correct: false, feedback: "Isso se refere ao Tempo Previsto de Uso." }
        ]
    },
    5: {
        moduleId: 5,
        title: "Quiz Unidade 5 — Erros Comuns na Prescrição",
        description: "Qual é considerado um dos ERROS mais prejudiciais que levam ao abandono da OPM?",
        options: [
            { text: "Prescrever o recurso sem definir um objetivo funcional claro e sem avaliar o ambiente de vida.", correct: true, feedback: "Gabarito Oficial! Gera alto índice de abandono do equipamento." },
            { text: "Realizar o acompanhamento longitudinal do paciente.", correct: false, feedback: "Acompanhar é essencial para garantir o uso correto." }
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
        title: "Quiz Unidade 7 — Tipos de Órteses",
        description: "Para uma adolescente com escoliose idiopática (curva de 32° Cobb, Risser 2), qual a indicação correta?",
        options: [
            { text: "Colete de Boston (TLSO) para tratamento conservador tridimensional.", correct: true, feedback: "Correto! Colete de Boston é o padrão para escoliose em fase de crescimento." },
            { text: "Colar cervical rígido.", correct: false, feedback: "Incorreto." }
        ]
    },
    8: {
        moduleId: 8,
        title: "Quiz Unidade 8 — Componentes de Próteses",
        description: "Qual componente da prótese distribui a pressão no coto residual do paciente?",
        options: [
            { text: "Encaixe (Socket).", correct: true, feedback: "Exato! O soquete é a interface de transmissão de carga." },
            { text: "Pé protético SACH.", correct: false, feedback: "Incorreto." }
        ]
    },
    9: {
        moduleId: 9,
        title: "Quiz Unidade 9 — Fabricação Tradicional",
        description: "No método tradicional de produção de OPM, como é obtido o modelo positivo?",
        options: [
            { text: "Por vazamento de gesso dentro da atadura gessada moldada no paciente.", correct: true, feedback: "Correto! Vazamento de gesso pedra." },
            { text: "Por fatiamento CAM em impressora 3D.", correct: false, feedback: "Isso faz parte do fluxo 3D." }
        ]
    },
    10: {
        moduleId: 10,
        title: "Quiz Unidade 10 — Fluxo Digital e Impressão 3D",
        description: "Qual filamento deve ser selecionado para obter elasticidade e conforto em órteses dinâmicas?",
        options: [
            { text: "TPU (Poliuretano Termoplástico flexível).", correct: true, feedback: "Perfeito! O TPU oferece flexibilidade e memória elástica." },
            { text: "PLA rígido.", correct: false, feedback: "PLA é rígido." }
        ]
    },
    11: {
        moduleId: 11,
        title: "Quiz Unidade 11 — Comparação de Métodos de Produção",
        description: "Qual a principal vantagem do Fluxo Digital em termos de reposição do dispositivo?",
        options: [
            { text: "Salvamento do arquivo CAD 3D em nuvem para reimpressão direta sem nova moldagem no paciente.", correct: true, feedback: "Excelente! Elimina o desconforto de moldar o paciente novamente." },
            { text: "O arquivo digital se apaga após a impressão.", correct: false, feedback: "Incorreto." }
        ]
    },
    12: {
        moduleId: 12,
        title: "Quiz Unidade 12 — Prova, Adaptação e Sinais Cutâneos",
        description: "Após 15 min de uso da órtese, o usuário apresenta vermelhidão no maléolo. Qual a conduta?",
        options: [
            { text: "Realizar o alívio de pressão local na peça antes de liberar o uso definitivo.", correct: true, feedback: "Correto! Evita a formação de úlceras por pressão." },
            { text: "Orientar o uso contínuo mesmo com dor.", correct: false, feedback: "Conduta perigosa." }
        ]
    },
    13: {
        moduleId: 13,
        title: "Quiz Unidade 13 — Seguimento Clínico no SUS",
        description: "Criança em crescimento usando AFO há 10 meses refere dor nos dedos. Qual a conduta?",
        options: [
            { text: "Reavaliar o comprimento anatômico e confeccionar nova órtese dimensionada.", correct: true, feedback: "Exato! Crianças em crescimento necessitam de troca periódica." },
            { text: "Cortar a ponta da órtese sem reavaliar.", correct: false, feedback: "Incorreto." }
        ]
    },
    14: {
        moduleId: 14,
        title: "🎯 Árvore de Decisão — Caso Integrador Final",
        description: "Paciente José Carlos, 73 anos (pós-AVC, pé caído, espasticidade leve). Indicaria AFO articulada neste momento?",
        options: [
            { text: "Sim. A AFO articulada compensa o déficit de dorsiflexão, previne o pé equino e reduz o risco de quedas.", correct: true, feedback: "Decisão Clínica Correta! Parabéns por concluir a Digitrilha em Tecnologia Assistiva!" },
            { text: "Não. Aguardar sem intervenção na Atenção Primária.", correct: false, feedback: "Incorreto." }
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
    setupWazeSUS();
    setupCertificate();
    setupSoundToggle();
    setupThemeToggle();
    updateUIProgress();
}

function setupViewNavigation() {
    const navTrilha = document.getElementById('nav-btn-trilha');
    const navConquistas = document.getElementById('nav-btn-conquistas');
    const navWaze = document.getElementById('nav-btn-waze');
    const navCert = document.getElementById('nav-btn-cert');

    if (navTrilha) navTrilha.addEventListener('click', () => { playClickSound(); showView('trilha'); });
    if (navConquistas) navConquistas.addEventListener('click', () => { playClickSound(); showView('conquistas'); });
    if (navWaze) navWaze.addEventListener('click', () => { playClickSound(); showView('waze'); });
    if (navCert) navCert.addEventListener('click', () => { playBadgeSound(); openCertModal(); });
}

function showView(viewName) {
    const trilhaView = document.getElementById('trilha-view');
    const conquistasView = document.getElementById('conquistas-view');
    const wazeView = document.getElementById('waze-view');

    const navTrilha = document.getElementById('nav-btn-trilha');
    const navConquistas = document.getElementById('nav-btn-conquistas');
    const navWaze = document.getElementById('nav-btn-waze');

    [trilhaView, conquistasView, wazeView].forEach(v => v?.classList.remove('active-view'));
    [navTrilha, navConquistas, navWaze].forEach(n => n?.classList.remove('active'));

    if (viewName === 'trilha') {
        trilhaView?.classList.add('active-view');
        navTrilha?.classList.add('active');
    } else if (viewName === 'conquistas') {
        conquistasView?.classList.add('active-view');
        navConquistas?.classList.add('active');
    } else if (viewName === 'waze') {
        wazeView?.classList.add('active-view');
        navWaze?.classList.add('active');
    }
}

function setupLessonButtons() {
    document.querySelectorAll('.btn-read-lesson').forEach(btn => {
        btn.addEventListener('click', () => {
            playClickSound();
            const lessonItem = btn.closest('.lesson-item');
            const lessonId = lessonItem.getAttribute('data-lesson-id');
            openLessonModal(lessonId);
        });
    });

    document.getElementById('btn-close-lesson')?.addEventListener('click', () => { playClickSound(); closeLessonModal(); });
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
        document.getElementById('lesson-modal-title').innerText = "Aula da Digitrilha";
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
        playSuccessSound();
        addXP(50);

        // Atualizar o item de aula na tela
        const lessonItem = document.querySelector(`.lesson-item[data-lesson-id="${currentActiveLessonId}"]`);
        if (lessonItem) {
            const icon = lessonItem.querySelector('.lesson-status-icon');
            if (icon) {
                icon.style.backgroundColor = '#059669';
                icon.innerHTML = '✓';
                icon.style.color = 'white';
                icon.style.fontSize = '9px';
                icon.style.display = 'flex';
                icon.style.alignItems = 'center';
                icon.style.justifyContent = 'center';
            }
            const btn = lessonItem.querySelector('.btn-read-lesson');
            if (btn) {
                btn.innerText = 'Concluído ✓';
                btn.style.background = '#d1fae5';
                btn.style.color = '#059669';
                btn.style.borderColor = '#10b981';
            }
        }

        checkBadges();
        updateUIProgress();
        closeLessonModal();
    }
}

function setupSimulationButtons() {
    document.querySelectorAll('.btn-start-simulation, .btn-simulation').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            playClickSound();

            let moduleId = btn.getAttribute('data-module-id');
            if (!moduleId) {
                const card = btn.closest('.modulo-card');
                if (card) {
                    const cardId = card.getAttribute('id');
                    if (cardId) moduleId = cardId.replace('modulo-', '');
                }
            }

            if (moduleId) {
                openSimulationModal(parseInt(moduleId, 10));
            } else {
                console.error('Module ID not found for simulation button');
            }
        });
    });

    document.getElementById('btn-close-sim')?.addEventListener('click', () => { playClickSound(); closeSimModal(); });
}

let selectedSimOption = null;

function openSimulationModal(moduleId) {
    state.currentSimModuleId = moduleId;
    selectedSimOption = null;

    const simData = simulationsData[moduleId];
    const modal = document.getElementById('simulation-modal');
    const titleEl = document.getElementById('sim-title');
    const descEl = document.getElementById('sim-case-text');
    const optionsBox = document.getElementById('sim-options');
    const feedbackBox = document.getElementById('sim-feedback');
    const btnSubmit = document.getElementById('btn-submit-sim');

    if (feedbackBox) feedbackBox.style.display = 'none';

    if (!simData) return;

    if (simData.isPuzzleLauncher) {
        closeSimModal();
        openPuzzleModal();
        return;
    }

    if (titleEl) titleEl.innerText = simData.title;
    if (descEl) descEl.innerText = simData.description;

    if (optionsBox) {
        optionsBox.innerHTML = '';
        simData.options.forEach(opt => {
            const btnOpt = document.createElement('button');
            btnOpt.className = 'sim-option-btn';
            btnOpt.innerText = opt.text;
            btnOpt.addEventListener('click', () => {
                playClickSound();
                document.querySelectorAll('.sim-option-btn').forEach(b => {
                    b.style.borderColor = 'var(--border-color)';
                    b.style.background = 'var(--bg-secondary)';
                });
                btnOpt.style.borderColor = 'var(--primary)';
                btnOpt.style.background = 'var(--primary-light)';
                selectedSimOption = opt;
                handleSimAnswer(opt, feedbackBox);
            });
            optionsBox.appendChild(btnOpt);
        });
    }

    if (btnSubmit) {
        btnSubmit.innerText = 'Confirmar Decisão Clínica';
        btnSubmit.onclick = () => {
            playClickSound();
            if (!selectedSimOption) {
                alert("Por favor, escolha uma das alternativas antes de confirmar sua decisão clínica.");
                return;
            }
            handleSimAnswer(selectedSimOption, feedbackBox);
            btnSubmit.innerText = 'Concluído ✓';
            setTimeout(() => {
                closeSimModal();
            }, 1200);
        };
    }

    modal?.classList.add('open');
}

function handleSimAnswer(option, feedbackBox) {
    if (!feedbackBox || !option) return;
    feedbackBox.style.display = 'block';
    if (option.correct) {
        playSuccessSound();
        feedbackBox.className = 'sim-feedback-panel feedback-correct';
        feedbackBox.innerHTML = `<strong>✅ Decisão Clínica Correta!</strong><p>${option.feedback}</p>`;
        
        if (state.currentSimModuleId) {
            state.completedSimulations.add(state.currentSimModuleId);
            addXP(100);
            checkBadges();
            updateUIProgress();
        }
    } else {
        playErrorSound();
        feedbackBox.className = 'sim-feedback-panel feedback-incorrect';
        feedbackBox.innerHTML = `<strong>❌ Atenção ao Diagnóstico!</strong><p>${option.feedback}</p>`;
    }
}

function closeSimModal() {
    document.getElementById('simulation-modal')?.classList.remove('open');
}

function openPuzzleModal() {
    state.puzzleCurrentPhase = 1;
    const modal = document.getElementById('puzzle-modal');
    modal?.classList.add('open');
    renderPuzzlePhase();
}

function renderPuzzlePhase() {
    const phaseData = puzzleData.find(p => p.phase === state.puzzleCurrentPhase);
    if (!phaseData) return;

    document.getElementById('puzzle-phase-num').innerText = phaseData.phase;
    document.getElementById('puzzle-question-text').innerText = phaseData.question;
    
    const optsContainer = document.getElementById('puzzle-options-list');
    const feedbackEl = document.getElementById('puzzle-assembly-area');
    if (feedbackEl) feedbackEl.style.display = 'none';
    if (optsContainer) optsContainer.innerHTML = '';

    phaseData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'sim-option-btn';
        btn.innerText = opt.text;
        btn.addEventListener('click', () => {
            if (opt.correct) {
                playSuccessSound();
                if (feedbackEl) {
                    feedbackEl.style.display = 'block';
                    document.getElementById('puzzle-assembly-icon').innerText = phaseData.icon;
                    document.getElementById('puzzle-assembly-title').innerText = `Fase ${phaseData.phase} Concluída! (${phaseData.pieceName})`;
                    document.getElementById('puzzle-assembly-desc').innerText = opt.desc;
                }

                state.completedPuzzles.add(phaseData.phase);
                addXP(75);

                const btnNext = document.getElementById('btn-next-puzzle-phase');
                if (btnNext) {
                    btnNext.onclick = () => {
                        playClickSound();
                        if (state.puzzleCurrentPhase < 8) {
                            state.puzzleCurrentPhase++;
                            renderPuzzlePhase();
                        } else {
                            playBadgeSound();
                            alert("🎉 Parabéns! Você concluiu todas as 8 Fases do Quebra-Cabeça de OPMs!");
                            document.getElementById('puzzle-modal')?.classList.remove('open');
                            checkBadges();
                            updateUIProgress();
                        }
                    };
                }
            } else {
                playErrorSound();
                alert("❌ Peça Incompatível. Tente novamente!");
            }
        });
        optsContainer?.appendChild(btn);
    });
}

function setupPuzzleModal() {
    document.getElementById('btn-close-puzzle')?.addEventListener('click', () => {
        playClickSound();
        document.getElementById('puzzle-modal')?.classList.remove('open');
    });
}

// ============================================================================
// WAZE-SUS: MAPEAMENTO COLABORATIVO REGIONAL (MODELO SÃO JOSÉ DOS CAMPOS)
// ============================================================================
function setupWazeSUS() {
    const btnOpen = document.getElementById('btn-open-relatar');
    const btnClose = document.getElementById('btn-close-relatar');
    const modal = document.getElementById('relatar-modal');
    const btnSubmit = document.getElementById('btn-submit-relato');

    btnOpen?.addEventListener('click', () => { playClickSound(); modal?.classList.add('open'); });
    btnClose?.addEventListener('click', () => { playClickSound(); modal?.classList.remove('open'); });

    btnSubmit?.addEventListener('click', submitRelatoWaze);
}

function submitRelatoWaze() {
    const uf = document.getElementById('waze-uf')?.value || 'SP';
    const municipio = document.getElementById('waze-municipio')?.value.trim() || 'São José dos Campos';
    const categoria = document.getElementById('waze-categoria')?.value || 'SISREG';
    const descricao = document.getElementById('waze-descricao')?.value.trim();

    if (!descricao) {
        alert("Por favor, descreva como funciona o fluxo na sua região antes de enviar.");
        return;
    }

    playSuccessSound();
    document.getElementById('waze-relato-form').style.display = 'none';
    document.getElementById('waze-feedback-sent').style.display = 'block';

    // Adicionar Card Dinâmico no Mural Waze-SUS
    const grid = document.getElementById('waze-reports-grid');
    if (grid) {
        const card = document.createElement('div');
        card.style.cssText = "background: #f0fdf4; border: 2px solid #10b981; border-radius: 14px; padding: 20px; box-shadow: var(--shadow-sm); animation: fadeIn 0.4s ease;";
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="background: #d1fae5; color: #047857; font-weight: 700; font-size: 0.8rem; padding: 4px 10px; border-radius: 12px;">📍 ${municipio} — ${uf}</span>
                <span style="color: #d97706; font-size: 0.8rem; font-weight: 700;">⏳ Em Análise da Curadoria</span>
            </div>
            <h4 style="font-size: 1rem; color: var(--color-slate); margin-bottom: 6px;">${categoria} — Relato Colaborativo Waze-SUS</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">"${descricao}"</p>
            <div style="margin-top: 14px; font-size: 0.78rem; color: var(--text-muted); display: flex; justify-content: space-between;">
                <span>Por: Dr. João Paulo (Você)</span>
                <span>👍 Recém-enviado</span>
            </div>
        `;
        grid.prepend(card);
    }
}

// ============================================================================
// CERTIFICADO DIGITAL & MICRO-CREDENCIAMENTO
// ============================================================================
function setupCertificate() {
    const btnClose = document.getElementById('btn-close-cert');
    btnClose?.addEventListener('click', () => { playClickSound(); document.getElementById('cert-modal')?.classList.remove('open'); });
}

function openCertModal() {
    const modal = document.getElementById('cert-modal');
    modal?.classList.add('open');
}

function setupSoundToggle() {
    const btnSound = document.getElementById('sound-toggle');
    if (btnSound) {
        btnSound.addEventListener('click', () => {
            state.soundEnabled = !state.soundEnabled;
            btnSound.innerText = state.soundEnabled ? '🔊' : '🔇';
            if (state.soundEnabled) playSuccessSound();
        });
    }
}

function addXP(amount) {
    state.userXP += amount;
    const nextLevelXP = state.userLevel * 300;
    if (state.userXP >= nextLevelXP) {
        state.userLevel++;
        playLevelUpSound();
    }
}

function checkBadges() {
    if (state.completedSimulations.has(1)) state.unlockedBadges.add('badge-1');
    if (state.completedSimulations.has(2)) state.unlockedBadges.add('badge-2');
    if (state.completedPuzzles.size >= 8) state.unlockedBadges.add('badge-3');
    if (state.completedSimulations.size >= 5) state.unlockedBadges.add('badge-4');

    state.unlockedBadges.forEach(bId => {
        const badgeEl = document.getElementById(bId);
        if (badgeEl && badgeEl.classList.contains('locked')) {
            badgeEl.classList.remove('locked');
            playBadgeSound();
        }
    });
}

function updateUIProgress() {
    const totalModules = 14;
    const completedCount = state.completedSimulations.size;
    const pct = Math.round((completedCount / totalModules) * 100);

    const pctText = document.getElementById('overall-percentage');
    const barFill = document.getElementById('overall-progress-bar');
    
    if (pctText) pctText.innerText = `${pct}%`;
    if (barFill) barFill.style.width = `${pct}%`;

    state.completedSimulations.forEach(mId => {
        const card = document.getElementById(`modulo-${mId}`);
        if (card) {
            const badge = card.querySelector('.status-badge');
            if (badge) {
                badge.className = 'status-badge status-concluido';
                badge.innerText = 'Concluído';
            }
        }
    });
}

function setupEvaFloatingWidget() {
    const evaTrigger = document.getElementById('eva-floating-widget');
    const evaBox = document.getElementById('eva-chat-popup');
    const btnClose = document.getElementById('btn-close-eva-popup');
    const btnSend = document.getElementById('btn-send-eva');
    const inputEva = document.getElementById('eva-input');
    const messagesBox = document.getElementById('chat-container');

    if (evaTrigger && evaBox) {
        evaTrigger.addEventListener('click', () => {
            playClickSound();
            evaBox.style.display = evaBox.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    if (btnClose) {
        btnClose.addEventListener('click', (e) => {
            e.stopPropagation();
            playClickSound();
            if (evaBox) evaBox.style.display = 'none';
        });
    }

    function sendEvaMessage() {
        const text = inputEva.value.trim();
        if (!text) return;

        playClickSound();
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user-msg';
        userMsg.innerText = text;
        messagesBox.appendChild(userMsg);

        inputEva.value = '';
        messagesBox.scrollTop = messagesBox.scrollHeight;

        setTimeout(() => {
            playSuccessSound();
            const evaMsg = document.createElement('div');
            evaMsg.className = 'chat-message eva-msg';
            evaMsg.innerHTML = getEvaAIResponse(text);
            messagesBox.appendChild(evaMsg);
            messagesBox.scrollTop = messagesBox.scrollHeight;
        }, 600);
    }

    if (btnSend) btnSend.addEventListener('click', sendEvaMessage);
    if (inputEva) {
        inputEva.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendEvaMessage();
        });
    }
}

function getEvaAIResponse(userText) {
    const txt = userText.toLowerCase();
    if (txt.includes('afo') || txt.includes('pé caído') || txt.includes('avc')) {
        return "<strong>E.V.A.:</strong> A órtese AFO (Tornozelo-Pé) é indicada para compensar a fraqueza dos dorsiflexores no pós-AVC, estabilizando o tornozelo durante a fase de balanço da marcha.";
    } else if (txt.includes('cadeira') || txt.includes('rodas') || txt.includes('postural')) {
        return "<strong>E.V.A.:</strong> Para pacientes com alterações posturais severas ou espasticidade, prescreva cadeiras posturais com almofada anti-escaras (código SIGTAP 07.01.03) para prevenir úlceras por pressão.";
    } else if (txt.includes('3d') || txt.includes('impressão') || txt.includes('scanner')) {
        return "<strong>E.V.A.:</strong> O fluxo 3D utiliza escaneamento anatômico sem gesso, modelagem CAD e impressão em filamentos como TPU flexível. Permite salvar o arquivo na nuvem para reimpressão direta!";
    } else if (txt.includes('cer') || txt.includes('sisreg') || txt.includes('encaminhamento')) {
        return "<strong>E.V.A.:</strong> Na Atenção Primária, a triagem via SISREG exige laudo detalhado com diagnóstico funcional e o objetivo terapêutico antes do encaminhamento ao CER.";
    } else {
        return "<strong>E.V.A.:</strong> Olá! Posso tirar suas dúvidas sobre prescrição de OPM, legislação do SUS (Portaria 2/2017), critérios de avaliação ou impressão 3D em Tecnologia Assistiva!";
    }
}

function setupThemeToggle() {
    const btnTheme = document.getElementById('theme-toggle');
    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            playClickSound();
            document.body.classList.toggle('dark-theme');
            btnTheme.innerText = document.body.classList.contains('dark-theme') ? '🌙' : '☀️';
        });
    }
}