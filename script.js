function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function pesquisar() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const resultados = document.getElementById('resultados');
  const objetos = JSON.parse(localStorage.getItem('objetosPerdidos')) || [];

  // Verifica se existe ao menos um nó ativo
  const algumNoAtivo = nodes.some(node => node.up);
  if (!algumNoAtivo) {
    alert("Erro: nenhum nó disponível para realizar a pesquisa.");
    resultados.innerHTML = "";
    return;
  }

  if (!input) {
    resultados.innerHTML = "<p>Digite um termo para pesquisar.</p>";
    return;
  }

  const encontrados = objetos.filter(obj =>
    obj.nome.toLowerCase().includes(input) ||
    obj.detalhes.toLowerCase().includes(input) ||
    obj.local.toLowerCase().includes(input) ||
    obj.linha.toLowerCase().includes(input)
  );

  if (encontrados.length === 0) {
    resultados.innerHTML = "<p>Nenhum objeto correspondente encontrado.</p>";
    return;
  }

  // Exibir resultados encontrados
  resultados.innerHTML = encontrados.map((obj) => {
    const index = objetos.findIndex(o =>
      o.nome === obj.nome &&
      o.detalhes === obj.detalhes &&
      o.local === obj.local &&
      o.linha === obj.linha &&
      o.contato === obj.contato
    );
    return `
      <div class="objeto-card">
        <h3>${obj.nome}</h3>
        <p><strong>Local de perda:</strong> ${obj.local}</p>
        <p><strong>Linha do ônibus:</strong> ${obj.linha || 'N/A'}</p>
        <p><strong>Data estimada:</strong> ${obj.data_perda || 'Não informada'}</p>
        <p><strong>Detalhes:</strong> ${obj.detalhes}</p>
        <p><strong>Contato:</strong> ${obj.contato}</p>
        <button onclick="removerObjeto(${index})" class="btn-remover">Remover</button>
      </div>
    `;
  }).join('');
}


function removerObjeto(index) {
  if (!confirm("Tem certeza que deseja remover este objeto?")) return;

  const objetos = JSON.parse(localStorage.getItem('objetosPerdidos')) || [];
  objetos.splice(index, 1);
  localStorage.setItem('objetosPerdidos', JSON.stringify(objetos));
  pesquisar(); // Atualiza os resultados na tela
}



