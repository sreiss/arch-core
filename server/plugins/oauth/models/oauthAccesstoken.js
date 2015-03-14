/**
 * User mongoose schema.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema: {
            accessToken: { type: String },
            clientId: { type: String },
            userId: { type: String },
            expires: { type: Date }
        }
    };
};