/**
 * ServiceItemController
 *
 * @description :: Server-side logic for managing service items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	get: function(req, res, next) {
		var params = req.params.all();
		
		if (params.id) {
			// Get one serviceItem
			ServiceItem.findOne(params)
			.then(function(serviceItem) {
				if (serviceItem) {
					// For some reason, having a link back to the service
					// will mess up Ember Data.
					delete serviceItem.service;
					res.json({
						'serviceItem': serviceItem
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
					res.json({
						'serviceItems': serviceItems
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
					'serviceItem': updatedServiceItems[0]
				});
			})
			.catch(function(error) {
				res.status(500);
				res.json(error);
			});
		} else {
			// Create serviceItem
			ServiceItem.create(params.serviceItem)
			.then(function(serviceItem) {
				res.json({
					'serviceItem': serviceItem
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
			ServiceItem.destroy(params.id)
			.then(function(deletedServiceItems) {
				if (deletedServiceItems.length == 0) {
					res.notFound();
				}

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

