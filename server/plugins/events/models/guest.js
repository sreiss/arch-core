// This model will be available is services in this._models.Guest
module.exports = function(Types) {
    return {
        schema: {
            //usr_id: { type: Types.ObjectId, ref: 'User' },
            usr_id: { type: Number },
            evt_id: { type: Types.ObjectId, ref: 'Event' }
        },
        priority: 2
    };
};
