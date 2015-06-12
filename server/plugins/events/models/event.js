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
            dtstart: { type: Date, required: true},
            dtend: {type: Date, required: true},
            summary: {type: String, required: true},
            location: {type: String, required: true},
            description: {type: String, required: true},
            transp: {type: String, required: true},
            sequence: {type: Number, required: true},
            category: {type: String, required: true},
            participants:
            [{
                guest: {type: Types.ObjectId},
                status: {type: String}
            }],
            course: {type: Types.ObjectId},
            website: {type:String},
            information: {type:String},
            trainings:
            [{
                training: {type: Types.ObjectId, ref: 'Event'}
            }],
            creator: {type: Types.ObjectId},
            program: {type: String},
            runs:
            [{
                run: {type: Types.ObjectId, ref: 'Event'}
            }],
            kidoikoiaki: {type: String }
        },
        priority: 2
    };
};
