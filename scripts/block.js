import { darkenColor } from './color.js'
import { blockSize } from './index.js'

function createBlock(type, x, y, color) {
    return {
        type, color,
        x: x * blockSize,
        y: y * blockSize,
        size: blockSize
    }
}

function createBlockWithShadow(type, x, y, color) {
    const block = createBlock(type, x, y, color)

    return Object.assign(block, {
        shadow: {
            type: 'shadow',
            x: x * blockSize - 1,
            y: y * blockSize - 1,
            size: blockSize + 2,
            color: darkenColor(color)
        }
    })
}

export function createFruitBlock(x, y) {
    return createBlockWithShadow('fruit#1', x, y, '#f54949')
}

export function createPlayerBlock(x, y) {
    return createBlockWithShadow('player', x, y, '#49f552')
}