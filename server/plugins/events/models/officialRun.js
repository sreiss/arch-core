/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

 
/** Official run */
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
				guest: {type: Types.ObjectId, ref: 'User', required: true},
				status: {type: String, required: true}
			}],
			website: {type:String, required: true},
			information: {type:String, required: true},
			trainings:
            [{
                training: {type: Types.ObjectId, ref: 'Training'}
            }],
			course: {type: Types.ObjectId, ref: 'Course', required: true}
        },
        priority: 1
    };
};