module.exports = function(eventController, eventRouter, authMiddleware) {

    // This route will be available under /events/event/

    eventRouter.route('/')
        .all(authMiddleware.checkEvent)
        .get(eventController.getEvents);

    // This route will be available under /events/event/details

    eventRouter.route('/details')
        .get(eventController.getDetails);

};
