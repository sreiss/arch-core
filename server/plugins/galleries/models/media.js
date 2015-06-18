/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */


/** Media */
module.exports = function() {
    return {
        schema:
        {
            name: {type: String, required: true},
            description: {type: String},
            url: {type: String, required: true}
        },
        priority: 3
    };
};
