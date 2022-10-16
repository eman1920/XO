const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]


document.addEventListener('DOMContentLoaded', () => {
    var boxIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    let boxes = document.getElementsByClassName('box')
    let isWin = false

    const showPopup = (score) => {
        document.getElementById('popup').style.display = 'block'
        let scoreTitle = document.querySelector('.score h2')
        let scoreMsg = document.querySelector('.score p')
        if (score === 'win') {
            scoreTitle.textContent = 'You Won!'
            scoreMsg.textContent = 'Congrats .. keep it up'
        }

        if (score === 'lose') {
            scoreTitle.textContent = 'Never Mind!'
            scoreMsg.textContent = 'Better luck next time'
        }
        if (score === 'tie') {
            scoreTitle.textContent = 'A tie!'
            scoreMsg.textContent = 'Good Game ..'
        }
    }

    const filterBoxes = (bxs, id) => {
        return bxs.filter(item => item !== id)
    }

    const checkWin = (x, id, l) => {
        wins.forEach(win => {
            let count = 0
            win.forEach(n => {
                if (x.includes(n)) {
                    count++
                }
            })
            if (count > 2) {
                if (id === 1) {
                    isWin = true
                    setTimeout(() => {
                        showPopup('win')

                    }, 1000)

                }
                if (id === 2) {
                    setTimeout(() => {
                        showPopup('lose')
                    }, 1000)

                }
            }
            if (count < 2) {
                if (l === 0) {
                    setTimeout(() => {
                        showPopup('tie')
                    }, 1000)
                }
            }
        })


    }
    let mychoices = []
    let otherchoices = []
    let turn = 0

    for (box of boxes) {
        if (boxIDs.length > 0) {
            box.addEventListener('click', (e) => {
                if (e.target.classList.contains('filled')) {
                    return
                }
                e.target.textContent = "X"
                e.target.classList.add("filled")
                mychoices.push(parseInt(e.target.id))
                boxIDs = filterBoxes(boxIDs, parseInt(e.target.id))
                turn++
                if (turn > 2) {
                    checkWin(mychoices, 1, boxIDs.length)
                }
                if (boxIDs.length > 1) {
                    if (isWin) {
                        return
                    }
                    setTimeout(() => {
                        let rand = boxIDs[Math.floor(Math.random() * boxIDs.length)]
                        document.getElementById(rand).textContent = "O"
                        document.getElementById(rand).classList.add("filled")
                        otherchoices.push(rand)
                        boxIDs = filterBoxes(boxIDs, rand)
                        checkWin(otherchoices, 2, boxIDs.length)

                    }, 500)

                }
            })
        }

    }
    //reset game
    document.getElementById('playAgain').addEventListener('click', () => {
        document.getElementById('popup').style.display = 'none'
        for (box of boxes) {
            box.classList.remove('filled')
            box.textContent = ''
            turn = 0
            mychoices = []
            otherchoices = []
            boxIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            isWin = false
        }

    })

})