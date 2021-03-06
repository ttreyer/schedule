const { JSDOM } = require("jsdom")

const classToType = {
  "local-color": "course",
  "local-color-light": "exercise",
  "local-color-dark": "project",
}
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

// Scrapping course
let sleep = async (ms) => await new Promise((r) => setTimeout(r, ms))
let getSelectMatch = (doc, sel, regex) =>
  doc.querySelector(sel).textContent.match(regex)[1]
let getShort = (doc) =>
  getSelectMatch(doc, ".course-summary", /([-0-9A-Za-z]+)\s+\//)
let getName = (doc) => getSelectMatch(doc, "main h1", /(.+)/)
let getCredits = (doc) =>
  parseInt(getSelectMatch(doc, ".course-summary", /(\d+)\s+credits/))
let getTeacher = (doc) =>
  getSelectMatch(doc, ".course-summary", /Teacher:\s+([^\n]+)/)
let getLanguage = (doc) =>
  getSelectMatch(doc, ".course-summary", /Language:\s+([^\n]+)/)
let getSummary = (doc) => getSelectMatch(doc, "h2~p", /(.+)/)
let getContent = (doc) =>
  Array.from(doc.querySelectorAll("#course-content p"))
    .map((_) => _.textContent)
    .join("\n")
    .trim()

// Scrapping sessions
let getSessions = (doc) => doc.querySelectorAll("td.taken")
let getRooms = (session) =>
  Array.from(session.querySelectorAll("a")).map((room) => room.textContent)
let getStart = (session) =>
  parseInt(session.parentNode.firstChild.textContent.split("-")[0])
let getEnd = (session, start) =>
  start + parseInt(session.getAttribute("rowspan"))
let getType = (session) => classToType[session.classList[1]]
let getDay = (session) => {
  let day = 0
  while ((session = session.previousSibling)) day++
  return weekdays[day - 1]
}

let coursesScraped = new Set()

/* The schedule requires:
 *   name: The name of the course
 *   type: Whether it's a course, exercice, project or work
 *   rooms: An array containing the name of all rooms
 *   day: The day the course occurs
 *   start,end: The hours the course starts/ends
 *
 * We also store in the DB:
 *   code: The short name for the course (CS-728) as a unique ID
 */
let scrapeCourse = async (url) => {
  await sleep(20)
  console.error(`course: ${url}`)
  const jsdom = await JSDOM.fromURL(url)
  const doc = jsdom.window.document

  const course = {
    short: getShort(doc),
    name: getName(doc),
    credits: getCredits(doc),
    teacher: getTeacher(doc),
    language: getLanguage(doc),
    summary: getSummary(doc),
    content: getContent(doc),
  }

  course.sessions = Array.from(getSessions(doc)).map((session) => {
    const rooms = getRooms(session)
    const start = getStart(session)
    const end = getEnd(session, start)
    const type = getType(session)
    const day = getDay(session)

    return { name, short, rooms, day, start, end, type, members: [] }
  })

  return course
}

let filterSeason = (course) => course.querySelector(".winter") !== null
let filterScraped = (course) =>
  !coursesScraped.has(course.querySelector(".cours-code").textContent.trim())
let mapUniqueHref = (courses) =>
  Array.from(
    new Set(courses.map((_) => (_.querySelector(".cours-name a") || {}).href))
  ).filter((_) => _)

let scrapePlan = async (url) => {
  console.error(`plan: ${url}`)
  const jsdom = await JSDOM.fromURL(url)
  const doc = jsdom.window.document

  const courses = Array.from(doc.querySelectorAll(".line"))
    .filter(filterSeason)
    .filter(filterScraped)
  const coursesUrls = mapUniqueHref(courses)

  // console.log(url)
  // console.log(coursesUrls)

  // return Promise.all(
  //   coursesUrls.map((url) => {
  //     if (url.includes("/coursebook/")) return scrapeCourse(url)
  //     else return scrapePlan(url)
  //   })
  // )
  // return coursesUrls.map(async (url) => {
  //   if (url.includes("/coursebook/")) return await scrapeCourse(url)
  //   else return await scrapePlan(url)
  // })
  let res = []
  for (let i = 0, l = coursesUrls.length; i < l; ++i) {
    const url = coursesUrls[i]
    if (url.includes("/coursebook/")) res.push(await scrapeCourse(url))
    else res.push(await scrapePlan(url))
  }
  return res
}

// ;(async () => {
//   const studyplanURL = "https://edu.epfl.ch/studyplan/en"
//   const studyplan = await JSDOM.fromURL(studyplanURL)
//   const planURLs = Array.from(
//     studyplan.window.document.querySelectorAll(".study_plan_list a")
//   ).map((_) => _.href)
//   let scrapes = []
//   for (let i = 0, l = planURLs.length; i < l; ++i) {
//     const planURL = planURLs[i]
//     scrapes.push(await scrapePlan(planURL))
//   }

//   let uniqKey = (c) => `${c.short}:${c.day}:${c.start}:${c.end}`

//   let uniqScrapes = {}
//   scrapes.flat(999).forEach((c) => (uniqScrapes[uniqKey(c)] = c))
//   console.log(JSON.stringify(Object.values(uniqScrapes), null, 2))
//   // const scrape = planURLs.map(async (planURL) => await scrapePlan(planURL))
// })()

// JSDOM.fromURL(studyplanURL)
//   .then((_) =>
//     Array.from(_.window.document.querySelectorAll(".study_plan_list a")).map(
//       (_) => _.href
//     )
//   )
//   .then(async (_) => _.map(url => await scrapePlan(url)))
//   .then((_) => _.flat(999))
//   .then(console.log)

// let masterIN = "https://edu.epfl.ch/studyplan/fr/master/informatique"
// scrapePlan(masterIN)
//   .then((_) => _.flat(999))
//   .then((_) => JSON.stringify(_, null, 2))
//   .then(console.log)

;(async () => {
  let course = await scrapeCourse(
    "https://edu.epfl.ch/studyplan/en/master/computer-science/coursebook/mobile-networks-COM-405"
  )
  console.log(course)
})()
