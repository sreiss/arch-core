/**
 * User mongoose schema.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema: {
            clientId: { type: String },
            clientSecret: { type: String },
            clientRedirectUri: { type: String }
        }
    };
};