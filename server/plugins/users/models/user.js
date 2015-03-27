/**
 * User model.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema: {
            userId: {type: String, required: true},
            role: {type: String, required: true},
            level: {type: String},
            block: {type: Boolean, default: false},
            created: {type: Date, default: Date.now},
            createdBy: {type: Types.ObjectId, ref: 'User'},
            modified: Date,
            modifiedBy: {type: Types.ObjectId, ref: 'User'},
            archived: Date,
            archivedBy: {type: Types.ObjectId, ref: 'User'},
            published: {type: Number, default: 1}
        }
    };
};