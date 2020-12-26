/**
 * @template T
 * @param {T[]} xs
 * @param {string} key
 * @return {Object.<string, T[]>}
 */
let groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

/**
 * @param {number} from
 * @param {number} to
 */
let range = (from, to) => {
  let xs = [],
    i = to - from
  while (i--) xs[i] = --to
  return xs
}

/**
 * @typedef {Object} Class
 * @property {number} start
 * @property {number} end
 */

/**
 * @param {Class[]} column
 * @return {number}
 */
let columnMask = (column) =>
  column
    .flatMap((course) => range(course.start, course.end))
    .reduce((acc, b) => acc | (1 << b), 0)

/**
 * @param {Class[][]} columns
 * @return {Class[][]}
 */
let mergeColumns = (columns) => {
  if (columns.length <= 1) return columns

  let rejected = []
  let [col, ...cs] = columns
  while (cs.length > 0) {
    let c = cs.shift()
    let cm = columnMask(c)
    let colMask = columnMask(col)
    if ((cm & colMask) == 0) col = col.concat(c)
    else rejected.push(c)
  }

  return [col].concat(mergeColumns(rejected))
}

/**
 * @template T
 * @param {T[]} xs
 */
let rots = (xs) => {
  let ret = []

  for (let i = 0; i < xs.length; i++) {
    ret.push(Array.from(xs))
    xs.push(xs.shift())
  }

  return ret
}

/**
 * @param {Class[][]} columns
 */
let minMergeColumns = (columns) => {
  let min = columns
  for (r of rots(columns)) {
    let merged = mergeColumns(r)
    if (merged.length < min.length) min = merged
  }
  return min
}

/**
 * @typedef {Object} Day
 * @property {Class[]} courses
 * @property {number} conflicts
 */

/**
 * @param {Day} day
 */
let minMergeDay = (day) => {
  let courses = day.courses
  let columns = Object.values(groupBy(courses, "short"))
  let min = minMergeColumns(columns)

  min.forEach((col, i) => col.forEach((_) => (_.col = i)))
  day.conflicts = min.length
  day.courses = min.flat(2)

  return day
}
