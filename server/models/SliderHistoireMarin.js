const Types = require('@keystonejs/fields');
const access = require("../services/services");
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
    Image: {
      type: Types.File,
      adapter: ServiceFileUpload,
      many:false,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.file) {
            await ServiceFileUpload.delete(existingItem.file);
          }
        },
      }
    },
    Date: {
      type: Types.CalendarDay 
    },
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