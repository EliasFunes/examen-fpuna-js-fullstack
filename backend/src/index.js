const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const SocketIo = require('socket.io');


require('dotenv').config();

const app = express();


//settings
app.set('port', process.env.PORT || 8000);
require('./database');


//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/empleados', require('./routes/empleados.routes'));

//Starting the server
const server = app.listen(app.get('port'), ()=> {
    console.log(`App listening port ${app.get('port')}`);
});


const io = SocketIo(server);

io.on('connection', (socket) => {
    socket.on('fetchEmpleados', async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/empleados');
            io.sockets.emit('Empleados', res.data);
        } catch (error) {
            console.log('Error');
        }
    });
});
