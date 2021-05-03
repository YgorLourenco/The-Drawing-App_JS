const canvas = document.getElementById('drawing-canvas')
const increaseBtn = document.querySelector('#increase')
const decreaseBtn = document.querySelector('#decrease')
const strokeThickness = document.querySelector('#size')
const colorBtn = document.querySelector('#color')
const clearBtn = document.querySelector('#clear')

const ctx = canvas.getContext('2d') // Vai criar o quadro para desenhar

let size = 10
let isPressed = false
let color = 'black'
let x = undefined
let y = undefined

canvas.addEventListener('mousedown', function(e) { // Vai capturar os movimentos do mouse ao clicar o botão do mouse
    isPressed = true
    x = e.offsetX
    y = e.offsetY
})

canvas.addEventListener('mouseup', function(e) { // Vai parar de capturar os movimentos do mouse ao soltar o botão do mouse 
    isPressed = false
    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', function(e) { // Vai ser ativado ao mover o mouse com ele clicado
    if(isPressed) { // Se o botão estiver precionado ativar as funções de desenho abaixo e mover com o mouse
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)
        x = x2
        y = y2
    }
})

// Desenhar linhas
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath() // Começa a criar o caminho da linha
    ctx.moveTo(x1, y1) // Captura o movimento
    ctx.lineTo(x2, y2) // traça a linha
    ctx.strokeStyle = color; // Determina a cor
    ctx.lineWidth = size * 2; // Determina o tamanho, o "* 2" e para aumentar o tamanho do circulos para a linha ficar grossa e não ter bolotas
    ctx.stroke() // Cria o traçado de fato
}
// Desenhar circulos
function drawCircle(x, y) {
    ctx.beginPath() // Começar a criar
    ctx.arc(x, y, size, 0, Math.PI * 2) // Tamanho o circulo
    ctx.fillStyle = color // Cor do circulo
    ctx.fill() // Preencher
}

// Botão de Aumentar
increaseBtn.addEventListener('click', function() {
    size += 1
    if(size > 50) {
        size = 50
    }
    updateSize()
})
// Botã de Diminuir
decreaseBtn.addEventListener('click', function() {
    size -= 1
    if(size < 1) {
        size = 1;
    }
    updateSize()
})

// Color Picker
colorBtn.addEventListener('change', function(e) {
    color = e.target.value;
})
// Botão de apagar tudo
clearBtn.addEventListener('click', function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height) // Vai zerar os valores tanto da altura e largura
})
// Atualizar o indicador de tamanho dinamicamente
function updateSize() {
    strokeThickness.innerText = size; // Vai mudar os valores de texto
}