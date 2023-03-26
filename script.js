const contractAddress = "0xc111c18c0448a3ba2747a1c6759d475181b958a6"
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_options",
				"type": "string[]"
			}
		],
		"name": "createSession",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			}
		],
		"name": "endVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string[]",
				"name": "_options",
				"type": "string[]"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_sessionCreator",
				"type": "address"
			}
		],
		"name": "sessionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_option",
				"type": "string"
			}
		],
		"name": "userVoted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_option",
				"type": "string"
			}
		],
		"name": "vote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string[]",
				"name": "_winner",
				"type": "string[]"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_sessionCloser",
				"type": "address"
			}
		],
		"name": "voteClosed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			}
		],
		"name": "getOptions",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			}
		],
		"name": "getResult",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSessions",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_option",
				"type": "string"
			}
		],
		"name": "getVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

provider.send("eth_requestAccounts", []).then(() => {
	provider.listAccounts().then((accounts) => {
		signer = provider.getSigner(accounts[0]);
		contract = new ethers.Contract(contractAddress, abi, signer);
		console.log(contract);
	});
});


// try {
//     await contract.createSession();
//   } catch (error) {
//     const revertData = error.data.data;
//     const decodedError = myContract.interface.parseError(revertData);
//     console.log(`Transaction failed: ${decodedError.name}`);
//   }


async function createSession(){
    try{
    let topic = document.getElementById('topic-creation').value;
    let options = document.getElementById('options-creation').value.split(' ');
    await contract.createSession(topic, options);
	document.getElementById('error-handler').innerText = "Session created";
    }
    catch (e){
		console.log(e);
        document.getElementById('error-handler').innerText = e.data.message;
        console.log(e.data.message);
    }
}

async function Vote(){
	try{
    let topic = document.getElementById('topic-vote').value;
    let option = document.getElementById('option-vote').value;
    await contract.vote(topic, option);
	}
	catch (e){
		console.log(e);
		document.getElementById('error-handler').innerText = e.data.message;
        console.log(e.data.message);
	}
} 

async function getOptions(){
	try{
    let topic = document.getElementById('topic-get-options').value;
    options = await contract.getOptions(topic);
    document.getElementById('options-by-topic').innerText = options;
	}
	catch (e){
		console.log(e);
		document.getElementById('error-handler').innerText = e.data.message;
        console.log(e.data.message);
	}
}

async function latestSessions(){
    _;
}

async function getVotes(){
	try{
    let topic = document.getElementById('topic-get-votes').value;
    let option = document.getElementById('option-get-votes').value;
    let votes = await contract.getVotes(topic,option);
	document.getElementById('votes-counter').innerText = votes;
	}
	catch (e){
		console.log(e);
		document.getElementById('error-handler').innerText = e.data.message;
        console.log(e.data.message);
	}
}

async function endVoting(){
	try{
    let topic = document.getElementById('topic-end-voting').value;
    await contract.endVoting(topic);
	}
	catch(e){
		console.log(e);
		document.getElementById('error-handler').innerText = e.data.message;
        console.log(e.data.message);
	}
}

async function getResult(){
	try{
    let topic = document.getElementById('topic-result').value;
    let result = await contract.getResult(topic);
    document.getElementById('vote-result').innerText = result;
	}
	catch (e){
		console.log(e);
		document.getElementById('error-handler').innerText = e.data.message;
        console.log(e.data.message);
	}
}
