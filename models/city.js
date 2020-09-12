module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define("City", {
    // The email cannot be null, and must be a proper email before creation
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      //unique: true,
      // validate: {
      //   isEmail: true
      // }
    },
    // The safety rating score received from amadeus API
    scLgbtq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scMedical: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scOverall: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scPhysicalHarm: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scPoliticalFreedom: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scTheft: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scWomen: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  City.associate = function(models) {
    // We're saying that a City should belong to an User
    // A City can't be created without an User due to the foreign key constraint
    City.belongsTo(models.User, {
      foreignKey:  {
        
        allowNull: false
      }
    });
  };


  return City;
};