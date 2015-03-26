var path = require('path'),
    ArchError = require(path.join(__dirname, '.', '/ArchError'));

var ArchErrorSuperMario = function (message, status, type, mario) {
    this.message = message || 'An error occcured';
    this.status = status || 400;
    this.type = type || 'ArchError';
    this.mario = 'Wihiiiii';
};
ArchErrorSuperMario.prototype = Object.create(ArchError.prototype);
ArchErrorSuperMario.prototype.constructor = ArchErrorSuperMario;

module.exports = ArchErrorSuperMario;