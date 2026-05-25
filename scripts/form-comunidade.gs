/**
 * The Counselours Club — Formulário de Comunidade
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Clique em "Novo projeto"
 * 3. Apague o que estiver lá e cole este código inteiro
 * 4. Clique em Executar (▶) com a função "criarFormComunidade" selecionada
 * 5. Autorize quando o Google pedir
 * 6. Abra o painel "Execuções" para ver os links gerados
 */

function criarFormComunidade() {

  // ══ CRIA O FORMULÁRIO ══
  var form = FormApp.create('The Counselours Club — Formulário de Comunidade');

  form.setDescription(
    'Objetivo: Validar demanda e entender o perfil dos founders interessados na The Counselours Club.\n' +
    'Duração estimada: 15–20 minutos | 12 perguntas'
  );

  form.setConfirmationMessage(
    'Obrigado pela sua participação! Suas respostas contribuem diretamente com a construção ' +
    'da The Counselours Club. Em breve entraremos em contato.'
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
      .setHelpText('Isso define quais perguntas fazem mais sentido para o seu momento.')
      .setRequired(true);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 1: Perfil e Motivação
  // (para quem já empreende)
  // ══════════════════════════════════════════════════════════════

  var pA1 = form.addPageBreakItem()
      .setTitle('Bloco 1 — Perfil e Motivação');

  form.addParagraphTextItem()
      .setTitle('P1 — "O que te fez começar? Qual foi a dor ou motivação que te trouxe até aqui?"')
      .setRequired(false);

  form.addMultipleChoiceItem()
      .setTitle('P2 — Sua motivação maior é:')
      .setChoiceValues([
        '💰 Financeira — geração de riqueza, independência',
        '🌱 Pessoal — realização, legado, crescimento',
        '🤝 Impacto social — transformar comunidade, causas',
        '✦ Espiritual — chamado, propósito, fé'
      ])
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P2 — Por quê? Elabore:')
      .setRequired(false);

  form.addMultipleChoiceItem()
      .setTitle('P3 — Qual é a média de faturamento da sua empresa/startup hoje?')
      .setChoiceValues([
        'Pré-receita (ainda não fatura)',
        'Até R$ 50 mil/mês',
        'R$ 50 mil – R$ 200 mil/mês',
        'R$ 200 mil – R$ 1 milhão/mês',
        'Acima de R$ 1 milhão/mês',
        'Prefiro não informar'
      ])
      .setRequired(false);

  form.addMultipleChoiceItem()
      .setTitle('P4 — Você já tem parcerias com organizações, hubs, aceleradoras ou outros tipos de apoio?')
      .setChoiceValues(['Sim', 'Não'])
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P4 — Se sim, quais? Como tem sido essa relação?')
      .setRequired(false);

  form.addMultipleChoiceItem()
      .setTitle('P5 — Você já recebeu algum tipo de investimento? (anjo, VC, CVC, acelerador, etc)')
      .setChoiceValues(['Sim', 'Não'])
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P5 — Se sim, qual tipo? Em que fase?')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P6 — "Me conta o que é o seu negócio — o que você faz ou vende?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 2: Comunidade e Rede
  // ══════════════════════════════════════════════════════════════

  var pA2 = form.addPageBreakItem()
      .setTitle('Bloco 2 — Comunidade e Rede');

  form.addMultipleChoiceItem()
      .setTitle('P7 — Você já participa de alguma comunidade de founders ou grupos de empreendedores?')
      .setChoiceValues(['Sim, e é cristã', 'Sim, mas não é cristã', 'Não participo de nenhuma'])
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P7 — Se sim, qual comunidade? Como tem sido?')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P8 — "Qual é o seu maior desafio como founder nessa fase?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P9 — "Sua comunidade de fé te apoia em empreender ou vê isso com ressalvas? Como isso afeta você?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO A — Bloco 3: Interesse na Comunidade
  // ══════════════════════════════════════════════════════════════

  var pA3 = form.addPageBreakItem()
      .setTitle('Bloco 3 — Interesse na Comunidade');

  // Após completar este bloco → ir para ENVIAR (não entrar no Fluxo B)
  pA3.setGoToPage(FormApp.PageNavigationType.SUBMIT);

  form.addCheckboxItem()
      .setTitle('P10 — O que teria valor para você participar de uma comunidade de founders sobre fé, propósito e impacto?')
      .setChoiceValues([
        'Mentoria com founders experientes',
        'Conexão com outros founders de fé',
        'Grupos de accountability',
        'Conteúdo sobre fé e empreendedorismo',
        'Eventos e encontros presenciais',
        'Oração e suporte espiritual coletivo'
      ])
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P10 — O que mais você adicionaria?')
      .setRequired(false);

  form.addMultipleChoiceItem()
      .setTitle('P11 — Se houvesse uma taxa de participação na comunidade, qual faixa você consideraria?')
      .setChoiceValues([
        'Não pagaria — precisa ser gratuita',
        'Até R$ 100/mês',
        'R$ 100 – R$ 300/mês',
        'R$ 300 – R$ 600/mês',
        'Acima de R$ 600/mês'
      ])
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P11 — O que essa contribuição precisaria oferecer para fazer sentido?')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P12 — "Tem alguma história que faz você acreditar que é possível empreender com fé?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 1: Perfil e Motivação
  // (para quem ainda não empreende)
  // ══════════════════════════════════════════════════════════════

  var pB1 = form.addPageBreakItem()
      .setTitle('Bloco 1 — Perfil e Motivação');

  form.addParagraphTextItem()
      .setTitle('P1 — "O que te fez começar? Qual foi a dor ou motivação que te trouxe até aqui?"')
      .setRequired(false);

  form.addMultipleChoiceItem()
      .setTitle('P2 — Sua motivação maior é:')
      .setChoiceValues([
        '💰 Financeira — geração de riqueza, independência',
        '🌱 Pessoal — realização, legado, crescimento',
        '🤝 Impacto social — transformar comunidade, causas',
        '✦ Espiritual — chamado, propósito, fé'
      ])
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P2 — Por quê? Elabore:')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 2: Comunidade e Rede
  // ══════════════════════════════════════════════════════════════

  var pB2 = form.addPageBreakItem()
      .setTitle('Bloco 2 — Comunidade e Rede');

  form.addMultipleChoiceItem()
      .setTitle('P7 — Você já participa de alguma comunidade de founders ou grupos de empreendedores?')
      .setChoiceValues(['Sim, e é cristã', 'Sim, mas não é cristã', 'Não participo de nenhuma'])
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P7 — Se sim, qual comunidade? Como tem sido?')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P8 — "Qual você imagina ser o maior desafio em empreender?"')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P9 — "Como você acha que sua comunidade de fé reagiria ao seu desejo de empreender?"')
      .setRequired(false);


  // ══════════════════════════════════════════════════════════════
  // FLUXO B — Bloco 3: Interesse na Comunidade
  // ══════════════════════════════════════════════════════════════

  var pB3 = form.addPageBreakItem()
      .setTitle('Bloco 3 — Interesse na Comunidade');

  form.addCheckboxItem()
      .setTitle('P10 — O que teria valor para você participar de uma comunidade de founders sobre fé, propósito e impacto?')
      .setChoiceValues([
        'Mentoria com founders experientes',
        'Conexão com outros founders de fé',
        'Grupos de accountability',
        'Conteúdo sobre fé e empreendedorismo',
        'Eventos e encontros presenciais',
        'Oração e suporte espiritual coletivo'
      ])
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P10 — O que mais você adicionaria?')
      .setRequired(false);

  form.addMultipleChoiceItem()
      .setTitle('P11 — Se houvesse uma taxa de participação na comunidade, qual faixa você consideraria?')
      .setChoiceValues([
        'Não pagaria — precisa ser gratuita',
        'Até R$ 100/mês',
        'R$ 100 – R$ 300/mês',
        'R$ 300 – R$ 600/mês',
        'Acima de R$ 600/mês'
      ])
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P11 — O que essa contribuição precisaria oferecer para fazer sentido?')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('P12 — "Tem alguma história que faz você acreditar que é possível empreender com fé?"')
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

  var planilha = SpreadsheetApp.create('The Counselours Club — Respostas Comunidade');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());

  // Cria aba de Análise com colunas organizadas por tema
  var abaAnalise = planilha.insertSheet('Análise por Tema');
  var cabecalhos = [
    // Identidade
    'Nome', 'E-mail', 'WhatsApp', 'Fluxo (A ou B)',
    // Motivação (P1 + P2)
    'P1 — O que te fez começar?',
    'P2 — Tipo de motivação',
    'P2 — Por quê (elaboração)',
    // Negócio (Fluxo A: P3 + P4 + P5 + P6)
    'P6 — O que é o negócio?',
    'P3 — Faturamento',
    'P4 — Tem parcerias?',
    'P4 — Quais parcerias?',
    'P5 — Recebeu investimento?',
    'P5 — Qual tipo de investimento?',
    // Rede e Comunidade (P7 + P8 + P9)
    'P7 — Participa de comunidade?',
    'P7 — Qual comunidade?',
    'P8 — Maior desafio',
    'P9 — Apoio da comunidade de fé',
    // Interesse na Comunidade (P10 + P11 + P12)
    'P10 — O que teria valor (opções)',
    'P10 — O que mais adicionaria?',
    'P11 — Faixa de contribuição',
    'P11 — O que precisaria oferecer?',
    'P12 — História de inspiração'
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
  Logger.log('✦ FORMULÁRIO DE COMUNIDADE CRIADO!');
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
