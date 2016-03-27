export default (sequelize, DataTypes) => sequelize.define('UserProfile', {
  // TODO check userID is unique, ie, check is a true 1 to 1 relationship
  displayName: DataTypes.INTEGER, // profile.displayName
  gender: DataTypes.INTEGER, // profile._json.gender
  picture: DataTypes.INTEGER, // `https://graph.facebook.com/${profile.id}/picture?type=large`
}, {
  classMethods: {
    associate({ User, UserProfile }) {
      UserProfile.belongsTo(User);
    },
  },
});