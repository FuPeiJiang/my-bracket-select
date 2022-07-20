let doubleQuoteRegex
const doubleQuoteRegex_by_languageId = {
    "ahk":/^(?:""|[^"])*"/,
    "ahk2":/^(?:`.|.)*?"/,
}
let singleQuoteRegex
const singleQuoteRegex_by_languageId = {
    "ahk2":/^(?:`.|.)*?'/,
}

exports.setRegexByLanguageId = function setRegexByLanguageId(languageId) {
    doubleQuoteRegex = doubleQuoteRegex_by_languageId[languageId] || /^(?:\\.|.)*?"/
    singleQuoteRegex = singleQuoteRegex_by_languageId[languageId] || /^(?:\\.|.)*?'/
}

/**
 * @param {string} str
 */
exports.getRanges = function getRanges(str) {
    let c = 0
    const len = str.length

    let childArr = []
    const stack = []

    while (c < len) {
        switch (str[c]) {
            // strings
            case '"':{
                const startIndex = c
                c++
                const execArray = doubleQuoteRegex.exec(str.slice(c))
                if (!execArray) {
                    continue
                }
                const lastIndex = execArray[0].length + c
                childArr.push([startIndex, lastIndex, []])
                c = lastIndex
                continue
            }
            case '\'':{
                const startIndex = c
                c++
                const execArray = singleQuoteRegex.exec(str.slice(c))
                if (!execArray) {
                    continue
                }
                const lastIndex = execArray[0].length + c
                childArr.push([startIndex, lastIndex, []])
                c = lastIndex
                continue
            }
            case '%':{
                const startIndex = c
                c++
                const execArray = /^.*?%/.exec(str.slice(c))
                if (!execArray) {
                    continue
                }
                const lastIndex = execArray[0].length + c
                childArr.push([startIndex, lastIndex, []])
                c = lastIndex
                continue
            }
            case '|':{
                const startIndex = c
                c++
                const execArray = /^.*?\|/.exec(str.slice(c))
                if (!execArray) {
                    continue
                }
                const lastIndex = execArray[0].length + c
                childArr.push([startIndex, lastIndex, []])
                c = lastIndex
                continue
            }
            // comments
            case '/':
                c++
                switch (str[c]) {
                    case '/':{
                        const lastIndex = /.*$/m.exec(str.slice(c))[0].length + c
                        c = lastIndex
                        continue
                    }
                    case '*':{
                        const lastIndex = /[\s\S]*?\*\//.exec(str.slice(c))[0].length + c
                        c = lastIndex
                        continue
                    }
                    default:{
                        const execArray = /^(?:\\.|.)*?\//.exec(str.slice(c))
                        if (!execArray) {
                            continue
                        }
                        const startIndex = c - 1
                        const lastIndex = execArray[0].length + c
                        childArr.push([startIndex, lastIndex, []])
                        c = lastIndex
                        continue
                    }
                }
            // brackets
            case '(':
            case '[':
            case '{':
                const tempChildArr = []
                const tempArr = [c, null, tempChildArr]
                childArr.push(tempArr)
                stack.push(childArr)
                childArr = tempChildArr
                c++
                continue
            case ')':
            case ']':
            case '}':
                c++
                childArr = stack.pop()
                childArr[childArr.length - 1][1] = c
                continue
            default:
                c++
                continue
        }
    }

    return childArr
}

exports.searchRange = function searchRange(ranges, offset) {
    if (!ranges.length) {
        return false
    }

    let childArr = ranges
    let low = 0
    let high = childArr.length - 1
    let mid = Math.trunc((low + high) / 2)
    let validArr= false

    while (true) {
        if (offset < childArr[mid][0]) {
            //search left
            if (low === high) {
                break
            }
            high = mid
            mid = Math.trunc((low + high) / 2)

        } else if (offset > childArr[mid][0] && offset < childArr[mid][1]) {
            validArr = childArr[mid]
            if (!validArr[2].length) {
                break
            }
            childArr = validArr[2]
            // again
            low = 0
            high = childArr.length - 1
            mid = Math.trunc((low + high) / 2)
        } else if (offset > childArr[mid][1]) {
            //search right
            if (low === high) {
                break
            }
            low = mid + 1
            mid = Math.trunc((low + high) / 2)
        } else {
            break
        }
    }

    return validArr
}