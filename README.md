# Biblioteca-Dapp

Este é um projeto de estudo sobre um tipo de contrato inteligente chamado "Contract Factory" onde um contrato inteligente é capaz de criar outros contratos.

Neste projeto o contrato é originalmente feito para ser executado na Blockchain da Ethereum

# Dependências

- Ethers
- Nodejs
- Metamask

> Para trabalhar com o contrato [Solidity](https://soliditylang.org) eu recomendo usar o IDE [Remix](https://remix-project.org) que possui uma versão online onde é capaz de compilar e fazer deploy dos contratos. Além de possuir a possibilidade de testar os contratos usando VMs.

# Execução

Para este projeto podemos dividi-lo em duas partes: "front-end" e "back-end".

## Back-end

O back-end consiste em fazer a compilação do contrato `biblioteca.sol` e depois fazer seu deploy.

> Não é necessário fazer nenhuma configuração prévia do contrato antes de fazer o deploy

## Front-end

O front-end consiste de um servidor Nodejs executando uma aplicação simples de uma página. A biblioteca Ethers é usada para pode se comunicar com o contrato inteligente na blockchain da Ethereum e com ele é possível utilizar a carteira por meio da extensão do Metamask no navegador.

Ao executar o comando `node app.js` um servidor esterá rodando em localhost:3000 e partir de lá será possível interagir com o contrato.

# Funcionamento

O usuário que fizer o upload do contrato fábrica automaticamente terá a **role** de administrador/bibliotecário podendo assim:

- Adicionar livros
- Atualizar a quantidade de exemplares disponíveis

> Para fazer o cadastro de um livro é necessário inserir: nome, autor e quantidade de exemplares.

Os outros usuários poderão fazer as seguintes ações:

- Fazer o empréstimo de um livro
- Fazer a devolução de um livro
- Verificar o valor da multa por atraso
- Pedir prorrogação do prazo
- Ver o prazo restante
- "Pagar" simbolicamente para fazer a devolução tardia de um livro.

A página é capaz de recuperar a lista de livros cadastrados ao clicar em "Mostrar Livros". As informações a cerca do livro selecionado são exibidos assim como as opções de ação.

# Eventos

O contrato é configurado para emitir eventos em decorrência a determinadas ações e a interface é capaz de reagir a esses eventos e alertar o usuário sobre eles.
