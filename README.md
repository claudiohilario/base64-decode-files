# Decode Base64 files in node js

Decodes base64 files with `data:{mimeType};{encoding},{base64}` format.

## Usage example

```js
const decodeBase64File = require('./index');
const base64File = 'data:image/png;base64,iVBORw0KGgoAAAANSUh...kGh2TAAAAAElFTkSuQmCC';

decodeBase64File(base64File);
/**
 * Output example:
 * {
 *  type: 'image/png',
 *  encoding: 'base64',
 *  data: <Buffer 89 50 4e 47 0d 0a 1a 0a ... 30958 more bytes>,
 *  extension: 'png'
 * }
 * /
```

### Save base64 file example

```js
const fs = require("fs");
const decodeBase64File = require("./index");

function saveFile(base64Decoded, fileName) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      `${fileName}.${base64Decoded.extension}`,
      base64Decoded.data,
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      }
    );
  });
}

const decodedBase64File = decodeBase64File(encodedFile);
const fileName = "decodedFile";

saveFile(decodedBase64File, fileName).then(() => console.log("Decoded File"));
```
