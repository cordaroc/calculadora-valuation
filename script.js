const state = {
  ticker: '',
  setor: '',
  dados: {},
  editados: {}
};

const camposPadrao = {
  precoAtual: 'Preço da Ação (R$)',
  numAcoes: 'Número de Ações',
  dividaLiquida: 'Dívida Líquida (R$)',
  patrimonioLiquido: 'Patrimônio Líquido (R$)',
  receitaLiquida: 'Receita Líquida (R$)',
  lucroLiquido: 'Lucro Líquido (R$)',
  ebitda: 'EBITDA (R$)',
  ebit: 'EBIT (R$)',
  dividendosPorAcao: 'Dividendos por Ação (R$)',
  lpa: 'LPA (R$)',
  vpa: 'VPA (R$)',
  roe: 'ROE (%)',
  margemLiquida: 'Margem Líquida (%)',
  margemEbitda: 'Margem EBITDA (%)'
};

function formatarNumero(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function renderCamposBasicos() {
  const container = document.getElementById('camposBasicos');
  container.innerHTML = '';

  Object.entries(camposPadrao).forEach(([campo, label]) => {
    const valor = state.dados[campo] ?? '';
    const editado = state.editados[campo];

    const input = document.createElement('input');
    input.type = 'text';
    input.value = valor ? formatarNumero(valor) : '';
    input.className = `w-full p-2 rounded ${editado ? 'input-editado' : 'input-auto'}`;
    input.onchange = (e) => {
      const raw = e.target.value.replace(/\./g, '').replace(',', '.');
      state.dados[campo] = parseFloat(raw);
      state.editados[campo] = true;
      renderCamposBasicos();
    };

    const div = document.createElement('div');
    div.innerHTML = `<label class="block font-semibold mb-1">${label}</label>`;
    div.appendChild(input);
    container.appendChild(div);
  });
}

document.getElementById('inputTicker').addEventListener('change', (e) => {
  state.ticker = e.target.value.toUpperCase();
  carregarDadosExternos(state.ticker);
});

document.getElementById('inputSetor').addEventListener('change', (e) => {
  state.setor = e.target.value;
  carregarMultiplosSetoriais(state.setor);
});

function carregarDadosExternos(ticker) {
  if (ticker === 'AXIA3') {
    state.dados = {
      precoAtual: 61.05,
      numAcoes: 2308632600,
      dividaLiquida: 42580000000,
      patrimonioLiquido: 109340000000,
      receitaLiquida: 42640000000,
      lucroLiquido: -6010000000,
      ebitda: 8219000000,
      ebit: 4680000000,
      dividendosPorAcao: 3.59,
      lpa: -2.61,
      vpa: 47.34,
      roe: -5.51,
      margemLiquida: -14.11,
      margemEbitda: 21.36
    };
    state.editados = {};
    renderCamposBasicos();
  }
}

function carregarMultiplosSetoriais(setor) {
  console.log(`Carregando múltiplos para o setor: ${setor}`);
}

function exportarPDF() {
  const elemento = document.getElementById('areaExportacao');

  html2pdf()
    .set({
      margin: 10,
      filename: 'resultado_valuation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    })
    .from(elemento)
    .save();
}

renderCamposBasicos();
Corrigido erro de sintaxe
