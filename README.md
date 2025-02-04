# Sistema de Cadastro de Pessoas

Este projeto é uma aplicação de cadastro de pessoas desenvolvida utilizando Angular. Ele permite aos usuários realizar o cadastro de informações pessoais, como nome, CPF, e-mail, data de nascimento, entre outras. Após o cadastro, as informações são exibidas em uma lista organizada na própria tela.

## Funcionalidades

- Cadastro de Pessoa: Permite o usuário preencher um formulário com informações como nome, CPF, e-mail, data de nascimento, CEP, etc.
- Validação de Formulário: Valida os campos obrigatórios e os campos de entrada, como CPF e CEP.
- Busca de Endereço: Utiliza a API ViaCEP para preencher automaticamente os campos de endereço com base no CEP informado.
- Exibição das Informações: Após o envio do formulário, as informações cadastradas são exibidas em uma lista.
- Data Formatada: A data de nascimento é formatada para o formato brasileiro (DD/MM/YYYY).
- Botão de Voltar: Permite ao usuário retornar ao formulário após visualizar os dados cadastrados.

## Tecnologias Utilizadas

- Angular: Framework utilizado para o desenvolvimento do front-end.
- SASS(scss): Estilização da aplicação.
- HTTP Client: Para fazer chamadas à API ViaCEP.
- Reactive Forms: Para controle e validação dos formulários.
- Figma para Design (https://www.figma.com/design/ZvxgxNULu6boI1uK37Sz7W/Untitled?node-id=0-1&t=1uJzJz5o5cPqAlk7-1)

## Como Rodar o Projeto

1. Clone o repositório:
git clone https://github.com/BAdeola/cadastro-de-pessoas-modalgr.git

2. Navegue até o diretório do projeto:
cd cadastro-de-pessoas-modalgr

3. Instale as dependências:
npm install

4. Inicie a aplicação:
ng serve

5. Acesse a aplicação no seu navegador:
http://localhost:4200/
