module.exports = function(guestController, guestRouter) {
    guestRouter.route('/')
        .get(guestController.getGuests);
};
