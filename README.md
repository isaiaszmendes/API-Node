# API-Node

Dados fornecidos: 
  name, email, password, age

1. [Installation](#1-installation)
2. [Config](#2-config)
3. [Usage](#3-usage)

3. [Used Technologies](#3-used-technologies)

## 1. Installation
> 1. Clone o repositório usando `git` e `npm`:
```
  git clone https://github.com/isaiaszmendes/API-Node.git
  cd API-Node
  npm install 
```

## 2. Config

> Para alterar as configuraçes do banco, porta, caminho, entrar na pasta  common/environment.js

## 3. Usage
 > Rode o comando 
```
  npm start
```
 > Descrevendo os endpoints

```
  GET /get: Listagem de Usurios
  GET /get/{id}: Listagem de um Usurio especifico
  POST /post: Adição de um Usurio
  PUT /put/{id}: Atualização de todos os parametros do Usurio (replace)
  PATCH /patch/{id}: Atualiza o campo da enviado na request
  DELETE /del/{id}: Remoção de um Usuário
```
> Obtendo Usuários
```
  GET /get: Listagem de Usuário
```

```
[
    {
        _links: {
        self: "/users/5c00bed2bf0520023878a788"
    },
        _id: "5c00bed2bf0520023878a788",
        name: "Isaias F Mendes",
        email: "isaFM@email.com",
    },
    {
        _links: {
        self: "/users/5c00bef6bf0520023878a79f"
    },
        _id: "5c00bef6bf0520023878a79f",
        name: "Julia",
      email: "ju@email.com",
    },
    {
        _links: {
        self: "/users/5c00c07cbf0520023878a845"
      },
        _id: "5c00c07cbf0520023878a845",
        name: "Beatriz",
        email: "bia@email.com",
    },
]
```
> Obtendo Usuário pelo id
```
 GET /get/{id}: Listagem de um Usuário especifico
```

```
{
    _links: {
        self: "/users/5c00bef6bf0520023878a79f"
    },
    _id: "5c00bef6bf0520023878a79f",
    name: "Vitor Leal",
    email: "vitor@email.com",
}
```

> Adição de um Usurio
```
 POST /post: Adição de um Usuário
```
Necessário enviar email valido, nome maior que 3 caracteres, password com hash bcripty
```
{
	"name": "Hugo Campos",
	"email": "hugo@email.com",
	"password": "hugo123"
}


Response ...


{
    "_links": {
        "self": "/users/5c016ae92dac4356da8271be"
    },
    "name": "Hugo Campos",
    "email": "hugo@email.com",
    "_id": "5c016ae92dac4356da8271be"
}
```

 > Atualiza todos os campos do Usuário
```
 PUT /put/{id}: Atualiza todos os campos do Usurio
```

```
{

	"name": "Claudineia Rocha",
	"email": "claudineia@email.com",
	"password": "clau123"
}

response ...

{
    "_links": {
        "self": "/users/5c011e7adc3c110e42d6768f"
    },
    "_id": "5c011e7adc3c110e42d6768f",
    "name": "Claudineia Rocha",
    "email": "claudineia@email.com"
}
```

 > Atualiza o campo enviado na request
```
  PATCH /patch/{id}: Atualiza o campo da enviado na request
```
Exemplo com `name`
```
{
    "name": "Seu Madruga"
}

response ...

{
    "_links": {
        "self": "/users/5c011e7adc3c110e42d6768f"
    },
  _id: "5c00cf1554aa3c2253ebc846",
  name: "Seu Madruga",
  email: "lucas@email.com",
}

```
 > Remover Usuario
```
DELETE /del/{id}: Remoção de um Usuário
```
Necessário apensas passar o id como argumento na request


## 3. Used Technologies
 - Nodejs
 - TypeScript
 - MongoDb
 - Desenvolvimento em ambiente Linux

