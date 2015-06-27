/**
 * SongController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	get: function(req, res, next) {
		var params = req.params.all();
		
		if (params.id) {
			// Get single song
			Song.findOne(params).exec(function(err, model) {

				if (err) {
					next(err);
				}

				if (model) {
					// Do whatever with song here
					res.json(model);
				} else {
					res.notFound();
				}

			});
		} else {
			// Get all songs
			Song.find(params).exec(function(err, models) {

				if (err) {
					next(err);
				}

				if (models) {
					// Do whatever with songs here
					res.json(models);
				} else {
					res.notFound();
				}
			});
		}
	}

};

