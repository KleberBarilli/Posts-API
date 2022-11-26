




# Posts API
- Projeto realizado dia 19/04/2022




<img  src="https://i.ytimg.com/vi/xt6etYGbPpo/maxresdefault.jpg">





### Stack Utilizada





- NodeJS - v16.14.02 LTS



- Typescript - v4.4.4

> Usei o Typescript porque é muito bom para o ambiente de desenvolvimento, permitindo descobrir os erros enquanto a aplicação é feita. Além de conter tipagens de dados e várias outras ferramentas para que o código fique mais organizado e limpo.



- Express - v4.17.1



- PostgreSQL (via Docker Container)

> A escolha foi dada pois o Postgres é um dos melhores bancos sql gratuitos, possuindo integridade de dados via foreignkeys, além de ter ótimas bibliotecas para o NodeJS.



- TypeORM - v0.2.38



> Um dos melhores ORM's, funciona para toda a stack do NodeJS e facilita bastante no mapeamento do banco de dados.





### Tasks

Checklist do que foi feito:





- [x] Tarefa 1

	- [x] Stack Utilizada

	- [x] Tutorial de como executar



- [x] Tarefa 2 - Criação das 3 entidades



- [x] Tarefa 3 - Middleware de autenticação via token JWT



- [x] Tarefa 4 - Crud Usuário



- [x] Tarefa 5 - Crud Postagens

	- [x] a - Apenas o próprio usuário pode editar ou excluir as postagens;

	- [x] b - Possibilidade de adicionar foto na postagem. Imagem fica salva em um bucket na Amazon S3
	- <img  src="https://i.ibb.co/1mv7CBw/1.png" >
	- <img  src="https://i.ibb.co/k988rYy/2.png" >
	- <a>https://apiposts.s3.amazonaws.com/1d298a2de1358027e1a4-secure-rest-api-in-nodejs-18f43b3033c239da5d2525cfd9fdc98f.png


- [x] Tarefa 6 - Crud Comentários

	- [x] a - Apenas o próprio usuário pode editar os comentários;

	- [x] b - Usuário do comentário pode remover o comentário;


- [x] Tarefa 8 - Documentar a API - arquivo



## 💻 Pré-requisitos para rodar o projeto



Passo a passo



```
docker run --name quik_dev -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

```

Após criado o container, vamos entrar nele e criar a database.

Para checar qual o id do container: basta dar um docker ps

```
docker ps
```
```
docker exec -it "idcontainer" bash
```

Com esse comando você está dentro do container, agora basta executar mais 2 comandos para criar o banco de dados

```
psql -U postgres
```

```
CREATE DATABASE quikdev_db;
```



## 🚀 Instalando



Após configurar o banco de dados e clonar o repositório, na raíz do projeto:



```
npm install
```

```
npm run build
```

```
npx typeorm migration:run
```

Após as tabelas serem criadas, basta dar o start no projeto com:



```
npm run dev
```

Lembre-se de criar um arquivo de variáveis de ambiente chamado .env para colocar as configurações do banco de dados, app secret, urls e afins. Coloquei um arquivo .env.example para se basear



## ☕ Importando as requisições



Usei o insomnia para testar as rotas, caso queira importar, é só realizar o import selecionando o arquivo chamadas.json que está na raíz do projeto.



<img  src="https://i.ibb.co/JRvq1xy/inmm.png">

