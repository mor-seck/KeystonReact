const Types = require('@keystonejs/fields');
const access = require("../services/services");
const { Select } = require('@keystonejs/fields');
const ServiceFileUpload = require("../services/ServiceFileUpload");

module.exports = {
  fields: {
    Modele: {
      type: Types.Text,
    },
    Marque: {
      type: Types.Relationship,
      ref: 'Marque',
      many: false
    },
    PuissanceEnCv: {
      type: Types.Integer,
      isRequired: false
    },
    PuissanceEnKw: {
      type: Types.Integer,
      isRequired: false
    },
    LongueurArbre: {
      type: Select, options: 'S,L,X,U',
    },
    BarreFranche: {
      type: Select, options: 'Avec,Sans',
    },
    TypeDeRelevage: {
      type: Types.Relationship,
      ref: 'TypeDeRelevage',
      many: false
    },
    Etat: {
      type: Select, options: 'NEUF,OCCASION,EXPORTATION,POUR_PIECES'
    },
    TypeDeMoteur: {
      type: Types.Relationship,
      ref: 'TypeDeMoteur',
      many: false
    },
    Prix: {
      type: Types.Float,
    },
    nombreHeureDeMarche: {
      type: Types.Integer,
      isRequired: false
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
      type       : Types.Text,
      isMultiline: true
    },
    Brochure: {
      type: Types.File,
      adapter: ServiceFileUpload,
      isRequired: false,
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
