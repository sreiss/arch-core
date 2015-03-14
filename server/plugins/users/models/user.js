/**
 * User model.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema: {
            userId: {type: String, unique: true, required: true},
            role: {type: String, required: true},
            signupType: {type: Types.ObjectId, ref: 'Signuptype'},
            level: {type: String},
            block: {type: Boolean, default: false},
            created: {type: Date, required: true, default: Date.now},
            createdBy: {type: Types.ObjectId, required: true, ref: 'User'},
            modified: Date,
            modifiedBy: {type: Types.ObjectId, ref: 'User'},
            archived: Date,
            archivedBy: {type: Types.ObjectId, ref: 'User'},
            published: {type: Number, default: 1}
        }
    };
};