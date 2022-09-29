const {getGetRanges, searchRange} = require('./rangesLogic')
const fs = require('fs')

const util = require('util')

function print(a_) {
    console.log(util.inspect(a_, {showHidden: false, depth: null, colors: true}))
}

const getRanges = getGetRanges('')

// console.log(getRanges(" 'hello' "))
// console.log(getRanges(' "hello" '))
// print(getRanges('`abc`'))
// print(getRanges('`aa${123}bb`'))
// print(getRanges('{console.log(123)}'))
print(getRanges('`aa${"c" + `c${9*9}d` + "d"}bb`'))
// console.log(getRanges(fs.readFileSync('./test data/1').toString()))
// const ranges = getRanges(fs.readFileSync('./test data/2').toString())
// console.log(util.inspect(ranges, {showHidden: false, depth: null, colors: true}))
// console.log(util.inspect(ranges, {showHidden: false, depth: 7, colors: true}))
// console.log(ranges)
// console.log(searchRange(ranges, 650).slice(0,2))
// console.log(searchRange(ranges, 312).slice(0,2))
// console.log(searchRange(ranges, 1400).slice(0,2))
// console.log(searchRange(ranges, 51).slice(0,2))
// console.log(searchRange(ranges, 206).slice(0,2))

// const ranges = getRanges(fs.readFileSync('./test data/3').toString())
// console.log(util.inspect(ranges, {showHidden: false, depth: null, colors: true}))
