const { WebClient } = require('@slack/web-api');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

// Read enviroment variables
const token = process.env.SLACK_TOKEN;
const conversationId = process.env.SLACK_CONVERSATION_ID;
const listenPort = process.env.LISTEN_PORT;

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((err, req, res, next) => {
    console.error(err); 
  
    // handle body-parser error when the json received is malformed
    if (err.status === 400) {
      return res.status(err.status).send('Bad request');
    }
  
    return next(err);
  });

// Initialize Slack API
const web = new WebClient(token);

app.post('/records', (req, res) => {
    if (req.is('application/json') == false) {
        res.status(415); // Unsupported Media Type
        res.send();
        return;
    }

    let data = req.body;

    // TODO: Add other required fields to this check
    if ('Type' in data == false || 'TypeCode' in data == false) {
        res.status(400); // Bad request
        res.send();
        return;
    }

    // TODO: Store the record data in a database
    
    // recordID is the record ID from the database entry
    let recordId = 'Fake-Record-Id';

    if (data.Type == 'SpamNotification' && data.TypeCode == 512) {
        // Do not wait for slack answer before answering ourselves
        (async () => {
            const result = await web.chat.postMessage({
                text: 'Hey, a new spam message was detected! It is coming from ' + data.From +
                ' and sent to ' + data.Email + '. For details please check the record id ' + recordId,
                channel: conversationId,
            });
        })();
    }

    res.status(200); // OK
    res.send();
})

app.listen(listenPort, () => {
    console.log('Record handler is running on port ' + listenPort)
})