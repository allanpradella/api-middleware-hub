// Gerencia configurações de autenticação
function saveOAuthConfig() {
    currentAuthConfig = {
      clientId: document.getElementById('oauthClientId').value,
      clientSecret: document.getElementById('oauthClientSecret').value,
      authUrl: document.getElementById('oauthAuthUrl').value,
      tokenUrl: document.getElementById('oauthTokenUrl').value,
      scope: document.getElementById('oauthScope').value
    };
    
    localStorage.setItem('oauthConfig', JSON.stringify(currentAuthConfig));
    showNotification('Configuração OAuth salva com sucesso!');
    document.getElementById('oauthModal').style.display = 'none';
  }
  
  function testOAuthConnection() {
    // Implemente a lógica para testar a conexão OAuth
    // Isso pode envolver uma chamada para o backend
    showNotification('Testando conexão OAuth...', 'info');
    
    fetch('http://localhost:3001/api/test-oauth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentAuthConfig)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showNotification('Conexão OAuth testada com sucesso!');
      } else {
        showNotification('Falha na conexão OAuth: ' + data.error, 'error');
      }
    })
    .catch(error => {
      showNotification('Erro ao testar conexão: ' + error.message, 'error');
    });
  }
  
  function loadSavedConfig() {
    // Carrega configurações salvas do localStorage
    const savedOAuth = localStorage.getItem('oauthConfig');
    if (savedOAuth) {
      currentAuthConfig = JSON.parse(savedOAuth);
    }
    
    // Carrega outros dados salvos conforme necessário
  }
  
  function getAuthHeaders() {
    const authType = document.getElementById('authType').value;
    
    switch(authType) {
      case 'bearer':
        const token = document.getElementById('bearerToken').value;
        return { 'Authorization': `Bearer ${token}` };
        
      case 'basic':
        const user = document.getElementById('basicUser').value;
        const pass = document.getElementById('basicPass').value;
        const basicToken = btoa(`${user}:${pass}`);
        return { 'Authorization': `Basic ${basicToken}` };
        
      case 'oauth2':
        // O backend deve lidar com OAuth
        return { 'X-OAuth-Request': 'true' };
        
      default:
        return {};
    }
  }
  
  function addHeaderRow() {
    const headersContainer = document.getElementById('customHeaders');
    const newRow = document.createElement('div');
    newRow.className = 'header-row';
    newRow.innerHTML = `
      <input type="text" placeholder="Chave" class="header-key">
      <input type="text" placeholder="Valor" class="header-value">
      <button class="remove-header">×</button>
    `;
    headersContainer.appendChild(newRow);
    
    // Adiciona listener para remover
    newRow.querySelector('.remove-header').addEventListener('click', function() {
      headersContainer.removeChild(newRow);
    });
  }
  
  function getAllHeaders() {
    const headers = {};
    const headerRows = document.querySelectorAll('.header-row');
    
    headerRows.forEach(row => {
      const key = row.querySelector('.header-key').value;
      const value = row.querySelector('.header-value').value;
      if (key && value) {
        headers[key] = value;
      }
    });
    
    return headers;
  }