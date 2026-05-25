/**
 * The Counselours Club — Formulário de Pesquisa (Tese)
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Clique em "Novo projeto"
 * 3. Apague o que estiver lá e cole este código inteiro
 * 4. Clique em Executar (▶) com a função "criarFormPesquisa" selecionada
 * 5. Autorize quando o Google pedir
 * 6. Abra o painel "Execuções" para ver os links gerados
 */

function criarFormPesquisa() {

  // ══ CRIA O FORMULÁRIO ══
  var form = FormApp.create('The Counselours Club — Roteiro de Pesquisa');

  form.setDescription(
    'Objetivo: Investigar como a fé cristã influencia o perfil decisório e o impacto social de founders ' +
    'através dos pilares de Vocação, Propósito e Mordomia.\n' +
    'Duração estimada: 30–40 minutos | 12 perguntas'
  );

  form.setConfirmationMessage(
    'Obrigado pela sua participação! Suas respostas contribuem diretamente com a tese da ' +
    'The Counselours Club sobre fé, vocação e empreendedorismo. Em breve entraremos em contato.'
  );

  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false);


  // ══════════════════════════════════════════════════════════════
  // SEÇÃO INICIAL — Dados de contato + seleção de fluxo
  // ══════════════════════════════════════════════════════════════

  form.addTextItem()
      .setTitle('Nome completo')
      .setRequired(true);

  form.addTextItem()
      .setTitle('E-mail')
      .setRequired(true);

  form.addTextItem()
      .setTitle('WhatsApp')
      .setHelpText('Ex: (11) 9 0000-0000')
      .setRequired(false);

  var fluxo = form.addMultipleChoiceItem()
      .setTitle('Você empreende atualmente?')
      .setHelpText('Isso define a versão das perguntas que fazem mais sentido para o seu momento.')
      .setRequired(true);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 1: Vocação
  // (para quem já empreende)
  // ══════════════════════════════════════════════════════════════

  var pA1 = form.addPageBreakItem()
      .setTitle('Bloco 1 — Vocação');

  // P1 — igual para os dois fluxos
  form.addParagraphTextItem()
      .setTitle('P1 — "Se Deus te chamasse para abandonar seu trabalho dos sonhos e começar um negócio, você iria? Por quê?"')
      .setRequired(false);

  // P2 — Fluxo A
  form.addParagraphTextItem()
      .setTitle('P2 — "Como nasceu a ideia do seu negócio? Houve um momento específico onde você pensou \'preciso fazer isso\'?"')
      .setRequired(false);

  // P3 — Fluxo A
  form.addParagraphTextItem()
      .setTitle('P3 — "O que você já abriu mão para estar aqui como founder?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 2: Propósito
  // ══════════════════════════════════════════════════════════════

  var pA2 = form.addPageBreakItem()
      .setTitle('Bloco 2 — Propósito');

  // P4 — Fluxo A
  form.addParagraphTextItem()
      .setTitle('P4 — "Para que existe seu negócio além do produto ou serviço?"')
      .setRequired(false);

  // P5 — Fluxo A
  form.addParagraphTextItem()
      .setTitle('P5 — "Qual impacto você quer gerar na sociedade com seu negócio?"')
      .setRequired(false);

  // P6 — Fluxo A
  form.addParagraphTextItem()
      .setTitle('P6 — "Existem princípios que você nunca abre mão no seu negócio — sobre como você trata as pessoas, o que você vende, como você opera. Quais são?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 3: Mordomia
  // ══════════════════════════════════════════════════════════════

  var pA3 = form.addPageBreakItem()
      .setTitle('Bloco 3 — Mordomia');

  // P7 — Fluxo A
  form.addParagraphTextItem()
      .setTitle('P7 — "Como você pensa sobre dinheiro e lucro? Qual é sua relação real com isso?"')
      .setRequired(false);

  // P8 — Fluxo A
  form.addParagraphTextItem()
      .setTitle('P8 — "Quando você pensa em lucro e crescimento financeiro — para quê realmente esse dinheiro serve na sua visão?"')
      .setRequired(false);

  // P9 — Fluxo A
  form.addParagraphTextItem()
      .setTitle('P9 — "Se você nunca chegasse a ser milionário — qual seria o sucesso?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 4: Fé nas decisões + Bloco 5: Fundamento
  // ══════════════════════════════════════════════════════════════

  var pA4 = form.addPageBreakItem()
      .setTitle('Blocos 4 e 5 — Fé e Fundamento');

  // P10 — Fluxo A
  form.addParagraphTextItem()
      .setTitle('P10 — "De que forma sua fé aparece nas decisões práticas do seu negócio — contratação, produto, preço, cultura?"')
      .setRequired(false);

  // P11 — igual para os dois fluxos
  form.addParagraphTextItem()
      .setTitle('P11 — "Existe uma palavra de Deus ou passagem bíblica que fundamenta seu negócio?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 6: Encerramento
  // ══════════════════════════════════════════════════════════════

  var pA5 = form.addPageBreakItem()
      .setTitle('Bloco 6 — Encerramento');

  // Após completar este bloco → ir para ENVIAR (não entrar no Fluxo B)
  pA5.setGoToPage(FormApp.PageNavigationType.SUBMIT);

  // P12 — igual para os dois fluxos
  form.addParagraphTextItem()
      .setTitle('P12 — "Há algo que eu não perguntei, mas que é importante você compartilhar sobre sua jornada, sua fé ou seu negócio?"')
      .setHelpText('Sem filtro. Esse é o espaço para o que você quiser dizer.')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 1: Vocação
  // (para quem ainda não empreende)
  // ══════════════════════════════════════════════════════════════

  var pB1 = form.addPageBreakItem()
      .setTitle('Bloco 1 — Vocação');

  // P1 — igual para os dois fluxos
  form.addParagraphTextItem()
      .setTitle('P1 — "Se Deus te chamasse para abandonar seu trabalho dos sonhos e começar um negócio, você iria? Por quê?"')
      .setRequired(false);

  // P2 — Fluxo B
  form.addParagraphTextItem()
      .setTitle('P2 — "O que te impede de começar? O que falta para você dar o primeiro passo?"')
      .setRequired(false);

  // P3 — Fluxo B
  form.addParagraphTextItem()
      .setTitle('P3 — "O que você estaria disposto a abrir mão para empreender?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 2: Propósito
  // ══════════════════════════════════════════════════════════════

  var pB2 = form.addPageBreakItem()
      .setTitle('Bloco 2 — Propósito');

  // P4 — Fluxo B
  form.addParagraphTextItem()
      .setTitle('P4 — "Se você fosse fundar uma empresa, qual seria o principal propósito?"')
      .setRequired(false);

  // P5 — Fluxo B
  form.addParagraphTextItem()
      .setTitle('P5 — "Que tipo de impacto você gostaria de gerar com um negócio?"')
      .setRequired(false);

  // P6 — Fluxo B
  form.addParagraphTextItem()
      .setTitle('P6 — "Se você fosse construir um negócio, quais princípios seriam inegociáveis — sobre cultura, sobre as pessoas, sobre o que você venderia?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 3: Mordomia
  // ══════════════════════════════════════════════════════════════

  var pB3 = form.addPageBreakItem()
      .setTitle('Bloco 3 — Mordomia');

  // P7 — Fluxo B
  form.addParagraphTextItem()
      .setTitle('P7 — "Como você pensa sobre dinheiro e lucro? Qual seria sua relação com isso?"')
      .setRequired(false);

  // P8 — Fluxo B
  form.addParagraphTextItem()
      .setTitle('P8 — "Se você tivesse um negócio lucrativo, para quê usaria esse dinheiro? O que representaria?"')
      .setRequired(false);

  // P9 — Fluxo B
  form.addParagraphTextItem()
      .setTitle('P9 — "Se você empreendesse e nunca ficasse milionário — como definiria sucesso?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 4: Fé nas decisões + Bloco 5: Fundamento
  // ══════════════════════════════════════════════════════════════

  var pB4 = form.addPageBreakItem()
      .setTitle('Blocos 4 e 5 — Fé e Fundamento');

  // P10 — Fluxo B
  form.addParagraphTextItem()
      .setTitle('P10 — "Como você imagina que sua fé apareceria nas decisões práticas de um negócio — contratação, produto, preço, cultura?"')
      .setRequired(false);

  // P11 — igual para os dois fluxos
  form.addParagraphTextItem()
      .setTitle('P11 — "Existe uma palavra de Deus ou passagem bíblica que fundamenta seu negócio?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 6: Encerramento
  // ══════════════════════════════════════════════════════════════

  var pB5 = form.addPageBreakItem()
      .setTitle('Bloco 6 — Encerramento');

  // P12 — igual para os dois fluxos
  form.addParagraphTextItem()
      .setTitle('P12 — "Há algo que eu não perguntei, mas que é importante você compartilhar sobre sua jornada, sua fé ou seu negócio?"')
      .setHelpText('Sem filtro. Esse é o espaço para o que você quiser dizer.')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // CONFIGURA A NAVEGAÇÃO DOS FLUXOS
  // ══════════════════════════════════════════════════════════════

  fluxo.setChoices([
    fluxo.createChoice('🚀 Sim, empreendo — tenho um negócio, startup ou projeto rodando', pA1),
    fluxo.createChoice('💡 Ainda não — estou na ideia, validação ou ainda não comecei', pB1)
  ]);


  // ══════════════════════════════════════════════════════════════
  // CRIA A PLANILHA DE RESPOSTAS E ORGANIZA AS COLUNAS
  // ══════════════════════════════════════════════════════════════

  var planilha = SpreadsheetApp.create('The Counselours Club — Respostas Pesquisa');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());

  // Cria aba de Análise com colunas organizadas por pilar da tese
  var abaAnalise = planilha.insertSheet('Análise por Tema');
  var cabecalhos = [
    // Identidade
    'Nome', 'E-mail', 'WhatsApp', 'Fluxo (A ou B)',

    // PILAR 1 — VOCAÇÃO (P1 + P2 + P3)
    'P1 — Abandonaria tudo por um chamado?',
    'P2 — Como nasceu a ideia / O que impede de começar?',
    'P3 — O que já abriu mão / Estaria disposto a abrir mão?',

    // PILAR 2 — PROPÓSITO (P4 + P5 + P6)
    'P4 — Para que existe o negócio além do produto?',
    'P5 — Que impacto quer gerar?',
    'P6 — Quais princípios são inegociáveis?',

    // PILAR 3 — MORDOMIA (P7 + P8 + P9)
    'P7 — Relação com dinheiro e lucro',
    'P8 — Para quê serve o dinheiro gerado?',
    'P9 — Sucesso sem ser milionário',

    // FÉ NAS DECISÕES (P10 + P11)
    'P10 — Como a fé aparece nas decisões práticas?',
    'P11 — Passagem bíblica que fundamenta o negócio',

    // ENCERRAMENTO (P12)
    'P12 — O que não foi perguntado mas é importante'
  ];

  abaAnalise.getRange(1, 1, 1, cabecalhos.length).setValues([cabecalhos]);
  abaAnalise.getRange(1, 1, 1, cabecalhos.length)
    .setBackground('#12111a')
    .setFontColor('#c9a84c')
    .setFontWeight('bold');
  abaAnalise.setFrozenRows(1);


  // ══════════════════════════════════════════════════════════════
  // EXIBE OS LINKS NO LOG
  // ══════════════════════════════════════════════════════════════

  Logger.log('══════════════════════════════════════════');
  Logger.log('✦ FORMULÁRIO DE PESQUISA CRIADO!');
  Logger.log('══════════════════════════════════════════');
  Logger.log('Link para compartilhar com os founders:');
  Logger.log(form.getPublishedUrl());
  Logger.log('');
  Logger.log('Link para editar o formulário:');
  Logger.log(form.getEditUrl());
  Logger.log('');
  Logger.log('Link da planilha de respostas:');
  Logger.log(planilha.getUrl());
  Logger.log('══════════════════════════════════════════');
}
