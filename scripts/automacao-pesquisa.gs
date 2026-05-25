/**
 * The Counselours Club — Automação da Planilha de Pesquisa (Tese)
 *
 * COMO USAR (faça isso UMA VEZ):
 * 1. Abra a planilha de respostas do Formulário de Pesquisa
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
  ScriptApp.getProjectTriggers().forEach(function(t) {
    ScriptApp.deleteTrigger(t);
  });

  ScriptApp.newTrigger('preencherAnalise')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();

  criarResumo();

  Logger.log('✦ Configuração concluída!');
  Logger.log('As respostas serão organizadas automaticamente pelos pilares da tese.');
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
      'Nome', 'E-mail', 'WhatsApp', 'Fluxo',
      // Pilar 1 — Vocação
      'P1 — Abandonaria tudo por um chamado?',
      'P2 — Como nasceu / O que impede?',
      'P3 — O que abriu mão / Estaria disposto?',
      // Pilar 2 — Propósito
      'P4 — Para que existe o negócio?',
      'P5 — Que impacto quer gerar?',
      'P6 — Princípios inegociáveis',
      // Pilar 3 — Mordomia
      'P7 — Relação com dinheiro e lucro',
      'P8 — Para quê serve o dinheiro?',
      'P9 — Sucesso sem ser milionário',
      // Fé nas decisões
      'P10 — Fé nas decisões práticas',
      'P11 — Passagem bíblica que fundamenta',
      // Encerramento
      'P12 — O que não foi perguntado'
    ];
    abaAnalise.getRange(1, 1, 1, cabecalhos.length).setValues([cabecalhos]);
    abaAnalise.getRange(1, 1, 1, cabecalhos.length)
      .setBackground('#12111a').setFontColor('#c9a84c').setFontWeight('bold');
    abaAnalise.setFrozenRows(1);
  }

  // Monta dicionário título → resposta
  var respostas = {};
  e.response.getItemResponses().forEach(function(ir) {
    var titulo = ir.getItem().getTitle();
    var valor  = ir.getResponse();
    if (Array.isArray(valor)) valor = valor.join(', ');
    respostas[titulo] = valor || '';
  });

  var fluxoTexto = respostas['Você empreende atualmente?'] || '';
  var fluxo = fluxoTexto.indexOf('Sim') !== -1 ? 'A' : 'B';

  function get(trecho) {
    for (var k in respostas) {
      if (k.indexOf(trecho) !== -1) return respostas[k];
    }
    return '';
  }

  var linha = [
    respostas['Nome completo'] || '',
    respostas['E-mail']        || '',
    respostas['WhatsApp']      || '',
    fluxo,
    // Vocação
    get('chamasse para abandonar'),
    get('nasceu a ideia') || get('te impede de começar'),
    get('já abriu mão')   || get('estaria disposto a abrir mão'),
    // Propósito
    get('existe seu negócio além') || get('fosse fundar uma empresa'),
    get('impacto você quer gerar') || get('impacto você gostaria'),
    get('princípios que você nunca') || get('princípios seriam inegociáveis'),
    // Mordomia
    get('relação real com isso') || get('relação com isso'),
    get('para quê realmente esse dinheiro') || get('usaria esse dinheiro'),
    get('nunca chegasse a ser milionário') || get('nunca ficasse milionário'),
    // Fé nas decisões
    get('decisões práticas do seu negócio') || get('decisões práticas de um negócio'),
    get('palavra de Deus ou passagem'),
    get('não perguntei')
  ];

  abaAnalise.appendRow(linha);

  enviarNotificacao(respostas, fluxo);

  SpreadsheetApp.flush();
}


// ══════════════════════════════════════════════════════════════
// OPÇÃO 3 — Notificação por e-mail a cada novo envio
// ══════════════════════════════════════════════════════════════

function enviarNotificacao(respostas, fluxo) {
  var email      = Session.getActiveUser().getEmail();
  var nome       = respostas['Nome completo'] || 'Alguém';
  var fluxoLabel = fluxo === 'A' ? 'Fluxo A — Empreendedor' : 'Fluxo B — Em exploração';
  var data       = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm');

  var assunto = '✦ Nova resposta — Roteiro de Pesquisa | ' + nome;

  var corpo =
    'Nova resposta recebida no Roteiro de Pesquisa da The Counselours Club.\n\n' +
    'Nome: '     + nome + '\n' +
    'E-mail: '   + (respostas['E-mail']    || '—') + '\n' +
    'WhatsApp: ' + (respostas['WhatsApp']  || '—') + '\n' +
    'Perfil: '   + fluxoLabel + '\n' +
    'Recebido em: ' + data + '\n\n' +
    'Abra a planilha para ver as respostas organizadas pelos pilares da tese.\n\n' +
    '✦ The Counselours Club';

  MailApp.sendEmail(email, assunto, corpo);
}


// ══════════════════════════════════════════════════════════════
// OPÇÃO 4 — Aba de Resumo com gráficos automáticos
// ══════════════════════════════════════════════════════════════

function criarResumo() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var antiga = ss.getSheetByName('Resumo e Gráficos');
  if (antiga) ss.deleteSheet(antiga);

  var aba = ss.insertSheet('Resumo e Gráficos', 0);

  // ── Cabeçalho ──
  aba.getRange('A1').setValue('THE COUNSELOURS CLUB — Resumo da Pesquisa (Tese)');
  aba.getRange('A1:H1').merge()
     .setBackground('#12111a').setFontColor('#c9a84c')
     .setFontSize(13).setFontWeight('bold').setHorizontalAlignment('center');
  aba.setRowHeight(1, 40);

  // ── Bloco: Fluxo ──
  _cabecalhoBloco(aba, 'A3', 'C3', 'DISTRIBUIÇÃO DE FLUXO');
  _linhaContagem(aba, 4, 'Fluxo A — Já empreende',        '=COUNTIF(\'Análise por Tema\'!D:D,"A")');
  _linhaContagem(aba, 5, 'Fluxo B — Ainda não empreende', '=COUNTIF(\'Análise por Tema\'!D:D,"B")');
  aba.getRange('A6').setValue('Total');
  aba.getRange('B6').setFormula('=B4+B5').setFontWeight('bold');

  // ── Bloco: Pilar 1 — Vocação ──
  _cabecalhoBloco(aba, 'A8', 'C8', 'PILAR 1 — VOCAÇÃO (respostas recebidas)');
  _linhaContagem(aba, 9,  'P1 — Chamado vs Carreira',           '=COUNTA(\'Análise por Tema\'!E:E)-1');
  _linhaContagem(aba, 10, 'P2 — Origem da decisão',              '=COUNTA(\'Análise por Tema\'!F:F)-1');
  _linhaContagem(aba, 11, 'P3 — Sacrifício',                     '=COUNTA(\'Análise por Tema\'!G:G)-1');

  // ── Bloco: Pilar 2 — Propósito ──
  _cabecalhoBloco(aba, 'A13', 'C13', 'PILAR 2 — PROPÓSITO (respostas recebidas)');
  _linhaContagem(aba, 14, 'P4 — Razão de ser do negócio',        '=COUNTA(\'Análise por Tema\'!H:H)-1');
  _linhaContagem(aba, 15, 'P5 — Impacto social',                 '=COUNTA(\'Análise por Tema\'!I:I)-1');
  _linhaContagem(aba, 16, 'P6 — Valores inegociáveis',           '=COUNTA(\'Análise por Tema\'!J:J)-1');

  // ── Bloco: Pilar 3 — Mordomia ──
  _cabecalhoBloco(aba, 'A18', 'C18', 'PILAR 3 — MORDOMIA (respostas recebidas)');
  _linhaContagem(aba, 19, 'P7 — Relação com dinheiro',           '=COUNTA(\'Análise por Tema\'!K:K)-1');
  _linhaContagem(aba, 20, 'P8 — Para quê serve o dinheiro',      '=COUNTA(\'Análise por Tema\'!L:L)-1');
  _linhaContagem(aba, 21, 'P9 — Sucesso sem ser milionário',      '=COUNTA(\'Análise por Tema\'!M:M)-1');

  // ── Bloco: Fé nas decisões ──
  _cabecalhoBloco(aba, 'A23', 'C23', 'FÉ NAS DECISÕES (respostas recebidas)');
  _linhaContagem(aba, 24, 'P10 — Fé nas decisões práticas',      '=COUNTA(\'Análise por Tema\'!N:N)-1');
  _linhaContagem(aba, 25, 'P11 — Passagem bíblica',              '=COUNTA(\'Análise por Tema\'!O:O)-1');
  _linhaContagem(aba, 26, 'P12 — Espaço aberto',                 '=COUNTA(\'Análise por Tema\'!P:P)-1');

  // Formatação
  aba.setColumnWidth(1, 260);
  aba.setColumnWidth(2, 70);
  aba.setColumnWidth(4, 30);

  Utilities.sleep(500);
  _criarGraficos(aba);

  Logger.log('✦ Aba "Resumo e Gráficos" da pesquisa criada!');
}

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
    .setOption('title', 'Distribuição — Fluxo A vs B')
    .setOption('colors', ['#c9a84c', '#4a4a6a'])
    .setOption('width', 360).setOption('height', 240)
    .build());

  // Gráfico 2 — Respostas por Pilar (Barras)
  aba.insertChart(aba.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(aba.getRange('A9:B11'))   // Vocação
    .addRange(aba.getRange('A14:B16'))  // Propósito
    .addRange(aba.getRange('A19:B21'))  // Mordomia
    .setPosition(11, 5, 20, 0)
    .setOption('title', 'Respostas recebidas por Pilar da Tese')
    .setOption('colors', ['#c9a84c', '#a07830', '#6a5020'])
    .setOption('width', 420).setOption('height', 280)
    .build());

  // Gráfico 3 — Fé nas decisões (Barras)
  aba.insertChart(aba.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(aba.getRange('A24:B26'))
    .setPosition(22, 5, 20, 0)
    .setOption('title', 'Fé nas Decisões e Encerramento')
    .setOption('colors', ['#c9a84c'])
    .setOption('legend', {position: 'none'})
    .setOption('width', 360).setOption('height', 200)
    .build());
}
