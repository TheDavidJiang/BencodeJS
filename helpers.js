//for integers
//look for the "i" prefix and the "e" suffix
//want to know: what are the characters between i and e
//what it should do: take away the first and last character, convert what's remaining into an int

// function decodeInt(str){
//     //use slice to remove the first and last characters, store that into a variable
//     //identify where the first i and e are
//     let iIndex = 0
//     let eIndex = 0
//     for (let i = 0; i < str.length; i++){
//         if (str[i] == "i"){
//             iIndex = i
//             break
//         }
//     }
//     for (let i = 0; i < str.length; i++){
//         if (str[i] == "e"){
//             eIndex = i
//             break
//         }
//     }

//     let mySlice = parseInt(str.slice(iIndex + 1, eIndex))
//     return mySlice
// }
function decodeInt(str) {
  //Goal: return a tuple of [# of characters, the value itself]

  let iIndex = 0;
  let eIndex = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "i") {
      iIndex = i;
      break;
    }
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "e") {
      eIndex = i;
      break;
    }
  }

  let finalValue = parseInt(str.slice(iIndex + 1, eIndex));
  const strLength = eIndex + 1;
  let finalArr = [strLength, finalValue];

  return finalArr;
}

// function decodeStr(str){
//     //return for the value from colon to the colon+length
//     let colonIndex = 0
//     //run a loop to iterate through the string for the colon
//     //if the character before the colon can be converted to an int
//         //if the character before THAT can be converted to an int
//         //get that number as the length
//     //return (slice the string from colonIndex + 1 to colonIndex + length)
//     for (let i = 0; i < str.length; i++){
//         if (str[i] == ":"){
//             colonIndex = i
//             break
//         }
//     }
//     let myLength = parseInt(str.slice(0, colonIndex))
//     let myContent = str.slice(colonIndex + 1, colonIndex + myLength + 1)

//     return myContent
// }
function decodeStr(str) {
  //return for the value from colon to the colon+length
  let colonIndex = 0;
  //run a loop to iterate through the string for the colon
  //if the character before the colon can be converted to an int
  //if the character before THAT can be converted to an int
  //get that number as the length
  //return (slice the string from colonIndex + 1 to colonIndex + length)
  for (let i = 0; i < str.length; i++) {
    if (str[i] == ":") {
      colonIndex = i;
      break;
    }
  }
  let myLength = parseInt(str.slice(0, colonIndex));
  let myContent = str.slice(colonIndex + 1, colonIndex + myLength + 1);

  let myFinalArr = [myLength + colonIndex + 1, myContent];
  return myFinalArr;
}

// function decodeList(str){
//     //identify where the "l" and "e" is
//         // if the element is an integer or an object, it will have another e, so check to see if there are more Es
//         let myFinalResult = []
//         let lIndex = 0
//         let eIndex = 0
//         for (let i = 0; i < str.length; i++){
//             if (str[i] == "l"){
//                 lIndex = i
//                 break
//             }
//         }
//         for (let i = 0; i < str.length; i++){
//             if (str[i] == "e"){
//                 //if the next letter is also "e", go to that
//                 eIndex = i
//                 while (str[i+1] != str.length && str[i+1] == "e"){
//                     eIndex += 1
//                     i++
//                 }
//                 break
//             }
//         }
//         let remainingContent = str.slice(lIndex + 1, eIndex)
//         console.log("remaining content: ", remainingContent)
//         //iterate through the string to check if the first element is a string or int -> this determines which function we run
//             for (let i = 0; i < remainingContent.length; i++){
//                 console.log("remaining content in the loop: ", remainingContent)
//                 //if the first character can be converted to an int, then do decodeInt, push that result to the array, and strip away that part from "remainingContent"
//                 //if the first character cannot be parsed as int, then do decodeString
//                 if (!isNaN(parseInt(remainingContent[0]))){
//                     const strippedString = decodeStr(remainingContent)
//                     myFinalResult.push(strippedString)
//                     let offset = remainingContent.indexOf(":")
//                     remainingContent = remainingContent.slice(strippedString.length + offset + 1 )
//                 }else if(isNaN(parseInt(remainingContent[0]))){
//                     if (remainingContent[0] == "i"){
//                         const strippedInt = decodeInt(remainingContent)
//                         myFinalResult.push(strippedInt)
//                         remainingContent = remainingContent.slice(strippedInt.toString().length + 2)
//                     }else if (remainingContent[0] == "l"){
//                         const strippedList = decodeList(remainingContent)
//                         myFinalResult.push(strippedList)
//                         remainingContent = remainingContent.slice(strippedList.length + 2)
//                     }// to do: implement the dicitonary part

