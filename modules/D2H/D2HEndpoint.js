const D2HController = require('./D2HController');
const inquirer = require('inquirer');

const categoryDetails = {
    Entertainment: [{ 'star plus': 25 }, { 'colors tv': 20 }, { 'zee cinema': 15 }],
    Educational: [{ 'think school': 40 }, { 'academy gyan': 30 }, { 'study abroad': 50 }],
    Regional: [{ 'bhajan': 10 }, { 'kasturi': 10 }, { 'sadvidya': 10 }],
    Sports: [{ 'espn': 25 }, { 'ten': 20 }, { 'cricbuzz': 15 }],
}

const addBalanceQuestion = [{
    type: 'input',
    name: 'amount',
    message: 'Enter the amount you want to add to your balance: '
}]

const selectCategoryQuestion = [{
    type: 'rawlist',
    name: 'category',
    message: 'Please choose one of the following categories:',
    choices: ['Entertainment', 'Educational', 'Regional', 'Sports']
}]

const selectChannelQuestion = [{
    type: 'rawlist',
    name: 'channel',
    message: 'Please choose one of the following channel:',
    choices: []
}]

const removeChannelQuestion = [{
    type: 'input',
    name: 'channel',
    message: 'Enter the channel you want to remove from your tariff plan: '
}]

class D2HEndpoint {
    constructor() {
        this.controller = new D2HController();
    }

    /**
     * Fetch the balance from cached DB
     * @returns {number} - The balance
     */
    viewBalance() {
        return this.controller.viewBalance();
    }

    /**
     * Add balance to the cached DB
     * @returns {Promise<void>}
     */
    addBalance() {
        return inquirer.prompt(addBalanceQuestion).then(answers => {
            const amount = parseInt(answers['amount']);
            if (!!amount) {
                this.controller.addBalance(amount);
                return null;
            } else {
                console.warn('\nPlease enter a valid amount\n');
                return this.addBalance();
            }
        });
    }

    /**
     * Fetch the tariff package from cached DB
     * @returns {string} - The tariff package channels
     **/
    viewTariffPackage() {
        return this.controller.viewTariffPackage();
    }

    /**
     * Add new channel in the tariff package
     * @returns {Promise<void>}
     */
    addChannel() {
        return inquirer.prompt(selectCategoryQuestion).then(answers => {
            const category = answers['category'];
            selectChannelQuestion[0].choices = categoryDetails[category].map(channel => `${Object.keys(channel)[0]} : ${Object.values(channel)[0]} Rs`);
            return inquirer.prompt(selectChannelQuestion).then(answers => {
                let channel = answers['channel'];
                channel = channel.substring(0, channel.indexOf(':')).trim();
                const channelCharge = categoryDetails[category].find(item => Object.keys(item)[0] === channel)[channel];
                return this.controller.addChannel(channel, channelCharge);
            });
        });
    }

    /**
     * remove given channel from the tariff package
     * @returns {Promise<void>}
     */
    removeChannel() {
        return inquirer.prompt(removeChannelQuestion).then(answers => {
            const channel = answers['channel'];
            return this.controller.removeChannel(channel);
        });

    }
}

module.exports = D2HEndpoint;
