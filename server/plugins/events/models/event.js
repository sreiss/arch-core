module.exports = function(Types) {
    return {
        schema: {
            name: String, required: true,
            type: String, required: true,
            begin: Date, required: true,
            end: Date,
            description: String,
            //data_reference: { type: Types.ObjectId, ref: 'kid_participant' },
            //data_reference: String,
            address_line_1: String,
            //address_line_2: String,
            ville: String,
            //address_line_3: String,
            country: String,
            zip: Number,
            created: Date
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
