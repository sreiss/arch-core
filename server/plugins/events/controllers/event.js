module.exports = function(eventService) {
    return {
        getEvents: function (req, res) {
            var events = eventService.getEvents();
            res.json(events);
        },
        getDetails: function (req, res) {
            res.json
        }
    }
};