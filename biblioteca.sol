// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Biblioteca is AccessControl{
  
    // Criando variavéis e estruturas
    address[] public livros;
    struct livrosInfo {
            string nome;
            address endereco;
            uint8 exempl;
        }
    livrosInfo[] public listaLivrosInfo;
    bytes32 public constant BIBLIO_ADMIN = keccak256("BiblioAdmin");

    // Criando eventos
    event LivroCriado(string nome, string autor, uint8 exemplares);

    constructor(){
        _grantRole(BIBLIO_ADMIN, msg.sender);
    }

    // Função para criar novos livros
    // Os argumentos são os argumentos do contrutor do livro
    function novoLivro(string memory nome, string memory autor, uint8 exemplares) public{
        require(hasRole(BIBLIO_ADMIN, msg.sender), "Voce nao tem permissao para adicionar mais livros");
        address livro = address(new Livro(msg.sender, nome, autor, exemplares));
        livros.push(livro);
        listaLivrosInfo.push(livrosInfo(nome, livro, exemplares));
        emit LivroCriado(nome, autor, exemplares);
    }

    function listarLivros() public view returns (livrosInfo[] memory){
        return listaLivrosInfo;
    }

    function aumentarExemplar(uint8 qtd, address end) public {
        Livro livro;
        livro = Livro(end);
        livro.maisExemplares(qtd, msg.sender);
        updateExempl(end, qtd);
    }

    function updateExempl(address end, uint8 exempl) private {
        for (uint i = 0; i < listaLivrosInfo.length; i++) {
            if (listaLivrosInfo[i].endereco == end) {
            listaLivrosInfo[i].exempl += exempl;
            break;
        }
    }
}
}

// This is used as a template to initialize state variables 
contract Livro is AccessControl {

    // Criando variavéis e estruturas
    struct Aluguel {
        uint32 matricula;
        uint prazo;
        uint8 multa;
        uint8 prorrogacao;
    }
    address public bibliotecario;
    string public nome;
    string public autor;
    uint8 public exemplares;
    uint8 public alugados;
    mapping (address => Aluguel) alugueis;
    uint24 private constant DIA = 86400;

    // Criando eventos
    event ExemplaresAumentados(string nome, string autor, uint8 exemplares);
    event LivroAlugado(string nome, string autor, uint32 Matricula);
    event LivroDevolvido(string nome, string autor, uint32 Matricula);
    event PrazoProrrogado(string nome, string autor, uint32 Matricula);
    event MultaPaga(string nome, string autor, uint32 Matricula);

    constructor(address Bibliotecario, string memory Nome,
    string memory Autor, uint8 Exemplares) {
        bibliotecario = Bibliotecario;
        nome = Nome;
        autor = Autor;
        exemplares = Exemplares;
        alugados = 0;
    }

    function disponibilidade() public view returns (uint8){
        return (exemplares - alugados);
    }

    function alugar(uint32 Matricula) public {
        require(exemplares > alugados, "Todos os exemplares foram alugados");
        require(alugueis[msg.sender].prazo == 0, "Voce ja possui um livro alugado");
        uint8 Multa = 0;
        uint Prazo = block.timestamp + (3*DIA);
        uint8 Prorrogacao = 2;
        alugueis[msg.sender] = Aluguel(Matricula, Prazo, Multa, Prorrogacao);
        alugados++;
        emit LivroAlugado(nome, autor, Matricula);
    }

    function verMulta() private {
        if(block.timestamp > alugueis[msg.sender].prazo){
            alugueis[msg.sender].multa = uint8((block.timestamp - alugueis[msg.sender].prazo)/ 1 days);
        }
    }

    function devolucao() public {
        require(alugueis[msg.sender].prazo > 0, "Voce nao possui um livro alugado");
        verMulta();
        require(alugueis[msg.sender].multa == 0, "voce possui multa a pagar");
        emit LivroDevolvido(nome, autor, alugueis[msg.sender].matricula);
        delete alugueis[msg.sender];
        alugados--;
    }

    function prorrogacao() public {
        require(alugueis[msg.sender].prorrogacao > 0, "Voce ja prorrogou o maximo que podia do prazo deste livro");
        alugueis[msg.sender].prazo = alugueis[msg.sender].prazo + (2*DIA);
        alugueis[msg.sender].prorrogacao--;
        emit PrazoProrrogado(nome, autor, alugueis[msg.sender].matricula);
    }

    function prazoRestante() public view returns(uint) {
        require(alugueis[msg.sender].prazo != 0, "Voce nao possui um livro alugado");
        return (alugueis[msg.sender].prazo - block.timestamp)/ 86400;
    }

    function pagarMulta() public {
        require(alugueis[msg.sender].multa != 0, "Voce nao possui multas a pagar");
        alugueis[msg.sender].prazo = block.timestamp + (3*DIA);
        alugueis[msg.sender].multa = 0;
        emit MultaPaga(nome, autor, alugueis[msg.sender].matricula);
    }

    function maisExemplares(uint8 qtd, address usuario) public {
        require(usuario == bibliotecario, "Somente o bibliotecario pode aumentar a quatidade de exemplares");
        exemplares +=  qtd;

        emit ExemplaresAumentados(nome, autor, exemplares);
    }
}