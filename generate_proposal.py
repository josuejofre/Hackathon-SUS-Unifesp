import re
import subprocess
import os

def main():
    md_file = "sugestoes_hackathon.md"
    html_file = "sugestoes_hackathon.html"
    
    print("Convertendo Markdown para HTML usando Pandoc...")
    # Executa o Pandoc para converter o MD para HTML standalone
    try:
        subprocess.run(["pandoc", md_file, "-s", "--metadata", "title=SUSAssist - Proposta de Solução", "-o", html_file], check=True)
    except Exception as e:
        print(f"Erro ao rodar o Pandoc: {e}")
        return
        
    if not os.path.exists(html_file):
        print("Arquivo HTML não foi gerado.")
        return
        
    print("Injetando estilos premium e scripts de renderização do Mermaid...")
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # 1. Substituir blocos de código mermaid gerados pelo Pandoc para formato compatível com Mermaid JS
    # Pandoc gera: <pre class="mermaid"><code>...</code></pre>
    # Mermaid JS quer: <div class="mermaid">...</div>
    pattern = re.compile(r'<pre\s+class="mermaid"><code>(.*?)</code></pre>', re.DOTALL)
    
    def replace_mermaid(match):
        code_content = match.group(1)
        # Limpar entidades HTML comuns se houver
        code_content = code_content.replace('&quot;', '"').replace('&gt;', '>').replace('&lt;', '<').replace('&amp;', '&')
        return f'<div class="mermaid">{code_content}</div>'
        
    content = pattern.sub(replace_mermaid, content)
    
    # 2. Injetar a biblioteca Mermaid JS no Head
    mermaid_script = """
    <!-- Carrega o Mermaid JS para renderizar o diagrama no navegador -->
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            mermaid.initialize({
                startOnLoad: true,
                theme: 'default',
                securityLevel: 'loose',
                flowchart: { useMaxWidth: true, htmlLabels: true }
            });
        });
    </script>
    """
    
    # 3. Injetar CSS Premium no Head para visualização e impressão limpa
    custom_style = """
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #004f9f;
            --accent: #00a599;
            --text-color: #1e293b;
            --bg-color: #ffffff;
            --border-color: #e2e8f0;
        }
        body {
            font-family: 'Inter', sans-serif;
            color: var(--text-color);
            background-color: var(--bg-color);
            line-height: 1.6;
            max-width: 900px;
            margin: 40px auto;
            padding: 0 24px;
        }
        h1, h2, h3, h4 {
            font-family: 'Outfit', sans-serif;
            color: #0f172a;
            margin-top: 1.8em;
            margin-bottom: 0.6em;
            font-weight: 700;
        }
        h1 {
            font-size: 2.2rem;
            border-bottom: 2px solid var(--primary);
            padding-bottom: 12px;
            color: var(--primary);
            margin-top: 0;
        }
        h2 {
            font-size: 1.6rem;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 8px;
            color: #0f172a;
        }
        h3 {
            font-size: 1.25rem;
            color: var(--accent);
        }
        blockquote {
            background-color: #f8fafc;
            border-left: 4px solid var(--primary);
            padding: 12px 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
            font-style: italic;
        }
        code {
            font-family: monospace;
            background-color: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.9em;
        }
        pre {
            background-color: #f1f5f9;
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
            border: 1px solid var(--border-color);
        }
        pre code {
            background-color: transparent;
            padding: 0;
        }
        ul, ol {
            margin-left: 24px;
            margin-bottom: 16px;
        }
        li {
            margin-bottom: 8px;
        }
        hr {
            border: 0;
            border-top: 1px solid var(--border-color);
            margin: 40px 0;
        }
        
        /* Estilos do Bloco Mermaid */
        .mermaid {
            display: flex;
            justify-content: center;
            margin: 32px 0;
            background: #f8fafc;
            padding: 24px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }
        
        /* Otimizações de Impressão (PDF) */
        @media print {
            body {
                margin: 20px;
                max-width: 100%;
                font-size: 11pt;
            }
            h1, h2, h3 {
                page-break-after: avoid;
            }
            pre, blockquote, .mermaid {
                page-break-inside: avoid;
            }
            hr {
                margin: 20px 0;
            }
        }
    </style>
    """
    
    # Injetar no head
    content = content.replace("</head>", f"{custom_style}\n{mermaid_script}\n</head>")
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("HTML gerado com sucesso!")

if __name__ == "__main__":
    main()
