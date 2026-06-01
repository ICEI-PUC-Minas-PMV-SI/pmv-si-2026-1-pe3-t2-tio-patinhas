# Tio Patinhas API (Backend)

Este é o backend do projeto **Tio Patinhas**, uma aplicação de gestão e educação financeira. A API foi desenvolvida utilizando C# com o framework ASP.NET Core e banco de dados SQLite.

## Tecnologias Utilizadas

- [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0)
- ASP.NET Core Web API
- Entity Framework Core (ORM)
- SQLite (Banco de Dados)
- Swagger (Documentação da API)
- JWT (Autenticação)
- BCrypt (Criptografia de senhas)

## Pré-requisitos

Para rodar o projeto localmente, você precisa ter instalado:
- [.NET 10.0 SDK](https://dotnet.microsoft.com/download)
- Uma IDE ou editor de texto como [Visual Studio](https://visualstudio.microsoft.com/), [Visual Studio Code](https://code.visualstudio.com/) ou [Rider](https://www.jetbrains.com/rider/).

## Como Configurar e Executar

### 1. Clonar o repositório e acessar a pasta

Abra o terminal, navegue até a pasta do projeto backend:

```bash
cd src/backend/TioPatinhas.Api
```

### 2. Restaurar dependências

Execute o comando abaixo para baixar todos os pacotes NuGet necessários:

```bash
dotnet restore
```

### 3. Configurar o Banco de Dados

O projeto utiliza o SQLite, o que facilita muito a configuração (o arquivo do banco é criado localmente como `tiopatinhas.db`).

As *migrations* (criação de tabelas) e a inserção de dados iniciais (*seeds*) **são aplicadas automaticamente ao iniciar o projeto em ambiente de desenvolvimento** (graças à configuração presente no `Program.cs`).

No entanto, caso precise atualizar a base de dados manualmente, você pode utilizar:

```bash
# Caso não tenha as ferramentas do EF Core instaladas:
dotnet tool install --global dotnet-ef

# Aplicar migrations
dotnet ef database update
```

### 4. Executar o Servidor

Para iniciar a API, basta executar o seguinte comando:

```bash
dotnet run
```

*Alternativamente, para executar com recarregamento automático (hot reload) a cada modificação nos arquivos:*

```bash
dotnet watch run
```

### 5. Acessar a Documentação (Swagger)

Com o servidor rodando em modo de desenvolvimento, você pode acessar a documentação interativa da API pelo Swagger nos seguintes endereços:

- **HTTPS:** [https://localhost:7126/swagger](https://localhost:7126/swagger)
- **HTTP:** [http://localhost:5256/swagger](http://localhost:5256/swagger)

*(As portas podem variar de acordo com o `Properties/launchSettings.json`, mas por padrão os endereços acima funcionarão).*

## Estrutura do Projeto

- **Controllers/**: Controladores responsáveis por receber as requisições HTTP e retornar as respostas.
- **Models/**: Classes que representam as entidades do banco de dados.
- **DTOs/**: Objetos de Transferência de Dados para entrada e saída nas requisições.
- **Services/**: Camada de regras de negócio da aplicação.
- **Data/**: Configuração do Entity Framework (`AppDbContext`) e *Seed* de dados.
- **Enums/**: Enumerações utilizadas pelo sistema (como tipo de transação).
- **appsettings.json**: Configurações da aplicação (como string de conexão com o banco e chaves secretas).
