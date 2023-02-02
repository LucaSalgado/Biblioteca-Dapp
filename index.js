// 1. Declare global variable to store the smart contract instance
let BibliotecaContract;
let LivroContract;
let signer;
let tempoAlerta = 10000;

// 2. Set contract address and ABI
const Biblioteca_Contract_Address =
  "0xC8b743EA95b8A0DdC2556b6Bdf5C36c112c1C3A9"; // Colocar o endereço do contrato da Dapp
const Biblioteca_Contract_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "qtd",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "end",
				"type": "address"
			}
		],
		"name": "aumentarExemplar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "nome",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "autor",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "exemplares",
				"type": "uint8"
			}
		],
		"name": "LivroCriado",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "autor",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "exemplares",
				"type": "uint8"
			}
		],
		"name": "novoLivro",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "BIBLIO_ADMIN",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listaLivrosInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "nome",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "endereco",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "exempl",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listarLivros",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "nome",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "endereco",
						"type": "address"
					},
					{
						"internalType": "uint8",
						"name": "exempl",
						"type": "uint8"
					}
				],
				"internalType": "struct Biblioteca.livrosInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "livros",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const Livro_Contract_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "Bibliotecario",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "Nome",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Autor",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "Exemplares",
				"type": "uint8"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "nome",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "autor",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "exemplares",
				"type": "uint8"
			}
		],
		"name": "ExemplaresAumentados",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "nome",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "autor",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "Matricula",
				"type": "uint32"
			}
		],
		"name": "LivroAlugado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "nome",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "autor",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "Matricula",
				"type": "uint32"
			}
		],
		"name": "LivroDevolvido",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "nome",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "autor",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "Matricula",
				"type": "uint32"
			}
		],
		"name": "MultaPaga",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "nome",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "autor",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "Matricula",
				"type": "uint32"
			}
		],
		"name": "PrazoProrrogado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "alugados",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "Matricula",
				"type": "uint32"
			}
		],
		"name": "alugar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "autor",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bibliotecario",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "devolucao",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "disponibilidade",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "exemplares",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "qtd",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "usuario",
				"type": "address"
			}
		],
		"name": "maisExemplares",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nome",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pagarMulta",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "prazoRestante",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "prorrogacao",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

/* 3. Prompt user to sign in to MetaMask */ // Não mexer
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);

    /* 3.1 Create instance of pet smart contract */
    BibliotecaContract = new ethers.Contract(
      Biblioteca_Contract_Address,
      Biblioteca_Contract_ABI,
      signer
    );
  });
});

// Previne a pagina de atualizar
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
});

// exibe os eventos emitidos
function displayAlert(message, tempo) {
	const alertContainer = document.getElementById("alert-container");
	const alertCard = document.createElement("div");
	alertCard.classList.add("alert-card");
	alertCard.innerHTML = message;
  
	alertContainer.appendChild(alertCard);
	alertCard.classList.add("show-alert");
  
	// remove the alert card after 5 seconds
	setTimeout(() => {
	  alertCard.remove();
	}, tempo);
}

function contratoLivro(){
	const selectedBook = booksList.find((book) => book[0] === bookSelect.value);

	LivroContract = new ethers.Contract(
		selectedBook[1],
		Livro_Contract_ABI,
		signer
	);
	return LivroContract;
}

function esconderElementos(){
	bookDetails.style.display = "none";
	maisExemplar.style.display = "none";
	qtdDispShow.style.display = "none";
	devolucao.style.display = "none";
	prorrogacao.style.display = "none";
	praso.style.display = "none";
	prasoShow.style.display = "none";
	multa.style.display = "none";
	alugar.style.display = "none";
	showDisponi.style.display = "none";
}

function mostrarElementos(){
	bookDetails.style.display = "block";
	maisExemplar.style.display = "block";
	showDisponi.style.display = "block";
	alugar.style.display = "block";
	devolucao.style.display = "block";
	prorrogacao.style.display = "block";
	praso.style.display = "block";
	multa.style.display = "block";
}

// Funções do contrato Biblioteca

function cadastrarLivro() {
  var nome = document.getElementById("nome").value;
  var autor = document.getElementById("autor").value;
  var exemplares = document.getElementById("exemplares").value;

  BibliotecaContract.novoLivro(nome, autor, exemplares)
    .then(() => {
      // Cadastro dos Eventos

      BibliotecaContract.on("LivroCriado", (nome, autor, exemplares) => {
        console.log(
          `O livro: ${nome} do autor: ${autor} foi criado com o total de ${exemplares} exemplares.`
        );
        displayAlert(
          `O livro: ${nome} do autor: ${autor} foi criado com o total de ${exemplares} exemplares`
        , 20000);
      });
    })
	.catch((err) => {
		if(err.error){
			displayAlert(err.error.message, tempoAlerta);
		}else {
			displayAlert("Não foi possível adicionar o livro", tempoAlerta);
		}
	});
}

let booksList;

