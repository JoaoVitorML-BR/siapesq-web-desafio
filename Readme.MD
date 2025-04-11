# Desafio B SIAPESQ Backend - Time WEB

### Descrição do Desafio e Tecnologias Utilizadas

Desenvolva uma REST API utilizando Node, Express framework e Sequelize ORM, implementando o CRUD de todas as entidades no diagrama abaixo:

- Tecnologias solicitadas/Utilizadas: Node, Express framework e Sequelize ORM, com o banco MySQL.

- Tecnologias extras: Utilizei algumas tecnologias extras para deixar o projeto mais robusto, como TypeScript, Docker, Swagger (para documentar a aplicação), UUID para geração de IDs mais robustos e Nodemon para executar a aplicação em tempo real.

<img align="center" alt="siapesq" height="250" width="450" src="./public/img/schema-image-db.png"><br>

<hr>

## Iniciando o ambiente

Para iniciar o servidor, basta, acessar a pasta "cd /scripts" + pasta do seu sistema operacional via terminal e rodar o comando "source ./start.sh" para linux, "bash .\start.sh" para windows ou, se preferir, execute no diretorio principal "npm install" e em seguida "docker-compose up --build".

-   Obs 1: Caso você rode o comando ./start.sh e der erro de permissão, execute o comando chmod +x start.sh (para Linux Ubuntu).

-   Obs 2: O arquivo .env será mantido fora do .gitignore para facilitar a criação do ambiente, evitando a necessidade de criar e configurar os dados dele, bem como a geração da chave JWT_SECRET.

- Obs 3: Você deve ter o docker instalado na maquina, caso não tenha, você pode instalar ele através do link:
  - <a href="https://www.docker.com/get-started/"> Docker </a>

### Acesso às rotas

Para acessar as rotas da aplicação documentada, você deve acessar http://localhost:3000/api-docs. Essa rota nos levará à documentação gerada pelo Swagger, onde estarão todas as informações necessárias de cada rota que a aplicação contém e seu uso. Veja abaixo alguns exemplos:

#### Criando usuário

Acesse a rota http://localhost:3000/api-docs, e iremos criar um usuário para demonstrar a utilização do Swagger.

Primeiro definimos todos os dados conforme solicitado na imagem abaixo:

-   desça até a área de User → Opção: POST /user (Criar novo usuário) → Clique em "Try it out".

    -   Obs: Não se esqueça de anotar o e-mail e a senha, pois precisaremos dessas informações para efetuar o login posteriormente.

```
{
  "first_name": "siapesq",
  "last_name": "backend",
  "email": "siapesqbackend@gmail.com",
  "username": "siapesq2025",
  "password": "12345"
}
```
<img align="center" alt="create-user" height="250" width="450" src="./public/img/create-user-1.png"><br>

Preencha os dados e clique em "Execute". Se tudo der certo, você receberá um status "201".

*Exemplo de Response*

{
  "id": "7f9225db-9159-474e-b9c1-f621697868b6",
  "username": "teste12345",
  "email": "testenovo@gmail.com",
  "first_name": "teste1234",
  "last_name": "teste"
}

<img align="center" alt="create-user" height="250" width="450" src="./public/img/create-user-2.png"><br>

#### Login

Agora, vamos fazer o login para conseguir acessar as demais rotas, pois, conforme solicitado no desafio, todas as rotas estão "bloqueadas" e exigem que o usuário esteja autenticado. Após criarmos o usuário conforme o passo anterior, siga os passos abaixo para efetuar o login:

**Passo 1**

Acima de User, vá até Auth, onde realizaremos o login. Para isso, precisaremos do e-mail do usuário que criamos anteriormente.

*Exemplo de Login*

```
{
  "email": "siapesqbackend@gmail.com",
  "password": "12345"
}
```

<img align="center" alt="create-user" height="250" width="450" src="./public/img/login-user-1.png"><br>

**Passo 2**

Após efetuar o login, a resposta irá retornar as informações do usuário e um token. Você precisará desse token para se autenticar e acessar as demais rotas. Copie o token gerado.

*Exemplo de Response*

```
{
  "user": {
    "id": "5fc91bfc-1d14-481a-bd30-d29e76dc26e8",
    "username": "siapesq2025",
    "email": "siapesqbackend@gmail.com",
    "first_name": "siapesq",
    "last_name": "backend"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzkxYmZjLTFkMTQtNDgxYS1iZDMwLWQyOWU3NmRjMjZlOCIsImVtYWlsIjoic2lhcGVzcWJhY2tlbmRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzaWFwZXNxMjAyNSIsImlhdCI6MTc0NDIxMjAwMCwiZXhwIjoxNzQ0MjE1NjAwfQ.PDbrlO4KWCv1ipmamdFJxcDREWT_EBKIPBiKqLs-lk8"
}
```

<img align="center" alt="create-user" height="250" width="450" src="./public/img/login-user-2.png"><br>

**Passo 3**

Após copiar o token, vamos nos autenticar no Swagger para termos acesso às rotas que requerem autenticação. Para isso, basta colar o token que copiamos, conforme mostrado na imagem abaixo, e estaremos finalmente autenticados para acessar todas as rotas disponíveis e documentadas no Swagger. *Obs: Cole o token sem as aspas*.

<img align="center" alt="create-user" height="250" width="450" src="./public/img/login-user-3.png"><br>

### Video explicativo

Em caso de dúvidas sobre o projeto ou uso, segue abaixo o vídeo explicativo sobre o projeto, as tecnologias utilizadas, as escolhas feitas e o funcionamento da aplicação.