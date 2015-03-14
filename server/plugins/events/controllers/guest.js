module.exports = function(guestService) {
    return {
        getGuests: function (req, res) {
            res.json(guestService.getGuests());
        }
    };
};