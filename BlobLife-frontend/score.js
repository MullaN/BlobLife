// let ScoreUrl = 'http://localhost:3000/scores'
function startTime() {
    let timeCount = 0
    const body = document.querySelector('body')
    let counterDiv= document.createElement('div')
    body.append(counterDiv)
    setInterval(function(){
        timeCount += 1
        counterDiv.innerHTML = ''
        let counter = document.createElement('p')
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
        console.log(score)
    })
}

// let date = new Date().getTime()