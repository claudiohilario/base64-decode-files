const mimeTypes = require('mime-types');

const INVALID_INPUT_STRING_ERROR = 'Invalid input string';

/**
 * This function decode base64 file.
 * 
 * @param {string} base64Encoded - String with valid base64 file encoded.
 * E.g.: data:{mimeType};{encoding},{base64}
 * 
 * @returns {Object} Returns an object with file decoded.
 * E.g.:
 * {
 *  type: 'image/png',
 *  encoding: 'base64',
 *  data: <Buffer 89 50 4e 47 0d 0a 1a 0a ... 30958 more bytes>,
 *  extension: 'png'
 * }
 */
module.exports = function base64DecodeFile(base64Encoded) {
    if( typeof base64Encoded !== 'string') {
        throw new Error(INVALID_INPUT_STRING_ERROR);
    }

    const [, type, encoding, data] = base64Encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);(.*),(.*)/) || [];

    if(!type || !encoding || !data) {
        throw new Error(INVALID_INPUT_STRING_ERROR);
    }

    const extension = mimeTypes.extension(type);

    return {
        type,
        encoding,
        data: new Buffer.from(data, encoding),
        extension: extension || ''
    }
}