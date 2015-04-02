module.exports = function(guestsController, guestsRouter) {

    guestsRouter.route('/:eventid')
        .get(guestsController.getGuestsByEvent);
};
