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
            role: {type: String},
            birthdate: {type: Date},
            phone: {type: String},
            licenceffa: {type: String},
            avatar: {type: String},
            token: {type: String},
            firstconnexion: {type: Boolean, default: true},
            created: {type: Date, default: Date.now},
            createdBy: {type: Types.ObjectId, ref: 'User'},
            modified: Date,
            modifiedBy: {type: Types.ObjectId, ref: 'User'},
            archived: Date,
            archivedBy: {type: Types.ObjectId, ref: 'User'},
            published: {type: Boolean, default: true}
        },
        priority: 1
    };
};