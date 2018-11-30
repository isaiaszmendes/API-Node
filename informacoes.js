// Tipos de status

// 200 - bem sucedida
// 201 - ok mas usado para algo criado
// 202 - Assíncrono - entende a req mas não terminou de executar
// 204 - não retorna conteudo

// erros 

// 300 - redirecionamento de cliente

// 400 - erros na requisição

// 401 - não autorizado
// 403 - proibido
// 404 - não encontrado
// 500 - erros interos 

// ______________________
// O que é Rest 

// Representational State Tranfer

// Sugere que a gente exponha a API como um conjunto de url ou endereço que serve para
// localizar recursos, ex: escola: lista escolas, lista alunos/escola

// Para manipular um recurso, 
// precisamos usar os metodos HTTP combinada com a URL - SEMANTICA

// Obter - GET - API retorna em algum formato -- JSON, XML
// Criar - POST - API inclui um novo objeto/...
// Precisamos de um recurso de localização. ex: ID 
// Alterar - PUT - Atualiza
// deletar/ apagar DELETE 