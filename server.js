require('dotenv').config();
const http = require('http');
const app = require('./app/app');
require('./config/databaseConnection')
const PORT = process.env.PORT || 3001


//server
const server = http.createServer(app )
app.listen(PORT, console.log(`Server is running ${PORT}`))
