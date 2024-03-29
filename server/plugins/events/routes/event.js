/**
 * Event routes.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(eventController, eventRouter, eventMiddleware, authMiddleware)
{
    eventRouter.route('/')
        .post(authMiddleware.authenticate)
        .post(eventController.saveEvent)
        .put(authMiddleware.authenticate)
        .put(eventController.updateEvent)
        .get(eventController.getEvents);

    eventRouter.route('/updateGuest')
        .post(authMiddleware.authenticate)
        .post(eventController.updateGuest);

    eventRouter.route('/ical')
        .get(eventController.getIcal);

    eventRouter.route('/:eventid')
        .all(eventMiddleware.checkEventId)
        .delete(authMiddleware.authenticate)
        .delete(eventController.deleteEvent)
        .get(eventController.getEvent);

    eventRouter.route('/date/:eventdate')
        .get(eventController.getEventsByDate);

    eventRouter.route('/category/:eventcategory')
        .get(eventController.getEventsByCategory);

    eventRouter.route('/creator/:eventcreator')
        .get(eventController.getEventsByCreator);
};
