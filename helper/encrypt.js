const bcryptjs = require('bcryptjs')

let salt = bcryptjs.genSaltSync(10);


const encrypt = function (password) {
  let hash = bcryptjs.hashSync(password, salt);
  return hash
}

module.exports = encrypt
