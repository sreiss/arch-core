/**
 * Guests routes.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(guestsController, guestsRouter, eventMiddleware)
{
    guestsRouter.route('/:eventid')
        .get(eventMiddleware.checkEventId)
        .get(guestsController.getGuestsByEvent);
};
