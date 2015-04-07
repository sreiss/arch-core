/**
 * User mongoose schema.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema: {
            username: { type: String, required: true},
            password: { type: String, required: true},
            fname: { type: String, required: true},
            lname: { type: String, required: true },
            email: { type: String, required: true },
            signuptype: {type: Types.ObjectId, ref: 'OauthSignuptype', required: true}
        },
        priority: 3
    };
};