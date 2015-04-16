/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchDeleteError = GLOBAL.ArchDeleteError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(personnalTrainingService)
{
    return {
        /** Save personnalTraining. */
        savePersonnalTraining: function(req, res)
        {
            // Get personnalTraining data.
            var personnalTrainingData = req.body;

            // Saving personnalTraining.
            personnalTrainingService.savePersonnalTraining(personnalTrainingData).then(function(personnalTraining)
            {
                res.status(200).json({"count" : (personnalTraining ? 1 : 0), "data" : personnalTraining});
            }
			.catch(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },

        /** Delete personnal training. */
        deletePersonnalTraining: function(req, res)
        {
            // Get personnalTrainingId.
            var personnalTrainingId = req.params.personnalTrainingId;

            // Saving personnalTraining.
            personnalTrainingService.deletePersonnalTraining(personnalTrainingId).then(function(personnalTraining)
            {
                res.status(200).json({"count" : (personnalTraining ? 1 : 0), "data" : personnalTraining});
            }
			.catch(err)
            {
                res.status(500).json({"error" : new ArchDeleteError(err.message)});
            });
        },

        /** Get personnalTraining. */
        getPersonnalTraining: function(req, res)
        {
            // Get personnalTrainingId.
            var personnalTrainingId = req.params.personnalTrainingId;

            // Get personnalTraining.
            personnalTrainingService.getPersonnalTraining(personnalTrainingId).then(function (personnalTraining)
            {
                res.status(200).json({"count": (personnalTraining ? 1 : 0), "data": personnalTraining});
            }
			.catch(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Get all personnal trainings. */
        getPersonnalTrainings: function(req, res)
        {
            // Get personnal trainings.
            personnalTrainingService.getPersonnalTrainings().then(function(personnalTrainings)
            {
                res.status(200).json({"count" : categories.length, "data" : personnalTrainings});
            }
			.catch(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    };
};