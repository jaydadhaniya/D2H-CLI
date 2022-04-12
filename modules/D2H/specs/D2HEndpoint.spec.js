const D2HEndpoint = require('../D2HEndpoint');
const inquirer = require('inquirer');
const expect = require('chai').expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const logger = console.warn
describe('D2HEndpoint', function () {
    let endpoint;
    before(() => {
        endpoint = new D2HEndpoint();
        console.warn = function (l) { };
    });
    after(() => {
        console.warn = logger;
    });
    describe('viewBalance', function () {
        context('When no new balance is added', () => {
            let result = null
            before(() => {
                sinon.stub(endpoint.controller, 'viewBalance').returns(0);
                result = endpoint.viewBalance();
            });
            after(() => {
                sinon.restore();
            })

            it('should return the initial balance 0', function () {
                expect(result).equal(0);
            });
            it('should call viewBalance controller method', function () {
                expect(endpoint.controller.viewBalance.called).to.be.true;
            });
        });
    });

    describe('addBalance', function () {
        context('When user first enter invalid amount and on second try enter right amount', () => {
            before(() => {
                sinon.stub(endpoint.controller, 'addBalance');
                sandbox.stub(inquirer, 'prompt').onFirstCall().resolves({ amount: 'Invalid' }).onSecondCall().resolves({ amount: 100 });
                endpoint.addBalance();
            });
            after(() => {
                sinon.restore();
                sandbox.restore();
            })

            it('should call addBalance controller method on second time and update the use balance', function () {
                expect(inquirer.prompt.calledTwice).to.be.true;
                expect(inquirer.prompt.args[0][0]).eqls([{
                    type: 'input',
                    name: 'amount',
                    message: 'Enter the amount you want to add to your balance: '
                }]);
                expect(endpoint.controller.addBalance.args[0]).eqls([100]);
            });
        });
    });

    describe('viewTariffPackage', function () {
        context('When some channels are there in current tariff package', () => {
            let result = null
            before(() => {
                sinon.stub(endpoint.controller, 'viewTariffPackage').returns(['Channel 1', 'Channel 2']);
                result = endpoint.viewTariffPackage();
            });
            after(() => {
                sinon.restore();
            })

            it('should return the current tariff package channels', function () {
                expect(result).eqls(['Channel 1', 'Channel 2']);
            });
            it('should call viewTariffPackage controller method', function () {
                expect(endpoint.controller.viewTariffPackage.called).to.be.true;
            });
        });
    });

    describe('addChannel', function () {
        context('When user call add channel action', () => {
            before(() => {
                sinon.stub(endpoint.controller, 'addChannel');
                sandbox.stub(inquirer, 'prompt').onFirstCall().resolves({ category: 'Educational' }).onSecondCall().resolves({ channel: 'think school : 40 Rs' });
                endpoint.addChannel();
            });
            after(() => {
                sinon.restore();
                sandbox.restore();
            })

            it('should first ask for the category', function () {
                expect(inquirer.prompt.args[0][0]).eqls([{
                    type: 'rawlist',
                    name: 'category',
                    message: 'Please choose one of the following categories:',
                    choices: ['Entertainment', 'Educational', 'Regional', 'Sports']
                }]);
            });

            it('should show channel list based on category selection', function () {
                expect(inquirer.prompt.args[1][0]).eqls([{
                    type: 'rawlist',
                    name: 'channel',
                    message: 'Please choose one of the following channel:',
                    choices: ['think school : 40 Rs', 'academy gyan : 30 Rs', 'study abroad : 50 Rs']
                }]);
            });

            it('should call controller addChannel with selected channel details', function () {
                expect(endpoint.controller.addChannel.args[0]).eqls(['think school', 40]);
            });
        });
    });

    describe('removeChannel', function () {
        context('When user call remove channel action', () => {
            before(() => {
                sinon.stub(endpoint.controller, 'removeChannel');
                sandbox.stub(inquirer, 'prompt').resolves({ channel: 'My channel' });
                endpoint.removeChannel();
            });
            after(() => {
                sinon.restore();
                sandbox.restore();
            })

            it('should ask for the channel name first then call controller method with selected channel details', function () {
                expect(inquirer.prompt.args[0][0]).eqls([{
                    type: 'input',
                    name: 'channel',
                    message: 'Enter the channel you want to remove from your tariff plan: '
                }]);
                expect(endpoint.controller.removeChannel.args[0]).eqls(['My channel']);
            });
        });
    });
});
