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
