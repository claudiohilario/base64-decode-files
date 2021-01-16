const fs = require('fs');
const decodeBase64File = require('./index');
const {data: encodedFile} = require('./base64FileEncoded.json');

function saveFile(base64Decoded, fileName) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${fileName}.${base64Decoded.extension}`, base64Decoded.data, (err) => {
            if(err) {
                return reject(err);
            }
            return resolve(true);
        })
    });

}


const decodedBase64File = decodeBase64File(encodedFile);
const fileName = 'decodedFile';

saveFile(decodedBase64File, fileName)
    .then(() => console.log('Decoded File'));

