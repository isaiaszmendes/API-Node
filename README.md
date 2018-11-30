# API-Node

Dados fornecidos: 
  name, email, password, age

1. [Installation](#1-installation)
2. [Usage](#2-usage)
3. [Used Technologies](#3-used-technologies)

## 1. Installation
> 1. Clone o repositório usando `git` e `npm`:
```
  git clone https://github.com/isaiaszmendes/API-Node.git
  cd API-Node
  npm install 
  npm start
```

## 2. Usage
 > Descrevendo os endpoints

```
  GET /get: Listagem de Usurios
  GET /get/{id}: Listagem de um Usurio especifico
  POST /post: Adição de um Usurio
  PUT /put/{id}: Detalhes de um Usurio
  PATCH /patch/{id}: Atualização de todos os parametros do Usurio (replace)
  DELETE /del/{id}: Remoção de um Usuário
```
Obtendo Usuários
```
  GET /get: Listagem de Usurios
```
 http://localhost:3000/users
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

## 3. Used Technologies
 - Nodejs
 - TypeScript
 - MongoDb
 - Desenvolvimento em ambiente Linux

