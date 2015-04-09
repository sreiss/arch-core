module.exports = function(guestsController, guestsRouter, eventMiddleware) {

    guestsRouter.route('/:eventid')
        .get(eventMiddleware.checkEventId)
        .get(guestsController.getGuestsByEvent);
};
