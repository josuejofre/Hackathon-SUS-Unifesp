# 🎯 Business Model Canvas (BMC) — Digitrilha
> **Solução para o Hackathon Saúde Digital Unifesp 2026**
> **Desafio 2: Educação Digital para Profissionais do SUS** | **Temática: Tecnologia Assistiva (Órteses e Próteses)**

---

## 📐 Estrutura Resumida dos 9 Blocos do Canvas

| Bloco Canvas | Conteúdo Principal |
| :--- | :--- |
| **1. Parcerias-Chave** | • Ministério da Saúde (SGTES/AVASUS)<br>• UNIFESP e Universidades Públicas<br>• Centros Especializados em Reabilitação (CERs)<br>• CONASEMS / COSEMS<br>• Conselhos Profissionais (CREFITO, CFM, COFEN) |
| **2. Atividades-Chave** | • Curadoria de pílulas de microlearning em O&P (3-5 min)<br>• Treinamento RAG da assistente de IA Eva<br>• Desenvolvimento de simuladores RPG 2D e WebXR (VR)<br>• Integração com e-SUS APS, Gov.br e LTI AVASUS |
| **3. Recursos-Chave** | • Base de conhecimento atualizada de normativas e portarias em O&P<br>• Motor de IA Eva (LLM RAG + guardrails de dados sintéticos)<br>• PWA Web/Mobile responsivo e leve (suporte offline)<br>• Equipe multidisciplinar (Fisiatria, IA, EdTech, UX) |
| **4. Proposta de Valor** | • **Profissionais:** Capacitação prática de alta adesão + assistente IA 24/7 no consultório<br>• **Gestores:** Maior resolutividade na UBS, menor fila no CER e economia de recursos públicos<br>• **Pacientes:** Atendimento ágil, prescrição assertiva, prevenção de lesões por pressão e menor taxa de abandono<br>• **Rede SUS:** Interoperabilidade (e-SUS/Gov.br), conformidade LGPD e alta escalabilidade |
| **5. Relacionamento** | • Suporte inteligente 24/7 da Eva (Tutor IA)<br>• Gamificação com badges de competência e micro-credenciamento<br>• Canais diretos de suporte pedagógico e feedback |
| **6. Canais** | • AVASUS e UNA-SUS (LTI Interoperabilidade)<br>• e-SUS APS (Módulo de apoio à decisão - DSS)<br>• PWA / App Digitrilha (Navegador desktop/mobile offline)<br>• Eventos e congressos CONASEMS/COSEMS |
| **7. Segmentos de Clientes** | • **Clientes Compradores (B2G):** Ministério da Saúde, Secretarias Estaduais e Municipais de Saúde<br>• **Usuários Finais:** Médicos da ESF, Fisioterapeutas, Terapeutas Ocupacionais, Enfermeiros e ACS<br>• **Beneficiários Finais:** Pacientes com deficiência (PCD) ou mobilidade reduzida |
| **8. Estrutura de Custos** | • Hospedagem Cloud Serverless, APIs de IA (LLM RAG) e CDN<br>• Desenvolvimento de software (PWA, engine RPG/VR, APIs)<br>• Remuneração de curadores clínicos e designers instrucionais<br>• Governança, suporte B2G e auditorias periódicas LGPD |
| **9. Fontes de Receita** | • Contratos B2G de Educação Permanente em Saúde (Fundo Nacional de Saúde - FNS)<br>• Editais de Inovação & Fomento (FINEP, CNPq, DECIT/MS)<br>• Customização regional de fluxos regulatórios municipais<br>• Parcerias ESG institucionais para fomento educacional |

---

## 🔍 Detalhamento Completo dos 9 Blocos do Canvas

### 1. Parcerias-Chave (Key Partners)
* **Ministério da Saúde (MS / SGTES):** Órgão financiador e validador institucional. Garante a distribuição oficial via AVASUS/UNA-SUS e o alinhamento com a Política Nacional de Educação Permanente em Saúde (PNEPS).
* **UNIFESP & Instituições de Ensino Superior (IES):** Curadoria científica, validação pedagógica dos módulos e garantia de atualização dos protocolos clínicos de Tecnologia Assistiva.
* **Centros Especializados em Reabilitação (CERs):** Apoio na criação dos casos clínicos reais simulados e fornecimento de feedback sobre a melhoria da qualidade dos encaminhamentos vindos da Atenção Primária.
* **CONASEMS e COSEMS:** Conselhos Nacionais e Estaduais de Secretarias Municipais de Saúde, essenciais para a articulação política, adesão dos municípios e escalabilidade do projeto.
* **Conselhos Profissionais de Classe (CREFITO, CFM, COFEN):** Validação técnica das competências e emissão de micro-credenciamentos/certificados com horas de educação continuada.

