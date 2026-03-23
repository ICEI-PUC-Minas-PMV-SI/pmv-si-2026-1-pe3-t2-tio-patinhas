# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

## 3.1 Objetivos deste documento
Descrever e especificar as necessidades dos usuários que devem ser atendidas pelo projeto **Tio Patinhas – Sistema de Gestão Financeira Pessoal**, definindo os requisitos funcionais, não funcionais, atores do sistema e a modelagem necessária para orientar o desenvolvimento da aplicação web.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais

O produto será denominado **Tio Patinhas – Sistema de Gestão Financeira Pessoal**. A aplicação é composta pelos seguintes módulos principais:

- **Módulo de Autenticação:** responsável pelo cadastro e login de usuários.
- **Módulo de Transações:** permite o registro, edição, exclusão e consulta de receitas e despesas.
- **Módulo de Categorias:** permite a criação e gerenciamento de categorias para classificação das movimentações financeiras.
- **Módulo de Dashboard/Relatórios:** apresenta visualmente o resumo financeiro por meio de gráficos e painéis.

### 3.2.2 Missão do produto
Oferecer ao usuário uma ferramenta web simples, intuitiva e acessível para o registro, categorização e acompanhamento de suas movimentações financeiras pessoais, contribuindo para uma melhor organização do orçamento e para a tomada de decisões financeiras mais conscientes.

### 3.2.3 Limites do produto
O sistema **Tio Patinhas** não contempla:

- Integração direta com contas bancárias ou instituições financeiras.
- Funcionalidades de pagamento, transferências bancárias ou operações financeiras reais.
- Gestão financeira empresarial ou corporativa.
- Suporte a múltiplos usuários compartilhando o mesmo perfil financeiro.
- Emissão de notas fiscais ou documentos contábeis oficiais.
- Planejamento de investimentos ou cálculo de rendimentos.

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
| RF05 | Usuário Gerencia as Categorias | O sistema deve permitir que o usuário crie, edite, exclua e consulte categorias para classificação das transações (ex.: alimentação, transporte, lazer). | Essencial |
| RF06 | Usuário Visualiza o Saldo Atual | O sistema deve calcular e exibir o saldo atual do usuário com base na diferença entre receitas e despesas registradas. | Essencial |
| RF07 | Usuário Visualiza o Dashboard Financeiro | O sistema deve apresentar um painel com resumo financeiro, incluindo total de receitas, total de despesas e saldo do período. | Essencial |
| RF08 | Usuário Gera os Relatórios Visuais | O sistema deve exibir gráficos (ex.: pizza ou barras) com a distribuição de gastos por categoria e a evolução financeira ao longo do tempo. | Essencial |
| RF09 | Usuário Filtra as Transações | O sistema deve permitir filtrar as transações por período (data inicial e final), tipo (receita/despesa) e categoria. | Recomendável |
| RF10 | Usuário Recupera a Senha | O sistema deve oferecer mecanismo de recuperação de senha por e-mail cadastrado. | Desejável |
| RF11 | Usuário Gerencia o Perfil | O sistema deve permitir que o usuário atualize seus dados pessoais e senha de acesso. | Desejável |


### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------|--------------------------------------|
| RNF01 | **Usabilidade:** A interface deve ser simples, intuitiva e responsiva, adaptando-se a diferentes tamanhos de tela (desktop e dispositivos móveis). |
| RNF02 | **Desempenho:** O sistema deve responder às interações do usuário em até 3 segundos em condições normais de uso. |
| RNF03 | **Segurança:** As senhas dos usuários devem ser armazenadas com criptografia (hash). O acesso aos dados deve ser restrito ao usuário autenticado. |
| RNF04 | **Compatibilidade:** A aplicação deve funcionar nos principais navegadores modernos (Google Chrome, Mozilla Firefox, Microsoft Edge e Safari). |
| RNF05 | **Disponibilidade:** O sistema deve estar disponível para acesso via navegador web, sem necessidade de instalação de software adicional. |
| RNF06 | **Manutenibilidade:** O código deve ser organizado de forma modular, seguindo boas práticas de desenvolvimento, facilitando futuras manutenções e evoluções. |
| RNF07 | **Acessibilidade:** A interface deve adotar boas práticas de acessibilidade web (contraste adequado, textos descritivos em imagens e navegação por teclado). |
| RNF08 | **Persistência de dados:** Os dados dos usuários devem ser armazenados em banco de dados relacional, garantindo integridade e consistência das informações. |

