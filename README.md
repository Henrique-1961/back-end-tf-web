# Trabalho Final #04
Backend (Fictício) do projeto CGAE - Listas Eletrônicas

## Integrantes
- Bernardo Rafael Sales Saraiva
- Henrique Cardoso de Souza
- Jackson Darley Rocha Santos
- João Marcos Martins Xavier
- Ígor Gabriel Sena Matos

## Modelo Conceitual do Banco de Dados
![modelo conceitual](./db/Conceitual.png)

## Modelo Lógico do Banco de Dados
![modelo lógico](./db/Lógico.png)

## Modelo Físico do Banco de Dados
[Arquivo SQL do Banco de Dados](./db/DDL.sql)

### Ferramentas Utilizadas 🚀
- **brModelo** -> Design
- [**Neon Tech**](https://neon.tech) -> Hospedagem

## Descrição do projeto
CGAE - Listas Eletrônicas é um projeto com o intuito de digitalizar os sistemas de controle de saída dos alunos residentes do campus.

## Endpoints da API

### Raiz
- **Descrição:** Traz informações relacionadas ao repositório do projeto.
- **Endpoint:** https://tf-04.vercel.app/
- **Tipo da requisição:** GET

### Login
- **Descrição:** Realiza o login apartir das credenciais de algum aluno cadastrado.
- **Endpoint:** https://tf-04.vercel.app/login
- **Tipo da requisição:** POST
- **body:**

![body](./img/login.png)

- **Usuários default:**
    - **Aluno**
        ```json
        "email": "aluno@email",
        "senha": "aluno123"
        ```
    - **Assistente**
        ```json
        "email": "admin@email",
        "senha": "admin123"
        ```

### Consultar Alunos
- **Descrição:** Traz os dados de todos os alunos cadastrados no banco de dados.
- **Endpoint:** https://tf-04.vercel.app/aluno
- **Tipo da requisição:** GET
- **headers:**

![headers](./img/header.png)


### Consultar Aluno
- **Descrição:** Traz os dados de um aluno em específico.
- **Endpoint:** https://tf-04.vercel.app/aluno/:id
- **Tipo da requisição:** GET
- **headers:**

![headers](./img/header.png)

### Cadastrar Aluno
- **Descrição:** Insere um novo aluno no banco de dados.
- **Endpoint:** https://tf-04.vercel.app/aluno
- **Tipo da requisição:** POST
- **headers:**

![headers](./img/header.png)

- **body:**

![body](./img/insert-aluno.png)

### Atualizar Aluno
- **Descrição:** Atualiza os dados de um aluno cadastrado.
- **Endpoint:** https://tf-04.vercel.app/aluno
- **Tipo da requisição:** PATCH
- **headers:**

![headers](./img/header.png)

- **body:**

![body](./img/update-aluno.png)

### Excluir Aluno
- **Descrição:** Exclui um aluno cadastrado.
- **Endpoint:** https://tf-04.vercel.app/aluno/:id
- **Tipo da requisição:** DELETE
- **headers:**

![headers](./img/header.png)

### Consultar Assinaturas
- **Descrição:** Traz os dados de todas as assinaturas cadastradas no banco de dados.
- **Endpoint:** https://tf-04.vercel.app/assinatura
- **Tipo da requisição:** GET
- **headers:**

![headers](./img/header.png)


### Consultar Assinatura
- **Descrição:** Traz os dados de uma assinatura em específico.
- **Endpoint:** https://tf-04.vercel.app/assinatura/:id
- **Tipo da requisição:** GET
- **headers:**

![headers](./img/header.png)

### Cadastrar Assinatura
- **Descrição:** Insere uma nova assinatura no banco de dados.
- **Endpoint:** https://tf-04.vercel.app/assinatura
- **Tipo da requisição:** POST
- **headers:**

![headers](./img/header.png)

- **body:**

![body](./img/insert-assinatura.png)

### Atualizar Assinatura
- **Descrição:** Atualiza os dados de uma assinatura cadastrada.
- **Endpoint:** https://tf-04.vercel.app/assinatura
- **Tipo da requisição:** PATCH
- **headers:**

![headers](./img/header.png)

- **body:**

![body](./img/update-assinatura.png)

### Excluir Assinatura
- **Descrição:** Exclui uma assinatura cadastrada.
- **Endpoint:** https://tf-04.vercel.app/assinatura/:id
- **Tipo da requisição:** DELETE
- **headers:**

![headers](./img/header.png)
