module.exports = function(eventService, userService) {

    return {
        checkEvent: function(req, res, next) {
            console.log('haha');
            next();
        }
    };

};