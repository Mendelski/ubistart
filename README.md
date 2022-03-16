#Readme - Desafio BackEnd

## Configurando dependências
Eu optei por fazer a configuração utilizando o Yarn, então vou exibir os comando todos com o mesmo, caso seja
necessário, é possível optar por executar o projeto com npm. 

Para instalar as dependências definidas em package.json, execute: 

```
yarn install
```

## Configuração de Secret do jwt
Crie um aarquivo .env na raiz do projeto, configure uma variável ```JWT_SECRET``` com uma secret de sua preferência
deve ficar desse jeito:

```
JWT_SECRET=thisPasswordIsNotSoSecret
```

## Configuração do MySQL
No arquivo ormconfig.ts temos as variáveis de configuração do banco de dados, defina os valores conforme seu ambiente
no arquivo .env de acordo com as variáveis exibidas abaixo:

```
{
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? 3306,
    username: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? 'root',
    database: process.env.DB_DATABASE ?? 'test_ubistart',
}
``` 

Após configurar o orm para a conexão com o banco, precisaremos criar o schema, e o resto a parte de migrations se
encarrega de fazer por nós.

para criar o schema, no terminal mysql digite:

```
create schema test_ubistart;
```

caso deseje criar o banco com outro nome, altere também o valor no .env.

Após o schema criado e tudo configurado, execute a migration: 

```
yarn typeorm migration:run
```

yarn typeorm é uma maneira de executar a migration do projeto, se for necessário alterar, basta mudar o script definido no pac
kage.json 

## Iniciando o projeto
Com os passos acima concluídos podemos iniciar o projeto, então execute 

```
yarn dev
```

## Primeiro Acesso
O admin default é criado com o email `admin@ubistart.com` e a senha `admin`


# Rotas da api 

## Endpoint genérico

### Autenticação
Todas as rotas exceto Cadastro e Login exigem o uso de JWT token da seguinte forma:
```
HEADER
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyQHViaXN0YXJ0LmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjQ3NDQ0MDYwLCJleHAiOjE2NDc1MzA0NjB9.tUdskQp10nu7ZMoA-7oWONHkbwB045OLC-YLi3-laKk
```

### Login
Request

```
POST /login
```
```
{ "email": "user@ubistart.com", "password": "myPassword" }
```

Response
```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyQHViaXN0YXJ0LmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjQ3NDQ0MDYwLCJleHAiOjE2NDc1MzA0NjB9.tUdskQp10nu7ZMoA-7oWONHkbwB045OLC-YLi3-laKk"
}
```

## Escopo do user

### Cadastro de user
Request

```
POST /register
```
```
{ "email": "user@ubistart.com", "password": "myPassword" }
```

Response
```
{ "email": "user@ubistart.com", "password": "myPassword" }
```

### Criação de TODO
Request

```
POST /todos
```
```
{
	"title": "Entregar o teste",
	"description": "Entregar o teste com sucesso",
	"dueDate": "2022-03-16"
}
```

Response
```
{
    "createdAt": "2022-03-14 12:03:35",
    "description": "Entregar o teste a qualquer hora do dia",
    "dueDate": "2022-03-16 23:59:59",
    "id": 1,
    "status": "OPEN",
    "title": "Entregar o teste",
    "updatedAt": "2022-03-16 12:09:12",
    "user": {
        "email": "user@ubistart.com"
    }
}
```

### Listagem de todos os TODOs
Request

```
GET /todos
```

Response
```
[
	{
		"createdAt": "2022-03-14 12:03:35",
		"description": "Entregar o teste a qualquer hora do dia",
		"dueDate": "2022-03-16 23:59:59",
		"id": 1,
		"status": "OPEN",
		"title": "Entregar o teste",
		"updatedAt": "2022-03-16 12:09:12",
		"user": {
			"email": "user@ubistart.com"
		}
	}
]
```

### Pegar um TODO
Request

```
GET /todos/1
```

Response
```
{
    "createdAt": "2022-03-14 12:03:35",
    "description": "Entregar o teste a qualquer hora do dia",
    "dueDate": "2022-03-16 23:59:59",
    "id": 1,
    "status": "OPEN",
    "title": "Entregar o teste",
    "updatedAt": "2022-03-16 12:09:12",
    "user": {
        "email": "user@ubistart.com"
    }
}
```

### Edição de TODO
Request

```
PATCH /todos/1
```
```
{
	"title": "Título atualizado"
}

```

Response
```
{
    "createdAt": "2022-03-14 12:03:35",
    "description": "Entregar o teste a qualquer hora do dia",
    "dueDate": "2022-03-16 23:59:59",
    "id": 1,
    "status": "OPEN",
    "title": "Título atualizado",
    "updatedAt": "2022-03-16 12:09:12",
    "user": {
        "email": "user@ubistart.com"
    }
}
```


### Marcar como concluído
Request

```
POST /todos/1/finish
```

Response
```
{
    "createdAt": "2022-03-14 12:03:35",
    "description": "Entregar o teste a qualquer hora do dia",
    "dueDate": "2022-03-16 23:59:59",
    "id": 1,
    "status": "TODO",
    "title": "Título atualizado",
    "updatedAt": "2022-03-16 12:09:12",
    "user": {
        "email": "user@ubistart.com"
    }
}
```


## Rotas de Admin

### Listar todos os TODOS
Request

```
GET /admin/todos
```

Response 
```
[
    {
        "createdAt": "2022-03-14 12:03:35",
        "description": "Entregar o teste a qualquer hora do dia",
        "dueDate": "2022-03-16 23:59:59",
        "id": 1,
        "status": "OPEN",
        "title": "Entregar o teste",
        "updatedAt": "2022-03-16 12:09:12",
        "user": {
            "email": "user@ubistart.com"
        }
    }
]
```

### Pegar um TODO
Request

```
GET /admin/todos/1
```

Response 

```
{
    "createdAt": "2022-03-14 12:03:35",
    "description": "Entregar o teste a qualquer hora do dia",
    "dueDate": "2022-03-16 23:59:59",
    "id": 1,
    "status": "OPEN",
    "title": "Entregar o teste",
    "updatedAt": "2022-03-16 12:09:12",
    "user": {
        "email": "user@ubistart.com"
    }
}
```


### Atualizar um TODO
Request

```
PATCH /admin/todos/1
```

```
{
	"title": "Titulo atualizado"
}
```

Response

```
[
	{
		"createdAt": "2022-03-14 12:03:35",
		"description": "Entregar o teste a qualquer hora do dia",
		"dueDate": "2022-03-16 23:59:59",
		"id": 1,
		"status": "OPEN",
		"title": "Titulo atualizado",
		"updatedAt": "2022-03-16 12:09:12",
		"user": {
			"email": "user@ubistart.com"
		}
	}
]
``` 


### Finalizar um TODO
Request

```
POST /admin/todos/1/finish
```

Response 

```
[
	{
		"createdAt": "2022-03-14 12:03:35",
		"description": "Entregar o teste a qualquer hora do dia",
		"dueDate": "2022-03-16 23:59:59",
		"id": 1,
		"status": "DONE",
		"title": "Entregar o teste",
		"updatedAt": "2022-03-16 12:09:12",
		"user": {
			"email": "user@ubistart.com"
		}
	}
]
``` 
