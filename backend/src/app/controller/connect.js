
// Checking if the object is an empty object via stack overflow: https://stackoverflow.com/a/32108184/10837566
// lodash doesn't work, method here used is the best :)

const isEmpty = (obj) => {

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});

}

const connect = (db_connection, controller) => {
    return new Promise((resolve, reject) => {
        if (isEmpty(db_connection) || !db_connection || db_connection === undefined) {
            reject(new Error('connecting db not supplied!'));
        }

        if(isEmpty(controller)) {
            reject(new Error('Repository is not supplied!'));
        }

        resolve(controller(db_connection));
    });
}

module.exports = {
    connect: connect
}