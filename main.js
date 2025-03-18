import Input from "./input.js"
import Keyboard from "./keyboard.js"
import Reset from "./Reset.js"
import Tile from "./Tile.js"
import Leaderboard from "./Leaderboard.js"
import { checkAuth, initUserInfo } from "./auth.js"

import { resetButton, wpmTile, accuracyTile, timeTile } from "./constants.js"

// Check if user is logged in
checkAuth()

// Initialize user info
initUserInfo()

// create our tile classes
const wpmTileObj = new Tile(wpmTile)
const accuracyTileObj = new Tile(accuracyTile)
const timeTileObj = new Tile(timeTile)

// create keyboard
const keyboardObj = new Keyboard()

// create leaderboard
const leaderboardObj = new Leaderboard()

// create input handling class
const inputObj = new Input(keyboardObj, wpmTileObj, accuracyTileObj, timeTileObj, leaderboardObj)

// create reset button
const resetObj = new Reset(resetButton, inputObj)

