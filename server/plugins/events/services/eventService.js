module.exports = function(userService, guestService, eventService, Event) {
    return {
        getEvents: function () {
            eventService;
            userService.getUsers(function (err, users) {
                return users;
            });
        },
        getEventGuests: function () {
            var guests = guestService.getGuests();
            return guests;
        }
    };
};
