let scoreUrl = 'http://localhost:3000/scores'
let leaderboardUrl = 'http://localhost:3000/leaderboards'
// const body = document.querySelector('body')
let counterDiv= document.createElement('div')
let counter = document.createElement('p')
counter.textContent = `Time: 0`
counterDiv.appendChild(counter)



let sidebar = document.createElement('div')
sidebar.setAttribute('class', 'sidebar')
// body.append(sidebar)

let currentDate = new Date();
let date = `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`


let leaderboards = []
let scores = []

function getLeaderBoards(){
    fetch(leaderboardUrl)
    .then(res => res.json())
    .then(Leaderboards => {
        Leaderboards.forEach(leaderboard => leaderboards.push(leaderboard))
        // addLeaderBoard(leaderboards)
        getScores(leaderboards)
    })
}

function getScores(leaderboards){
    fetch(scoreUrl)
    .then(res => res.json())
    .then(Scores => {
        Scores.forEach(score => scores.push(score))
        addLeaderBoard(leaderboards, scores)
    })
}

//comapare function for sorting scores
function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const scoreA = parseInt(a.time)
    const scoreB = parseInt(b.time)
  
    let comparison = 0;
    if (scoreA > scoreB) {
      comparison = 1;
    } else if (scoreA < scoreB) {
      comparison = -1;
    }
    return comparison;
  }
  
//   singers.sort(compare);



function addLeaderBoard(leaderboards, scores){
    let todaysBoard = leaderboards.find(leaderboard => leaderboard.date === date)
    let todaysScores = scores.filter(score => score.date === date )
    // todaysScores.sort(compare)
    if ((!!todaysBoard)) {
        let boardDiv = document.createElement('div')
        boardDiv.setAttribute('class', 'leaderboard')
        // console.log(leaderboards)

        let ul = document.createElement('ul')
        ul.textContent = `${todaysBoard.date}'s Top Scores:`
        ul.id = `${todaysBoard.id}l` // l for leaderboard



        boardDiv.append(ul)
        sidebar.append(boardDiv)

        postScores(todaysScores, todaysBoard)

    } else {
        fetch((leaderboardUrl), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                'date': date
            })

        })
        .then(res => res.json())
        .then(todaysBoard => {
            let boardDiv = document.createElement('div')
            boardDiv.setAttribute('class', 'leaderboard')

            let ul = document.createElement('ul')
            ul.textContent = `${todaysBoard.date}'s Top Scores:`
            ul.id = `${todaysBoard.id}l` // l for leaderboard

            boardDiv.append(ul)
            sidebar.append(boardDiv)
        })
    }
}

let paused = false;
let timer;

function startTime() {
    clearInterval(timer);
    let timeCount = 0
    if (document.getElementsByClassName('sidebar').length === 0){
        sidebar.append(counterDiv)
        body.append(sidebar)
    } else {
        counter.textContent = `Time: 0`
    }
    timer = setInterval(function(){
        if(!paused) {
            timeCount += 1
            counterDiv.innerHTML = ''
            counter.setAttribute('class', 'counter')
            counter.textContent = `Time: ${timeCount}`
            counter.id = timeCount
            counterDiv.appendChild(counter)
        }
    }, 1000)
}

function createScore(time, userid) {
    let todaysBoard = leaderboards.find(leaderboard => leaderboard.date === date)
    let todaysScores = scores.filter(score => score.date === date )
    let ul = document.getElementById(`${todaysBoard.id}l`)

    fetch((scoreUrl), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            'time': time,
            'user_id': userid,
            'leaderboard_id': todaysBoard.id,
            'date': date
        })
    })
    .then(res => res.json())
    .then( score => {
        // create posting score logic here? or perhaps send to a function
        // find or create leaderboard based on todays date
        // add this score to the board
        // let user = Users.find(user => user.id === score.user_id)
        // let li = document.createElement('li')
        // li.textContent = `${parseInt(score.time)} seconds by ${user.name}`

        // ul.append(li)
        todaysScores.push(score)
        postScores(todaysScores, todaysBoard)

    })
}

// let date = new Date().getTime()

// todaysScores.forEach(score => {
//     let li = document.createElement('li')

//     li.textContent = `${i}. ${parseInt(score.time)} seconds by ${user.name}`
//     i += 1
//     ul.append(li)
// })

function postScores(todaysScores, todaysBoard) {
    // let todaysBoard = leaderboards.find(leaderboard => leaderboard.date === date)
    let ul = document.getElementById(`${todaysBoard.id}l`)
    ul.innerHTML = ''
    ul.textContent = `${todaysBoard.date}'s Top 10 Scores:`
    todaysScores.sort(compare)
    let i = 1 
    console.log(todaysScores)
    todaysScores.forEach(score => {
        let user = Users.find(user => user.id === score.user_id)
        if (i < 11) {
        let li = document.createElement('li')
        console.log(score)
        li.textContent = `#${i} ${score.time} seconds by ${user.name}`
        i += 1
        ul.append(li)
        }
    })
    
}