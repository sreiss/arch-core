/**
 * Events plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(discoveryController, discoveryRouter, discoveryMiddleware) {
    discoveryRouter.route('/')
        .post(discoveryMiddleware.checkDiscovery)
        .post(discoveryController.saveDiscovery)
		.get(discoveryController.getDiscoveries)

    discoveryRouter.route('/:discoveryId')
        .all(discoveryMiddleware.checkDiscoveryId)
        .get(discoveryController.getDiscovery)
        .delete(discoveryController.deleteDiscovery)
}