### 2. Atividades-Chave (Key Activities)
* **Curadoria e Design Instrucional:** Produção contínua de pílulas de conhecimento (3 a 5 minutos) focadas nas necessidades práticas da Atenção Primária (avaliação postura, prescrição de cadeiras de rodas, indicação de AFO/KAFO e adaptação de próteses).
* **Treinamento e Ajuste da Assistente Eva (IA):** Manutenção do pipeline de Retrieval-Augmented Generation (RAG), garantindo respostas precisas embasadas na Portaria de Consolidação nº 2/2017 e diretrizes do SUS.
* **Desenvolvimento de Experiências Gamificadas (RPG 2D / VR):** Manutenção das engines leves de simulação (Phaser.js e A-Frame WebXR) para aprendizado imersivo sem barreiras de hardware.
* **Integração Tecnológica e Interoperabilidade:** Conexão contínua com os ecossistemas do SUS (autenticação Gov.br, integração e-SUS APS e protocolos LTI).
* **Gestão de Engajamento e Indicadores:** Acompanhamento dos dashboards de uso das UBSs, medição do ganho de conhecimento e impacto nos encaminhamentos aos CERs.

### 3. Recursos-Chave (Key Resources)
* **Base de Conhecimento em Tecnologia Assistiva:** Acervo estruturado de diretrizes clínicas, tabelas de dispensação do SUS, manuais de adequação postural e prevenções de complicações.
* **Motor de Inteligência Artificial (Eva):** Infraestrutura RAG segura com guardrails éticos e garantia de não alucinação de conteúdos clínicos.
* **Plataforma Web / PWA Otimizada:** Código-fonte leve em HTML5/JS com suporte a *Service Workers* para navegação fluida em conexões 3G/4G e funcionamento offline.
* **Equipe Multidisciplinar:** Corpo técnico composto por médicos fisiatras, fisioterapeutas especialistas em O&P, engenheiros de IA/software, designers instrucionais e UX designers.

### 4. Proposta de Valor (Value Propositions)
* **Para Profissionais da Atenção Primária (APS):**
  - Capacitação ágil (pílulas de 3 a 5 minutos) que não interrompe a rotina de atendimentos na UBS.
  - Preceptora digital 24/7 (Eva) diretamente no consultório para tirar dúvidas de prescrição e normativas em tempo real.
  - Aprendizado prático e seguro por meio de simulações clínicas gamificadas.
* **Para Gestores da Saúde Pública (MS / SES / SMS):**
  - Aumento expressivo da resolutividade na UBS em demandas de baixa/média complexidade de O&P.
  - Redução drástica de encaminhamentos incorretos/incompletos, encurtando filas nos CERs.
  - Otimização do gasto público pela diminuição do abandono de dispositivos e retrabalho.
* **Para Pacientes do SUS (Pessoas com Deficiência / Mobilidade Reduzida):**
  - Diagnóstico e prescrição corretos logo na primeira consulta na Atenção Primária.
  - Equipamento (cadeira de rodas, órtese ou prótese) perfeitamente adaptado, prevenindo lesões por pressão e dor.
  - Retorno mais rápido à autonomia, mobilidade e inclusão social.
* **Para a Rede SUS:**
  - Plataforma 100% alinhada à LGPD (dados 100% sintéticos em simulações), interoperável com o e-SUS APS e com escalabilidade nacional imediata.

### 5. Relacionamento com Clientes (Customer Relationships)
* **Suporte Contínuo por IA (Tutor Eva):** Relacionamento ativo de mentoria digital durante a realização dos módulos e casos clínicos.
* **Gamificação e Reconhecimento:** Dinâmica de engajamento baseada em pontos de experiência (XP), níveis e desbloqueio de medalhas (*Guardião da Postura*, *Mestre do Encaminhamento*, *Protetor da Pele*).
* **Canais de Feedback Pedagógico:** Comunicação transparente para tirar dúvidas com preceptores humanos e sugerir novos temas de trilha.

