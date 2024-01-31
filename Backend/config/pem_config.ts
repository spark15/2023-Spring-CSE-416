const fs = require("fs");
const keys_dir = "config/secure/"; // 키 파일이 위치
const key = fs.readFileSync(keys_dir + "key.pem");
const cert = fs.readFileSync(keys_dir + "cert.pem");
const passphrase = "KRSukoco"

module.exports.options = {
  key,
  cert,
  passphrase,
};