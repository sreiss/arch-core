/**
 * User mongoose schema.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema: {
            accessToken: { type: String },
            clientId: {type: Types.ObjectId, ref: 'OauthClient', required: true},
            userId: {type: Types.ObjectId, ref: 'OauthUser', required: true},
            expires: { type: Date }
        },
        priority: 4
    };
};