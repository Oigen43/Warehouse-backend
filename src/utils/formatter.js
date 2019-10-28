'use strict';

function currentDate() {
    const d = new Date();
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
}

function usersList(users) {
    const usersList = [];

    users.forEach(item => {
        usersList.push(`${item.firstName} ${item.surname} - ${item.email}`);
     });

     return usersList;
}

module.exports = {
    currentDate,
    usersList
};
