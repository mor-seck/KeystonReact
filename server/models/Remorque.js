const Types = require('@keystonejs/fields');
const access = require("../services/services");
const ServiceFileUpload = require("../services/ServiceFileUpload");
const { Select } = require('@keystonejs/fields');

module.exports = {
  fields: {
    Nom: {
      type: Types.Text
    },
    typeDeBateaux: {
      type: Types.Relationship,
      ref: 'Type',
      many: false
    },
    Etat: {
      type: Select, options: 'NEUF,OCCASION'
    },
    Marque: {
      type: Types.Relationship,
      ref: 'Marque',
      many: false
    },
    chargeUtile: {
      type: Types.Float
    },
    Prix: {
      type: Types.Float,
    },
    PoidsTotalEnCharge: {
      type: Types.Float
    },
    Longueur: {
      type: Types.Float
    },
    Largeur: {
      type: Types.Float
    },
    AmenagementRemorque: {
      type: Types.Relationship,
      ref: 'AmenagementRemorque',
      many: false
    },
    AnneeMiseEnService: {
      type: Types.Relationship,
      ref: 'AnneeMiseEnService',
      many: false
    },
    Image: {
      type: Types.Relationship,
      ref: 'Image',
      many: true
    },
    Remarque: {
      type: Types.Text,
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