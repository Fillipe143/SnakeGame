import { createPlayerBlock } from './block.js'
import { keyboardController } from './keyboardController.js'

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')

const numBlocks = 20
const areaSize = Math.min(window.innerWidth, window.innerHeight)

canvas.width = areaSize - 2
canvas.height = areaSize - 2

export const blockSize = areaSize / numBlocks
let playerBlockList = []
const fruitBlockList = []

const initalPlayerSize = 10
export let playerSpeed = { x: 1, y: 0 }

let isRunning = true

export function setSpeed(speed) {
    playerSpeed = speed
    console.log(playerSpeed)
}

start()
keyboardController()
setInterval(update, 100)

function render() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, areaSize, areaSize)

    for (let block of fruitBlockList) {
        ctx.fillStyle = block.shadow.color
        ctx.fillRect(block.shadow.x, block.shadow.y, block.shadow.size, block.shadow.size)

        ctx.fillStyle = block.color
        ctx.fillRect(block.x, block.y, block.size, block.size)
    }

    for (let { shadow } of playerBlockList) {
        ctx.fillStyle = shadow.color
        ctx.fillRect(shadow.x, shadow.y, shadow.size, shadow.size)
    }

    for (let block of playerBlockList) {
        ctx.fillStyle = block.color
        ctx.fillRect(block.x, block.y, block.size, block.size)
    }
}

function update() {
    if (!isRunning) return
    movePlayer()
    render()
}

function movePlayer() {
    let playerHead = playerBlockList.at(-1)
    playerHead = createPlayerBlock(playerHead.coord.x + playerSpeed.x, playerHead.coord.y + playerSpeed.y)

    if (checkCollisionWithBorders(playerHead)) return finish()
    if (checkCollisionWithPlayer(playerHead)) return finish()

    playerBlockList.push(playerHead)
    playerBlockList.shift()
}

function checkCollisionWithBorders(playerHead) {
    return playerHead.x >= areaSize
        || playerHead.x < 0
        || playerHead.y >= areaSize
        || playerHead.y < 0
}

function checkCollisionWithPlayer(playerHead) {
    for (let i = 0; i < playerBlockList.length - 1; i++) {
        const block = playerBlockList[i]

        if (playerHead.x == block.x && playerHead.y == block.y)
            return true
    }

    return false
}

function finish() {
    isRunning = false
    alert(`Score: ${playerBlockList.length}`)
    start()
}

function start() {
    playerBlockList = []
    playerSpeed = { x: 1, y: 0 }

    for (let x = 0; x < initalPlayerSize; x++) {
        playerBlockList.push(createPlayerBlock(x, 0))
    }

    isRunning = true
}