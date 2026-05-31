/**
 * The Counselours Club — Formulário de Pesquisa (Tese) — Versão Melhorada
 *
 * MELHORIA: P1, P11 e P12 aparecem UMA VEZ SÓ para todos.
 * Fluxo A e B convergem no final para as perguntas compartilhadas.
 *
 * ESTRUTURA:
 * [Seção Inicial]  → P1 (todos) + pergunta de fluxo
 * [Fluxo A]        → P2-A a P10-A (quem empreende)
 * [Fluxo B]        → P2-B a P10-B (quem não empreende)
 * [Seção Final]    → P11 + P12 (todos) → ENVIAR
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Clique em "Novo projeto"
 * 3. Apague o que estiver lá e cole este código
 * 4. Clique em Executar (▶) com "criarFormPesquisa" selecionado
 * 5. Autorize quando o Google pedir
 * 6. Veja os links no painel "Execuções"
 */

function criarFormPesquisa() {

  var form = FormApp.create('The Counselours Club — Roteiro de Pesquisa');

  form.setDescription(
    'Investigamos como a fé cristã influencia o perfil decisório e o impacto social de founders ' +
    'através dos pilares de Vocação, Propósito e Mordomia.\n' +
    'Duração estimada: 30–40 minutos'
  );

  form.setConfirmationMessage(
    'Obrigado pela sua participação! Suas respostas contribuem diretamente com a tese da ' +
    'The Counselours Club. Em breve entraremos em contato.'
  );

  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false);


  // ══════════════════════════════════════════════════════════════
  // SEÇÃO INICIAL — P1 (compartilhada) + seleção de fluxo
  // ══════════════════════════════════════════════════════════════

  // P1 — igual para todos, aparece antes de qualquer branching
  form.addParagraphTextItem()
      .setTitle('P1 — "Se Deus te chamasse para abandonar seu trabalho dos sonhos e começar um negócio, você iria? Por quê?"')
      .setRequired(false);

  var fluxo = form.addMultipleChoiceItem()
      .setTitle('Você empreende atualmente?')
      .setHelpText('Isso define a versão das próximas perguntas para o seu momento.')
      .setRequired(true);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 1: Vocação (quem já empreende)
  // ══════════════════════════════════════════════════════════════

  var pA1 = form.addPageBreakItem()
      .setTitle('Bloco 1 — Vocação');

  form.addParagraphTextItem()
      .setTitle('P2 — "Como nasceu a ideia do seu negócio? Houve um momento específico onde você pensou \'preciso fazer isso\'?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P3 — "O que você já abriu mão para estar aqui como founder?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 2: Propósito
  // ══════════════════════════════════════════════════════════════

  var pA2 = form.addPageBreakItem()
      .setTitle('Bloco 2 — Propósito');

  form.addParagraphTextItem()
      .setTitle('P4 — "Para que existe seu negócio além do produto ou serviço?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P5 — "Qual impacto você quer gerar na sociedade com seu negócio?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P6 — "Existem princípios que você nunca abre mão no seu negócio — sobre como você trata as pessoas, o que você vende, como você opera. Quais são?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 3: Mordomia
  // ══════════════════════════════════════════════════════════════

  var pA3 = form.addPageBreakItem()
      .setTitle('Bloco 3 — Mordomia');

  form.addParagraphTextItem()
      .setTitle('P7 — "Como você pensa sobre dinheiro e lucro? Qual é sua relação real com isso?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P8 — "Quando você pensa em lucro e crescimento financeiro — para quê realmente esse dinheiro serve na sua visão?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P9 — "Se você nunca chegasse a ser milionário — qual seria o sucesso?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 4: Fé nas decisões
  // ══════════════════════════════════════════════════════════════

  var pA4 = form.addPageBreakItem()
      .setTitle('Bloco 4 — Fé nas Decisões');

  form.addParagraphTextItem()
      .setTitle('P10 — "De que forma sua fé aparece nas decisões práticas do seu negócio — contratação, produto, preço, cultura?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 1: Vocação (quem ainda não empreende)
  // ══════════════════════════════════════════════════════════════

  var pB1 = form.addPageBreakItem()
      .setTitle('Bloco 1 — Vocação');

  form.addParagraphTextItem()
      .setTitle('P2 — "O que te impede de começar? O que falta para você dar o primeiro passo?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P3 — "O que você estaria disposto a abrir mão para empreender?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 2: Propósito
  // ══════════════════════════════════════════════════════════════

  var pB2 = form.addPageBreakItem()
      .setTitle('Bloco 2 — Propósito');

  form.addParagraphTextItem()
      .setTitle('P4 — "Se você fosse fundar uma empresa, qual seria o principal propósito?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P5 — "Que tipo de impacto você gostaria de gerar com um negócio?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P6 — "Se você fosse construir um negócio, quais princípios seriam inegociáveis — sobre cultura, sobre as pessoas, sobre o que você venderia?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 3: Mordomia
  // ══════════════════════════════════════════════════════════════

  var pB3 = form.addPageBreakItem()
      .setTitle('Bloco 3 — Mordomia');

  form.addParagraphTextItem()
      .setTitle('P7 — "Como você pensa sobre dinheiro e lucro? Qual seria sua relação com isso?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P8 — "Se você tivesse um negócio lucrativo, para quê usaria esse dinheiro? O que representaria?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P9 — "Se você empreendesse e nunca ficasse milionário — como definiria sucesso?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 4: Fé nas decisões
  // ══════════════════════════════════════════════════════════════

  var pB4 = form.addPageBreakItem()
      .setTitle('Bloco 4 — Fé nas Decisões');

  form.addParagraphTextItem()
      .setTitle('P10 — "Como você imagina que sua fé apareceria nas decisões práticas de um negócio — contratação, produto, preço, cultura?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // SEÇÃO FINAL — P11 + P12 compartilhadas (todos chegam aqui)
  // ══════════════════════════════════════════════════════════════

  var pFinal = form.addPageBreakItem()
      .setTitle('Fundamento e Encerramento');

  // P11 — igual para todos, aparece uma vez só
  form.addParagraphTextItem()
      .setTitle('P11 — "Existe uma palavra de Deus ou passagem bíblica que fundamenta seu negócio?"')
      .setRequired(false);

  // P12 — igual para todos, aparece uma vez só
  form.addParagraphTextItem()
      .setTitle('P12 — "Há algo que eu não perguntei, mas que é importante você compartilhar sobre sua jornada, sua fé ou seu negócio?"')
      .setHelpText('Sem filtro. Esse é o espaço para o que você quiser dizer.')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // CONFIGURA A NAVEGAÇÃO
  // Fluxo A → pA1 → pA2 → pA3 → pA4 → pFinal → ENVIAR
  // Fluxo B → pB1 → pB2 → pB3 → pB4 → pFinal → ENVIAR
  // ══════════════════════════════════════════════════════════════

  // Pergunta inicial direciona para o fluxo certo
  fluxo.setChoices([
    fluxo.createChoice('🚀 Sim, empreendo — tenho um negócio, startup ou projeto rodando', pA1),
    fluxo.createChoice('💡 Ainda não — estou na ideia, validação ou ainda não comecei', pB1)
  ]);

  // Fluxo A pula Fluxo B e vai direto para a seção final
  pA4.setGoToPage(pFinal);

  // Fluxo B chega naturalmente na seção final (está logo depois no formulário)


  // ══════════════════════════════════════════════════════════════
  // PLANILHA DE RESPOSTAS
  // ══════════════════════════════════════════════════════════════

  var planilha = SpreadsheetApp.create('The Counselours Club — Respostas Pesquisa');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());

  var abaAnalise = planilha.insertSheet('Análise por Tema');
  var cabecalhos = [
    'Fluxo (A ou B)',
    // PILAR 1 — VOCAÇÃO
    'P1 — Abandonaria tudo por um chamado?',
    'P2 — Como nasceu a ideia / O que impede?',
    'P3 — O que abriu mão / Estaria disposto?',
    // PILAR 2 — PROPÓSITO
    'P4 — Para que existe o negócio?',
    'P5 — Que impacto quer gerar?',
    'P6 — Princípios inegociáveis',
    // PILAR 3 — MORDOMIA
    'P7 — Relação com dinheiro',
    'P8 — Para quê serve o dinheiro?',
    'P9 — Sucesso sem ser milionário',
    // FÉ NAS DECISÕES
    'P10 — Fé nas decisões práticas',
    // COMPARTILHADAS
    'P11 — Passagem bíblica',
    'P12 — Espaço aberto'
  ];

  abaAnalise.getRange(1, 1, 1, cabecalhos.length).setValues([cabecalhos]);
  abaAnalise.getRange(1, 1, 1, cabecalhos.length)
    .setBackground('#12111a').setFontColor('#c9a84c').setFontWeight('bold');
  abaAnalise.setFrozenRows(1);


  // ══════════════════════════════════════════════════════════════
  // LINKS NO LOG
  // ══════════════════════════════════════════════════════════════

  Logger.log('══════════════════════════════════════════');
  Logger.log('✦ FORMULÁRIO DE PESQUISA CRIADO!');
  Logger.log('══════════════════════════════════════════');
  Logger.log('Link para compartilhar:');
  Logger.log(form.getPublishedUrl());
  Logger.log('Link para editar:');
  Logger.log(form.getEditUrl());
  Logger.log('Planilha de respostas:');
  Logger.log(planilha.getUrl());
  Logger.log('══════════════════════════════════════════');
}
