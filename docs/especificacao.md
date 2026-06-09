# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

## 3.1 Objetivos deste documento
Descrever e especificar as necessidades dos usuários que devem ser atendidas pelo projeto **Tio Patinhas – Sistema de Gestão Financeira Pessoal**, definindo os requisitos funcionais, não funcionais, atores do sistema e a modelagem necessária para orientar o desenvolvimento da aplicação web.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais
O produto será denominado **Tio Patinhas – Sistema de Gestão Financeira Pessoal**. A aplicação é composta pelos seguintes módulos principais:
- **Módulo de Autenticação:** responsável pelo cadastro e login de usuários (JWT).
- **Módulo de Transações:** permite o registro, edição, exclusão e consulta de receitas e despesas, com classificação por categoria no momento do cadastro.
- **Módulo de Dashboard/Relatórios:** apresenta resumo de liquidez, gráficos de despesas por categoria e evolução mensal (últimos 6 meses).
- **Módulo de Investimentos:** registro e acompanhamento de aportes por ativo (ex.: Tesouro, BTC).
- **Módulo de Metas:** definição e acompanhamento de objetivos financeiros de curto e longo prazo.
- **Módulo de Perfil:** atualização de dados pessoais e senha.

> **Categorias (implementação):** não existe módulo/tela de CRUD de categorias exposto ao usuário. As categorias são escolhidas em lista pré-definida na interface de transações e persistidas internamente pelo backend quando a transação é salva (ver seção [3.5](#35-notas-da-implementação-atual)).

### 3.2.2 Missão do produto
Oferecer ao usuário uma ferramenta web simples, intuitiva e acessível para o registro, categorização e acompanhamento de suas movimentações financeiras pessoais, contribuindo para uma melhor organização do orçamento e para a tomada de decisões financeiras mais conscientes.

### 3.2.3 Limites do produto
O sistema **Tio Patinhas** não contempla:
- Integração direta com contas bancárias ou instituições financeiras.
- Funcionalidades de pagamento, transferências bancárias ou operações financeiras reais.
- Gestão financeira empresarial ou corporativa.
- Suporte a múltiplos usuários compartilhando o mesmo perfil financeiro.
- Emissão de notas fiscais ou documentos contábeis oficiais.
- Integração com corretoras ou cotação de ativos em tempo real (a estimativa de BTC no dashboard usa valor fixo de referência no MVP).
- Cálculo automático de rendimentos ou rentabilidade histórica de investimentos.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|---|-----------|----------------------|
| 1 | Registro simples e rápido de receitas e despesas | Essencial |
| 2 | Categorização das movimentações financeiras | Essencial |
| 3 | Visualização clara do saldo e do fluxo de caixa | Essencial |
| 4 | Relatórios e gráficos do histórico financeiro | Essencial |
| 5 | Acesso seguro com autenticação por senha | Essencial |
| 6 | Interface intuitiva, sem necessidade de conhecimento técnico prévio | Recomendável |
| 7 | Apoio à construção de hábitos financeiros mais saudáveis | Recomendável |
| 8 | Filtros de transações por período, tipo e categoria | Desejável |

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade) | Descrição | Prioridade |
|--------|--------------------------------------|-----------|------------|
| RF01 | Usuário se Cadastra | O sistema deve permitir que novos usuários se registrem informando nome, e-mail e senha. | Essencial |
| RF02 | Usuário se Autentica | O sistema deve permitir login por e-mail e senha, garantindo acesso apenas ao perfil do usuário autenticado. | Essencial |
| RF03 | Usuário Gerencia as Transações | O sistema deve permitir inclusão, alteração, exclusão e consulta de transações financeiras (receitas e despesas). | Essencial |
| RF04 | Usuário Classifica as Transações por Tipo | O sistema deve permitir que cada transação seja classificada como **receita** ou **despesa**. | Essencial |
| RF05 | Usuário Classifica Transações por Categoria | O sistema deve permitir associar cada transação a uma categoria (lista pré-definida na interface, ex.: Moradia, Alimentação). O backend persiste a categoria vinculada ao usuário; **não** há tela de CRUD de categorias. | Essencial |
| RF06 | Usuário Visualiza o Saldo Atual (Liquidez) | O sistema deve calcular e exibir a **liquidez** (saldo de caixa) com base na diferença acumulada entre todas as receitas e despesas registradas. | Essencial |
| RF07 | Usuário Visualiza o Dashboard | O sistema deve exibir painel com: **patrimônio estimado** (liquidez + BTC, quando houver), receitas e despesas consolidadas, gráfico de despesas por categoria, evolução dos **últimos 6 meses** com saldo acumulado e resumo de metas. | Essencial |
| RF08 | Usuário Filtra as Transações | O sistema deve permitir filtrar as transações por período (data inicial e final), tipo (receita/despesa) e categoria. | Recomendável |
| RF09 | Usuário Recupera a Senha | O sistema deve oferecer mecanismo de recuperação de senha por e-mail cadastrado. | Desejável |
| RF10 | Usuário Gerencia o Perfil | O sistema deve permitir que o usuário atualize seus dados pessoais e senha de acesso. | Desejável |
| RF11 | Usuário Gerencia seus Metas | O sistema deve permitir que o usuário gerencie suas metas, sendo objetivos de curto a longo prazo. | Essencial |
| RF12 | Usuário Gerencia seus Investimentos | O sistema deve permitir que o usuário gerencie seus investimentos, registrando um novo aporte. | Essencial |

### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------|--------------------------------------|
| RNF01 | **Usabilidade (Responsividade)** A interface deve ser adaptável a: **Mobile** (min 320px), **Tablet** (min 768px) e **Desktop** (min 1024px), sem barras de rolagem horizontal. |
| RNF02 | **Desempenho:** O sistema deve responder às interações do usuário em até 3 segundos em condições normais de uso. |
| RNF03 | **Segurança:** As senhas devem ser armazenadas com hashing **BCrypt** ou **Argon2**. O acesso aos dados deve ser restrito ao usuário autenticado. |
| RNF04 | **Compatibilidade** Suporte total às duas últimas versões estáveis de Chrome, Firefox, Safari e Microsoft Edge. |
| RNF05 | **Disponibilidade** Acesso via navegador sem necessidade de plugins ou software adicional. |
| RNF06 | **Manutenibilidade** Código modular seguindo padrões de arquitetura (ex.: Clean Architecture ou MVC). |
| RNF07 | **Acessibilidade:** A interface deve adotar boas práticas de acessibilidade web (contraste adequado, textos descritivos em imagens e navegação por teclado). |
| RNF08 | **Persistência de dados:** Os dados dos usuários devem ser armazenados em banco relacional com integridade e consistência. Na implementação atual utiliza-se **SQLite** (`tiopatinhas.db`) com Entity Framework Core. |

### 3.3.3 Usuários 

| Ator | Descrição |
|------|-----------|
| Usuário | Pessoa física que utiliza o sistema para gerenciar suas finanças pessoais. Possui acesso completo às suas próprias transações e configurações. |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, o usuário poderá se cadastrar, se autenticar e gerenciar sua conta, visualizar seu saldo atual e o dashboard financeiro. Entre outras funções.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

![dcu](/docs/assets/img/Diagrama Caso de Uso - Tio Patinhas.drawio.png)<br>
 
### 3.4.2 Descrições de Casos de Uso

Cada caso de uso deve ter a sua descrição representada nesta seção.

#### Autenticar-se (CSU01)

Sumário: O Usuário realiza login no sistema por meio de e-mail e senha para acessar sua área pessoal.

Ator Primário: Usuário.

Ator Secundário: Não há.

Pré-condições: O Usuário deve possuir cadastro ativo no sistema.

Fluxo Principal:

1) O Usuário requisita autenticação no sistema.  
2) O Sistema apresenta os campos de e-mail e senha.  
3) O Usuário informa suas credenciais de acesso.  
4) O Sistema valida os dados informados.  
5) O Sistema verifica se as credenciais correspondem a um usuário cadastrado.  
6) O Sistema autentica o Usuário.  
7) O Sistema concede acesso ao perfil do usuário autenticado.  

