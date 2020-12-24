const { Keystone }                 = require('@keystonejs/keystone');
const { StaticApp }                = require("@keystonejs/app-static");
const { PasswordAuthStrategy }     = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp }               = require('@keystonejs/app-graphql');
const { AdminUIApp }               = require('@keystonejs/app-admin-ui');
const initialiseData               = require('./initial-data');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const Type                         = require('./models/Type');
const AnneeMiseEnService           = require('./models/AnneeMiseEnService');
const Bateau                       = require('./models/Bateau');
const Moteur                       = require('./models/Moteur');
const Modele                       = require('./models/Modele');
const Remorque                     = require('./models/Remorque');
const Marque                       = require('./models/Marque');
const Electronique                 = require('./models/Electronique');
const Image                        = require('./models/Image');
const SliderHistoireMarin          = require('./models/SliderHistoireMarin');
const HeaderEntreprise             = require('./models/HeaderEntreprise');
const Entreprise                   = require('./models/Entreprise');
const SliderHomeHeader             = require('./models/SliderHomeHeader');
const TypeDeRelevage               = require('./models/TypeDeRelevage');
const TypeDeMoteur                 = require('./models/TypeDeMoteur');
const HistoireMarin                = require('./models/HistoireMarin');
const HeaderHistoireMarin          = require('./models/HeaderHistoireMarin');
const AmenagementRemorque          = require('./models/AmenagementRemorque');
const { AdminMail }                = require('./MailSender/SendMail');
require('dotenv').config()

const PROJECT_NAME = 'Lepori Marine';
const adapterConfig = {
mongoUri: process.env.MONGO_URI
};

// rewrite for production
if (process.env.MONGO_URI) adapterConfig.mongoUri = process.env.MONGO_URL
const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
});

// Access control functions
const userIsAdmin  = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };
keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type    : Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
  },
  // List-level access controls
  access: {
    read  : access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth  : true,
  },
});

keystone.createList('Marque', Marque);
keystone.createList('Modele', Modele);
keystone.createList('Type', Type);
keystone.createList('AnneeMiseEnService', AnneeMiseEnService);
keystone.createList('Bateau', Bateau);
keystone.createList('Moteur', Moteur);
keystone.createList('Remorque', Remorque);
keystone.createList('Electronique', Electronique);
keystone.createList('Image', Image);
keystone.createList('SliderHistoireMarin', SliderHistoireMarin);
keystone.createList('HeaderEntreprise', HeaderEntreprise);
keystone.createList('Entreprise', Entreprise);
keystone.createList('SliderHomeHeader', SliderHomeHeader);
keystone.createList('TypeDeRelevage', TypeDeRelevage);
keystone.createList('TypeDeMoteur', TypeDeMoteur);
keystone.createList('HistoireMarin', HistoireMarin);
keystone.createList('HeaderHistoireMarin', HeaderHistoireMarin);
keystone.createList('AmenagementRemorque', AmenagementRemorque);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

//mail sender
keystone.extendGraphQLSchema({
  mutations: [
    AdminMail
  ],
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
    new StaticApp({
      path: '/uploads',
      src: process.env.DATA_DIR ? `${process.env.DATA_DIR}/uploads` : './uploads',
      fallback: 'index.html',
    })
  ],
   configureExpress: app => {
    app.set('trust proxy', 1);
  }
};
