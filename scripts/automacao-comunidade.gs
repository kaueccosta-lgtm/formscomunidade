/**
 * The Counselours Club — Automação da Planilha de Comunidade
 *
 * COMO USAR (faça isso UMA VEZ):
 * 1. Abra a planilha de respostas do Formulário de Comunidade
 * 2. Clique em Extensões > Apps Script
 * 3. Apague o que estiver lá e cole este código
 * 4. Clique em Executar (▶) com "configurar" selecionado
 * 5. Autorize quando o Google pedir
 * Pronto — tudo funciona automaticamente a partir daí!
 */


// ══════════════════════════════════════════════════════════════
// CONFIGURAÇÃO INICIAL — execute esta função UMA VEZ
// ══════════════════════════════════════════════════════════════

function configurar() {
  // Remove gatilhos antigos para não duplicar
  ScriptApp.getProjectTriggers().forEach(function(t) {
    ScriptApp.deleteTrigger(t);
  });

  // Cria gatilho: roda "preencherAnalise" a cada novo envio
  ScriptApp.newTrigger('preencherAnalise')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();

  // Cria a aba de Resumo com gráficos
  criarResumo();

  // Configura notificação por e-mail (Opção 3)
  Logger.log('✦ Configuração concluída!');
  Logger.log('As respostas agora serão organizadas automaticamente.');
  Logger.log('Você receberá um e-mail a cada novo envio.');
  Logger.log('Veja a aba "Resumo e Gráficos" para os painéis visuais.');
}


// ══════════════════════════════════════════════════════════════
// OPÇÃO 2 — Preenchimento automático da aba de análise
// ══════════════════════════════════════════════════════════════

function preencherAnalise(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var abaAnalise = ss.getSheetByName('Análise por Tema');

  if (!abaAnalise) {
    abaAnalise = ss.insertSheet('Análise por Tema');
    var cabecalhos = [
      'Nome','E-mail','WhatsApp','Fluxo',
      'P1 — O que te fez começar?',
      'P2 — Tipo de motivação','P2 — Por quê?',
      'P6 — O que é o negócio?','P3 — Faturamento',
      'P4 — Tem parcerias?','P4 — Quais parcerias?',
      'P5 — Recebeu investimento?','P5 — Qual tipo?',
      'P7 — Participa de comunidade?','P7 — Qual comunidade?',
      'P8 — Maior desafio','P9 — Apoio da fé',
      'P10 — O que teria valor (opções)','P10 — Elaboração',
      'P11 — Faixa de contribuição','P11 — O que precisaria oferecer?',
      'P12 — História de inspiração'
    ];
    abaAnalise.getRange(1, 1, 1, cabecalhos.length).setValues([cabecalhos]);
    abaAnalise.getRange(1, 1, 1, cabecalhos.length)
      .setBackground('#12111a').setFontColor('#c9a84c').setFontWeight('bold');
    abaAnalise.setFrozenRows(1);
  }

  // Monta dicionário: título da pergunta → resposta
  var respostas = {};
  e.response.getItemResponses().forEach(function(ir) {
    var titulo = ir.getItem().getTitle();
    var valor  = ir.getResponse();
    if (Array.isArray(valor)) valor = valor.join(', ');
    respostas[titulo] = valor || '';
  });

  // Detecta o fluxo
  var fluxoTexto = respostas['Você empreende atualmente?'] || '';
  var fluxo = fluxoTexto.indexOf('Sim') !== -1 ? 'A' : 'B';

  // Busca resposta por trecho único do título
  function get(trecho) {
    for (var k in respostas) {
      if (k.indexOf(trecho) !== -1) return respostas[k];
    }
    return '';
  }

  // Monta a linha organizada por tema
  var linha = [
    respostas['Nome completo']        || '',
    respostas['E-mail']               || '',
    respostas['WhatsApp']             || '',
    fluxo,
    get('O que te fez começar'),
    get('motivação maior'),
    get('Por quê? Elabore'),
    get('o que é o seu negócio'),
    get('faturamento'),
    get('parcerias com organizações'),
    get('Se sim, quais? Como tem sido'),
    get('Você já recebeu algum tipo de investimento'),
    get('Se sim, qual tipo'),
    get('comunidade de founders'),
    get('Se sim, qual comunidade'),
    get('maior desafio') || get('imagina ser o maior desafio'),
    get('comunidade de fé te apoia') || get('comunidade de fé reagiria'),
    get('teria valor para você participar'),
    get('O que mais você adicionaria'),
    get('taxa de participação'),
    get('O que essa contribuição precisaria'),
    get('história')
  ];

  abaAnalise.appendRow(linha);

  // Opção 3 — Envia e-mail de notificação
  enviarNotificacao(respostas, fluxo);

  // Atualiza contagens do resumo
  SpreadsheetApp.flush();
}


