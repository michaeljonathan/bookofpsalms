/**
* ServiceItem.js
*
* @description :: Represents a ServiceItem in the database
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    itemType: {
      type: 'string',
      required: true
    },

    song: {
      model: 'Song'
    },

    isSequenceEnabled: {
      type: 'boolean'
    },

    sequence: {
      type: 'array'
    },

    secondaryVersionName: {
      type: 'string'
    },

    service: {
      model: 'Service'
    }

  }
};

