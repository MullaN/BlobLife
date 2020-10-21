// let ScoreUrl = 'http://localhost:3000/scores'
const body = document.querySelector('body')
let counterDiv= document.createElement('div')
let counter = document.createElement('p')
counter.textContent = `Time: 0`
counterDiv.appendChild(counter)


function startTime() {
    let timeCount = 0

    body.append(counterDiv)
    setInterval(function(){
        timeCount += 1
        counterDiv.innerHTML = ''
        counter.setAttribute('class', 'counter')
        counter.textContent = `Time: ${timeCount}`
        counter.id = timeCount
        counterDiv.appendChild(counter)
    }, 1000)
}

function createScore(time, userid) {
    fetch('http://localhost:3000/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            'time': time,
            'user_id': userid,
            'leaderboard_id': 1
        })
    })
    .then(res => res.json())
    .then( score => {
        // create posting score logic here? or perhaps send to a function
        // find or create leaderboard based on todays date
        // add this score to the board
        console.log(score)
    })
}

// let date = new Date().getTime()