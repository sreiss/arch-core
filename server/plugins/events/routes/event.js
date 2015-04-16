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
        .get(eventController.getEvents);

    eventRouter.route('/ical')
        .get(eventController.getIcal);

    eventRouter.route('/:eventid')
        //.all(eventMiddleware.checkEventId)
        .delete(eventController.deleteEvent)
        .get(eventController.getEvent);
};
