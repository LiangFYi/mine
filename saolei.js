const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `${selector} 写错了`
        alert(s)
        //
        return null
    } else {
        return element
    }
}
const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `${selector} 写错了`
        alert(s)
        return []
    } else {
        return elements
    }
}

const appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)

let end = true

const Digitalpicture = function (cell) {
    if (cell.innerHTML === '1') {
        cell.classList.add('one')
    } else if (cell.innerHTML === '2') {
        cell.classList.add('two')
    } else if (cell.innerHTML === '3') {
        cell.classList.add('three')
    } else if (cell.innerHTML === '4') {
        cell.classList.add('four')
    } else if (cell.innerHTML === '5') {
        cell.classList.add('five')
    } else if (cell.innerHTML === '6') {
        cell.classList.add('six')
    } else if (cell.innerHTML === '7') {
        cell.classList.add('seven')
    } else if (cell.innerHTML === '8') {
        cell.classList.add('eight')
    }
}

const clonedArray = function(array) {
    let array1 = array.slice(0)
    return array1
}

const clonedSquare = function(array) {
    let array1 = []
    for (let i = 0; i < array.length; i++) {
        let array2 = clonedArray(array[i])
        array1.push(array2)
    }
    return array1
}

const Fisher = function (arr) {
    let array = []
    for (let i = 0; i < arr.length; i++) {

        let input = clonedArray(arr)
        for (let i = input.length-1; i >=0; i--) {
            let randomIndex = Math.floor(Math.random()*(i+1));
            let itemAtIndex = input[randomIndex];
            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }

        let a1 = input
        array.push(a1)

    }
    return array;
}

const plus1 = function(array, x, y) {
    let n = array.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
        if (array[x][y] !== 9) {
            array[x][y] += 1
        }
    }

}


const markAround = function(array, x, y) {
    if (array[x][y] === 9) {
        plus1(array, x - 1, y - 1)
        plus1(array, x, y - 1)
        plus1(array, x + 1, y - 1)

        plus1(array, x - 1, y)
        plus1(array, x + 1, y)

        plus1(array, x - 1, y + 1)
        plus1(array, x, y + 1)
        plus1(array, x + 1, y + 1)
    }
}

const markedSquare = function(array) {
    let square = clonedSquare(array)
    for (let i = 0; i < square.length; i++) {
        let line = square[i]
        for  (let z = 0; z < line.length; z++) {
            markAround(square, i, z)
        }
    }
    return square
}


const templateCell = function(line, x) {
    let cell = ''
    for (let i = 0; i < line.length; i++) {
        cell += `<div class="cell" data-number="${line[i]}" data-x="${x}" data-y="${i}">${line[i]}</div>`
    }
    return cell
}


const templateRow = function(square) {
    let row = ''
    for (let i = 0; i < square.length; i++) {
        let cell = templateCell(square[i], i)
        row +=`<div class="row clearfix">
                            ${cell}
                           </div>
                                    `
    }
    return row
}


const renderSquare = function(square) {
    let body = e('body')
    let clearfix = templateRow(square)
    let div = `<div id="id-div-mime">
                                ${clearfix}
                           </div>
                                  `
    appendHtml(body, div)
}


const bindEventDelegate = function(square) {
    let mime = e('#id-div-mime')
    mime.addEventListener('click', (event) => {
        if (end === true) {
            let self = event.target
            if(self.classList.contains('cell'))
                open(self, square)
        } else {
        }
    })
}

const open = function(cell, square) {
    if (cell.classList.contains('opened')) {
    } else {
        if (cell.innerHTML === '9') {
            cell.classList.add('blood')
            open2(cell)
            end = false
        } else if (cell.innerHTML === '0') {
            let x = cell.dataset.x
            let y = cell.dataset.y
            cell.classList.add('opened')
            openAround(square, x, y)
        } else {
            Digitalpicture(cell)
        }
    }
}

const openAround = function(square, x, y) {
    let x1 = Number(x) - 1
    let y1 = Number(y) + 1

    let x2 = Number(x) + 1
    let y2 = Number(y) - 1

    if (x1 >= 0 && y2 >= 0) {
        open1(square, x1, y2)
    }
    if (x1 >= 0) {
        open1(square, x1, y)
    }
    if (x1 >= 0 && y1 < square.length) {
        open1(square, x1, y1)
    }

    if(y2 >= 0) {
        open1(square, x, y2)
    }
    if(y1 < square.length) {
        open1(square, x, y1)
    }

    if(x2 < square.length && y2 >= 0) {
        open1(square, x2, y2)
    }
    if(x2 < square.length) {
        open1(square, x2, y)
    }
    if(x2 < square.length && y1 < square.length){
        open1(square, x2, y1)
    }

}


const open1 = function(square, x, y) {
    let a = e(`[data-x="${x}"][data-y="${y}"]`)
    if (a.classList.contains('opened')) {
    } else if (square[x][y] === 9) {
    } else if (square[x][y] === 0) {
        a.classList.add('opened')
        openAround(square, x, y)
    } else {
        Digitalpicture(a)
    }
}

const open2 = function (cell) {
    let a = es('[data-number="9"]')
    for (let i = 0; i < a.length; i++) {
        if(a[i].classList.contains('flag')) {
            a[i].classList.add('error')
        } else {
            if (a[i].classList.contains('blood')) {
            } else {
                a[i].classList.add('mine')
            }
        }

    }
}

const bindEventna = function() {
    let na = e('.btn')
    na.addEventListener('click', () => {
        window.location.reload(true)
    })
}


const bindEventflag = function(){
    let cell = e('#id-div-mime')
    cell.addEventListener('contextmenu', (event) => {
        let self = event.target
        self.classList.add('flag')
    })

}

const __main = function() {
    let array  = [0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 0, 0, 0, 0, 0]
    let a2 = markedSquare(Fisher(array))
    renderSquare(a2)
    bindEventDelegate(a2)
    bindEventna()
    bindEventflag()
}
__main()