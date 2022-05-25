const D2HController = require('../D2HController');
const expect = require('chai').expect;
const sinon = require('sinon');

const logger = console.log
describe('D2HController', function () {
    let controller;
    before(() => {
        controller = new D2HController();
        console.log = function (l) { };
    });
    after(() => {
        console.log = logger;
    });
    describe('viewBalance', function () {
        context('When no new balance is added', () => {
            let result = null
            before(() => {
                sinon.stub(controller.service, 'viewBalance').returns(0);
                result = controller.viewBalance();
            });
            after(() => {
                sinon.restore();
            })

            it('should return the initial balance 0', function () {
                expect(result).equal(0);
            });
            it('should call viewBalance service method', function () {
                expect(controller.service.viewBalance.called).to.be.true;
            });
        });
    });

    describe('addBalance', function () {
        context('When new balance is added', () => {
            before(() => {
                sinon.stub(controller.service, 'addBalance');
                controller.addBalance(100);
            });
            after(() => {
                sinon.restore();
            })

            it('should call addBalance service method and update the use balance', function () {
                expect(controller.service.addBalance.args[0]).eqls([100]);
            });
        });
    });

    describe('viewTariffPackage', function () {
        context('When no new channel is added', () => {
            let result = null
            before(() => {
                sinon.stub(controller.service, 'viewTariffPackage').returns(['My Channel']);
                result = controller.viewTariffPackage();
            });
            after(() => {
                sinon.restore();
            })

            it('should return the default channel list', function () {
                expect(result).eqls(['My Channel']);
            });
            it('should call viewTariffPackage service method', function () {
                expect(controller.service.viewTariffPackage.called).to.be.true;
            });
        });
    });

    describe('addChannel', function () {
        function _before(balance) {
            sinon.stub(controller.service, 'viewBalance').returns(balance);
            sinon.stub(controller.service, 'addChannel');
            sinon.stub(controller.service, 'addBalance');
            controller.addChannel('new channel', 50);
        }
        context('When new channel is added but balance is 0', () => {
            before(() => {
                _before(0);
            });

            after(() => {
                sinon.restore();
            })

            it('should first call viewBalance service method and fetch balance', function () {
                expect(controller.service.viewBalance.called).to.be.true;
            });

            it('should not call addChannel and addBalance service method', function () {
                expect(controller.service.addChannel.called).to.be.false;
                expect(controller.service.addBalance.called).to.be.false;
            })
        });

        context('When new channel is added and balance is sufficient', () => {
            before(() => {
                _before(55);
            });

            it('should call service methods with respective details', function () {
                expect(controller.service.viewBalance.called).to.be.true;
                expect(controller.service.addChannel.args[0]).eqls(['new channel']);
                expect(controller.service.addBalance.args[0]).eqls([-50]);
            });
        });
    });


    describe('removeChannel', function () {
        context('When the provided channel is present in tariff package', () => {
            let message
            const channel = 'channel to remove';
            before(() => {
                sinon.stub(controller.service, 'removeChannel').returns(false);
                message = controller.removeChannel(channel);
            });
            after(() => {
                sinon.restore();
            })

            it('should call removeChannel service method', function () {
                expect(controller.service.removeChannel.args[0]).eqls([channel]);
            });

            it('should return the error message', function () {
                expect(message).eqls(`\nYou don't have ${channel} in your tariff plan\n`);
            })
        });

        context('When the provided channel is present in tariff package', () => {
            let message
            const channel = 'channel to remove';
            before(() => {
                sinon.stub(controller.service, 'removeChannel').returns(true);
                message = controller.removeChannel(channel);
            });
            after(() => {
                sinon.restore();
            })

            it('should call removeChannel service method', function () {
                expect(controller.service.removeChannel.args[0]).eqls([channel]);
            });

            it('should return the success message', function () {
                expect(message).eqls(`\nYou have successfully removed ${channel} from your tariff plan\n`);
            })
        });
    });
});