// ══════════════════════════════════════════════════════════════
// OPÇÃO 3 — Notificação por e-mail a cada novo envio
// ══════════════════════════════════════════════════════════════

function enviarNotificacao(respostas, fluxo) {
  var email     = Session.getActiveUser().getEmail();
  var nome      = respostas['Nome completo'] || 'Alguém';
  var fluxoLabel = fluxo === 'A' ? 'Fluxo A — Empreendedor' : 'Fluxo B — Em exploração';
  var data      = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm');

  var assunto = '✦ Nova resposta — Formulário de Comunidade | ' + nome;

  var corpo =
    'Nova resposta recebida no Formulário de Comunidade da The Counselours Club.\n\n' +
    'Nome: '  + nome + '\n' +
    'E-mail: ' + (respostas['E-mail'] || '—') + '\n' +
    'WhatsApp: ' + (respostas['WhatsApp'] || '—') + '\n' +
    'Perfil: ' + fluxoLabel + '\n' +
    'Recebido em: ' + data + '\n\n' +
    'Abra a planilha para ver todas as respostas organizadas por tema.\n\n' +
    '✦ The Counselours Club';

  MailApp.sendEmail(email, assunto, corpo);
}


// ══════════════════════════════════════════════════════════════
// OPÇÃO 4 — Aba de Resumo com gráficos automáticos
// ══════════════════════════════════════════════════════════════

function criarResumo() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Remove aba antiga se existir
  var antiga = ss.getSheetByName('Resumo e Gráficos');
  if (antiga) ss.deleteSheet(antiga);

  var aba = ss.insertSheet('Resumo e Gráficos', 0);

  // ── Cabeçalho ──
  aba.getRange('A1').setValue('THE COUNSELOURS CLUB — Resumo de Respostas');
  aba.getRange('A1:H1').merge()
     .setBackground('#12111a').setFontColor('#c9a84c')
     .setFontSize(13).setFontWeight('bold').setHorizontalAlignment('center');
  aba.setRowHeight(1, 40);

  // ── Bloco: Fluxo ──
  _cabecalhoBloco(aba, 'A3', 'C3', 'DISTRIBUIÇÃO DE FLUXO');
  _linhaContagem(aba, 4, 'Fluxo A — Já empreende',   '=COUNTIF(\'Análise por Tema\'!D:D,"A")');
  _linhaContagem(aba, 5, 'Fluxo B — Ainda não empreende', '=COUNTIF(\'Análise por Tema\'!D:D,"B")');
  aba.getRange('A6').setValue('Total');
  aba.getRange('B6').setFormula('=B4+B5').setFontWeight('bold');

  // ── Bloco: Motivação ──
  _cabecalhoBloco(aba, 'A8', 'C8', 'TIPO DE MOTIVAÇÃO (P2)');
  var motivacoes = [
    ['Financeira',    'Financeira'],
    ['Pessoal',       'Pessoal'],
    ['Impacto social','Impacto social'],
    ['Espiritual',    'Espiritual']
  ];
  motivacoes.forEach(function(m, i) {
    _linhaContagem(aba, 9 + i, m[0],
      '=COUNTIF(\'Análise por Tema\'!F:F,"*' + m[1] + '*")');
  });

  // ── Bloco: Faturamento ──
  _cabecalhoBloco(aba, 'A14', 'C14', 'FATURAMENTO — Fluxo A (P3)');
  var faturamentos = [
    ['Pré-receita',         'Pré-receita'],
    ['Até R$ 50k/mês',     '50 mil'],
    ['R$ 50k–200k/mês',    '200 mil'],
    ['R$ 200k–1M/mês',     '1 milhão'],
    ['Acima de R$ 1M/mês', 'Acima de R$ 1'],
    ['Prefere não informar','não informar']
  ];
  faturamentos.forEach(function(f, i) {
    _linhaContagem(aba, 15 + i, f[0],
      '=COUNTIF(\'Análise por Tema\'!I:I,"*' + f[1] + '*")');
  });

  // ── Bloco: Comunidade ──
  _cabecalhoBloco(aba, 'A22', 'C22', 'PARTICIPA DE COMUNIDADE? (P7)');
  var comunidades = [
    ['Sim, cristã',   'cristã'],
    ['Sim, secular',  'secular'],
    ['Não participa', 'Não participa']
  ];
  comunidades.forEach(function(c, i) {
    _linhaContagem(aba, 23 + i, c[0],
      '=COUNTIF(\'Análise por Tema\'!N:N,"*' + c[1] + '*")');
  });

  // ── Bloco: Faixa de Contribuição ──
  _cabecalhoBloco(aba, 'A27', 'C27', 'FAIXA DE CONTRIBUIÇÃO (P11)');
  var faixas = [
    ['Gratuita',           'gratuita'],
    ['Até R$ 100/mês',    'Até R$ 100'],
    ['R$ 100–300/mês',    '100 – R$ 300'],
    ['R$ 300–600/mês',    '300 – R$ 600'],
    ['Acima de R$ 600/mês','Acima de R$ 600']
  ];
  faixas.forEach(function(f, i) {
    _linhaContagem(aba, 28 + i, f[0],
      '=COUNTIF(\'Análise por Tema\'!T:T,"*' + f[1] + '*")');
  });

  // ── Bloco: O que teria valor (P10) ──
  _cabecalhoBloco(aba, 'A34', 'C34', 'O QUE TERIA VALOR NA COMUNIDADE (P10)');
  var valores = [
    'Mentoria com founders experientes',
    'Conexão com outros founders de fé',
    'Grupos de accountability',
    'Conteúdo sobre fé e empreendedorismo',
    'Eventos e encontros presenciais',
    'Oração e suporte espiritual coletivo'
  ];
  valores.forEach(function(v, i) {
    _linhaContagem(aba, 35 + i, v,
      '=COUNTIF(\'Análise por Tema\'!R:R,"*' + v + '*")');
  });

  // Formatação das colunas
  aba.setColumnWidth(1, 260);
  aba.setColumnWidth(2, 70);
  aba.setColumnWidth(3, 70);
  aba.setColumnWidth(4, 30);

  // Cria os gráficos
  Utilities.sleep(500);
  _criarGraficos(aba);

  Logger.log('✦ Aba "Resumo e Gráficos" criada com sucesso!');
}

