const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = userIsAdmin(auth);
  const isOwner = userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const adminConfig = {
  read: userIsAdminOrOwner,
  update: userIsAdminOrOwner,
  create: userIsAdmin,
  delete: userIsAdmin,
  auth: true
};

module.exports = {
  userIsAdmin,
  userIsAdminOrOwner,
  adminConfig
};
