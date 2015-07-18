/**
 * ServiceController
 *
 * @description :: Server-side logic for managing services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	get: function(req, res, next) {
		var params = req.params.all();
		
		if (params.id) {
			// Get one service
			Service.findOne(params)
			.then(function(service) {
				if (service) {
					res.json({
						'service': service
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
			// Get all services
			Service.find(params)
			.then(function(services) {
				if (services) {
					res.json({
						'services': services
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
			// Update service
			Service.update(params.id, params.service)
			.then(function(updatedServices) {
				if (updatedServices.length == 0) {
					res.notFound();
				}

				res.json({
					'service': updatedServices[0]
				});
			})
			.catch(function(error) {
				res.status(500);
				res.json(error);
			});
		} else {
			// Create service
			Service.create(params.service)
			.then(function(service) {
				res.json({
					'service': service
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
			// Delete one service
			Service.destroy(params.id)
			.then(function(deletedServices) {
				if (deletedServices.length == 0) {
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

