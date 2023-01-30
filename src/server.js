require('dotenv').config();
const http = require('http');

const app = require('./app')

const server = http.createServer(app)

const PORT = process.env.PARADOXICAL_HACKER_REST_PORT || 3000

function startServer(){
    server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
}

startServer()