### 3.3.3 Usuários 

| Ator | Descrição |
|------|-----------|
| Usuário | Pessoa física que utiliza o sistema para gerenciar suas finanças pessoais. Possui acesso completo às suas próprias transações, categorias, relatórios e configurações de perfil. É o único ator do sistema, pois a aplicação é de uso individual. |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, o usuário poderá se cadastrar, se autenticar e gerenciar sua conta, visualizar seu saldo atual e o dashboard financeiro. Entre outras funções.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

![dcu](<img width="544" height="369" alt="Captura de tela de 2026-03-23 19-14-13" src="https://github.com/user-attachments/assets/befc828c-3140-42da-9259-8be10a3196b1" />)
 
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

#### Gerenciar Categorias por Tipo (CSU05)

Sumário: O Usuário realiza a gestão das categorias por tipo, podendo incluir, alterar, excluir e consultar categorias vinculadas às transações financeiras.

Ator Primário: Usuário.

Ator Secundário: Não há.

Pré-condições: O Usuário deve estar autenticado no sistema.

Fluxo Principal:

1) O Usuário requisita manutenção de categorias por tipo.  
2) O Sistema apresenta as operações que podem ser realizadas: inclusão de uma nova categoria, alteração de uma categoria, exclusão de uma categoria e consulta de dados de categorias.  
3) O Usuário seleciona a operação desejada: Inclusão, Exclusão, Alteração ou Consulta, ou opta por finalizar o caso de uso.  
4) Se o Usuário desejar continuar com a gestão de categorias por tipo, o caso de uso retorna ao passo 2; caso contrário, o caso de uso termina.  

Fluxo Alternativo (3): Inclusão

a) O Usuário requisita a inclusão de uma categoria por tipo. <br>
b) O Sistema apresenta um formulário para preenchimento dos dados da categoria. <br>
c) O Usuário fornece os dados solicitados, tais como nome da categoria e tipo associado. <br>
d) O Sistema verifica a validade dos dados. Se os dados forem válidos, inclui a nova categoria e a lista de categorias cadastradas é atualizada; caso contrário, o Sistema reporta o fato, solicita novos dados e repete a verificação. <br>

Fluxo Alternativo (3): Remoção

a) O Usuário seleciona uma categoria e requisita ao Sistema que a remova. <br>
b) Se a categoria pode ser removida, o Sistema realiza a remoção; caso contrário, o Sistema reporta o fato. <br>

Fluxo Alternativo (3): Alteração

a) O Usuário altera um ou mais dos detalhes da categoria e requisita sua atualização. <br>
b) O Sistema verifica a validade dos dados e, se eles forem válidos, altera os dados da categoria; caso contrário, o erro é reportado. <br>

Fluxo Alternativo (3): Consulta

a) O Usuário solicita a consulta sobre a lista de categorias. <br>
b) O Sistema apresenta uma lista de categorias cadastradas. <br>
c) O Usuário seleciona a categoria. <br>
d) O Sistema apresenta os detalhes da categoria. <br>

#### Visualizar Dashboard Financeiro (CSU06)

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

A Figura 2 mostra o diagrama de classes apresenta as principais entidades do sistema e seus relacionamentos. O **Usuário** é a entidade central, possuindo diversas **Transações**, cada uma associada a uma **Categoria**. O sistema calcula automaticamente o **Saldo** com base nas transações registradas.

#### Figura 2: Diagrama de Classes do Sistema.

![image](https://github.com/user-attachments/assets/ba066df2-ea31-4f66-be63-a116961d85f1)


### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|---|------|-----------|
| 1 | Usuário | Armazena os dados de cadastro do usuário (id, nome, e-mail, senha criptografada, data de cadastro). |
| 2 | Transação | Representa uma movimentação financeira (id, descrição, valor, data, tipo [receita/despesa], id_categoria, id_usuário). |
| 3 | Categoria | Representa uma categoria de classificação das transações (id, nome, id_usuário). |

