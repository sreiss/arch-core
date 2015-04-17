/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchDeleteError = GLOBAL.ArchDeleteError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(trainingService)
{
    return {
        /** Save training. */
        saveTraining: function(req, res)
        {
            // Get training data.
            var trainingData = req.body;

            // Saving training.
            trainingService.saveTraining(trainingData).then(function(training)
            {
                res.status(200).json({"count" : (training ? 1 : 0), "data" : training});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },

        /** Delete training. */
        deleteTraining: function(req, res)
        {
            // Get trainingId.
            var trainingId = req.params.trainingId;

            // Saving training.
            trainingService.deleteTraining(trainingId).then(function(training)
            {
                res.status(200).json({"count" : (training ? 1 : 0), "data" : training});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchDeleteError(err.message)});
            });
        },

        /** Get training. */
        getTraining: function(req, res)
        {
            // Get trainingId.
            var trainingId = req.params.trainingId;

            // Get training.
            trainingService.getTraining(trainingId).then(function (training)
            {
                res.status(200).json({"count": (training ? 1 : 0), "data": training});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Get all personnal trainings. */
        getTrainings: function(req, res)
        {
            // Get personnal trainings.
            trainingService.getTrainings().then(function(trainings)
            {
                res.status(200).json({"count" : trainings.length, "data" : trainings});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    };
};