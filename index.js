const express = require('express');
const inquirer = require('inquirer');
const D2HEndpoint = require('./modules/D2H/D2HEndpoint');

const app = express();
const port = 3000;

// Handle uncaught exceptions
process.on('uncaughtException', function (error) {
  console.error('uncaughtException caught\n', error);
  process.exit(1)
});

// Handle unhandled exceptions
process.on('unhandledRejection', function (error) {
  console.error('unhandledRejection\n', error);
});

app.listen(port, () => { })

const d2hEndpoint = new D2HEndpoint();

const questionArray = ['To view your balance', 'To add amount to your balance',
  'To view your basic tariff package', 'To add addon channel to your tariff package',
  'To remove the channel from your tariff plan', 'To exit'];

const baseQuestion = [{
  type: 'rawlist',
  name: 'option',
  message: `Welcome. What would you like to do? Please choose one of the following:`,
  choices: questionArray
}]

function initialize() {
  inquirer.prompt(baseQuestion).then(answers => {
    const questionIndex = questionArray.indexOf(answers.option) + 1;
    // Execute the corresponding function with selected option and ask questions again in loop
    switch (questionIndex) {
      case 1: d2hEndpoint.viewBalance();
        initialize();
        break;
      case 2: d2hEndpoint.addBalance().then(() => initialize());
        break;
      case 3: d2hEndpoint.viewTariffPackage();
        initialize();
        break;
      case 4: d2hEndpoint.addChannel().then(() => initialize());
        break;
      case 5: d2hEndpoint.removeChannel().then(() => initialize());
        break;
      case 6: process.exit(0);
      default: console.error('Please choose a valid option');
        initialize();
        break;
    }
  }).catch(error => {
    console.log('Error occurred while choosing option', error)
  });
}

initialize();
