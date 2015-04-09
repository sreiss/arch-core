/**
 * Signup type model.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema: {
            name: {type: String, required: true},
            description: {type: String, required: true},
            isPublic: {type: Boolean, default: false, required: true}
        },
        priority: 2
    };
};
