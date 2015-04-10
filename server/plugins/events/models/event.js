/**
 * Event model.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(Types)
{
    return {
        schema: {
            name: {type: String, required: true},
            type: {type :String, required: true},
            begin: {type: Date, required: true},
            end: {type :Date},
            description: {type : String},
            //data_reference: { type: Types.ObjectId, ref: 'kid_participant' },
            //data_reference: String,
            address_line_1: {type : String},
            //address_line_2: String,
            ville: {type:String},
            //address_line_3: String,
            country: {type:String},
            zip: {type : Number},
            created: {type :Date}
            //createdBy: {type: Types.ObjectId, ref: 'User'},
            //modified: Date,
            //modifiedBy: {type: Types.ObjectId, ref: 'User'},
            //archived: Date,
            //archivedBy: {type: Types.ObjectId, ref: 'User'},
            //published: Number
        },
        priority: 1
    };
};
