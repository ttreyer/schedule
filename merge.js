let data = [
    { "name": "Monday", "courses": [
        { "name": "Concurrent algorithms", "type": "course", "rooms": ["INM202"], "start": 8, "end": 10, "members": ["Romain" ] },
        { "name": "Decentralized systems engineering", "type": "course", "rooms": ["INR113"], "start": 10, "end": 12, "members": ["Romain" ] },
        { "name": "Digital 3D geometry processing", "type": "course", "rooms": ["INF119"], "start": 14, "end": 16, "members": ["Tim"] },
        { "name": "Digital communication: a hands-on approach", "type": "course", "rooms": ["INF119"], "start": 10, "end": 12, "members": ["Alvaro"] },
        { "name": "ICC Java", "type": "work", "rooms": ["CO021"], "start": 13, "end": 16, "members": ["Lucie"] },
        { "name": "Distributed algorithms", "type": "course", "rooms": ["CM1"], "start": 15, "end": 17, "members": ["Kim", "Tim"] },
        { "name": "Distributed algorithms", "type": "exercise", "rooms": ["BC01", "BC02", "BC03"], "start": 17, "end": 18, "members": ["Kim", "Tim"] },
    ] },

    { "name": "Tuesday", "courses": [
        { "name": "Distributed algorithms", "type": "course", "rooms": ["CM1"], "start": 8, "end": 10, "members": ["Kim", "Tim", "Mike"] },
        { "name": "Distributed algorithms", "type": "exercise", "rooms": ["BC01", "BC02", "BC03"], "start": 10, "end": 11, "members": ["Kim", "Tim", "Mike"] },
        { "name": "Principle of computer systems", "type": "course", "rooms": ["INM10"], "start": 12, "end": 14, "members": ["Thierry", "Romain", "Jon"] },
        { "name": "Topics in language-based software security", "type": "course", "rooms": ["BC02"], "start": 15, "end": 17, "members": ["Thierry", "Romain", "Jon"] },
        { "name": "Machine learning", "type": "course", "rooms": ["CO1"], "start": 17, "end": 19, "members": ["Kim", "Jon"] },
        { "name": "Digital education & learning analytics", "type": "course", "rooms": ["INR113"], "start": 8, "end": 10, "members": ["Alvaro", "Tim", "Lucie"] },
        { "name": "Digital education & learning analytics", "type": "project", "rooms": ["INR113"], "start": 10, "end": 12, "members": ["Alvaro", "Tim", "Lucie"] },
        { "name": "Concurrent algorithms", "type": "course", "rooms": ["INM202"], "start": 13, "end": 14, "members": ["Romain" ] },
        { "name": "Concurrent algorithms", "type": "project", "rooms": ["CM4", "SG0211"], "start": 14, "end": 17, "members": ["Romain" ] },
        { "name": "Audio and acoustic signal processing", "type": "course", "rooms": ["INM10"], "start": 10, "end": 12, "members": ["Lucie"] },
        { "name": "Audio and acoustic signal processing", "type": "exercise", "rooms": ["INR113"], "start": 12, "end": 14, "members": ["Lucie"] },
        { "name": "Foundation of software", "type": "course", "rooms": ["INM10"], "start": 14, "end": 16, "members": ["Romain" ] },
        { "name": "Foundations and tools for processing tree structured data", "type": "course", "rooms": ["INM11"], "start": 13, "end": 15, "members": ["Kim", "Mike"] },
        { "name": "Foundations and tools for processing tree structured data", "type": "exercise", "rooms": ["INM11"], "start": 15, "end": 17, "members": ["Kim", "Mike"] },
        { "name": "Lab in EDA based design", "type": "project", "rooms": ["BC07-08"], "start": 14, "end": 17, "members": ["Jon"] },
    ] },

    { "name": "Wednesday", "courses": [
        { "name": "Introduction to natural langage processing", "type": "course", "rooms": ["INM202"], "start": 8, "end": 10, "members": ["Lucie", "Jon"] },
        { "name": "Introduction to natural langage processing", "type": "exercise", "rooms": ["CO020"], "start": 10, "end": 12, "members": ["Lucie", "Jon"] },
        { "name": "Intelligent agents", "type": "course", "rooms": ["CM4"], "start": 13, "end": 16, "members": ["Rehan"] },
        { "name": "Audio and acoustic signal processing", "type": "course", "rooms": ["INM10"], "start": 9, "end": 10, "members": ["Lucie"] },
        { "name": "Foundation of software", "type": "exercise", "rooms": ["CO020"], "start": 10, "end": 12, "members": ["Romain"] },
        { "name": "Cryptography and security", "type": "course", "rooms": ["CM5"], "start": 9, "end": 11, "members": ["Alvaro", "Jon"] },
        { "name": "Digital communication: a hands-on approach", "type": "project", "rooms": ["INF119"], "start": 11, "end": 13, "members": ["Alvaro"] },
        { "name": "Audio", "type": "course", "rooms": ["ELA2"], "start": 9, "end": 12, "members": ["Lucie"] },
    ] },

    { "name": "Thursday", "courses": [
        { "name": "Image processing I", "type": "course", "rooms": ["CM1"], "start": 10, "end": 12, "members": ["Thierry", "Lucie", "Mike", "Jon"] },
        { "name": "Image processing I", "type": "exercise", "rooms": ["CM1"], "start": 12, "end": 13, "members": ["Thierry", "Lucie", "Mike", "Jon"] },
        { "name": "Principle of computer systems", "type": "course", "rooms": ["INM10"], "start": 13, "end": 15, "members": ["Thierry", "Romain", "Jon"] },
        { "name": "Quantum information processing", "type": "work", "rooms": ["BC04"], "start": 15, "end": 17, "members": ["Lucie"] },
        { "name": "TCP/IP networking", "type": "course", "rooms": ["CM2"], "start": 12, "end": 14, "members": ["Alvaro", "Tim", "Rehan", "Mike", "Jon"] },
        { "name": "Machine learning", "type": "exercise", "rooms": ["INF119", "INJ218", "INM11", "INM20"], "start": 14, "end": 16, "members": ["Kim", "Jon"] },
        { "name": "Machine learning", "type": "course", "rooms": ["CO1"], "start": 16, "end": 18, "members": ["Kim", "Jon"] },
        { "name": "Applied data analysis", "type": "course", "rooms": ["SG1"], "start": 8, "end": 10, "members": ["Alvaro", "Tim", "Rehan", "Mike"] },
        { "name": "Cryptography and security", "type": "course", "rooms": ["CM3"], "start": 10, "end": 12, "members": ["Alvaro", "Jon"] },
        { "name": "Intelligent agents", "type": "exercise", "rooms": ["INM200", "INM203"], "start": 13, "end": 16, "members": ["Rehan"] },
        { "name": "Markov chains and algorithmic applications", "type": "course", "rooms": ["INM202"], "start": 12, "end": 14, "members": ["Rehan", "Lucie"] },
        { "name": "Fundamentals of VLSI design", "type": "course", "rooms": ["ELD020, ELG116"], "start": 16, "end": 18, "members": ["Jon"] },
        { "name": "Hardware systems modeling I", "type": "course", "rooms": ["DIA003, ELD020"], "start": 14, "end": 16, "members": ["Jon"] },
        { "name": "Automatic speech processing", "type": "course", "rooms": ["INF1"], "start": 13, "end": 16, "members": ["Lucie"] },
    ] },

    { "name": "Friday", "courses": [
        { "name": "Cryptography and security", "type": "exercise", "rooms": ["CM1"], "start": 9, "end": 11, "members": ["Alvaro", "Jon"] },
        { "name": "TCP/IP networking", "type": "exercise", "rooms": ["INF1", "INF2"], "start": 11, "end": 13, "members": ["Alvaro", "Rehan", "Mike", "Jon"] },
        { "name": "Decentralized systems engineering", "type": "exercise", "rooms": ["INF213"], "start": 13, "end": 15, "members": ["Thierry", "Romain" ] },
        { "name": "Decentralized systems engineering", "type": "project", "rooms": ["INF213"], "start": 15, "end": 17, "members": ["Thierry", "Romain" ] },
        { "name": "Digital 3D geometry processing", "type": "exercise", "rooms": ["CM013"], "start": 10, "end": 12, "members": ["Tim"] },
        { "name": "Applied data analysis", "type": "project", "rooms": ["BCH2201"], "start": 13, "end": 15, "members": ["Alvaro", "Tim", "Rehan", "Mike"] },
        { "name": "ICC MX", "type": "work", "rooms": ["CM4"], "start": 10, "end": 11, "members": ["Lucie"] },
        { "name": "ICC MT+EL", "type": "work", "rooms": [], "start": 14, "end": 16, "members": ["Tim", "Kim","Lucie"] },
        { "name": "Fundamentals of VLSI design", "type": "course", "rooms": ["ELD020, ELD120"], "start": 12, "end": 13, "members": ["Jon"] },
        { "name": "Fundamentals of VLSI design", "type": "exercise", "rooms": ["ELD020, ELD120"], "start": 13, "end": 14, "members": ["Jon"] },
        { "name": "Markov chains and algorithmic applications", "type": "course", "rooms": ["INM202"], "start": 15, "end": 17, "members": ["Rehan", "Lucie"] },
        { "name": "Embedded Systems", "type": "work", "rooms": ["INF3"], "start": 10, "end": 12, "members": ["Jon"] },
        { "name": "Experience Design", "type": "course", "rooms": ["DIA005"], "start": 13, "end": 15, "members": ["Alvaro", "Kim"] },
        { "name": "Experience Design", "type": "project", "rooms": ["DIA005"], "start": 15, "end": 18, "members": ["Alvaro", "Kim"] },
    ] }
]

let groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

let range = (from, to) => {
    let xs = [], i = to - from
    while (i--) xs[i] = --to
    return xs
}

let columnMask = (column) =>
    column.flatMap((course) => range(course.start, course.end))
          .reduce((acc, b) => acc | 1 << b, 0)

let mergeColumns = (columns) => {
    if (columns.length <= 1) return columns

    let rejected = []
    let [col, ...cs] = columns
    while (cs.length > 0) {
        let c = cs.shift()
        let cm = columnMask(c)
        let colMask = columnMask(col);
        if ((cm & colMask) == 0) col = col.concat(c)
        else rejected.push(c)
    }

    return [col].concat(mergeColumns(rejected))
}

let rot = (xs) => {
    let ret = [];

    for (let i = 0; i < xs.length; i++) {
        ret.push(Array.from(xs));
        xs.push(xs.shift());
    }

    return ret;
}

for (day of data) {
    let courses = day.courses
    let columns = Object.values(groupBy(courses, 'name'))

    let min = columns
    let rots = rot(columns)
    for (p of rots) {
        let merged = mergeColumns(p)
        if (merged.length < min.length) min = merged
    }

    min.forEach((col, i) => col.forEach(_ => _.col = i))
    day.conflicts = min.length
    day.courses = min.flat().flat()
}

console.log(JSON.stringify(data))