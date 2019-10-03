'use strict';

function removeEmptyFields(data) {
    const filteredData = {};
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== null) {
            filteredData[key] = data[key];
        }
    }

    return filteredData;
}

module.exports = {
    removeEmptyFields
};
