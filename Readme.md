## Halt and catch wildfirebot

Telegram bot that uses bisection algorithm for finding the date that a fire started in satellite images. Accesible at [@HaltAndCatchWildfirebot](t.me/HaltAndCatchWildfirebot).

### Programming

It is written in node.js using claudia-bot-builder and a structure based on chatbot domain function. Natural Language Understanding, Dialog Manager and Response Generator. The **bot** module handles the full logic of the chatbot. The **index.js** file exposes the chatbot handler to an Lambda function via claudia-bot-builder.

That means that every components it dependens on itself. Bots, are pieces of software hard to isolate, so in this case, we are using *intents* to link the nlu with the dialog manager and *actions* to link the dialog manager with the response generator.

An example, for the phrase 'start', the chatbot will have the following execution:
  1. Memory: Retrieve user state memory
  2. NLU: Extract intent from user interaction -> intent:'start'
  3. DM: Resolve the logic needed to execute for the intent received and return the action to perform -> action:'hello'
  4. RG: Compose the response based on the action received and return a response -> text:'Hello there'
  5. Memory: Save user state memory

#### NLU
It uses Dialogflow for NLU with 4 intents:
  * start
  * yes
  * no
  * fallback

#### DM

It uses handlers for each intent and a game engine for managing the questions/responses and decisions. As it only has 1 state, playing (besides of start and finish), it uses no FSM. The images are predownloaded from Nasa API and saved the data to a static json and the images to a S3 bucket.

#### RG
It uses i18 and a locales folder for the text assets.

### Infrastructure

It uses AWS Lambda for computing, an AWS Elasticache redis for storing state, API Gateway as an API Proxy and Claudia.js for deploying/updating the code. The AWS services use a VPC with an Internet Gateway attached. It also uses an S3 bucket for storing the images.

To update the bots code in AWS, execute ```yarn run deploy```

### Local development

To test in local, you need to have node install, install the dependencies ```yarn install``` and start a local redis instance, with docker you just have to use the Makefile added, ```make start-redis```


To run the tests, execute ```yarn run test```

### Additional info

You will need a service account file called *dialogflow-service-account.json* in the root directory to authenticate Dialogflow requests.


You will need a file containig the environment variables for production, in a file like:

*production.json*
```
{
 "REDIS_HOST": "",
 "REDIS_PORT": "6379"
}

```

To set up this envs, run:
```
yarn run load-from-json
yarn run check-production
```

To check the linter, run: ```yarn run check```

To stop a local redis instance with docker, run: ```make start-redis```, to stop it, run: ```make stop-redis```
