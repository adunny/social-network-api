const moment = require('moment');

module.exports = (date) => {
    return moment(date).format("DD MM YYYY hh:mm:ss")
};