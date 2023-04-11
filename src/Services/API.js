let axios = require('axios');

let Axios = function () {
    let liveURL = `${process.env.REACT_APP_API_URL}`


    let getData = ((add, header) => {
   return new Promise(((resolve, reject) => {
            axios.get(liveURL + add,
                {headers: header})
                .then((response) => {
                    console.log(response)
                    console.log(response.data); 
                    if (!response.data.Error) {
                        resolve(response.data.Message)
                    } else {
                        reject(response.data.Error);
                    }
                }).catch((error) => {
                console.log(error);
                reject(error);
            });
        }))
    });

    let postData = ((add, data, header) => {
        return new Promise(((resolve, reject) => {
            axios.post(liveURL + add, data, {headers: header})
                .then((response) => {
                    if (!response.data.Error) {
                        resolve(response.data)
                    } else {
                        reject(response.data);
                    }
                }).catch((error) => {
                if (error.response) {
                    // console.log(error.response);
                    reject(error);
                }

            });
        }))
    });


    let putData = ((add, data, header) => {
        return new Promise((resolve, reject) => {
            axios.put(liveURL + add, data, {header: header})
                .then((response) => {
                    if (!response.data.Error) {
                        resolve(response.data)
                    } else {
                        reject(response.data);
                    }
                }).catch((error) => {
                reject(error);
            });
        });

    });
    // let deleteData = ((add, data, header) => {
    //     return new Promise((resolve, reject) => {
    //         axios.delete(getUrl() + add, {
    //             headers: {},
    //             data: data
    //         })
    //             .then((response) => {
    //                 if (!response.data.error) {
    //                     resolve(response.data.data)
    //                 } else {
    //                     reject(response.data.message);
    //                 }
    //             })
    //             .catch((error) => {
    //                 reject(error);
    //             });

    //     });

    // });



    return {
        getData: getData,
        postData: postData,
        putData: putData,
        // deleteData: deleteData,
    }

};

module.exports = Axios();