Fluxo Alternativo (5): Credenciais inválidas

a) O Sistema verifica que o e-mail ou a senha são inválidos. <br>
b) O Sistema informa erro na autenticação. <br>
c) O Sistema solicita nova tentativa de login. <br>

Fluxo de Extensão (2): Recuperar Senha

a) Caso o Usuário não se recorde da senha, ele seleciona a opção de recuperação de senha. <br>
b) O caso de uso **Recuperar Senha (CSU02)** é acionado. <br>

#### Recuperar Senha (CSU02)

Sumário: O Usuário solicita a recuperação de sua senha por meio do e-mail cadastrado no sistema, como extensão do caso de uso de autenticação.

Ator Primário: Usuário.

Ator Secundário: Serviço de E-mail.

Pré-condições: O Usuário deve possuir cadastro com e-mail válido no sistema e ter acessado a funcionalidade a partir do caso de uso Autenticar-se.

Fluxo Principal:

1) O Usuário requisita a recuperação de senha.  
2) O Sistema solicita o e-mail cadastrado.  
3) O Usuário informa o e-mail.  
4) O Sistema verifica se o e-mail pertence a uma conta cadastrada.  
5) O Sistema envia instruções de recuperação de senha para o e-mail informado.  
6) O Usuário acessa o link de recuperação recebido.  
7) O Sistema permite a redefinição da senha.  
8) O Usuário informa a nova senha.  
9) O Sistema atualiza a senha da conta.  

