// This model will be available is services in this._models.Guest
module.exports = function(Types) {
    return {
        schema: {
            name: String,
            firstName: String
        },
        onSchemaReady: function(schema) {

        }
    };
};
