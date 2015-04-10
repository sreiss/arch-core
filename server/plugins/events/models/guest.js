/**
 * Guest model.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(Types)
{
    return {
        schema: {
            usr_id: { type: Types.ObjectId, ref: 'User', required: true },
            evt_id: { type: Types.ObjectId, ref: 'Event', required: true }
        },
        priority: 2
    };
};
