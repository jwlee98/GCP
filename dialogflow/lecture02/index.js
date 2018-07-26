// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

//datastore
// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');
// Your Google Cloud Platform project ID
const projectId = 'jwlee-myproject-01';
// Instantiates a client
const datastore = Datastore({
  projectId: projectId
});
// The kind for the new entity
const kind = 'ticket';
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

   // Uncomment and edit to make your own intent handler
   // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
   // below to get this function to be run when a Dialogflow intent is matched
   function yourFunctionHandler(agent) {
       
       // Get the city and date from the request
      let ticketDescription = request.body.queryResult['queryText']; // incidence is a required param
      //let name = request.body.result.contexts[0].parameters['given-name.original'];
      let username = request.body.queryResult.outputContexts[1].parameters['K_name'];
      console.log('description is ' +ticketDescription);
      console.log('name is '+ username);
      function randomIntInc (low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
      }
      let ticketnum = randomIntInc(11111,99999);
      // The Cloud Datastore key for the new entity
      const taskKey = datastore.key(kind);
      // Prepares the new entity
      const task = {
        key: taskKey,
        data: {
          description: ticketDescription,
          username: username,
          ticketNumber: ticketnum
        }
      };
      console.log("incidence is  " , task);
      // Saves the entity
      datastore.save(task)
       
     agent.add(`문의사항을 성공적으로 로깅했습니다. : ` + ticketnum);

    //  agent.add(new Suggestion(`Quick Reply`));
    //  agent.add(new Suggestion(`Suggestion`));
    //  agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
   }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('0012-Submit ticket - custom - detail', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});

