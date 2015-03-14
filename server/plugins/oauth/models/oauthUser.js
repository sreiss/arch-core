/**
 * User mongoose schema.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema: {
            username: { type: String },
            password: { type: String },
            firstname: { type: String },
            lastname: { type: String },
            email: { type: String, default: '' }
        }
    };
};