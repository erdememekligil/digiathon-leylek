const nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");

let publicKey = nacl.util.decodeBase64(
  "XF1C6s5/p+mKyP7Q+57/ZrHZNzNTsof23qaJTKzvlBg="
);
let secretKey = nacl.util.decodeBase64(
  "YtxlGYRWTxXyfgKkVmaP0hlNwo2epXm5TkvCWc6duic="
);

const issuer = { publicKey, secretKey };

publicKey = nacl.util.decodeBase64(
  "9nnX4F1AVWUxpsROBYPqfo8NLjDnCtHaxfwrtt7vPDI="
);
secretKey = nacl.util.decodeBase64(
  "ViW4G+dKSqWUNJmEe2AF0a/eWGYJPMR31kSnFYRsa4s="
);

const verifier = { publicKey, secretKey };

publicKey = nacl.util.decodeBase64(
  "W4l48FENukcTGziwK1FzzhaCYnl7cXMpxirAFq8x3A0="
);
secretKey = nacl.util.decodeBase64(
  "s4Wp1STUvnSgoowEK2+7kxFSnipVTEai1phw5NgFiVM="
);

const holder = { publicKey, secretKey };

module.exports = { holder: holder, issuer: issuer, verifier: verifier };