Fluxo Alternativo (4): E-mail não encontrado

a) O Sistema verifica que o e-mail informado não está cadastrado. <br>
b) O Sistema informa que não foi encontrada conta vinculada ao e-mail informado. <br>
c) O caso de uso é encerrado ou o Usuário pode tentar novamente. <br>

#### Gerenciar Perfil (CSU03)

Sumário: O Usuário realiza a gestão de seus dados pessoais e de sua senha de acesso.

Ator Primário: Usuário.

Ator Secundário: Não há.

Pré-condições: O Usuário deve estar autenticado no sistema.

Fluxo Principal:

1) O Usuário requisita a gestão de seu perfil.  
2) O Sistema apresenta os dados atualmente cadastrados.  
3) O Usuário seleciona a operação desejada: alterar dados pessoais ou alterar senha.  
4) O Usuário informa os novos dados.  
5) O Sistema valida as informações fornecidas.  
6) O Sistema atualiza os dados do perfil.  
7) O Sistema confirma a atualização realizada.  

Fluxo Alternativo (5): Dados inválidos

a) O Sistema identifica inconsistências ou dados inválidos. <br>
b) O Sistema informa o erro ao Usuário. <br>
c) O Sistema solicita a correção dos dados. <br>

#### Gerenciar Transações (CSU04)

Sumário: O Usuário realiza a gestão de suas transações financeiras, podendo incluir, alterar, excluir e consultar receitas e despesas.

Ator Primário: Usuário.

Ator Secundário: Não há.

Pré-condições: O Usuário deve estar autenticado no sistema.

Fluxo Principal:

1) O Usuário requisita manutenção de transações financeiras.  
2) O Sistema apresenta as operações que podem ser realizadas: inclusão de uma nova transação, alteração de uma transação, exclusão de uma transação e consulta de dados de transações.  
3) O Usuário seleciona a operação desejada: Inclusão, Exclusão, Alteração ou Consulta, ou opta por finalizar o caso de uso.  
4) Se o Usuário desejar continuar com a gestão de transações, o caso de uso retorna ao passo 2; caso contrário, o caso de uso termina.  

Fluxo Alternativo (3): Inclusão

a) O Usuário requisita a inclusão de uma transação. <br>
b) O Sistema apresenta um formulário para preenchimento dos dados da transação. <br>
c) O Usuário fornece os dados solicitados, tais como descrição, valor, data, tipo e categoria. <br>
d) O Sistema verifica a validade dos dados. Se os dados forem válidos, inclui a nova transação e a lista de transações cadastradas é atualizada; caso contrário, o Sistema reporta o fato, solicita novos dados e repete a verificação. <br>

Fluxo Alternativo (3): Remoção

a) O Usuário seleciona uma transação e requisita ao Sistema que a remova. <br>
b) Se a transação pode ser removida, o Sistema realiza a remoção; caso contrário, o Sistema reporta o fato. <br>

Fluxo Alternativo (3): Alteração

a) O Usuário altera um ou mais dos detalhes da transação e requisita sua atualização. <br>
b) O Sistema verifica a validade dos dados e, se eles forem válidos, altera os dados da transação; caso contrário, o erro é reportado. <br>

Fluxo Alternativo (3): Consulta

a) O Usuário solicita a consulta sobre a lista de transações. <br>
b) O Sistema apresenta uma lista de transações cadastradas. <br>
c) O Usuário seleciona a transação. <br>
d) O Sistema apresenta os detalhes da transação. <br>

