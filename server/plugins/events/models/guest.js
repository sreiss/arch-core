// This model will be available is services in this._models.Guest
module.exports = function(Types) {
    return {
        schema: {
            //usr_id: { type: Types.ObjectId, ref: 'User', required: true },
            usr_id: { type: Number, required: true },
            evt_id: { type: Types.ObjectId, ref: 'Event', required: true }
        },
        priority: 2
    };
};
