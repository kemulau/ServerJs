const net = require('net');

function iniciarServidor(endereco, porta) {
  const servidor = net.createServer(); 

  servidor.listen(porta, endereco, () => {
    console.log(`Servidor ouvindo em ${endereco}:${porta}`);
  });


  servidor.on('error', (erro) => {
    console.error('Ocorreu um erro no servidor:', erro);

 
    if (erro.code === 'EADDRINUSE') {
      console.error('A porta está em uso. Encerrando o servidor.');
      process.exit(1);
    }
  });

 
  servidor.on('connection', (cliente) => {
    console.log('Cliente conectado');


    cliente.on('data', (dados) => {
      console.log(`Recebido: ${dados}`);
      cliente.write(dados); 
    });

   
    cliente.on('end', () => {
      console.log('Cliente desconectado');
    });
  });
}


const endereco = 'localhost';
const porta = 6000;


iniciarServidor(endereco, porta);
