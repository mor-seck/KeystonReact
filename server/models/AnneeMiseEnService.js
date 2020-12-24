const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    AnneeDeMiseEnService: {
      type: Types.Integer,
    }
  },
  labelField: 'AnneeDeMiseEnService',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};