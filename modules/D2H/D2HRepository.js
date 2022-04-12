const database = {
    userDetails: {
        balance: 0,
        tariffPackage: ['star sports', 'sony sab', 'aastha']
    }
}

class D2HRepository {
    /**
     * Fetch balance from cached DB
     * @returns {number} - The balance
     */
    viewBalance() {
        return database.userDetails.balance;
    }

    /**
     * Add balance to the cached DB
     * @param {number} amount - The amount to be added
     * @returns
     */
    addBalance(amount) {
        database.userDetails.balance += amount;
        return;
    }

    /**
     * Fetch the tariff package from cached DB
     * @returns {Array} - The tariff package channels
     */
    viewTariffPackage() {
        return database.userDetails.tariffPackage;
    }

    /**
     * Add new channel in the tariff package
     * @param {string} channel - The channel to be added
     * @returns
     */
    addChannel(channel) {
        database.userDetails.tariffPackage.push(channel);
    }

    /**
     * Remove channel from the tariff package
     * @param {string} channel - The channel to be removed
     * @returns
     */
    removeChannel(channel) {
        const channelIndex = database.userDetails.tariffPackage.indexOf(channel.toLowerCase());
        if (channelIndex > -1) {
            database.userDetails.tariffPackage.splice(channelIndex, 1);
            return true;
        }
        return false;
    }
}
module.exports = D2HRepository;
