module.exports = function(guestController, guestRouter) {
    guestRouter.route('/')
        .post(guestController.saveGuest)
        .get(guestController.getGuests);

    guestRouter.route('/:guestid')
        .get(guestController.getGuest)
        .post(guestController.deleteGuest);
};
