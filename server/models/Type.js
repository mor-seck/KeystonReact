const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    Type: {
      type: Types.Text,
    }
  },
  labelField: 'Type',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};