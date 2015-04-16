/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

 
/** Personnal training */
module.exports = function(Types) {
    return {
        schema:
        {
            dtstart: { type: Date, required: true},
            dtend: {type: Date, required: true},
            summary: {type: String, required: true},
            location: {type: String, required: true},
            description: {type: String, required: true},
            transp: {type: String, required: true},
            sequence: {type: String, required: true},
			category: {type: String, required: true},
			participants: 
			[{
				guest: {type: Types.ObjetId, ref: 'User', required: true},
				status: {type: String, required: true}
			}],
			course: {type: Types.ObjectId, ref: 'Course', required: true},
			creator: {type: Types.ObjetId, ref: 'User', required: true}
        },
        priority: 1
    };
};