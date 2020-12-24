const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    AmenagementRemorque: {
      type: Types.Text,
    }
  },
  labelField: 'AmenagementRemorque',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};