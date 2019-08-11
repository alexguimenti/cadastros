
const server = require('./server') // importar server

server.listen(process.env.PORT || 3000) // se o servidor passar uma variavel ambiente PORT, a aplicação assume como porta, caso não, assume 3000
