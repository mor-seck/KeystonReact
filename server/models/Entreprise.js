const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    Titre: {
      type: Types.Text,
    },
    Text: {
      type: Types.Text,
      isMultiline: true
    }
  },
  labelField: 'Titre',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};