# /planejar-semana

Agente de planejamento semanal da Community Counselors.

Ao ser invocado, execute os seguintes passos em ordem:

1. Leia o CLAUDE.md para ter o contexto completo do projeto
2. Pergunte ao usuário qual semana está sendo planejada e o status atual de cada membro da lista
3. Com base no status, monte uma tabela de tarefas por dia seguindo a regra:
   - **Segunda a sexta**: tarefas operacionais (convites, follow-ups, entrevistas, onboarding, copy de posts)
   - **Sábado e domingo**: tarefas estratégicas (definir posts, revisar metas, planejar próximos passos)
4. Confirme com o usuário antes de salvar no Notion
5. Ao confirmar, crie as entradas no banco de dados "Mes de Junho" (collection://37cb8e9f-cc68-801e-9618-000bb450fafc)

**Regras fixas do planejamento:**
- 1 post por semana (TikTok + Instagram, sem rosto)
- Definir post no fim de semana anterior
- Escrever copy durante a semana
- Publicar no dia definido
- Tarefas de convite: sempre com follow-up em 48h
- Após aceite: agendar entrevista (exceto Isaque e Paulo que já aceitaram)
