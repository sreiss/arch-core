module.exports = function(guestController, guestRouter, guestMiddleware) {
    guestRouter.route('/')
        //.post(guestMiddleware.checkGuest)
        .post(guestController.saveGuest)
        .get(guestController.getGuests);

    guestRouter.route('/:guestid')
        .all(guestMiddleware.checkGuestId)
        .get(guestController.getGuest)
        .delete(guestController.deleteGuest);
};
