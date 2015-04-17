/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(personalTrainingController, personalTrainingRouter, personalTrainingMiddleware) {
    personalTrainingRouter.route('/')
        //.post(personalTrainingMiddleware.checkPersonalTraining)
        .post(personalTrainingController.savePersonalTraining)
		.get(personalTrainingController.getPersonalTrainings)

    personalTrainingRouter.route('/:personalTrainingId')
        //.all(personalTrainingMiddleware.checkPersonalTrainingId)
        .get(personalTrainingController.getPersonalTraining)
        .delete(personalTrainingController.deletePersonalTraining)
}