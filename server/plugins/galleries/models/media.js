/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */


/** Media */
module.exports = function(Types) {
    return {
        schema:
        {
            name: {type: String},
            description: {type: String},
            url: {type: String, required: true},
            gallery: {type: Types.ObjectId, ref: 'Gallery'}
        },
        priority: 3
    };
};