#### Gerenciar Metas (CSU05)

Sumário: O Usuário realiza a gestão de suas metas financeiras, podendo incluir, alterar, excluir e consultar metas de economia ou planejamento financeiro.

Ator Primário: Usuário.

Ator Secundário: Não há.

Pré-condições: O Usuário deve estar autenticado no sistema.

Fluxo Principal:

1) O Usuário requisita manutenção de metas financeiras.
2) O Sistema apresenta as operações que podem ser realizadas: inclusão de uma nova meta, alteração de uma meta, exclusão de uma meta e consulta de dados de metas.
3) O Usuário seleciona a operação desejada: Inclusão, Exclusão, Alteração ou Consulta, ou opta por finalizar o caso de uso.
4) Se o Usuário desejar continuar com a gestão de metas, o caso de uso retorna ao passo 2; caso contrário, o caso de uso termina.

Fluxo Alternativo (3): Inclusão

a) O Usuário requisita a inclusão de uma meta financeira.  
b) O Sistema apresenta um formulário para preenchimento dos dados da meta.  
c) O Usuário fornece os dados solicitados, tais como nome da meta, valor alvo, prazo e descrição.  
d) O Sistema verifica a validade dos dados. Se os dados forem válidos, inclui a nova meta e atualiza a lista de metas cadastradas; caso contrário, o Sistema reporta o fato, solicita novos dados e repete a verificação.

Fluxo Alternativo (3): Remoção

a) O Usuário seleciona uma meta e requisita ao Sistema que a remova.  
b) Se a meta pode ser removida, o Sistema realiza a remoção; caso contrário, o Sistema reporta o fato.

Fluxo Alternativo (3): Alteração

a) O Usuário altera um ou mais dos detalhes da meta e requisita sua atualização.  
b) O Sistema verifica a validade dos dados e, se eles forem válidos, altera os dados da meta; caso contrário, o erro é reportado.

Fluxo Alternativo (3): Consulta

a) O Usuário solicita a consulta sobre a lista de metas.  
b) O Sistema apresenta uma lista de metas cadastradas.  
c) O Usuário seleciona a meta.  
d) O Sistema apresenta os detalhes e o progresso da meta.

#### Gerenciar Investimentos (CSU06)

Sumário: O Usuário realiza a gestão de seus investimentos, podendo incluir, alterar, excluir e consultar informações relacionadas aos ativos financeiros cadastrados.

Ator Primário: Usuário.

Ator Secundário: Não há.

Pré-condições: O Usuário deve estar autenticado no sistema.

Fluxo Principal:

1) O Usuário requisita manutenção de investimentos.
2) O Sistema apresenta as operações que podem ser realizadas: inclusão de um novo investimento, alteração de um investimento, exclusão de um investimento e consulta de dados de investimentos.
3) O Usuário seleciona a operação desejada: Inclusão, Exclusão, Alteração ou Consulta, ou opta por finalizar o caso de uso.
4) Se o Usuário desejar continuar com a gestão de investimentos, o caso de uso retorna ao passo 2; caso contrário, o caso de uso termina.

Fluxo Alternativo (3): Inclusão

a) O Usuário requisita a inclusão de um investimento.  
b) O Sistema apresenta um formulário para preenchimento dos dados do investimento.  
c) O Usuário fornece os dados solicitados, tais como nome do ativo, quantidade, valor investido e data de aquisição.  
d) O Sistema verifica a validade dos dados. Se os dados forem válidos, inclui o novo investimento e atualiza a lista de investimentos cadastrados; caso contrário, o Sistema reporta o fato, solicita novos dados e repete a verificação.

Fluxo Alternativo (3): Remoção

a) O Usuário seleciona um investimento e requisita ao Sistema que o remova.  
b) Se o investimento pode ser removido, o Sistema realiza a remoção; caso contrário, o Sistema reporta o fato.

Fluxo Alternativo (3): Alteração

a) O Usuário altera um ou mais dos detalhes do investimento e requisita sua atualização.  
b) O Sistema verifica a validade dos dados e, se eles forem válidos, altera os dados do investimento; caso contrário, o erro é reportado.

Fluxo Alternativo (3): Consulta

