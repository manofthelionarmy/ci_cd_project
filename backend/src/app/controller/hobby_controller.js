// I can now refactor this even further, where I can pass a string Object to tell which functions for a specific controller
const hobbyController = (db_connection) => {
    const getAllHobbies = () => {
        return new Promise((resolve, reject) => {

            try {
                const query = db_connection.model('Hobby').find();

                query.exec((err, res) => {
                    if (err) {
                        throw(new Error('Experienced an error while trying to get all hobbies'));
                    } else {
                        resolve(res);
                    }
                });
            } catch (error) {
                reject(error);          
            } 
            
        });
    }

    const disconnect = () => {

        return new Promise((resolve, reject) => {
            db_connection.close((err) => {
                if(err) {
                    reject(err); 
                } else {
                    resolve('Successfully disconnected from MongoDB'); 
                }
            }); 
        })
        
    }

    return {
        getAllHobbies: getAllHobbies,
        disconnect: disconnect
    }
}


module.exports = {
    hobbyController: hobbyController
}
