/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */


/** Event */
module.exports = function(Types) {
    return {
        schema:
        {
            name:  {type: String, required: true},
            medias: [{media: {type: Types.ObjectId, ref: 'Media'}}]
        },
        priority: 4
    };
};
