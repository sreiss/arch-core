/**
 * User model.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema:
        {
            oauth: {type: Types.ObjectId, required: true},
            role: {type: Types.ObjectId, required: true, ref: 'Role'},
            birthdate: {type: Date},
            phone: {type: String},
            adress: {type: String},
            licenceffa: {type: String},
            avatar: {type: String},
            firstconnexion: {type: Boolean, default: true}
        },
        priority: 1
    };
};