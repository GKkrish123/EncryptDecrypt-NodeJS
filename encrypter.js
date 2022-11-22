'use strict'

import crypto from 'crypto'
import { ENCRYPTION_CONFIG } from './ENCRYPTION_CONFIG'

const { ENCRYPTION_ALGORITHM, ENCRYPTION_ENCODING_SCHEME, ENCRYPTION_VARIABLE_WIDTH, ENCRYPTION_TAG_LENGTH } = ENCRYPTION_CONFIG

class Encrypter {
    constructor (encryptionkey, iv) {
      this.algorithm = ENCRYPTION_ALGORITHM
      console.log("this.algorithm", this.algorithm);
      this.key = encryptionkey.substr(0, 32)
      // console.log("this.key", this.key);
      this.iv = Buffer.from(iv, ENCRYPTION_ENCODING_SCHEME)
      // console.log("this.iv", this.iv);
      this.tagLength = ENCRYPTION_TAG_LENGTH
      // console.log("this.tagLength", this.tagLength);
    }
  
    encrypt (data) {
      const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv)
      let cipherText = cipher.update(JSON.stringify(data), ENCRYPTION_VARIABLE_WIDTH)
      console.log("cipherText before -> ", cipherText);
      console.log("cipherText str before -> ", cipherText.toLocaleString());


      cipherText = Buffer.concat([cipherText, cipher.final()])
      console.log("cipherText after -> ", cipherText);
      console.log("cipherText str after -> ", cipherText.toString());
      const tag = cipher.getAuthTag()
      console.log("Tag -> ", tag);

      const encryptedData = Buffer.concat([cipherText, tag])
      console.log("encryptedData-> ", encryptedData);

      
      console.log("encryption done ->",Buffer.from(encryptedData).toString(ENCRYPTION_ENCODING_SCHEME))

      return Buffer.from(encryptedData).toString(ENCRYPTION_ENCODING_SCHEME)
    }
  
    decrypt (encryptedData) {
      const encryptedBuffer = Buffer.from(encryptedData, ENCRYPTION_ENCODING_SCHEME)
      console.log("encryptedBuffer", encryptedBuffer);
      const cipherText = encryptedBuffer.slice(0, encryptedBuffer.length - this.tagLength)
      console.log("cipherText", cipherText);
      const tag = encryptedBuffer.slice(-this.tagLength)
      console.log("tag", tag);
      console.log("iv", this.iv);
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv)
      decipher.setAuthTag(tag)
      let data = decipher.update(cipherText, ENCRYPTION_ENCODING_SCHEME, ENCRYPTION_VARIABLE_WIDTH)
      console.log("data ->  ", data, data.length);
      data += decipher.final(ENCRYPTION_VARIABLE_WIDTH)
      console.log("data ->  ", data, data.length);
      return JSON.parse(data)
    }
  }

  export { Encrypter }