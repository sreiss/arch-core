/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchDeleteError = GLOBAL.ArchDeleteError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(personalTrainingService)
{
    return {
        /** Save personalTraining. */
        savePersonalTraining: function(req, res)
        {
            // Get personalTraining data.
            var personalTrainingData = req.body;

            // Saving personalTraining.
            personalTrainingService.savePersonalTraining(personalTrainingData).then(function(personalTraining)
            {
                res.status(200).json({"count" : (personalTraining ? 1 : 0), "data" : personalTraining});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },

        /** Delete personal training. */
        deletePersonalTraining: function(req, res)
        {
            // Get personalTrainingId.
            var personalTrainingId = req.params.personalTrainingId;

            // Saving personalTraining.
            personalTrainingService.deletePersonalTraining(personalTrainingId).then(function(personalTraining)
            {
                res.status(200).json({"count" : (personalTraining ? 1 : 0), "data" : personalTraining});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchDeleteError(err.message)});
            });
        },

        /** Get personalTraining. */
        getPersonalTraining: function(req, res)
        {
            // Get personalTrainingId.
            var personalTrainingId = req.params.personalTrainingId;

            // Get personalTraining.
            personalTrainingService.getPersonalTraining(personalTrainingId).then(function (personalTraining)
            {
                res.status(200).json({"count": (personalTraining ? 1 : 0), "data": personalTraining});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Get all personal trainings. */
        getPersonalTrainings: function(req, res)
        {
            // Get personal trainings.
            personalTrainingService.getPersonalTrainings().then(function(personalTrainings)
            {
                res.status(200).json({"count" : personalTrainings.length, "data" : personalTrainings});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    };
};