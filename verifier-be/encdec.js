const nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");

module.exports = {
encryptData: function(data, publicKey, secretKey) {
  const one_time_code = nacl.randomBytes(24);

  //Get the message from david
  //const plain_text = "Hello there Viktoria";

  //Get the cipher text
  const cipher_text = nacl.box(
    nacl.util.decodeUTF8(data),
    one_time_code,
    publicKey,
    secretKey
  );

  //message to be sent to Viktoria
  const message_in_transit = { "cipher_text": cipher_text, "one_time_code": one_time_code };

  return message_in_transit;
},
decryptData: function(message, secretKey, publicKey) {
  //Get the decoded message
  let decoded_message = nacl.box.open(
    message["cipher_text"],
    message["one_time_code"],
    publicKey,
    secretKey
  );

  //Get the human readable message
  let plain_text = nacl.util.encodeUTF8(decoded_message);

  //return the plaintext
  return plain_text;
}
};