async function listaLivros() {
	bookSelect.innerHTML = '';
	const option = document.createElement("option");
    option.value = "reset";
    option.textContent = "Selecione um Livro";
    bookSelect.appendChild(option);
	esconderElementos();

  	booksList = await BibliotecaContract.listarLivros();
  	booksList.forEach((book) => {
		const option = document.createElement("option");
		option.value = book[0];
		option.textContent = book[0];
		bookSelect.appendChild(option);
  	});
	displayAlert("Os livros foram carregados", 5000);
}

const bookSelect = document.getElementById("bookSelect");
const bookDetails = document.getElementById("bookDetails");
const bookName = document.getElementById("bookName");
const bookAuthor = document.getElementById("bookAuthor");
const bookQuantity = document.getElementById("bookQuantity");
const maisExemplar = document.getElementById("maisExemplar");

const showDisponi = document.getElementById("disponibilidade");
const qtdDisp = document.getElementById("qtdDisp");
const qtdDispShow = document.getElementById("qtdDispShow");
const alugar = document.getElementById("alugar");
const devolucao = document.getElementById("devolver");
const prorrogacao = document.getElementById("prorrogacao");
const praso = document.getElementById("prazo");
const qtdPraso = document.getElementById("qtdPrazo");
const prasoShow = document.getElementById("prazoShow");
const multa = document.getElementById("multa");

bookSelect.addEventListener("change", () => {
  const selectedBook = booksList.find((book) => book[0] === bookSelect.value);
  if (bookSelect.value === "reset"){
	esconderElementos();
  }
  else {
    bookName.textContent = selectedBook[0];
    bookAuthor.textContent = selectedBook[1];
    bookQuantity.textContent = selectedBook[2];
    mostrarElementos();
  }
});

function AumentarExem() {
	var qtd = document.getElementById("qtdExem").value;

	BibliotecaContract.aumentarExemplar(qtd,selectedBook[1])
	.then(() => {
		LivroContract = contratoLivro();

		LivroContract.on("ExemplaresAumentados", (nome, autor, exemplares) => {
			console.log(
			  `O livro: ${nome} do autor: ${autor} teve o número de exemplares aumentados para: ${exemplares}.`
			);
			displayAlert(
				`O livro: ${nome} do autor: ${autor} teve o número de exemplares aumentados para: ${exemplares}`
			, 20000);
			selectedBook[2] = exemplares;
		  });

	}).catch((err) => {
		if(err.error){
			displayAlert(err.error.message, tempoAlerta);
		}else {
			displayAlert("Não foi possível aumentar o número de exemplares", tempoAlerta);
		}
	});
}

// Funções do contrato Livro

async function disponibilidade(){
	LivroContract = contratoLivro();

	disp = await LivroContract.disponibilidade();
	qtdDisp.textContent = disp;
	qtdDispShow.style.display = "block";
	
}

function emprestar(){
	var matricula = document.getElementById("matricula").value;

	LivroContract = contratoLivro();
	LivroContract.alugar(matricula);

	LivroContract.on("LivroAlugado", (nome, autor, matricula) => {
		console.log(
		  `O livro: ${nome} do autor: ${autor} foi alugado pelo usuário de matricula: ${matricula}.`
		);
		displayAlert(
			`O livro: ${nome} do autor: ${autor} foi alugado pelo usuário de matricula: ${matricula}`
		, 20000);
	});
}

function devolver(){
	LivroContract = contratoLivro();

	LivroContract.devolucao();

	LivroContract.on("LivroDevolvido", (nome, autor, matricula) => {
		console.log(
		  `O livro: ${nome} do autor: ${autor} foi devolvido pelo usuário de matricula: ${matricula}.`
		);
		displayAlert(
			`O livro: ${nome} do autor: ${autor} foi devolvido pelo usuário de matricula: ${matricula}`
		, 20000);
	});
}

function prorrogar(){
	LivroContract = contratoLivro();

	LivroContract.prorrogacao();

	LivroContract.on("PrazoProrrogado", (nome, autor, matricula) => {
		console.log(
		  `O livro: ${nome} do autor: ${autor} teve o prazo prorrogado pelo usuário de matricula: ${matricula}.`
		);
		displayAlert(
			`O livro: ${nome} do autor: ${autor} teve o prazo prorrogado pelo usuário de matricula: ${matricula}`
		, 20000);
	});
}

async function prazo(){
	LivroContract = contratoLivro();

	p = await LivroContract.prazoRestante();
	qtdPraso.textContent = p;
	prasoShow.style.display = "block";
}

function pagar(){
	LivroContract = contratoLivro();

	LivroContract.pagarMulta();

	LivroContract.on("MultaPaga", (nome, autor, matricula) => {
		console.log(
		  `O livro: ${nome} do autor: ${autor} teve a multa de atraso paga pelo usuário de matricula: ${matricula}.`
		);
		displayAlert(
			`O livro: ${nome} do autor: ${autor} teve a multa de atraso paga pelo usuário de matricula: ${matricula}`
		, tempoAlerta);
	});
}