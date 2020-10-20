let Users = []
let userUrl = 'http://localhost:3000/users'

function userForm() {
    const body = document.querySelector('body')
    let formDiv = document.createElement('div')
    formDiv.id = 'formDiv'
    formDiv.innerHTML = 
    `
    <form id='user-login' accept-charset='utf-8'>
        <input type= 'text' name='username' class= 'input' id='username' placeholder='Enter Your Name' autocomplete='off'>
        <input type='submit' name='submit' class='primary button' id='submit' value='submit'>
    </form>
    `
    body.appendChild(formDiv)

    getUsers()
    document.getElementById('user-login').addEventListener('submit', (e) => {
        e.preventDefault()
        let player = document.getElementById('username').value
        let exists = !!(Users.find(user => user.name === player))
        if (exists) {
            let h3 = document.createElement('h3')
            h3.textContent = `User: ${player}`
            body.appendChild(h3)
            startBlob()
        } 
        else {
            fetch(userUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    'name': player
                })
            })
            .then(res => res.json())
            .then( user => {
                let h3 = document.createElement('h3')
                h3.textContent = `User: ${user.name}`
                body.appendChild(h3)
                startBlob()
            })
        }
       
    })
}

function getUsers() {
    fetch(userUrl)
    .then(res => res.json())
    .then(users =>{
        // console.log(users)
        users.forEach(user => Users.push(user))
    })
}

// startBlob()
userForm()