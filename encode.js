function encodeInteger(num) {
  //convert the input into a string, the concat i+num+e
  let myStr = num.toString();
  let encodedStr = "i" + myStr + "e";

  return encodedStr;
}

function encodeString(str) {
  //take the string, final result should be length:string
  let myLength = str.length;
  let finalResult = myLength + ":" + str;
  return finalResult;
}

function encodeList(arr) {
  //output should be l + contents of list + e
  let myFinalResult = "";
  for (let element of arr) {
    if (typeof element == "string") {
      myFinalResult += encodeString(element);
    } else if (typeof element == "number") {
      myFinalResult += encodeInteger(element);
    } else if (typeof element == "object") {
      if (element instanceof Array) {
        myFinalResult += encodeList(element);
      } else if (element instanceof Object) {
        myFinalResult += encodeDictionary(element);
      }
    }
  }
  myFinalResult = "l" + myFinalResult + "e";
  return myFinalResult;
}

function encodeDictionary(dict) {
  //final result should be d + contents of dictionary + e
  //{"bar": "spam", "foo": 42}), would be encoded as d3:bar4:spam3:fooi42ee.
  let myFinalResult = "";
  //sort here
  const orderedDict = Object.keys(dict)
    .sort()
    .reduce((obj, key) => {
      obj[key] = dict[key];
      return obj;
    }, {});

  for (let [key, value] of Object.entries(orderedDict)) {
    myFinalResult += encodeString(key);
    if (typeof value == "string") {
      myFinalResult += encodeString(value);
    } else if (typeof value == "number") {
      myFinalResult += encodeInteger(value);
    } else if (typeof value == "object") {
      if (value instanceof Array) {
        myFinalResult += encodeList(value);
      } else if (value instanceof Object) {
        myFinalResult += encodeDictionary(value);
      }
    }
  }
  myFinalResult = "d" + myFinalResult + "e";
  return myFinalResult;
}

module.exports = [encodeInteger, encodeString, encodeList, encodeDictionary];
