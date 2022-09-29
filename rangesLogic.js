/**
 * @param {string} languageId
 */
exports.getGetRanges = function getGetRanges(languageId) {
    switch (languageId) {
        case "ahk":
            /**
             * @param {string} str
             */
            return function getRanges(str) {
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
                            const execArray = /^(?:""|[^"])*"/.exec(str.slice(c))
                            if (!execArray) {
                                continue
                            }
                            const lastIndex = execArray[0].length + c
                            childArr.push([startIndex, lastIndex, [], startIndex + 1, lastIndex - 1, startIndex, lastIndex])
                            c = lastIndex
                            continue
                        }
                        case '%':{
                            const startIndex = c
                            c++
                            const execArray = /^[_a-zA-Z][_a-zA-Z0-9]*?%/.exec(str.slice(c))
                            if (!execArray) {
                                continue
                            }
                            const lastIndex = execArray[0].length + c
                            childArr.push([startIndex, lastIndex, [], startIndex + 1, lastIndex - 1, startIndex, lastIndex])
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
                                    continue
                                }
                            }
                        case ";":
                            c++
                            if (c === 1 || str[c - 2] === ' ' || str[c - 2] === '\n' || str[c - 2] === '\t') {
                                const lastIndex = /.*$/m.exec(str.slice(c))[0].length + c
                                c = lastIndex
                            }
                            continue
                        // brackets
                        case '(':
                        case '[':
                        case '{':
                            const tempChildArr = []
                            childArr.push([c, null, tempChildArr, c + 1, null, c, null])
                            stack.push(childArr)
                            childArr = tempChildArr
                            c++
                            continue
                        case ')':
                        case ']':
                        case '}':
                            c++
                            if (!stack.length) {
                                console.log(`more ")" than "(": ${c}`)
                                continue
                            }
                            childArr = stack.pop()
                            childArr[childArr.length - 1][1] = c
                            childArr[childArr.length - 1][4] = c - 1
                            childArr[childArr.length - 1][6] = c
                            continue
                        default:
                            c++
                            continue
                    }
                }

                return childArr
            }
        case "ahk2":
            /**
             * @param {string} str
             */
            return function getRanges(str) {
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
                            const execArray = /^(?:`.|.)*?"/.exec(str.slice(c))
                            if (!execArray) {
                                continue
                            }
                            const lastIndex = execArray[0].length + c
                            childArr.push([startIndex, lastIndex, [], startIndex + 1, lastIndex - 1, startIndex, lastIndex])
                            c = lastIndex
                            continue
                        }
                        case '\'':{
                            const startIndex = c
                            c++
                            const execArray = /^(?:`.|.)*?'/.exec(str.slice(c))
                            if (!execArray) {
                                continue
                            }
                            const lastIndex = execArray[0].length + c
                            childArr.push([startIndex, lastIndex, [], startIndex + 1, lastIndex - 1, startIndex, lastIndex])
                            c = lastIndex
                            continue
                        }
                        case '%':{
                            const startIndex = c
                            c++
                            const execArray = /^[_a-zA-Z][_a-zA-Z0-9]*?%/.exec(str.slice(c))
                            if (!execArray) {
                                continue
                            }
                            const lastIndex = execArray[0].length + c
                            childArr.push([startIndex, lastIndex, [], startIndex + 1, lastIndex - 1, startIndex, lastIndex])
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
                                    continue
                                }
                            }
                        case ";":
                            c++
                            if (c === 1 || str[c - 2] === ' ' || str[c - 2] === '\n' || str[c - 2] === '\t') {
                                const lastIndex = /.*$/m.exec(str.slice(c))[0].length + c
                                c = lastIndex
                            }
                            continue
                        // brackets
                        case '(':
                        case '[':
                        case '{':
                            const tempChildArr = []
                            childArr.push([c, null, tempChildArr, c + 1, null, c, null])
                            stack.push(childArr)
                            childArr = tempChildArr
                            c++
                            continue
                        case ')':
                        case ']':
                        case '}':
                            c++
                            if (!stack.length) {
                                console.log(`more ")" than "(": ${c}`)
                                continue
                            }
                            childArr = stack.pop()
                            childArr[childArr.length - 1][1] = c
                            childArr[childArr.length - 1][4] = c - 1
                            childArr[childArr.length - 1][6] = c
                            continue
                        default:
                            c++
                            continue
                    }
                }

                return childArr
            }
        case "zig":
            /**
             * @param {string} str
             */
            return function getRanges(str) {
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
                            const execArray = /^(?:\\.|.)*?"/.exec(str.slice(c))
                            if (!execArray) {
                                continue
                            }
                            const lastIndex = execArray[0].length + c
                            childArr.push([startIndex, lastIndex, [], startIndex + 1, lastIndex - 1, startIndex, lastIndex])
                            c = lastIndex
                            continue
                        }
                        case '\'':{
                            const startIndex = c
                            c++
                            const execArray = /^(?:\\.|.)*?'/.exec(str.slice(c))
                            if (!execArray) {
                                continue
                            }
                            const lastIndex = execArray[0].length + c
                            childArr.push([startIndex, lastIndex, [], startIndex + 1, lastIndex - 1, startIndex, lastIndex])
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
                            childArr.push([startIndex, lastIndex, [], startIndex + 1, lastIndex - 1, startIndex, lastIndex])
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
                                default:{
                                    continue
                                }
                            }
                            // brackets
                        case '(':
                        case '[':
                        case '{':
                            const tempChildArr = []
                            childArr.push([c, null, tempChildArr, c + 1, null, c, null])
                            stack.push(childArr)
                            childArr = tempChildArr
                            c++
                            continue
                        case ')':
                        case ']':
                        case '}':
                            c++
                            if (!stack.length) {
                                console.log(`more ")" than "(": ${c}`)
                                continue
                            }
                            childArr = stack.pop()
                            childArr[childArr.length - 1][1] = c
                            childArr[childArr.length - 1][4] = c - 1
                            childArr[childArr.length - 1][6] = c
                            continue
                        default:
                            c++
                            continue
                    }
                }

                return childArr
            }
        default: //default is "js":
            /**
             * @param {string} str
             */
            return function getRanges(str) {
                let c = 0
                const len = str.length

                let childArr = []
                const stack = []

                let mode = 0 //0: "normal", 1: "inside template literal", 2: "inside ${}"
                outer:
                while (true) {
                    switch (mode) {
                        case 0:
                        case 2:
                            while (c < len) {
                                switch (str[c]) {
                                    // strings
                                    case '"':{
                                        const startIndex = c
                                        c++
                                        const execArray = /^(?:\\.|.)*?"/.exec(str.slice(c))
                                        if (!execArray) {
                                            continue
                                        }
                                        const lastIndex = execArray[0].length + c
                                        childArr.push([startIndex, lastIndex, [], startIndex + 1, lastIndex - 1, startIndex, lastIndex])
                                        c = lastIndex
                                        continue
                                    }
                                    case '\'':{
                                        const startIndex = c
                                        c++
                                        const execArray = /^(?:\\.|.)*?'/.exec(str.slice(c))
                                        if (!execArray) {
                                            continue
                                        }
                                        const lastIndex = execArray[0].length + c
                                        childArr.push([startIndex, lastIndex, [], startIndex + 1, lastIndex - 1, startIndex, lastIndex])
                                        c = lastIndex
                                        continue
                                    }
                                    case '`':{
                                        const tempChildArr = []
                                        const tempArr = [c, null, tempChildArr, c + 1, null, c, null, mode]
                                        childArr.push(tempArr)
                                        stack.push(childArr)
                                        childArr = tempChildArr
                                        c++

                                        mode = 1
                                        continue outer
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
                                                //regex
                                                const execArray = /^(?:\\.|.)*?\//.exec(str.slice(c))
                                                if (!execArray) {
                                                    continue
                                                }
                                                const startIndex = c - 1
                                                const lastIndex = execArray[0].length + c
                                                childArr.push([startIndex, lastIndex, [], startIndex + 1, lastIndex - 1, startIndex, lastIndex])
                                                c = lastIndex
                                                continue
                                            }
                                        }
                                    // brackets
                                    case '(':
                                    case '[':
                                        const tempChildArr = []
                                        const tempArr = [c, null, tempChildArr, c + 1, null, c, null]
                                        childArr.push(tempArr)
                                        stack.push(childArr)
                                        childArr = tempChildArr
                                        c++
                                        continue
                                    case '{':{
                                        const tempChildArr = []
                                        const tempArr = [c, null, tempChildArr, c + 1, null, c, null, 0] //tempArr[7] is mode
                                        childArr.push(tempArr)
                                        stack.push(childArr)
                                        childArr = tempChildArr
                                        c++
                                        continue
                                    }
                                    case ')':
                                    case ']':
                                        c++
                                        if (!stack.length) {
                                            console.log(`more ")" than "(": ${c}`)
                                            continue
                                        }
                                        childArr = stack.pop()
                                        childArr[childArr.length - 1][1] = c
                                        childArr[childArr.length - 1][4] = c - 1
                                        childArr[childArr.length - 1][6] = c
                                        continue
                                    case '}':
                                        c++
                                        if (!stack.length) {
                                            console.log(`more ")" than "(": ${c}`)
                                            continue
                                        }
                                        childArr = stack.pop()
                                        childArr[childArr.length - 1][1] = c
                                        childArr[childArr.length - 1][4] = c - 1
                                        childArr[childArr.length - 1][6] = c
                                        if (childArr[childArr.length - 1][7] !== mode) {
                                            mode = childArr[childArr.length - 1][7]
                                            if (mode===1) {
                                                if (!stack.length) {
                                                    console.log(`more ")" than "(": ${c}`)
                                                    continue outer
                                                }
                                                childArr = stack.pop()
                                                childArr[childArr.length - 1][1] = c
                                                childArr[childArr.length - 1][4] = c
                                                childArr[childArr.length - 1][6] = c
                                            }
                                            continue outer
                                        }
                                        continue
                                    default:
                                        c++
                                        continue
                                }
                            }
                            break
                        case 1:
                            while (c < len) {
                                switch (str[c]) {
                                    case '$':
                                        if (c + 1 < len && str[c + 1] === "{") {
                                            const tempChildArr = []
                                            const tempArr = [c, null, tempChildArr, c, null, c, null, true] //tempArr[7] is mode
                                            childArr.push(tempArr)
                                            stack.push(childArr)
                                            childArr = tempChildArr
                                            {
                                                c++
                                                const tempChildArr = []
                                                const tempArr = [c, null, tempChildArr, c + 1, null, c - 1, null, 1] //tempArr[7] is mode
                                                childArr.push(tempArr)
                                                stack.push(childArr)
                                                childArr = tempChildArr
                                            }
                                            c++
                                            mode = 0
                                            continue outer
                                        }
                                    case '`':
                                        c++
                                        if (!stack.length) {
                                            console.log(`more ")" than "(": ${c}`)
                                            continue
                                        }
                                        childArr = stack.pop()
                                        childArr[childArr.length - 1][1] = c
                                        childArr[childArr.length - 1][4] = c - 1
                                        childArr[childArr.length - 1][6] = c
                                        mode = childArr[childArr.length - 1][7]

                                        continue outer
                                    case '\\':
                                        c+=2
                                        continue
                                    default:
                                        c++
                                        continue
                                    }
                                }
                            break
                    }
                    break
                }



                return childArr
            }
    }



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