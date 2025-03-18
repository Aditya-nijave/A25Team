export default class Leaderboard {
  constructor() {
    this.leaderboardData = this.getLeaderboardData()
    this.leaderboardElement = document.querySelector(".leaderboard")
    this.leaderboardLink = document.querySelector(".nav__link_leaderboard")
    this.closeButton = null
    this.currentUser = localStorage.getItem("currentUser")

    this.setEventListeners()
  }

  setEventListeners() {
    this.leaderboardLink.addEventListener("click", () => {
      this.showLeaderboard()
    })
  }

  getLeaderboardData() {
    const data = localStorage.getItem("typingTestLeaderboard")
    return data ? JSON.parse(data) : []
  }

  saveLeaderboardData() {
    localStorage.setItem("typingTestLeaderboard", JSON.stringify(this.leaderboardData))
  }

  addEntry(wpm, accuracy, time) {
    const entryIndex = this.leaderboardData.findIndex(
      (entry) => entry.username === this.currentUser
    )

    if (entryIndex !== -1) {
      // Update existing user's score
      const existingEntry = this.leaderboardData[entryIndex]

      // ✅ Update average WPM & Accuracy
      const totalGames = existingEntry.gamesPlayed || 1
      existingEntry.wpm =
        Math.round(((existingEntry.wpm * totalGames + wpm) / (totalGames + 1)) * 100) / 100
      existingEntry.accuracy =
        Math.round(((existingEntry.accuracy * totalGames + accuracy) / (totalGames + 1)) * 100) / 100

      existingEntry.time = time
      existingEntry.date = new Date().toLocaleString()
      existingEntry.gamesPlayed = totalGames + 1
    } else {
      // Add new entry if user not found
      const entry = {
        username: this.currentUser,
        wpm,
        accuracy,
        time,
        date: new Date().toLocaleString(),
        gamesPlayed: 1,
      }

      this.leaderboardData.push(entry)
    }

    // Sort by WPM (highest first)
    this.leaderboardData.sort((a, b) => b.wpm - a.wpm)

    // Keep only top 20 entries
    if (this.leaderboardData.length > 20) {
      this.leaderboardData = this.leaderboardData.slice(0, 20)
    }

    this.saveLeaderboardData()
  }

  createLeaderboardElement() {
    const leaderboardElement = document.createElement("div")
    leaderboardElement.className = "leaderboard"

    const leaderboardContent = document.createElement("div")
    leaderboardContent.className = "leaderboard__content"

    const leaderboardHeader = document.createElement("div")
    leaderboardHeader.className = "leaderboard__header"

    const leaderboardTitle = document.createElement("h2")
    leaderboardTitle.className = "leaderboard__title"
    leaderboardTitle.textContent = "Leaderboard"

    const closeButton = document.createElement("button")
    closeButton.className = "leaderboard__close"
    closeButton.textContent = "×"
    closeButton.addEventListener("click", () => this.hideLeaderboard())
    this.closeButton = closeButton

    leaderboardHeader.appendChild(leaderboardTitle)
    leaderboardHeader.appendChild(closeButton)

    const leaderboardTable = document.createElement("table")
    leaderboardTable.className = "leaderboard__table"

    const tableHeader = document.createElement("thead")
    tableHeader.innerHTML = `
      <tr>
        <th>Rank</th>
        <th>User</th>
        <th>WPM</th>
        <th>Accuracy</th>
        <th>Games</th>
        <th>Time</th>
        <th>Date</th>
      </tr>
    `

    const tableBody = document.createElement("tbody")

    this.leaderboardData.forEach((entry, index) => {
      const row = document.createElement("tr")

      // 🎉 Highlight Top 3 Users
      if (index === 0) row.classList.add("leaderboard__top-1")
      else if (index === 1) row.classList.add("leaderboard__top-2")
      else if (index === 2) row.classList.add("leaderboard__top-3")

      // Highlight current user's entries
      if (entry.username === this.currentUser) {
        row.classList.add("leaderboard__user-row")
      }

      row.innerHTML = `
        <td>${index + 1}</td>
        <td class="leaderboard__user-column">${entry.username}</td>
        <td>${entry.wpm}</td>
        <td>${entry.accuracy}%</td>
        <td>${entry.gamesPlayed}</td>
        <td>${entry.time}</td>
        <td>${entry.date}</td>
      `
      tableBody.appendChild(row)
    })

    leaderboardTable.appendChild(tableHeader)
    leaderboardTable.appendChild(tableBody)

    leaderboardContent.appendChild(leaderboardHeader)
    leaderboardContent.appendChild(leaderboardTable)
    leaderboardElement.appendChild(leaderboardContent)

    return leaderboardElement
  }

  showLeaderboard() {
    // Remove existing leaderboard if it exists
    const existingLeaderboard = document.querySelector(".leaderboard")
    if (existingLeaderboard) {
      existingLeaderboard.remove()
    }

    const leaderboardElement = this.createLeaderboardElement()
    document.body.appendChild(leaderboardElement)

    // Add animation class after a small delay to trigger animation
    setTimeout(() => {
      leaderboardElement.classList.add("leaderboard_visible")
    }, 10)
  }

  hideLeaderboard() {
    const leaderboardElement = document.querySelector(".leaderboard")
    if (leaderboardElement) {
      leaderboardElement.classList.remove("leaderboard_visible")

      // Remove element after animation completes
      leaderboardElement.addEventListener(
        "transitionend",
        () => {
          leaderboardElement.remove()
        },
        { once: true },
      )
    }
  }

  updateLeaderboard() {
    const existingLeaderboard = document.querySelector(".leaderboard")
    if (existingLeaderboard) {
      existingLeaderboard.remove()
      this.showLeaderboard()
    }
  }


}

