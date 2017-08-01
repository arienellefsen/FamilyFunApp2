module.exports = function(sequelize, Sequelize) {

    var detailUser = sequelize.define('detailUser', {
        userDetailsId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        activities: {
            type: Sequelize.TEXT,
            notEmpty: false
        },

        date: {
            type: Sequelize.DATE,
            notEmpty: true
        },

        save: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        idUser: {
            type: Sequelize.INTEGER
        }
    });
    return detailUser;
};