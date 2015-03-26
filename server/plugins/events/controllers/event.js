var ArchAuthError = GLOBAL.ArchAuthError;

module.exports = function(eventService) {
    return {
        getEvents: function (req, res) {
            throw new ArchAuthError();
            var events = eventService.getEvents();
            res.json(events);
        },
        getDetails: function (req, res) {
            res.json
        }
    }
};