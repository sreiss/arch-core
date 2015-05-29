/**
 * Event routes.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(eventController, eventRouter, eventMiddleware)
{
    eventRouter.route('/')
        //.post(eventMiddleware.checkEvent)
        .post(eventController.saveEvent)
        .put(eventController.updateEvent)
        .get(eventController.getEvents);

    eventRouter.route('/addGuest')
        .post(eventController.addGuest);

    eventRouter.route('/changeStatus')
        .post(eventController.changeStatus);

    eventRouter.route('/ical')
        .get(eventController.getIcal);

    eventRouter.route('/:eventid')
        //.all(eventMiddleware.checkEventId)
        .delete(eventController.deleteEvent)
        .get(eventController.getEvent);

    eventRouter.route('/date/:eventdate')
        .get(eventController.getEventsByDate);

    eventRouter.route('/category/:eventcategory')
        .get(eventController.getEventsByCategory);
};
