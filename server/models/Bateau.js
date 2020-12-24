const Types             = require('@keystonejs/fields');
const access            = require("../services/services");
const ServiceFileUpload = require("../services/ServiceFileUpload");
const { Select }        = require('@keystonejs/fields');
module.exports = {
  fields: {
    Modele: {
      type: Types.Text
    },
    Prix: {
      type: Types.Float,
    },
    TypeDeBateau: {
      type: Types.Relationship,
      ref : "Type",
      many: false
    },
    Marque: {
      type: Types.Relationship,
      ref : 'Marque',
      many: false
    },
    Etat: {
      type: Select, options: 'NEUF,OCCASION,EXPORTATION,POUR_PIECES'
    },
    Longueur: {
      type: Types.Float,
    },
    
    Largeur: {
      type: Types.Float,
    },
    Poids: {
      type: Types.Float,
    },
    
    Moteur: {
      type: Types.Relationship,
      ref : 'Moteur',
      many: false
    },
    AnneeMiseEnService: {
      type: Types.Relationship,
      ref : 'AnneeMiseEnService',
      many: false
    },
    Remarque: {
      type       : Types.Text,
      isMultiline: true
    },
    Image: {
      type: Types.Relationship,
      ref : 'Image',
      many: true
    },
    Brochure: {
      type      : Types.File,
      adapter   : ServiceFileUpload,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.file) {
            await ServiceFileUpload.delete(existingItem.file);
          }
        },
      }
    }
    
    
  },
  labelField: 'NomDuBateau',
  access: {
    read  : true, //access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth  : true,
  },
  hooks: {
    afterDelete: async ({ existingItem }) => {
      if (existingItem.file) {
        await ServiceFileUpload.delete(existingItem.file);
      }
    },
  },
};
