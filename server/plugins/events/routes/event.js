module.exports = function(eventController, eventRouter) {

    // This route will be available under /events/event/

    eventRouter.route('/')
        .post(eventController.saveEvent)
        .get(eventController.getEvent);


    eventRouter.route('/:eventid')
        .post(eventController.deleteEvent)
        .get(eventController.getEvent);

    // This route will be available under /events/event/details
    //
    //eventRouter.route('/details')
    //    .get(eventController.getDetails);

};
