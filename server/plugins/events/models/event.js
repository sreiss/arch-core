module.exports = function(Types) {
    return {
        schema: {
            name: String,
            type: String
        },
        onSchemaReady: function(schema) {
            schema.methods.verifyEvent = function(callback) {
                console.log('Event checked');
                callback();
            };
            schema.pre('save', function(callback) {
                console.log('saving!');
                callback();
            });
        }
    };
};
