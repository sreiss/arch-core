/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */


module.exports = function() {
    return {
        schema:
        {
            name: {type:String},
            label: {type: String},
            description: {type: String}
        },
        priority: 1
    };
};