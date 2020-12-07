const fs = require("fs")

const plan = JSON.parse(fs.readFileSync("plan.json"))
const uniqPlan = {}

let key = (c) => `${c.short}:${c.day}:${c.start}:${c.end}`

plan.forEach((c) => (uniqPlan[key(c)] = c))

console.log(JSON.stringify(Object.values(uniqPlan), null, 2))
