const [decodeInt, decodeStr, decodeList] = require("./helpers")

function decode(str){

    //returning different types
    return decodeList(str)
}

module.exports = decode