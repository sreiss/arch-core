/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(officialRunController, officialRunRouter, officialRunMiddleware) {
    officialRunRouter.route('/')
        .post(officialRunMiddleware.checkOfficialRun)
        .post(officialRunController.saveOfficialRun)
		.get(officialRunController.getOfficialRuns)

    officialRunRouter.route('/:officialRunId')
        .all(officialRunMiddleware.checkOfficialRunId)
        .get(officialRunController.getOfficialRun)
        .delete(officialRunController.deleteOfficialRun)
}