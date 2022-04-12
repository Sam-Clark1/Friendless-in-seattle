module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    sender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    friend_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Friend',
        key: 'id'
      }
    },
    message: {
      type: DataTypes.TEXT
    }
  },
  {
    underscored: true
  }
  );

  Message.associate = function (models) {
    Message.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'sender_id'
    });
  };

  Message.associate = function (models) {
    Message.belongsTo(models.User, {
      as: 'receiver',
      foreignKey: 'receiver_id'
    });
  };

  Message.associate = function (models) {
    Message.belongsTo(models.Friend, {
      foreignKey: 'friend_id'
    });
  };

  Message.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
  };

  return Message;
};
