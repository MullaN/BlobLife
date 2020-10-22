let Users = []
let userUrl = 'http://localhost:3000/users'
const body = document.querySelector('body')

function userForm() {

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
            h3.id = Users.find(user => user.name === player).id
            sidebar.appendChild(h3)
            // startBlob()
            selectBlob()
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
                h3.id= user.id
                sidebar.appendChild(h3)
                // startBlob()
                selectBlob()
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

function selectBlob() {
    let formDiv = document.getElementById('formDiv')
    if (!!(formDiv)) {formDiv.remove()}

    let blobDiv = document.createElement('div')
    blobDiv.setAttribute('class', 'blobDiv')
    blobDiv.id = 'blobDiv'
    blobDivText = document.createElement('h3')
    blobDivText.textContent = 'Select a Blob:'

    let fireBlobDiv = document.createElement('div')
    fireBlobDiv.id = 'fireBlob'

    let fireBlob = document.createElement('p')
    fireBlob.textContent = 'Blob type: Fire'
    fireBlob.id = 'blob'

    fireBlobDiv.addEventListener('click', e => {
        sidebar.append(fireBlob)
        startBlob()
    })

    let fireBlobText = document.createElement('p')
    fireBlobText.textContent = 'Fire Blob. Moves quickly like a firenado.'

    let fireBlobImg = document.createElement('img')
    fireBlobImg.src = 'images/fireBlob.jpg';

    let waterBlobDiv = document.createElement('div')
    waterBlobDiv.id = 'waterBlob'

    let waterBlob = document.createElement('p')
    waterBlob.textContent = 'Blob type: Water'
    waterBlob.id = 'blob'

    waterBlobDiv.addEventListener('click', e => {
        sidebar.append(waterBlob)
        startBlob()
    })

    let waterBlobText = document.createElement('p')
    waterBlobText.textContent = 'Water Blob. Jumps high like a geyser.'

    let waterBlobImg = document.createElement('img')
    waterBlobImg.src = 'images/waterBlob.jpg';

    let earthBlobDiv = document.createElement('div')
    earthBlobDiv.id = 'earthBlob'

    let earthBlob = document.createElement('p')
    earthBlob.textContent = 'Blob type: Earth'
    earthBlob.id = 'blob'

    earthBlobDiv.addEventListener('click', e => {
        sidebar.append(earthBlob)
        startBlob()
    })

    let earthBlobText = document.createElement('p')
    earthBlobText.textContent = 'Earth Blob. Sturdy like a tree. Extra lives.'

    let earthBlobImg = document.createElement('img')
    earthBlobImg.src = 'images/earthBlob.jpg';


    let goldBlobDiv = document.createElement('div')
    goldBlobDiv.id = 'goldBlob'

    let goldBlob = document.createElement('p')
    goldBlob.textContent = 'Blob type: Gold'
    goldBlob.id = 'blob'

    goldBlobDiv.addEventListener('click', e => {
        sidebar.append(goldBlob)
        startBlob()
    })

    let goldBlobText = document.createElement('p')
    goldBlobText.textContent = 'Golden Blob. Moves fast. Jumps high. No lives.'

    let goldBlobImg = document.createElement('img')
    goldBlobImg.src = 'images/goldBlob.jpg';

    goldBlobDiv.append(goldBlobText, goldBlobImg)
    fireBlobDiv.append(fireBlobText, fireBlobImg)
    waterBlobDiv.append(waterBlobText, waterBlobImg)
    earthBlobDiv.append(earthBlobText, earthBlobImg)
    blobDiv.append(blobDivText, fireBlobDiv,waterBlobDiv, earthBlobDiv, goldBlobDiv)

    body.append(blobDiv)

}

// startBlob()
userForm()