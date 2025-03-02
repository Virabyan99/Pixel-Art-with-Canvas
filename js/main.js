/**
 * @type HTMLCanvasElement
 */

const canvas = document.getElementById('canvas')
const guide = document.getElementById('guide')
const colorInput = document.getElementById('colorInput')
const toggleGuide = document.getElementById('toggleGuide')
const clearButton = document.getElementById('clearButton')
const drawingContext = canvas.getContext('2d')

const CELL_SIDE_COUNT = 5
const cellPixelLength = canvas.width / CELL_SIDE_COUNT
const colorHistory = {}

// set default color
colorInput.value = '#009578'

// initializing the canvas background
drawingContext.fillStyle = '#fff'
drawingContext.fillRect(0, 0, canvas.width, canvas.height)

// Setup the guide

{
  guide.style.width = `${canvas.width}px`
  guide.style.height = `${canvas.height}px`
  guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`
  guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`

  Array(CELL_SIDE_COUNT ** 2)
    .fill()
    .forEach(() => {
      guide.insertAdjacentHTML('beforeend', '<div> </div>')
    })
}

function handleCanvasMouseDown(e) {
  // Enshure user is using their primary mouse button
  if (e.button !== 0) {
    return
  }

  const canvasBoundingRect = canvas.getBoundingClientRect()
  const x = e.clientX - canvasBoundingRect.left
  const y = e.clientY - canvasBoundingRect.top
  const cellX = Math.floor(x / cellPixelLength)
  const cellY = Math.floor(y / cellPixelLength)
  const currentCollor = colorHistory[`${cellX}_${cellY}`]
  if (e.ctrlKey) {
    if (currentCollor) {
      colorInput.value = currentCollor
    }
  } else {
    fillCell(cellX, cellY)
  }

  fillCell(cellX, cellY)
}

function handleClearButtonClick() {
  const yes = confirm('Are you sure you wish to clear the canvas?')

  if (!yes) return

  drawingContext.fillStyle = '#fff'
  drawingContext.fillRect(0, 0, canvas.width, canvas.height)
}

function handleToggleGuideChange() {
  guide.style.display = toggleGuide.checked ? null : 'none'
}

function fillCell(cellX, cellY) {
  const startX = cellX * cellPixelLength
  const startY = cellY * cellPixelLength

  drawingContext.fillStyle = colorInput.value
  drawingContext.fillRect(startX, startY, cellPixelLength, cellPixelLength)
  colorHistory[`${cellX}_${cellY}`] = colorInput.value
}

canvas.addEventListener('mousedown', handleCanvasMouseDown)
clearButton.addEventListener('click', handleClearButtonClick)
toggleGuide.addEventListener('change', handleToggleGuideChange)
