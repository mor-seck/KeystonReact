const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    TypeDeRelevage: {
      type: Types.Text,
    }
  },
  labelField: 'TypeDeRelevage',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};