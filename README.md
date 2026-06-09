# SUSAssist: Capacitação Permanente em Tecnologia Assistiva (Órteses e Próteses)

Este repositório contém o projeto desenvolvido para o **Hackathon Saúde Digital Unifesp 2026**, abordando o **Desafio 2: Educação Digital para Profissionais do SUS** na temática de **Tecnologia Assistiva (Órteses e Próteses)**.

A solução consiste em uma plataforma de microlearning adaptativo e simulações clínicas com suporte de Inteligência Artificial para qualificar os profissionais da Atenção Primária à Saúde (APS) na prescrição e acompanhamento de tecnologias assistivas.

---

## 📂 Estrutura do Repositório

* **`/prototipo`**: Pasta contendo a aplicação web interativa (HTML, CSS, JS e Assets) do protótipo da trilha de aprendizado e da assistente Eva.
* **`sugestoes_hackathon.md`**: Proposta teórica e conceitual detalhada da solução contendo justificativa, pilares e alinhamento com os critérios do edital (Impacto, Viabilidade, LGPD, Escalabilidade).
* **`.github/workflows/static.yml`**: Workflow automático de GitHub Actions para implantar o protótipo diretamente no GitHub Pages.

---

## 🚀 Como Hospedar no seu GitHub Pages (Passo a Passo)

Para publicar o protótipo e disponibilizar o link funcional para a banca do Hackathon, siga os passos abaixo:

### Passo 1: Inicializar o repositório Git localmente
Caso ainda não tenha o repositório inicializado no seu computador, abra o terminal na pasta deste projeto e execute:
```bash
git init
git add .
git commit -m "feat: initial commit com proposta e prototipo do SUSAssist"
```

### Passo 2: Criar o repositório no GitHub e enviar os arquivos
1. Acesse o seu [GitHub](https://github.com) e crie um novo repositório (ex: `hackathon-sus-assist`). **Deixe-o como Público**.
2. No seu terminal, vincule o repositório local ao GitHub e envie os arquivos (substitua `seu-usuario` e `nome-do-repositorio` com os seus dados):
```bash
git branch -M main
git remote add origin https://github.com/seu-usuario/nome-do-repositorio.git
git push -u origin main
```

### Passo 3: Configurar o GitHub Pages para usar o GitHub Actions
Como criamos um fluxo automatizado que publica apenas a pasta `/prototipo` (evitando publicar arquivos auxiliares como PDFs ou vídeos no link da página), você precisa ativar a fonte de publicação correta no GitHub:

1. Vá até a página do seu repositório no **GitHub**.
2. Clique na aba **Settings** (Configurações) no topo.
3. No menu lateral esquerdo, clique em **Pages**.
4. Sob a seção **Build and deployment**, na opção **Source**, mude de *Deploy from a branch* para **GitHub Actions**.

Pronto! Assim que você mudar para **GitHub Actions**, o workflow configurado em `.github/workflows/static.yml` será disparado automaticamente. 

Para acompanhar o progresso ou pegar o link:
1. Clique na aba **Actions** no topo do seu repositório.
2. Você verá o fluxo `Deploy static content to Pages` rodando.
3. Quando terminar (ficar verde), clique no job e você verá o link público gerado (ex: `https://seu-usuario.github.io/nome-do-repositorio/`).

---

## 💻 Como Executar o Protótipo Localmente

Se quiser rodar o protótipo localmente em seu computador antes de subir para o GitHub:

1. Tenha o [Node.js](https://nodejs.org) instalado.
2. Abra o terminal na pasta do projeto e inicie um servidor estático (como o `http-server`):
   ```bash
   npx http-server ./prototipo -p 3000
   ```
3. Abra o navegador no endereço: **`http://localhost:3000`**
