const fs = require("fs")

const plan = JSON.parse(fs.readFileSync("plan.json"))

let groupBy = (xs, kf) => {
  let ys = {}
  xs.forEach((x) => {
    let k = kf(x)
    ys[k] = ys[k] || []
    ys[k].push(x)
  })
  return ys
}

let groupByKey = (xs, key) => groupBy(xs, (x) => x[key])

let courses = groupByKey(plan, "short")

Object.keys(courses).forEach((short) => {
  const classes = courses[short]
  const classesByStart = groupBy(classes, (c) => `${c.day}:${c.start}`)

  if (Object.values(classesByStart).find((cs) => cs.length > 1)) {
    console.error(`Duplicates with ${short}`)
    console.error(classesByStart)
  }
})
