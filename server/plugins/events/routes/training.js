/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(trainingController, trainingRouter, trainingMiddleware) {
    trainingRouter.route('/')
        //.post(trainingMiddleware.checkTraining)
        .post(trainingController.saveTraining)
		.get(trainingController.getTrainings)

    trainingRouter.route('/:trainingId')
        //.all(trainingMiddleware.checkTrainingId)
        .get(trainingController.getTraining)
        .delete(trainingController.deleteTraining)
}