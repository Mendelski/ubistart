#Readme - Desafio BackEnd

## Configurando dependências

Eu optei por fazer a configuração utilizando o Yarn,
então vou exibir os comando todos com o mesmo,
caso seja necessário, é possível optar por executar o projeto com npm. 

Para instalar as dependências definidas em package.json, execute: 

`yarn`


## Configuração do MySQL

No arquivo ormconfig.json temos as variáveis de configuração do banco de dados, 
defina abaixo os valores conforme seu ambiente

```
"host": "localhost", 
"port": 3306,
"username": "root",
"password": "root",
"database": "test_ubistart",
``` 

Após configurar o orm para a conexão com o banco, precisaremos criar o schema, e o resto a parte de migrations se encarrega de fazer por nós.

para criar o schema, digite:

`create schema test_ubistart;`

caso esse schema seja alterado, altere também o valor no ormconfig. 


Após o schema criado e tudo configurado, execute a migration: 

`yarn typeorm migration:run`

yarn typeorm é uma maneira de executar a migration do projeto, se for necessário alterar, basta mudar o script definido no pac
kage.json 


## Iniciando o projeto

Com os dois passos acima concluídos podemos iniciar o projeto, então execute 

`yarn dev`