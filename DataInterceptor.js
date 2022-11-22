import crypto from 'crypto';
import { Encrypter } from './encrypter';

const CIPHER_ALGORITHM = 'aes-256-cbc';
const TOKEN_START_VALUE = 40;
const TOKEN_END_VALUE = 72;

class DataInterceptor {

  encryptPayload(body, secretKey = '', byPassEncryption) {
    let ciphertext = '';
    if(!!byPassEncryption) {
      ciphertext = body;
    } else {
     const plainText = JSON.stringify(body)
     secretKey = secretKey.substring(TOKEN_START_VALUE, TOKEN_END_VALUE)
     secretKey = new Buffer(secretKey)
     let iv = crypto.randomBytes(16)
     console.log("iv -> ", iv);

     let cipher = crypto.createCipheriv(CIPHER_ALGORITHM, secretKey, iv)
     let encrypted = cipher.update(plainText)
     console.log("encrypted -> ", encrypted);
     let cipherFinal =cipher.final()
     console.log("cipherFinal -> ", cipherFinal);
     encrypted = Buffer.concat([encrypted, cipherFinal])
     console.log("encrypted again -> ", encrypted);


     const payload = iv.toString('hex') + ':' + encrypted.toString('hex')
     ciphertext = payload;
     console.log("ciphertext -> ", ciphertext);
    }
   return ciphertext
  }


  // decrypt data
  decryptPayload(request) {
    try {
      let { payload } = request
      if (request.method === 'GET') { return next() }
      // let { payload } = body
      console.log(payload)
      const key = 'ob1VbQlyRRaKms81nzKB91hjb4QvmP-5f7jSdTgmOIzNvWh5-eLFykYnBx7_1flXG7MGYXSwcVKplNypX26VC19wHmYI4RZFD9uiUfjj3pyUOG-YX7-TkGzIUTpMEE2Bm9YDYBpNRzI6FGns0csd0t1XU7hoVuwazD_NEMJiv2f68HaM7zf_YKHIJHamig2p7jWtBnaUSvm5UZi3wJSw_B7A6qiIFKFYstdxQJCTv7G1jyTmBIWWi23rQ8'
      let payloadParts = payload.split(':');
      if (payloadParts.length !== 2) {
        return 'Invalid Payload';
      }
      const iv = payloadParts[0]
      const encrypter = new Encrypter(key, iv)
      const decryptedData = encrypter.decrypt(payloadParts[1])
      return decryptedData
    } catch (error) {
      console.log('-----',error)
      throw ('Invalid', 401)
    }
  }
}
export default DataInterceptor;
