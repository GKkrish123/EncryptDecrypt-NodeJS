'use strict'

const ENABLE_ENCRYPTION = true
const ENCRYPTION_KEY = 'ob1VbQlyRRaKms81nzKB91hjb4QvmP-5f7jSdTgmOIzNvWh5-eLFykYnBx7_1flXG7MGYXSwcVKplNypX26VC19wHmYI4RZFD9uiUfjj3pyUOG-YX7-TkGzIUTpMEE2Bm9YDYBpNRzI6FGns0csd0t1XU7hoVuwazD_NEMJiv2f68HaM7zf_YKHIJHamig2p7jWtBnaUSvm5UZi3wJSw_B7A6qiIFKFYstdxQJCTv7G1jyTmBIWWi23rQ8'
const ENCRYPTION_ENCODING_SCHEME = 'base64'
const ENCRYPTION_VARIABLE_WIDTH = 'utf-8'
const ENCRYPTION_ALGORITHM = 'aes-256-gcm' 
const ENCRYPTION_TAG_LENGTH = 16

const ENCRYPTION_CONFIG = {
  ENABLE_ENCRYPTION,
  ENCRYPTION_KEY,
  ENCRYPTION_ENCODING_SCHEME,
  ENCRYPTION_VARIABLE_WIDTH,
  ENCRYPTION_ALGORITHM,
  ENCRYPTION_TAG_LENGTH
}

export { ENCRYPTION_CONFIG }