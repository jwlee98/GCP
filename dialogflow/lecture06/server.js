'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//function detectTextIntent(projectId, sessionId, queries, languageCode) {
function detectTextIntent(request, response) {
  // [START dialogflow_detect_intent_text]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');
  const projectId = 'jwlee-dialogflow-test01';
  const sessionId = 'detect-session-id';
  const queryTxt = request.body.query;
  const languageCode = 'ko';

  // Instantiates a session client
  const sessionClient = new dialogflow.SessionsClient();

  if (!queryTxt || !queryTxt.length) {
    return;
  }
  
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  
    // The text query request.
    const query = {
      session: sessionPath,
      queryInput: {
        text: {
          text: queryTxt,
          languageCode: languageCode,
        },
      }
    };

    let promise = sessionClient.detectIntent(query);
	  promise
	    .then(responses => {
	      const result = responses[0].queryResult;
	      response.status(200).json(result);
	    })
	    .catch(err => {
	      console.error('ERROR:', err);
	      response.status(500).json = {Error: err};
	    });

  // [END dialogflow_detect_intent_text]
}

app.post('/queryDialogflow', (request, response) => {
  detectTextIntent(request, response);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

