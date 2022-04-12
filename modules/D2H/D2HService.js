const D2HRepository = require('./D2HRepository');

class D2HService {

    constructor() {
        this.repository = new D2HRepository();
    }

    /**
     * Fetch balance from cached DB
     * @returns {number} - The balance
     */
    viewBalance() {
        return this.repository.viewBalance();
    }

    /**
     * Add balance to the cached DB
     * @param {number} amount - The amount to be added
     * @returns
     */
    addBalance(amount) {
        return this.repository.addBalance(amount);
    }

    /**
     * Fetch the tariff package from cached DB
     * @returns {Array} - The tariff package channels
     */
    viewTariffPackage() {
        return this.repository.viewTariffPackage();
    }

    /**
     * Add new channel in the tariff package
     * @param {string} channel - The channel to be added
     * @returns
     */
    addChannel(channel) {
        return this.repository.addChannel(channel);
    }

    /**
     * Remove channel from the tariff package
     * @param {string} channel - The channel to be removed
     * @returns
     */
    removeChannel(channel) {
        return this.repository.removeChannel(channel);
    }
}

module.exports = D2HService;
