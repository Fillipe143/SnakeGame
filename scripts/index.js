const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')

const numBlocks = 20
const areaSize = Math.min(window.innerWidth, window.innerHeight)
const blockSize = areaSize / numBlocks

canvas.width = areaSize
canvas.height = areaSize