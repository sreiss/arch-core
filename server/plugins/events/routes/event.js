module.exports = function(eventController, eventRouter, eventMiddleware) {

    // This route will be available under /events/event/

    eventRouter.route('/')
        .post(eventMiddleware.checkEvent)
        .post(eventController.saveEvent)
        .get(eventController.getEvents);

    eventRouter.route('/ical')
        .get(eventController.getIcal);

    eventRouter.route('/:eventid')
        .all(eventMiddleware.checkEventId)
        .delete(eventController.deleteEvent)
        .get(eventController.getEvent);
};
