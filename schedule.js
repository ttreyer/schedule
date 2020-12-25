function buildSchedule(data, chart, peopleElement) {
  const hourSeparators = [8, 10, 12, 13, 15, 17]
  const startHour = 8,
    endHour = 18
  const slotRowsCount = endHour - startHour,
    slotColumnsCount = data.reduce(
      (acc, day) => acc + Math.max(1, day.conflicts) + 1,
      0
    )

  let people = data.reduce((acc, day) => {
    day.courses.forEach((course) =>
      course.members.forEach((member) => acc.add(member))
    )
    return acc
  }, new Set())

  if (peopleElement) {
    people.forEach((people) => {
      let pictureElement = document.createElement("img")

      pictureElement.dataset.name = people
      pictureElement.alt = people
      pictureElement.width = pictureElement.height = 69
      pictureElement.src = "people/" + people + ".jpg"
      pictureElement.classList = "people"

      pictureElement.addEventListener(
        "mouseenter",
        () => {
          document.querySelectorAll(".people img").forEach((person) => {
            if (person.dataset.name === people)
              person.classList.remove("hidden")
            else person.classList.add("hidden")
          })

          document.querySelectorAll(".slot").forEach((slot) => {
            let members = slot.dataset.members.split(",")
            if (members.indexOf(people) !== -1) slot.classList.remove("hidden")
            else slot.classList.add("hidden")
          })
        },
        false
      )

      pictureElement.addEventListener(
        "mouseleave",
        () => {
          document
            .querySelectorAll(".people img")
            .forEach((person) => person.classList.remove("hidden"))
          document
            .querySelectorAll(".slot")
            .forEach((slot) => slot.classList.remove("hidden"))
        },
        false
      )

      peopleElement.appendChild(pictureElement)
    })

    let posX = 0,
      ticking = false
    window.addEventListener("scroll", function (e) {
      posX = window.scrollX
      if (!ticking) {
        window.requestAnimationFrame(function () {
          peopleElement.style["margin-left"] = posX + "px"
          ticking = false
        })
      }
      ticking = true
    })
  }

  let today = new Date().getDay() - 1
  data.forEach((day, i) => (day.visible = i == today))

  let chartTemplateColumns = () =>
    data.reduce((acc, day) => acc + " 2px " + dayTemplateColumns(day), "25px")
  let dayTemplateColumns = (day) =>
    day.conflicts
      ? `repeat(${day.conflicts}, ${day.visible ? "105px" : "30px"})`
      : "105px"
  let reloadTemplates = () => {
    chart.style["grid-template-columns"] = chartTemplateColumns()
    document.querySelectorAll(".day").forEach((dayElement, i) => {
      dayElement.style["grid-template-columns"] = dayTemplateColumns(data[i])
      if (data[i].visible) dayElement.classList.remove("hidden")
      else dayElement.classList.add("hidden")
    })
  }

  chart.style["grid-template-columns"] = chartTemplateColumns()
  chart.style["grid-template-rows"] = "20px repeat(" + slotRowsCount + ", 45px)"

  for (let h = startHour; h <= endHour; h++) {
    let hourElement = document.createElement("div")

    hourElement.classList = "hour"
    if (hourSeparators.indexOf(h) !== -1) hourElement.classList.add("separator")
    hourElement.style["grid-row-start"] = h - startHour + 2
    hourElement.style["grid-column-start"] = 1
    hourElement.style["grid-column-end"] = slotColumnsCount + 2

    let header = document.createElement("div")

    header.classList = "header"
    header.innerText = h + ":00"

    hourElement.appendChild(header)

    chart.appendChild(hourElement)
  }

  let currentHour = new Date().getHours()
  let currentMinute = new Date().getMinutes()

  const isHourDisplayed = startHour <= currentHour && currentHour <= endHour
  const isDayDisplayed = 0 <= today && today < 5

  let currentHourElement = null
  if (isHourDisplayed && isDayDisplayed) {
    let dayColumnStart = data
      .filter((day, i) => i < today)
      .reduce((acc, day) => acc + day.conflicts + 1, 2)
    let dayColumnEnd = dayColumnStart + data[today].conflicts + 1
    currentHourElement = document.createElement("div")

    currentHourElement.classList = "hour separator now"
    currentHourElement.style["grid-row-start"] = currentHour - startHour + 2
    currentHourElement.style["grid-column-start"] = dayColumnStart
    currentHourElement.style["grid-column-end"] = dayColumnEnd
    currentHourElement.style["margin-top"] = (45 * currentMinute) / 60 + "px"

    chart.appendChild(currentHourElement)
  }

  let column = 2
  data.forEach((day, dayIndex) => {
    let separator = document.createElement("div")

    separator.classList = "separator"
    separator.style["grid-row-start"] = 1
    separator.style["grid-row-end"] = 3 + slotRowsCount
    separator.style["grid-column-start"] = column++

    chart.appendChild(separator)

    let dayElement = document.createElement("div")

    dayElement.classList = "day"
    if (!day.visible) dayElement.classList.add("hidden")
    dayElement.style["grid-row-start"] = 1
    dayElement.style["grid-row-end"] = 3 + slotRowsCount
    dayElement.style["grid-column-start"] = column
    dayElement.style["grid-column-end"] = column + day.conflicts
    dayElement.style["grid-template-columns"] = dayTemplateColumns(day)
    dayElement.style["grid-template-rows"] =
      "20px repeat(" + (slotRowsCount + 1) + ", 45px)"

    let header = document.createElement("div")

    header.innerText = day.name
    header.classList = "header"
    header.style["grid-column-start"] = 1
    header.style["grid-column-end"] = 1 + day.conflicts

    dayElement.appendChild(header)

    day.courses.forEach((course) => {
      let courseElement = document.createElement("div")
      let courseRooms =
        "<div>" +
        course.rooms
          .map(
            (room) =>
              '<a href="https://plan.epfl.ch?room=' +
              room +
              '" target="_blank">' +
              room +
              "</a>"
          )
          .join(", ") +
        "</div>"

      courseElement.innerHTML =
        "<div>" + course.name + "<br/>" + courseRooms + "</div>"
      courseElement.dataset.name = course.name
      courseElement.dataset.members = course.members.join(",")
      courseElement.classList = "slot " + course.type
      courseElement.style["grid-row-start"] = course.start - startHour + 2
      courseElement.style["grid-row-end"] = course.end - startHour + 2

      if (course.col === -1) {
        courseElement.style["grid-column-start"] = 1
        courseElement.style["grid-column-end"] = 1 + day.conflicts
      } else {
        courseElement.style["grid-column-start"] = 1 + course.col
      }

      courseElement.addEventListener(
        "mouseenter",
        (e) => {
          if (!day.visible) return

          document.querySelectorAll(".slot").forEach((slot) => {
            if (slot.dataset.name === course.name)
              slot.classList.remove("hidden")
            else slot.classList.add("hidden")
          })

          document.querySelectorAll(".people img").forEach((people) => {
            if (course.members.indexOf(people.dataset.name) !== -1)
              people.classList.remove("hidden")
            else people.classList.add("hidden")
          })

          e.preventDefault()
        },
        false
      )

      courseElement.addEventListener(
        "mouseleave",
        (e) => {
          if (!day.visible) return

          document
            .querySelectorAll(".slot")
            .forEach((slot) => slot.classList.remove("hidden"))

          document
            .querySelectorAll(".people img")
            .forEach((people) => people.classList.remove("hidden"))

          e.preventDefault()
        },
        false
      )

      dayElement.appendChild(courseElement)
    })

    dayElement.addEventListener("mousedown", (e) => e.preventDefault(), false)
    dayElement.addEventListener(
      "dblclick",
      (e) => {
        day.visible = !day.visible

        if (dayIndex === today && currentHourElement)
          if (day.visible) currentHourElement.classList.remove("hidden")
          else currentHourElement.classList.add("hidden")

        reloadTemplates()
      },
      false
    )
    header.addEventListener(
      "touchend",
      (e) => {
        day.visible = !day.visible

        if (dayIndex === today && currentHourElement)
          if (day.visible) currentHourElement.classList.remove("hidden")
          else currentHourElement.classList.add("hidden")

        reloadTemplates()

        e.preventDefault()
      },
      false
    )

    chart.appendChild(dayElement)

    column += Math.max(1, day.conflicts)
  })
}
