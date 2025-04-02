# API Middleware Hub - Projeto de Desenvolvimento de Software
📌 Visão Geral do Projeto
O API Middleware Hub é uma aplicação intermediária que facilita a integração entre sistemas distintos, oferecendo transformação de dados, autenticação avançada e roteamento configurável. Este projeto foi desenvolvido como parte da disciplina de Desenvolvimento de Software, seguindo uma abordagem ágil com entregas iterativas.

🔗 Links Importantes
Repositório de Código: https://github.com/allanpradella/api-middleware-hub

Quadro de Acompanhamento: https://trello.com/w/apimiddlewarehub

Vídeo Demonstração: 

🎯 Objetivos
Objetivos Funcionais
✅ Facilitar a integração entre sistemas heterogêneos

✅ Transformar dados entre formatos JSON distintos

✅ Gerenciar autenticação (OAuth 2.0, Bearer Token, Basic Auth)

✅ Permitir mapeamento visual de campos entre APIs

✅ Oferecer modo automático para fluxos contínuos

✅ Armazenar configurações de conexão para reutilização

Objetivos Não-Funcionais
🔒 Segurança: Proteção de credenciais e tokens

⚡ Performance: Baixa latência nas operações de middleware

📱 Responsividade: Interface acessível em diferentes dispositivos

🔄 Manutenibilidade: Código bem estruturado e documentado

🧩 Extensibilidade: Fácil adição de novos protocolos e formatos

📐 Diagramas e Modelos
Diagrama de Casos de Uso
Diagrama de Casos de Uso

Casos Principais:

Configurar Conexão de Origem

Ator: Administrador

Fluxo: Definir endpoint, método HTTP, autenticação e headers

Mapear Campos de Dados

Ator: Desenvolvedor

Fluxo: Selecionar campos de origem e destino com transformações

Executar Fluxo Automático

Ator: Sistema

Fluxo: Processamento automático sem intervenção humana

Modelo de Domínio
Modelo de Domínio

Diagrama de Classes
Diagrama de Classes

Diagrama de Sequência
Diagrama de Sequência

🖥️ Protótipos de Tela
Configuração de Origem	Mapeamento de Dados	Configuração de Destino
Tela 1	Tela 2	Tela 3
🛠️ Tecnologias Utilizadas
Frontend: HTML5, CSS3, JavaScript (ES6+), Select2

Backend: Node.js, Express.js

Autenticação: OAuth 2.0, JWT, Basic Auth

Controle de Versão: Git/GitHub

Documentação: Markdown, Draw.io (diagramas)

📦 Instalação e Execução
Pré-requisitos
Node.js v16+

NPM v8+

Git

Passo a Passo
Clone o repositório:

bash
Copy
git clone https://github.com/seu-usuario/api-middleware-hub.git
cd api-middleware-hub
Instale as dependências:

bash
Copy
npm install
cd frontend
npm install
Configure as variáveis de ambiente (crie um arquivo .env):

Copy
PORT=3001
OAUTH_CLIENT_ID=seu_client_id
OAUTH_CLIENT_SECRET=seu_client_secret
Inicie a aplicação:

bash
Copy
# Em um terminal:
npm start

# Em outro terminal:
cd frontend
npx serve
Acesse a aplicação:

Copy
http://localhost:3000
🧪 Plano de Testes
Testes de Sistema (SIT)
Teste de Conexão com API de Origem

Cenário: Configuração correta

Resultado Esperado: Dados recebidos com sucesso

Teste de Transformação de Dados

Cenário: Mapeamento de campos aninhados

Resultado Esperado: Estrutura convertida conforme definição

Testes de Aceitação (UAT)
Fluxo Completo Automático

Cenário: Modo automático ativado

Resultado Esperado: Dados são recebidos, processados e enviados sem intervenção

Autenticação OAuth 2.0

Cenário: Configuração completa

Resultado Esperado: Token obtido e utilizado com sucesso

📅 Cronograma de Entrega
Etapa	Descrição	Conclusão
1	Definição do projeto e documentação inicial	01/02
2	Modelagem e protótipos	10/02
3	Primeira iteração funcional	18/02
4	Planos de teste e refinamentos	02/03
5	Segunda iteração com melhorias	15/03
6	Entrega final e demonstração	30/05
✨ Equipe
Allan Pradella Frushio - 10415355

Eduardo Alexandre Rodrigues - 

Felipe Jost Clavé - 

📝 Licença
Este projeto está licenciado sob a MIT License.

Acesso à Aplicação: Disponível por duas semanas a partir de 30/05/2025 em link-de-acesso
Dúvidas: entrar em contato via Issues no repositório