### 6. Canais (Channels)
* **AVASUS & UNA-SUS:** Distribuição oficial em formato de micro-cursos e microsserviços LTI para a rede federal de saúde.
* **Integração e-SUS APS:** Acesso direto via botão/módulo de apoio à decisão clínica (DSS) integrado ao prontuário eletrônico.
* **Aplicação Web / PWA Digitrilha:** Acesso direto via navegador em desktops das UBSs, tablets ou smartphones pessoais dos profissionais.
* **Eventos e Redes da Saúde:** Apresentação nos congressos anuais do CONASEMS e COSEMS, encontros estaduais de saúde digital e redes InterPET-Saúde.

### 7. Segmentos de Clientes (Customer Segments)
* **Clientes Compradores / Pagadores (B2G):**
  - Ministério da Saúde (SGTES).
  - Secretarias Estaduais de Saúde (SES) e Secretarias Municipais de Saúde (SMS).
* **Usuários Finais (Beneficiários Diretos da Plataforma):**
  - Médicos da Estratégia Saúde da Família (ESF).
  - Fisioterapeutas e Terapeutas Ocupacionais da Atenção Primária / eSF / eMulti.
  - Enfermeiros e Agentes Comunitários de Saúde (ACS) para identificação precoce no território.
* **Beneficiários Finais (Usuários do SUS):**
  - Pessoas com deficiência física, idosos com mobilidade reduzida, amputados e crianças com Paralisia Cerebral atendidos pela rede pública.

### 8. Estrutura de Custos (Cost Structure)
* **Infraestrutura Tecnológica & Cloud:** Custos de hospedagem serverless, consumo de tokens de API de LLM (RAG), banco de dados e CDN para ativos 3D/VR.
* **Engenharia de Software & Jogos:** Desenvolvimento contínuo do PWA, melhorias na engine Phaser.js (RPG) e A-Frame (VR) e integrações de API.
* **Curadoria e Conteúdo Clínico:** Honorários de especialistas em reabilitação, médicos e designers instrucionais para expansão da matriz curricular.
* **Governança, Suporte & LGPD:** Equipe de gestão de projetos B2G, suporte técnico, treinamento para gestores municipais e auditorias de segurança.

### 9. Fontes de Receita / Financiamento (Revenue Streams)
* **Licenciamento B2G / Contratos de Educação Permanente (EPS):** Assinatura/licenciamento anual por municípios ou estados utilizando recursos do Fundo Nacional de Saúde (FNS - Bloco de Manutenção das Ações e Serviços Públicos de Saúde).
* **Editais de Fomento à Inovação em Saúde:** Recursos a fundo perdido via FINEP, CNPq, DECIT/MS (Departamento de Ciência e Tecnologia) e programas de transformação digital na saúde.
* **Customização Regional de Conteúdo:** Serviços adicionais contratados por secretarias estaduais para adaptação da ferramenta à rede regulatória e fluxos locais.
* **Parcerias ESG de Impacto Social:** Apoio institucional e patrocínio sem conflito de interesses por parte de fundações e empresas de impacto em saúde para expansão de trilhas públicas.

---

## 🚀 Como Utilizar estes Arquivos

1. **PowerPoint (`business_model_canvas_digitrilha.pptx`):**
   - Arquivo de apresentação executiva contendo a capa oficial, o Canvas visual no formato padrão de 9 blocos e o slide de detalhamento estratégico frente ao edital.
   - Pode ser aberto diretamente no Microsoft PowerPoint, Google Slides, LibreOffice ou importado no **Canva** (menu *Importar Arquivo*).

2. **Página Web Interativa (`business_model_canvas.html`):**
   - Abra o arquivo `business_model_canvas.html` em qualquer navegador para visualizar o Canvas com design moderno responsivo, atalhos de impressão em PDF e download do PPTX.

3. **Documento Markdown (`business_model_canvas.md`):**
   - Copie o texto estruturado para colar diretamente no **Miro**, **FigJam**, **Notion** ou no seu documento de proposta do Hackathon.
