/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchDeleteError = GLOBAL.ArchDeleteError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(discoveryService)
{
    return {
        /** Save discovery. */
        saveDiscovery: function(req, res)
        {
            // Get discovery data.
            var discoveryData = req.body;

            // Saving discovery.
            discoveryService.saveDiscovery(discoveryData).then(function(discovery)
            {
                res.status(200).json({"count" : (discovery ? 1 : 0), "data" : discovery});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },

        /** Delete discovery. */
        deleteDiscovery: function(req, res)
        {
            // Get discoveryId.
            var discoveryId = req.params.discoveryid;

            // Saving discovery.
            discoveryService.deleteDiscovery(discoveryId).then(function(discovery)
            {
                res.status(200).json({"count" : (discovery ? 1 : 0), "data" : discovery});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchDeleteError(err.message)});
            });
        },

        /** Get discovery. */
        getDiscovery: function(req, res)
        {
            // Get discoveryId.
            var discoveryId = req.params.discoveryid;

            // Get discovery.
            discoveryService.getDiscovery(discoveryId).then(function(discovery)
            {
                res.status(discovery ? 200 : 204).json({"count": (discovery ? 1 : 0), "data": discovery});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Get all discoveries. */
        getDiscoveries: function(req, res)
        {
            // Get discoveries.
            discoveryService.getDiscoveries().then(function(discoveries)
            {
                res.status(discoveries.length > 0 ? 200 : 204).json({"count" : discoveries.length, "data" : discoveries});
            })
			.catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    };
};