// Configuração inicial
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa Select2
  $('.select2').select2();
  
  // Carrega configurações salvas
  loadSavedConfig();
  
  // Configura listeners
  setupEventListeners();
  
  // Atualiza a seção de autenticação baseada na seleção
  document.getElementById('authType').addEventListener('change', updateAuthSection);
  updateAuthSection(); // Executa inicialmente
});

// Variáveis globais
let currentAuthConfig = {};
let flows = [];

// Configura os listeners de eventos
function setupEventListeners() {
  // Adicionar headers
  document.getElementById('addHeader').addEventListener('click', addHeaderRow);
  
  // Buscar dados
  document.getElementById('fetchBtn').addEventListener('click', fetchData);
  
  // Enviar dados
  document.getElementById('sendBtn').addEventListener('click', sendToDestination);
  
  // Salvar fluxo
  document.getElementById('saveFlow').addEventListener('click', saveFlow);
  
  // Modo automático
  document.getElementById('autoMode').addEventListener('change', function(e) {
    localStorage.setItem('autoMode', e.target.checked);
  });
  
  // Carrega o modo automático salvo
  if (localStorage.getItem('autoMode') === 'true') {
    document.getElementById('autoMode').checked = true;
  }
}

// Atualiza a seção de autenticação baseada no tipo selecionado
function updateAuthSection() {
  const authType = document.getElementById('authType').value;
  const authSection = document.getElementById('authConfigSection');
  
  authSection.innerHTML = '<h2>Configuração de Autenticação</h2>';
  
  switch(authType) {
    case 'bearer':
      authSection.innerHTML += `
        <div class="form-group">
          <label>Token:</label>
          <input type="password" id="bearerToken" placeholder="Insira seu token Bearer">
        </div>
      `;
      break;
      
    case 'oauth2':
      authSection.innerHTML += `
        <div class="form-group">
          <button id="configureOAuth" class="btn-primary">Configurar OAuth 2.0</button>
        </div>
      `;
      document.getElementById('configureOAuth').addEventListener('click', showOAuthModal);
      break;
      
    case 'basic':
      authSection.innerHTML += `
        <div class="form-group">
          <label>Usuário:</label>
          <input type="text" id="basicUser" placeholder="Usuário">
        </div>
        <div class="form-group">
          <label>Senha:</label>
          <input type="password" id="basicPass" placeholder="Senha">
        </div>
      `;
      break;
  }
}

// Mostra o modal de configuração OAuth
function showOAuthModal() {
  const modal = document.getElementById('oauthModal');
  const oauthForm = document.getElementById('oauthForm');
  
  oauthForm.innerHTML = `
    <div class="form-group">
      <label>Client ID:</label>
      <input type="text" id="oauthClientId" value="${currentAuthConfig.clientId || ''}">
    </div>
    <div class="form-group">
      <label>Client Secret:</label>
      <input type="password" id="oauthClientSecret" value="${currentAuthConfig.clientSecret || ''}">
    </div>
    <div class="form-group">
      <label>Authorization URL:</label>
      <input type="url" id="oauthAuthUrl" value="${currentAuthConfig.authUrl || ''}">
    </div>
    <div class="form-group">
      <label>Token URL:</label>
      <input type="url" id="oauthTokenUrl" value="${currentAuthConfig.tokenUrl || ''}">
    </div>
    <div class="form-group">
      <label>Scope:</label>
      <input type="text" id="oauthScope" value="${currentAuthConfig.scope || ''}">
    </div>
    <button id="saveOAuth" class="btn-primary">Salvar Configuração</button>
    <button id="testOAuth" class="btn-secondary">Testar Conexão</button>
  `;
  
  document.getElementById('saveOAuth').addEventListener('click', saveOAuthConfig);
  document.getElementById('testOAuth').addEventListener('click', testOAuthConnection);
  
  modal.style.display = 'block';
  
  // Fechar modal
  document.querySelector('.close').addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Função para buscar dados da API de origem
document.getElementById('fetchBtn').addEventListener('click', async () => {
  const method = document.getElementById('method').value;
  const url = document.getElementById('sourceUrl').value;
  const bodyText = document.getElementById('requestBody').value;
  
  try {
    const body = bodyText ? JSON.parse(bodyText) : null;
    
    const response = await fetch('http://localhost:3001/api/fetch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method, url, body })
    });

    if (!response.ok) throw new Error('Erro na requisição');

    const data = await response.json();
    document.getElementById('responseOutput').textContent = JSON.stringify(data, null, 2);
    
    // Cria campos e já envia se automático estiver ligado
    createVariableFields(data.data, autoMode);
    
  } catch (error) {
    console.error('Erro:', error);
    alert(`Erro ao buscar dados: ${error.message}`);
  }
});

// Função para criar campos de variáveis
function createVariableFields(data, shouldAutoSend = false) {
  const container = document.getElementById('variableFields');
  container.innerHTML = '';

  if (!data) return;

  const processObject = (obj, parentKey = '') => {
    for (const key in obj) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'object' && value !== null) {
        // Se for objeto, processa recursivamente
        processObject(value, fullKey);
      } else {
        // Cria campos para valores não-objetos
        const div = document.createElement('div');
        div.className = 'variable-row';
        div.innerHTML = `
          <label>${fullKey}:</label>
          <input type="text" class="varValue" data-key="${fullKey}" value="${value}">
          <select class="varAction">
            <option value="ignore">Ignorar</option>
            <option value="send" selected>Enviar para destino</option>
          </select>
        `;
        container.appendChild(div);
      }
    }
  };

  processObject(data);

  // Envio automático
  if (shouldAutoSend && document.getElementById('destinationUrl').value) {
    setTimeout(() => {
      document.getElementById('sendBtn').click();
    }, 500);
  }
}

// Função para enviar dados ao destino
document.getElementById('sendBtn').addEventListener('click', async () => {
  const destinationUrl = document.getElementById('destinationUrl').value;
  
  if (!destinationUrl) {
    alert('Por favor, informe a URL de destino');
    return;
  }

  try {
    const mappedData = {};
    const valueInputs = document.querySelectorAll('.varValue');

    valueInputs.forEach(input => {
      const key = input.dataset.key;
      const action = input.nextElementSibling.value;
      
      if (action === 'send') {
        // Processa caminhos aninhados (ex: 'headers.Accept')
        const keys = key.split('.');
        let current = mappedData;
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = input.value;
      }
    });

    const response = await fetch('http://localhost:3001/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destinationUrl, mappedData })
    });

    if (!response.ok) throw new Error('Erro no envio');

    showNotification('✅ Dados enviados com sucesso!');
    
  } catch (error) {
    console.error('Erro:', error);
    showNotification(`❌ Erro ao enviar: ${error.message}`, 'error');
  }
});

// Função para mostrar notificações
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}