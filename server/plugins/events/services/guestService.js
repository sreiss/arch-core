module.exports = function (eventService) {
    return {
        getGuests: function () {
            var guests = [];
            for (var i = 0; i < 900000; i += 1) {
                guests.push(eventService.getEvents());
            }
            return guests;
        }
    };
};
