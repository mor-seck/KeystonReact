const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    Modele: {
      type: Types.Text,
    }
  },
  labelField: 'Modele',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};