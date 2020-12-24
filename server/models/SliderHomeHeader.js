const Types             = require('@keystonejs/fields');
const access            = require("../services/services");
const ServiceFileUpload = require("../services/ServiceFileUpload");
module.exports = {
  fields: {
    Titre: {
      type: Types.Text
    },
    Description: {
      type: Types.Text,
      isMultiline: true
    },
    Marque: {
      type: Types.Relationship,
      ref: 'Marque',
      many: false
    },
    Image: {
      type: Types.Relationship,
      ref: 'Image',
      many: true
    }
  },
  labelField: 'Titre',
  access: {
    read: true, //access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
  hooks: {
    afterDelete: async ({ existingItem }) => {
      if (existingItem.file) {
        await ServiceFileUpload.delete(existingItem.file);
      }
    },
  },
};