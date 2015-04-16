/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchDeleteError = GLOBAL.ArchDeleteError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(officialRunService)
{
    return {
        /** Save official run. */
        saveOfficialRun: function(req, res)
        {
            // Get officialRun data.
            var officialRunData = req.body;

            // Saving officialRun.
            officialRunService.saveOfficialRun(officialRunData).then(function(officialRun)
            {
                res.status(200).json({"count" : (officialRun ? 1 : 0), "data" : officialRun});
            }
			.catch(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },

        /** Delete official run. */
        deleteofficialRun: function(req, res)
        {
            // Get officialRunId.
            var officialRunId = req.params.officialRunId;

            // Saving officialRun.
            officialRunService.deleteOfficialRun(officialRunId).then(function(officialRun)
            {
                res.status(200).json({"count" : (officialRun ? 1 : 0), "data" : officialRun});
            }
			.catch(err)
            {
                res.status(500).json({"error" : new ArchDeleteError(err.message)});
            });
        },

        /** Get official run. */
        getofficialRun: function(req, res)
        {
            // Get officialRunId.
            var officialRunId = req.params.officialRunId;

            // Get officialRun.
            officialRunService.getOfficialRun(officialRunId).then(function (officialRun)
            {
                res.status(200).json({"count": (officialRun ? 1 : 0), "data": officialRun});
            }
			.catch(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Get all official runs. */
        getOfficialRuns: function(req, res)
        {
            // Get official runs.
            officialRunService.getOfficialRuns().then(function(officialRuns)
            {
                res.status(200).json({"count" : categories.length, "data" : officialRuns});
            }
			.catch(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    };
};