a) O Usuário solicita a consulta sobre a lista de investimentos.  
b) O Sistema apresenta uma lista de investimentos cadastrados.  
c) O Usuário seleciona o investimento.  
d) O Sistema apresenta os detalhes do investimento e seu valor atualizado.

#### Visualizar Dashboard Financeiro (CSU07)

Sumário: O Usuário visualiza um painel com resumo de sua situação financeira, incluindo informações consolidadas sobre suas transações.

Ator Primário: Usuário.

Ator Secundário: Não há.

Pré-condições: O Usuário deve estar autenticado no sistema.

Fluxo Principal:

1) O Usuário requisita a visualização do dashboard financeiro.  
2) O Sistema recupera os dados financeiros do Usuário.  
3) O Sistema processa as informações de receitas e despesas registradas.  
4) O Sistema organiza os dados em formato de painel gerencial.  
5) O Sistema apresenta o dashboard financeiro ao Usuário.

### 3.4.3 Diagrama de Classes 

A Figura 2 apresenta as principais entidades do sistema e seus relacionamentos. O **Usuário** é a entidade central, possuindo **Transações** (associadas a **Categoria** interna), **Investimentos** e **Metas**. O saldo de liquidez é derivado das transações; o patrimônio exibido no dashboard pode incluir estimativa de ativos em BTC.

#### Figura 2: Diagrama de Classes do Sistema.

![image](https://github.com/user-attachments/assets/f35d9263-51f1-4a1e-b44c-348f59ca111e)


### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|---|------|-----------|
| 1 | Usuário | Armazena os dados de cadastro do usuário (id, nome, e-mail, senha criptografada, data de cadastro). |
| 2 | Transação | Representa uma movimentação financeira (id, descrição, valor, data, tipo [receita/despesa], id_categoria, id_usuário). |
| 3 | Categoria | Classificação das transações (id, nome, tipo receita/despesa, id_usuário). Criada/vinculada automaticamente ao salvar transação; sem API pública de manutenção. |
| 4 | Investimento | Aporte em ativo (id, ativo, quantidade, preço de compra, data, id_usuário). |
| 5 | Meta | Objetivo financeiro (id, título, valor alvo, valor atual, prazo, tipo curto/longo prazo, id_usuário). |

## 3.5 Notas da implementação atual

Esta seção registra o comportamento do código entregue em `src/Frontend` e `src/backend/TioPatinhas.Api`, para alinhar a documentação acadêmica ao sistema executável.

### API e integração

- Contrato HTTP: `src/Frontend/API_CONTRACT.md` (rotas na raiz, ex.: `/transactions`, `/auth`, `/investments`, `/goals`).
- Autenticação: `Authorization: Bearer <token>`; rotas públicas apenas `/auth/register` e `/auth/login`.
- Rotas antigas `/api/Transactions` e `/api/Categories` foram descontinuadas.

### Categorias

- O usuário seleciona categoria no formulário de transação (lista fixa no frontend).
- O corpo da requisição envia o campo `category` (texto); o backend resolve ou cria o registro em `Categories` via serviço interno.
- Relatório `GET /transactions/expenses-by-category` agrupa despesas pelo **nome** da categoria.

### Dashboard e relatórios

| Indicador | Regra |
|-----------|--------|
| Receitas / Despesas (cards) | Soma de **todas** as transações do tipo correspondente |
| Liquidez | Receitas totais − despesas totais (`GET /transactions/summary`) |
| Nível da Caixa-Forte | Liquidez + (quantidade BTC × R$ 340.000 no MVP) |
| Gráfico de evolução | 6 meses; `balance` em cada mês = saldo acumulado incluindo meses anteriores ao intervalo |
| Último ponto do gráfico “Saldo acumulado” | Deve coincidir com a liquidez do resumo |

### Investimentos

- CRUD completo em `/investments`.
- BTC no dashboard: soma apenas investimentos cujo ativo é `BTC` ou `BITCOIN` (case insensitive).
- Cotação não vem da API; valor de referência fixo no frontend para demonstração.

### Metas e perfil

- Metas: tipos `short_term` e `long_term`; CRUD em `/goals`.
- Perfil: `GET/PUT /profile` e `PUT /profile/password`.

### Funcionalidades previstas e ainda não entregues

- **RF08** — filtros de transações por período, tipo e categoria na listagem.
- **RF09** — recuperação de senha por e-mail.
- **CSU05** — CRUD dedicado de categorias (substituído pela classificação no cadastro de transação).

