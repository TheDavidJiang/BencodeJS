//for integers
//look for the "i" prefix and the "e" suffix
//want to know: what are the characters between i and e
//what it should do: take away the first and last character, convert what's remaining into an int

function decodeInt(str){
    //use slice to remove the first and last characters, store that into a variable
    //identify where the first i and e are
    let iIndex = 0
    let eIndex = 0
    for (let i = 0; i < str.length; i++){
        if (str[i] == "i"){
            iIndex = i
            break
        }
    }
    for (let i = 0; i < str.length; i++){
        if (str[i] == "e"){
            eIndex = i
            break
        }
    }

    let mySlice = parseInt(str.slice(iIndex + 1, eIndex))
    return mySlice
}

function decodeStr(str){
    //return for the value from colon to the colon+length
    let colonIndex = 0
    //run a loop to iterate through the string for the colon
    //if the character before the colon can be converted to an int
        //if the character before THAT can be converted to an int
        //get that number as the length
    //return (slice the string from colonIndex + 1 to colonIndex + length)
    for (let i = 0; i < str.length; i++){
        if (str[i] == ":"){
            colonIndex = i
            break
        }
    }
    let myLength = parseInt(str.slice(0, colonIndex))
    let myContent = str.slice(colonIndex + 1, colonIndex + myLength + 1)

    return myContent
}

function decodeList(str){
    //identify where the "l" and "e" is
        // if the element is an integer or an object, it will have another e, so check to see if there are more Es
        let myFinalResult = []
        let lIndex = 0
        let eIndex = 0
        for (let i = 0; i < str.length; i++){
            if (str[i] == "l"){
                lIndex = i
                break
            }
        }
        for (let i = 0; i < str.length; i++){
            if (str[i] == "e"){
                //if the next letter is also "e", go to that
                eIndex = i
                while (str[i+1] != str.length && str[i+1] == "e"){
                    eIndex += 1
                    i++
                }
                break
            }
        }
        let remainingContent = str.slice(lIndex + 1, eIndex)
        console.log("remaining content: ", remainingContent)
        //iterate through the string to check if the first element is a string or int -> this determines which function we run
            for (let i = 0; i < remainingContent.length; i++){
                console.log("remaining content in the loop: ", remainingContent)
                //if the first character can be converted to an int, then do decodeInt, push that result to the array, and strip away that part from "remainingContent"
                //if the first character cannot be parsed as int, then do decodeString
                if (!isNaN(parseInt(remainingContent[0]))){
                    const strippedString = decodeStr(remainingContent)
                    myFinalResult.push(strippedString)
                    let offset = remainingContent.indexOf(":")
                    remainingContent = remainingContent.slice(strippedString.length + offset + 1 )
                }else if(isNaN(parseInt(remainingContent[0]))){
                    if (remainingContent[0] == "i"){
                        const strippedInt = decodeInt(remainingContent)
                        myFinalResult.push(strippedInt)
                        remainingContent = remainingContent.slice(strippedInt.toString().length + 2)
                    }else if (remainingContent[0] == "l"){
                        const strippedList = decodeList(remainingContent)
                        myFinalResult.push(strippedList)
                        remainingContent = remainingContent.slice(strippedList.length + 2)
                    }// to do: implement the dicitonary part

                    
                    
                }
        }
        console.log("final result: ", myFinalResult)

    return myFinalResult
}

module.exports = [decodeInt, decodeStr, decodeList]