const express = require('express');
const logIn = require('./serverLogic/logIn');
const bodyParser = require('body-parser');
const update = require('./serverLogic/update');

const server = express();
const serverPort = 9999;

function serverStart(port) {
    server.listen(port);
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    server.post('/login', async (req, res) => {
        console.log(new Date + `: Login Established ${JSON.stringify(req.body)}`);
        const { userName, userPassword } = req.body;
        if (await logIn(userName, userPassword)) {
            res.send({
                status: true,
                response: 'User Found'
            });
        } else { 
            res.send({
                statuse: false,
                response: 'User Not Found'
            });
        }
    });

    server.post('/register', (req, res) => {
        console.log("Registrating...")
    });

}

serverStart(serverPort);


