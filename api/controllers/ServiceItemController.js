/**
 * ServiceItemController
 *
 * @description :: Server-side logic for managing service items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var serviceItemToJSON = function(serviceItem) {
	// For some reason, having a link back to the service
	// will mess up Ember Data.
	delete serviceItem.service;
	return serviceItem;
};

module.exports = {

	get: function(req, res, next) {
		var params = req.params.all();
		
		if (params.id) {
			// Get one serviceItem
			ServiceItem.findOne(params)
			.then(function(serviceItem) {
				if (serviceItem) {
					res.json({
						'serviceItem': serviceItemToJSON(serviceItem)
					});
				} else {
					res.notFound();
				}
			})
			.catch(function(error) {
				res.status(500);
				res.json(error);
			});
		} else {
			// Get all serviceItems
			ServiceItem.find(params)
			.then(function(serviceItems) {
				if (serviceItems) {
					var serviceItemsJSON = [];
					for (var i in serviceItems) {
						serviceItemsJSON.push(serviceItemToJSON(serviceItems[i]));
					}
					res.json({
						'serviceItems': serviceItemsJSON
					});
				} else {
					res.notFound();
				}
			})
			.catch(function(error) {
				res.status(500);
				res.json(error);
			});
		}
	},

	post: function(req, res, next) {
		var params = req.params.all();

		if (params.id) {
			// Update serviceItem
			ServiceItem.update(params.id, params.serviceItem)
			.then(function(updatedServiceItems) {
				if (updatedServiceItems.length == 0) {
					res.notFound();
				}
				res.json({
					'serviceItem': serviceItemToJSON(updatedServiceItems[0])
				});
			})
			.catch(function(error) {
				res.status(500);
				res.json(error);
			});
		} else {
			// Create serviceItem
			var paramsServiceItem = params.serviceItem,
				serviceItem,
				service;
			if (!(paramsServiceItem && paramsServiceItem.service)) {
				res.badRequest();
			}
			Service.findOne({id: paramsServiceItem.service})
			.then(function(foundService) {
				service = foundService;
				return ServiceItem.create(paramsServiceItem);
			})
			.then(function(createdServiceItem) {
				serviceItem = createdServiceItem;
				// Add the serviceItem to its service
				service.itemsList.push(serviceItem.id);
				return service.save();
			}).then(function() {
				res.json({
					'serviceItem': serviceItemToJSON(serviceItem)
				});
			})
			.catch(function(error) {
				res.status(500);
				res.json(error);
			});
		}
	},

	delete: function(req, res, next) {
		var params = req.params.all();

		if (params.id) {
			// Delete one serviceItem
			var deletedServiceItem;
			ServiceItem.destroy(params.id)
			.then(function(deletedServiceItems) {
				if (deletedServiceItems.length == 0) {
					res.notFound();
					return;
				}

				deletedServiceItem = deletedServiceItems[0];
				return Service.findOne({id: deletedServiceItem.service});
			}).then(function(service) {
				var unfilteredItemsList = service.itemsList,
					filteredItemsList = [],
					i,
					item;
				for (i = 0; i < unfilteredItemsList.length; i++) {
					itemID = unfilteredItemsList[i];
					if (itemID !== deletedServiceItem.id) {
						filteredItemsList.push(itemID);
					}
				}
				service.itemsList = filteredItemsList;
				return service.save();
			}).then(function() {
				res.json({});
			})
			.catch(function(error) {
				res.status(500);
				res.json(error);
			});
		} else {
			res.notFound();
		}
	}

};

