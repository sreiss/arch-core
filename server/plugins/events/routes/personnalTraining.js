/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(personnalTrainingController, personnalTrainingRouter, personnalTrainingMiddleware) {
    personnalTrainingRouter.route('/')
        .post(personnalTrainingMiddleware.checkPersonnalTraining)
        .post(personnalTrainingController.savePersonnalTraining)
		.get(personnalTrainingController.getPersonnalTrainings)

    personnalTrainingRouter.route('/:personnalTrainingId')
        .all(personnalTrainingMiddleware.checkPersonnalTrainingId)
        .get(personnalTrainingController.getPersonnalTraining)
        .delete(personnalTrainingController.deletePersonnalTraining)
}²