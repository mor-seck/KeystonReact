const Types = require('@keystonejs/fields');
const access = require("../services/services");
const ServiceFileUpload = require("../services/ServiceFileUpload");
const { Select } = require('@keystonejs/fields');

module.exports = {
  fields: {
    Nom: {
      type: Types.Text
    },
    Marque: {
      type: Types.Relationship,
      ref: "Marque",
      many: false
    },
    Type: {
      type: Types.Relationship,
      ref: "Type",
      many: false
    },
    Modele: {
      type: Types.Relationship,
      ref: "Modele",
      many: false
    },
    TailleEnPouces: {
      type: Types.Float,
    },
    Etat: {
      type: Select, options: 'NEUF,OCCASION'
    },
    Prix: {
      type: Types.Float,
    },
    Image: {
      type: Types.Relationship,
      ref: 'Image',
      many: true
    },
    Remarque: {
      type       : Types.Text,
      isMultiline: true
    },
    Brochure: {
      type: Types.File,
      adapter: ServiceFileUpload,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.file) {
            await ServiceFileUpload.delete(existingItem.file);
          }
        },
      }
    }
    

  },

  labelField: 'Nom',
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