const D2HService = require('../D2HService');
const expect = require('chai').expect;

describe('D2HService', function () {
    let service;
    before(() => {
        service = new D2HService();
    });
    describe('viewBalance', function () {
        context('When no new balance is added', () => {
            it('should return the initial balance 0', function () {
                expect(service.viewBalance()).equal(0);
            });
        });
    });

    describe('addBalance', function () {
        context('When new balance is added', () => {
            it('should update the balance in the db', () => {
                service.addBalance(100);
                expect(service.viewBalance()).equal(100);
            });
        });
    });

    describe('viewTariffPackage', function () {
        context('When no new channels are added', () => {
            it('should return default channel array', () => {
                expect(service.viewTariffPackage()).eqls(['star sports', 'sony sab', 'aastha']);
            });
        });
    });

    describe('addChannel', function () {
        context('when new channel is added', () => {
            it('should add the channel in the db', () => {
                service.addChannel('new channel');
                expect(service.viewTariffPackage()).eqls(['star sports', 'sony sab', 'aastha', 'new channel']);
            });
        });
    });

    describe('removeChannel', function () {
        context('when channel is removed', () => {
            it('should remove the channel in the db', () => {
                service.removeChannel('sony sab');
                expect(service.viewTariffPackage()).eqls(['star sports', 'aastha', 'new channel']);
            });
        });
    });
});
