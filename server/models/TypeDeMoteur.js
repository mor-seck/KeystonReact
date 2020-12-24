const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    TypeDeMoteur: {
      type: Types.Text,
    }
  },
  labelField: 'TypeDeMoteur',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};