//                 }
//         }
//         console.log("final result: ", myFinalResult)

//     return myFinalResult
// }

function decodeList(input) {
  //don't need to strip away the l and e.
  //When you take in a list, it starts at "l". Increment the lIndex by 1 to get to the content.
  let lIndex = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] == "l") {
      lIndex = i;
      break;
    }
  }


  let finalResult = [];
  let loop = 0
  let remainingContent = input.slice(lIndex + 1)
  let totalMover = 0

  while (remainingContent[0] != "e") {
    loop += 1
    let identifier = remainingContent[0]; //this gets the first character after the "L"
    if (identifier == "i") {
      let [mover, value] = decodeInt(remainingContent);
      finalResult.push(value);
      remainingContent = remainingContent.slice(mover)
      totalMover += mover

    } //***mover part in the list not making sense
    else if (identifier == "l") {
      let [mover, value] = decodeList(remainingContent);
      finalResult.push(value)
      remainingContent = remainingContent.slice(mover)
      totalMover += mover

    } else if (identifier == "d") {
      //decodeDictionary
      //identifier += input[0]
      let [mover, value] = decodeDict(remainingContent)
      finalResult.push(value)
      remainingContent = remainingContent.slice(mover)
      totalMover += mover
    } else {
      let [mover, value] = decodeStr(remainingContent);
      finalResult.push(value);
      remainingContent = remainingContent.slice(mover)
      totalMover += mover
    }

  }
  let finalFinalResult = [totalMover + 2, finalResult]
  return finalFinalResult;
}
//for a list, take in the length of each tuple and increment the index by the length + 2 (since this accounts for the l and e)


function decodeDict(str){
  //slice off the d
  let remainingContent = str.slice(1)
  let finalResult = {}
  //keep track of how many characters we've consumed
  let totalMover = 0

  //while that first character is not "e", run decodeInt/Str/List/Dict
  while (remainingContent[0] != "e"){
    let [keyMover, key] = decodeStr(remainingContent)
    totalMover += keyMover
    remainingContent = remainingContent.slice(keyMover)
    let identifier = remainingContent[0]
    if (identifier == "i"){
      let [valueMover, value] = decodeInt(remainingContent)
      totalMover += valueMover
      finalResult[key] = value
      remainingContent = remainingContent.slice(valueMover)
    }
    else if (identifier == "l"){
      let [valueMover, value] = decodeList(remainingContent)
      totalMover += valueMover
      finalResult[key] = value
      remainingContent = remainingContent.slice(valueMover)
    }
    else if (identifier == "d"){
      let [valueMover, value] = decodeDict(remainingContent)
      totalMover += valueMover
      finalResult[key] = value
      remainingContent = remainingContent.slice(valueMover)
    }else{
      let [valueMover, value] = decodeStr(remainingContent)
      totalMover += valueMover
      finalResult[key] = value
      remainingContent = remainingContent.slice(valueMover)
    }
  }

  let finalFinalResult = [totalMover + 2, finalResult]

  return finalFinalResult
}
module.exports = [decodeInt, decodeStr, decodeList, decodeDict];