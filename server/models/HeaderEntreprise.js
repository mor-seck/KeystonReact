const Types             = require('@keystonejs/fields');
const access            = require("../services/services");
const ServiceFileUpload = require("../services/ServiceFileUpload");

module.exports = {
  fields: {
    ImageHeader: {
      type: Types.File,
      adapter: ServiceFileUpload,
      many: true,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.file) {
            await ServiceFileUpload.delete(existingItem.file);
          }
        },
      }
    },
    TextHeader: {
      type: Types.Text,
      isMultiline: true
    }
  },
  labelField: 'Marque',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
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