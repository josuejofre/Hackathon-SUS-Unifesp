# 🎮 SUSAssist: Estratégia de Inovação — RPG Imersivo + Realidade Virtual

> Documento de análise e planejamento para evolução da plataforma SUSAssist além do e-learning tradicional,
> inspirado no [AWS Cloud Quest](https://cloudquest.skillbuilder.aws/) e em experiências de VR educacional.

---

## 1. Contexto e Motivação

O protótipo atual do SUSAssist (`prototipo/index.html`) é uma plataforma de microlearning sólida com trilha de módulos, chat com a E.V.A. e simulação clínica. Para se destacar no Hackathon Saúde Digital Unifesp 2026 e impactar a banca avaliadora, foi avaliada a possibilidade de adicionar uma **camada de imersão gamificada** — transformando a experiência de aprendizado em algo próximo a um RPG educativo ou uma simulação em realidade virtual.

A inspiração principal foi o **AWS Cloud Quest**, um RPG 3D isométrico da Amazon que ensina computação em nuvem por meio de missões, personagens e progressão de habilidades — e que levou uma equipe da AWS **meses** para construir em sua versão completa.

---

## 2. Avaliação de Viabilidade por Abordagem

### 2.1 🎮 RPG 2D Top-Down (Estilo CloudQuest Simplificado)

**Tecnologia recomendada:** Phaser.js 3 + HTML/CSS/JS puro (sem build, via CDN)

| Critério | Avaliação |
|----------|-----------|
| **Viabilidade em hackathon** | ✅ Alta — Phaser.js é maduro, documentado e roda offline |
| **Impressão visual na banca** | 🔥🔥🔥🔥 Muito alta — ninguém apresentará isso |
| **Risco técnico** | 🟢 Baixo — sem dependência de servidor ou hardware externo |
| **Tempo estimado (demo)** | ~8h de desenvolvimento focado |
| **Funciona offline?** | ✅ Sim — essencial para o dia do pitch |
| **Precisa de hardware especial?** | ❌ Não — abre em qualquer navegador |

**O que entrega:**
- Mapa 2D top-down de uma UBS (sala de espera, consultório, corredor)
- Fisioterapeuta/médico como personagem jogável no mapa
- 3 pacientes interativos com balões de missão pulsantes
- Sistema de diálogo estilo visual novel com os pacientes
- Desafios clínicos reais (prescrição de cadeira de rodas, órtese AFO/KAFO)
- Sistema de XP, level-up e desbloqueio de badges
- E.V.A. como NPC tutora que aparece para corrigir erros e explicar acertos

**Fluxo do jogador:**
```
Tela de abertura narrativa
  "Você é Dr. João, fisioterapeuta da UBS Ipiranga.
   Hoje você tem 3 pacientes aguardando avaliação..."
        ↓
Mapa da UBS (top-down 2D interativo)
        ↓
Clica no Paciente 1 (ícone pulsante)
        ↓
Diálogo: "Dona Maria, 72 anos, AVC há 6 meses..."
        ↓
Desafio clínico: "Qual a cadeira de rodas correta?"
        ↓
✅ Acerto → Badge + XP + animação de celebração
❌ Erro   → E.V.A. explica + nova tentativa
        ↓
Conclusão → Tela de resultado com estatísticas
```

---

### 2.2 🥽 Cena de Realidade Virtual (WebXR via A-Frame)

**Tecnologia recomendada:** A-Frame (HTML puro, CDN, zero instalação)

| Critério | Avaliação |
|----------|-----------|
| **Viabilidade em hackathon** | ✅ Média-Alta — A-Frame torna VR surpreendentemente acessível |
| **Impressão visual na banca** | 🔥🔥🔥🔥🔥 Máxima — é disruptivo para saúde pública no Brasil |
| **Risco técnico** | 🟡 Médio — 3D tem curva de aprendizado, mas A-Frame é HTML puro |
| **Tempo estimado (demo)** | ~2h para 1 cena funcional |
| **Funciona offline?** | ⚠️ Precisa de servidor local (python -m http.server) |
| **Precisa de hardware especial?** | ⚠️ Opcional — funciona no celular, desktop e óculos VR |

**Compatibilidade:**
| Dispositivo | Experiência |
|-------------|-------------|
| 🖥️ Desktop (Chrome/Firefox) | Mouse drag para olhar ao redor — totalmente funcional |
| 📱 Smartphone Android/iOS | Giroscópio para mover a câmera — modo Google Cardboard |
| 🥽 Meta Quest 2/3 | Browser WebXR nativo — experiência VR completa |
| 🥽 Google Cardboard | Qualquer celular com giroscópio + papelão |

**O que entrega (1 cena de demonstração):**
- Consultório de UBS em 3D (paredes, janela, mesa, cadeira de rodas 3D)
- Paciente sentado à frente (mannequin 3D simplificado)
- 3 hotspots clicáveis com informação clínica (esferas flutuantes coloridas)
- Narração pela E.V.A. via Web Speech API (voz sintética do browser)
- Transição para o quiz ao clicar nos hotspots

**Por que é poderoso para o pitch:**
> Colocar o celular no Google Cardboard e "entrar" no consultório da UBS durante uma apresentação para a banca avaliadora é um **momento inesquecível** que nenhuma outra equipe terá. Custa R$0 extras e leva ~2h para implementar.

---

### 2.3 🥽 Óculos VR Dedicados (Unity/Unreal Engine)

| Critério | Avaliação |
|----------|-----------|
| **Viabilidade em hackathon** | ❌ Inviável — exige semanas/meses de desenvolvimento |
| **Risco técnico** | 🔴 Muito alto |
| **Custo de hardware** | R$ 2.000–5.000+ (Meta Quest 3) |
| **Recomendação** | ❌ Não recomendado para o hackathon |

> Desenvolver para Unity/Unreal com óculos VR dedicados é o que grandes empresas fazem com equipes de 10+ pessoas por meses. Para demonstração em hackathon, o A-Frame WebXR entrega 80% da impressão com 5% do esforço.

---

## 3. Estratégia Recomendada: O Modelo Híbrido

Para maximizar o impacto no pitch **sem comprometer a estabilidade do que já existe**, a recomendação é o **modelo híbrido em duas camadas**:

```
┌─────────────────────────────────────────────────────────┐
│              SUSAssist — Plataforma Completa             │
│                                                          │
│  ┌──────────────────────┐  ┌──────────────────────────┐  │
│  │   Trilha de E-Learning│  │    🎮 Modo RPG Imersivo  │  │
│  │   (já existe)         │  │    (novo, Phaser.js)     │  │
│  │                      │  │                          │  │
│  │  • Módulos teóricos  │  │  • Mapa da UBS 2D        │  │
│  │  • Quiz formativos   │  │  • Pacientes interativos │  │
│  │  • Chat com E.V.A.   │  │  • Casos clínicos reais  │  │
│  │  • Badges            │  │  • XP e level-up         │  │
│  └──────────────────────┘  └──────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │         🥽 Modo VR — "Wow Moment" do Pitch        │    │
│  │         (A-Frame, 1 cena, celular/óculos)         │    │
│  └──────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### Por que não substituir o e-learning pelo RPG?

- O e-learning é **escalável** — qualquer profissional da APS pode usar sem onboarding
- O RPG é **imersivo** — ideal para o pitch e para casos de uso intensivos (residentes, treinamentos municipais)
- A VR é o **diferencial de inovação** — demonstra visão de futuro sem ser o produto principal
- A banca avaliará **impacto clínico** (o e-learning serve mais usuários) e **inovação** (o RPG/VR impressiona)

---

## 4. Arquitetura de Implementação

### Arquivos a criar (sem destruir o que existe)

```
prototipo/
├── index.html      ← EXISTENTE ✅ (adicionar só o botão "Modo RPG")
├── style.css       ← EXISTENTE ✅ (não mexe)
├── app.js          ← EXISTENTE ✅ (não mexe)
│
├── rpg.html        ← NOVO 🆕 (shell Phaser.js fullscreen)
├── rpg.js          ← NOVO 🆕 (lógica do RPG: cenas, diálogos, quiz)
├── rpg.css         ← NOVO 🆕 (HUD, diálogos, animações)
│
└── vr.html         ← NOVO 🆕 (cena A-Frame WebXR — arquivo único)
```

### Cenas do RPG (Phaser.js)

| Cena | Descrição |
|------|-----------|
| `BootScene` | Loading com narrativa de abertura |
| `IntroScene` | Cutscene: "Você foi designado para a UBS Ipiranga..." |
| `MapScene` | Mapa top-down da UBS — ponto central do jogo |
| `DialogScene` | Diálogo visual novel com o paciente |
| `QuizScene` | Desafio clínico com opções de escolha |
| `FeedbackScene` | E.V.A. explica acerto ou erro |
| `VictoryScene` | Badge desbloqueado + XP + estatísticas |

### Casos Clínicos do RPG (baseados no backlog SUSA-19)

| Missão | Paciente | Desafio Principal |
|--------|----------|-------------------|
| Missão 1 | Dona Maria, 72 anos — AVC há 6 meses | Prescrever cadeira de rodas correta + almofada anti-escara |
| Missão 2 | Lucas, 8 anos — Paralisia Cerebral espástica | Indicar órtese AFO bilateral para treino de marcha |
| Missão 3 | Roberto, 45 anos — Amputação transtibial | Encaminhar corretamente para CER + prótese provisória |

---

## 5. Cronograma de Implementação (Para o Hackathon)

| Bloco | Atividade | Tempo |
|-------|-----------|-------|
| 🏗️ **Setup** | Criar `rpg.html` + carregar Phaser.js + CSS base | 1h |
| 🗺️ **Mapa** | Desenhar UBS top-down programaticamente no Phaser | 2h |
| 💬 **Diálogos** | Sistema de diálogos + 3 casos clínicos completos | 3h |
| 🏆 **Gamificação** | XP, badges, animações de celebração | 1h |
| 🥽 **VR** | Cena A-Frame do consultório 3D | 2h |
| 🔗 **Integração** | Botão no `index.html` → `rpg.html` e `vr.html` | 30min |
| 🧪 **Testes** | Testar fluxo completo + VR no celular | 30min |
| **Total** | | **~10h** |

---

## 6. Roteiro do Pitch com as Demos

### Sequência recomendada para o pitch (12 minutos)

```
[0:00–2:00] Problema
  → Dados de abandono de equipamentos, encaminhamentos incorretos
  
[2:00–4:00] Solução: SUSAssist
  → Mostrar o index.html — trilha, E.V.A., badges
  
[4:00–7:00] 🎮 DEMO RPG (ao vivo)
  → Abrir rpg.html no laptop
  → "Agora deixe-me mostrar o Modo Imersivo..."
  → Percorrer missão 1: Dona Maria → prescrição → badge
  
[7:00–8:30] 🥽 DEMO VR (wow moment)
  → "E para profissionais em treinamento intensivo..."
  → Passar o celular com o vr.html para a banca
  → "Você acabou de entrar no consultório da UBS"
  
[8:30–10:00] Impacto e escalabilidade
  → Integração AVASUS, Gov.br, CNES
  
[10:00–12:00] Time e roadmap
```

---

## 7. Perguntas em Aberto

> [!IMPORTANT]
> **Q1 — Hardware VR:** A equipe tem acesso a óculos VR (Meta Quest 2/3) ou Google Cardboard para o dia do pitch? Isso define se a demo VR pode ser feita ao vivo.

> [!IMPORTANT]
> **Q2 — Controle do personagem:** O RPG deve usar movimento WASD (mais imersivo, mais complexo) ou point-and-click/visual novel (mais rápido de implementar, igualmente impressionante)?

> [!TIP]
> **Recomendação:** Point-and-click é a escolha certa para o hackathon. O jogador clica no paciente para interagir, sem precisar controlar movimento. Reduz a complexidade técnica em ~40% e o resultado final é igualmente impressionante para a banca.

> [!NOTE]
> **Q3 — Idioma da narração VR:** A voz da E.V.A. via Web Speech API funciona bem em português no Chrome. Deve-se usar voz sintética automática ou gravar áudio real?

---

## 8. Referências e Inspirações

| Referência | Por que é relevante |
|------------|---------------------|
| [AWS Cloud Quest](https://cloudquest.skillbuilder.aws/) | RPG 3D isométrico de aprendizado — inspiração principal |
| [Phaser.js](https://phaser.io/) | Engine de jogos 2D para web mais madura e documentada |
| [A-Frame](https://aframe.io/) | Framework WebVR/WebXR em HTML puro — zero configuração |
| [Mozilla Hubs](https://hubs.mozilla.com/) | Espaços VR colaborativos — referência para VR educacional |
| [UNA-SUS / AVASUS](https://www.unasus.gov.br/) | Plataforma oficial de capacitação do MS — integração futura |

---

*Documento gerado em: 23/06/2026 | Projeto: Hackathon Saúde Digital Unifesp 2026*
