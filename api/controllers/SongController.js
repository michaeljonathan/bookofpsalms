/**
 * SongController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	songsToFullJSON: function(songs) {
		return [{songData: songs}]; // TODO
	},

	get: function(req, res, next) {
		var params = req.params.all();
		
		if (params.id) {
			// Get one song
			Song.findOne(params)
			.then(function(song) {
				if (song) {
					var songsFullJSON = sails.controllers.song.songsToFullJSON([song]);
					res.json(songsFullJSON[0]);
				} else {
					res.notFound();
				}
			})
			.catch(function(error) {
				res.status(500);
				res.json(error);
			});
		} else {
			// Get all songs
			Song.find(params)
			.then(function(songs) {
				if (songs) {
					var songsFullJSON = sails.controllers.song.songsToFullJSON(songs);
					res.json(songsFullJSON);
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
			// Update song
			Song.update(params.id, params)
			.then(function(updatedSongs) {
				if (updatedSongs.length == 0) {
					res.notFound();
				}

				var songsFullJSON = sails.controllers.song.songsToFullJSON(updatedSongs);
				res.json(songsFullJSON[0]);
			})
			.catch(function(error) {
				res.status(500);
				res.json(error);
			});
		} else {
			// Create song
			Song.create(params)
			.then(function(song) {
				var songsFullJSON = sails.controllers.song.songsToFullJSON([song]);
				res.json(songsFullJSON[0]);
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
			// Delete one song
			Song.destroy(params.id)
			.then(function(deletedSongs) {
				if (deletedSongs.length == 0) {
					res.notFound();
				}

				var songsFullJSON = sails.controllers.song.songsToFullJSON(deletedSongs);
				res.json(songsFullJSON);
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

