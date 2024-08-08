const net = require('net'); 
function iniciarCliente(endereco, porta) {
  const cliente = new net.Socket(); 


  cliente.on('connect', () => {
    console.log('Conectado ao servidor');

    
    const mensagem = Buffer.from('Olá, bem-vindoao servidor!'); 
    cliente.write(mensagem); 
  });


  cliente.on('error', (erro) => {
    console.error('Ocorreu um erro ao tentar se conectar:', erro);


    if (erro.code === 'ECONNREFUSED') {
      console.log('Tentando reconectar em alguns segundos...');
      setTimeout(() => iniciarCliente(endereco, porta), 3000);
    }
  });

  cliente.connect(porta, endereco);
}

const destino = 'localhost';
const porta = 6000;

iniciarCliente(destino, porta);
