const D2HService = require('./D2HService');

class D2HController {
    constructor() {
        this.service = new D2HService();
    }

    /**
     * fetch the balance from cached DB
     * @returns {number} - The balance
     */
    viewBalance() {
        const balance = this.service.viewBalance();
        console.log(`\nYour balance is ${balance}\n`);
        return balance;
    }

    /**
     * Add balance to the cached DB
     * @param {number} amount - The amount to be added
     */
    addBalance(amount) {
        this.service.addBalance(amount);
        console.log('\nYour balance has been updated\n');
    }

    /**
     * Fetch the tariff package from cached DB
     */
    viewTariffPackage() {
        const channels = this.service.viewTariffPackage();
        console.log(`\nYour channels from current tariff package => ${channels.toString()}\n`);
        return channels;
    }

    /**
     * Add new channel in the tariff package
     * @param {string} channel - The channel to be added
     * @param {number} channelCharge - The channel charge
     */
    addChannel(channel, channelCharge) {
        const balance = this.service.viewBalance();

        if (balance >= channelCharge) {
            this.service.addChannel(channel);
            this.service.addBalance(-channelCharge);
            console.log(`\nYou have successfully added ${channel} to your tariff plan\n`);
        } else {
            console.log('\nYou don\'t have sufficient balance to add this channel in your tariff plan\n');
        }
    }

    /**
     * Remove channel from the tariff package
     * @param {string} channel - The channel to be removed
     */
    removeChannel(channel) {
        const success = this.service.removeChannel(channel);
        const message = success ? `\nYou have successfully removed ${channel} from your tariff plan\n` : `\nYou don't have ${channel} in your tariff plan\n`;
        console.log(message)
        return message;
    }
}

module.exports = D2HController;