// ── Funções auxiliares de layout ──

function _cabecalhoBloco(aba, cel1, cel2, texto) {
  aba.getRange(cel1 + ':' + cel2).merge()
     .setValue(texto)
     .setBackground('#1e1e2e').setFontColor('#c9a84c')
     .setFontWeight('bold').setFontSize(10);
}

function _linhaContagem(aba, linha, label, formula) {
  aba.getRange(linha, 1).setValue(label);
  aba.getRange(linha, 2).setFormula(formula).setHorizontalAlignment('center');
}

function _criarGraficos(aba) {
  // Gráfico 1 — Fluxo A vs B (Pizza)
  aba.insertChart(aba.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(aba.getRange('A4:B5'))
    .setPosition(3, 5, 20, 0)
    .setOption('title', 'Fluxo A vs B')
    .setOption('colors', ['#c9a84c', '#4a4a6a'])
    .setOption('width', 360).setOption('height', 240)
    .build());

  // Gráfico 2 — Motivação (Barras)
  aba.insertChart(aba.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(aba.getRange('A9:B12'))
    .setPosition(11, 5, 20, 0)
    .setOption('title', 'Tipo de Motivação (P2)')
    .setOption('colors', ['#c9a84c'])
    .setOption('legend', {position: 'none'})
    .setOption('width', 360).setOption('height', 240)
    .build());

  // Gráfico 3 — Faturamento (Barras)
  aba.insertChart(aba.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(aba.getRange('A15:B20'))
    .setPosition(20, 5, 20, 0)
    .setOption('title', 'Faturamento — Fluxo A (P3)')
    .setOption('colors', ['#c9a84c'])
    .setOption('legend', {position: 'none'})
    .setOption('width', 360).setOption('height', 240)
    .build());

  // Gráfico 4 — Faixa de Contribuição (Barras)
  aba.insertChart(aba.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(aba.getRange('A28:B32'))
    .setPosition(29, 5, 20, 0)
    .setOption('title', 'Faixa de Contribuição (P11)')
    .setOption('colors', ['#c9a84c'])
    .setOption('legend', {position: 'none'})
    .setOption('width', 360).setOption('height', 240)
    .build());

  // Gráfico 5 — O que teria valor (Barras)
  aba.insertChart(aba.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(aba.getRange('A35:B40'))
    .setPosition(37, 5, 20, 0)
    .setOption('title', 'O que teria valor na comunidade (P10)')
    .setOption('colors', ['#c9a84c'])
    .setOption('legend', {position: 'none'})
    .setOption('width', 360).setOption('height', 280)
    .build());
}
