/**
* Song.js
*
* @description :: Represents a Song in the database
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

    title: {
      type: 'string',
      required: true
    },

    description: {
      type: 'string'
    },

    lyricsVersions: {
      type: 'json'
    }

  }
};

