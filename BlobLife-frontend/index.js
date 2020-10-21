function startBlob(){
    startTime()
    getLeaderBoards()
    const body = document.querySelector('body')
    let formDiv = document.getElementById('formDiv')
    if (!!(formDiv)) {formDiv.remove()}
    let sidebar = document.querySelector('.sidebar')
    const gameWindow = document.createElement('div')
    gameWindow.setAttribute('class', 'game-window')
    // body.innerHTML = ''
    const canvas = document.createElement('canvas');
    let screenSize = Math.floor(window.innerHeight * .6);
    canvas.height = screenSize;
    canvas.width = screenSize;
    gameWindow.appendChild(canvas)
    body.appendChild(gameWindow)
    let gravity = screenSize * 1/800;
    let jumpHeight = -(screenSize * 15/800);
    let jumped = false;
    let grabbed = false;
    let playerMove = screenSize * 5/800;
    let playerColor = '#1aa6b7';
    let gameOver = false;
    let currentLevel = 0;
    const gameLevels = [[],[],[],[]];
    gameLevels[0].push(new Platform(0, screenSize, screenSize, screenSize * 1/80));
    gameLevels[0].push(new Platform(0, screenSize * 7/8, screenSize * 7/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(0, screenSize * 6/8, screenSize * 5/80, screenSize * 1/8));
    gameLevels[0].push(new Platform(screenSize * 5/80, screenSize * 65/80, screenSize * 5/80, screenSize * 5/80));
    gameLevels[0].push(new Platform(screenSize * 1/8, screenSize * 55/80, screenSize * 7/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(screenSize * 3/8, screenSize * 5/8, screenSize * 2/80, screenSize * 5/80));
    gameLevels[0].push(new Platform(screenSize * 5/8, screenSize * 5/8, screenSize * 2/80, screenSize * 5/80));
    gameLevels[0].push(new Platform(screenSize * 7/8, screenSize * 5/8, screenSize * 1/8, screenSize * 5/80));
    gameLevels[0].push(new Platform(0, screenSize * 4/8, screenSize * 3/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(screenSize * 35/80, screenSize * 4/8, screenSize * 2/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(screenSize * 6/8, screenSize * 4/8, screenSize * 1/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(screenSize * 1/8, screenSize * 3/8, screenSize * 7/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(screenSize * 3/8, screenSize * 23/80, screenSize * 2/80, screenSize * 7/80));
    gameLevels[0].push(new Platform(screenSize * 5/8, screenSize * 26/80, screenSize * 2/80, screenSize * 4/80));
    gameLevels[0].push(new Platform(screenSize * 5/8, screenSize * 17/80, screenSize * 2/80, screenSize * 4/80));
    gameLevels[0].push(new Platform(0, screenSize * 15/80, screenSize * 7/8, screenSize * 2/80));


    console.log(typeof canvas.height)
    const twod = canvas.getContext('2d');

    function Platform(x, y, length, height){
        this.x = x;
        this.y = y;
        this.length = length;
        this.height = height;

        this.draw = function(){
            twod.fillStyle = 'rgba(0,0,0,0)';
            twod.fillRect(this.x, this.y, this.length, this.height);
        }
    }
    
    function Goal(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.spin = this.size;
        this.spincrementer = -(screenSize * 1/800);
        this.spincolor = ['','green','green']

        this.draw = function(){
            twod.fillStyle = this.spincolor.slice(this.spincrementer/screenSize * 800)[0];
            twod.fillRect((this.x + this.size/2 - this.spin * .5 ), this.y, this.spin, this.size);
        }

        this.update = function(){
            this.spin += this.spincrementer;
            if (this.spin < 0 || this.spin > this.size){
                this.spincrementer = -this.spincrementer;
            }
            this.draw();
        }
    }

    function BlobMan(x, y){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.onGround = true;
        this.wallGrab = 0;
        this.size = screenSize * 2/80;

        this.draw = function() {
            twod.fillStyle = playerColor;
            twod.fillRect(this.x, this.y, this.size, this.size);
            twod.fillStyle = 'white';
            twod.fillRect(this.x + screenSize * 5 /800, this.y + screenSize * 3/800, screenSize * 2/800, screenSize * 5/800);
            twod.fillRect(this.x + screenSize * 13/800, this.y + screenSize * 3/800, screenSize * 2/800, screenSize * 5/800);
            twod.beginPath();
            twod.strokeStyle = 'white';
            twod.moveTo(this.x + screenSize * 3/800, this.y + screenSize * 13/800);
            twod.lineTo(this.x + screenSize * 17/800, this.y + screenSize * 13/800);
            twod.stroke();
        }
        this.update = function() {
            // console.log(`y:${this.y}, x:${this.x}, dy:${this.dy}, dx:${this.dx}, onGround:${this.onGround}, wallGrab: ${this.wallGrab}, grabbed: ${grabbed}`)
            let possibleLandings = platforms.slice().sort((a, b) => a.y - b.y);
            possibleLandings = possibleLandings.filter(plat => plat.y >= this.y + this.size + this.dy);
            possibleLandings = possibleLandings.filter(plat => plat.x <= this.x + this.size && plat.x + plat.length >= this.x)
            let platformOn = platforms.filter(plat => plat.y === this.y + this.size)
            let possibleBonks = [];
            let possibleWalls = [];
            if (this.dy < 0){
                possibleBonks = platforms.slice().sort((a, b) => b.y - a.y);
                possibleBonks = possibleBonks.filter(plat => plat.y + plat.height > this.y + this.dy && this.y > plat.y + plat.height);
                possibleBonks = possibleBonks.filter(plat => plat.x <= this.x + this.size && plat.x + plat.length >= this.x)
            }
            if (this.dy < 0 && possibleBonks.length > 0 && this.y + this.dy + this.dy <= possibleBonks[0].y + possibleBonks[0].height) {
                this.y = possibleBonks[0].y + possibleBonks[0].height;
                this.dy = 0;
            } else if (this.y + this.size + this.dy < possibleLandings[0].y){
                this.dy += gravity;
                platformOn = [];
                this.onGround = false;
            }
            this.y += this.dy;
            if (this.dx > 0){
                possibleWalls = platforms.slice().sort((a, b) => a.x - b.x);
                possibleWalls = possibleWalls.filter(plat => plat.y + plat.height > this.y && this.y + this.size > plat.y);
                possibleWalls = possibleWalls.filter(plat => plat.x <= this.x + this.size + this.dx && this.x < plat.x + plat.length );
                if (possibleWalls.length > 0){
                    this.dx = 0;
                    this.x = possibleWalls[0].x - this.size;
                    if(!this.onGround && this.wallGrab === 0 && !grabbed){
                        this.wallGrab = -30;
                        grabbed = true;
                        this.dy = 0;
                    }
                }
            } else if (this.dx < 0){
                possibleWalls = platforms.slice().sort((a, b) => b.x - a.x);
                possibleWalls = possibleWalls.filter(plat => plat.y + plat.height > this.y && this.y + this.size > plat.y);
                possibleWalls = possibleWalls.filter(plat => plat.x + plat.length >= this.x + this.dx && this.x > plat.x );
                if (possibleWalls.length > 0){
                    this.dx = 0;
                    this.x = possibleWalls[0].x + possibleWalls[0].length;
                    if(!this.onGround && this.wallGrab === 0 && !grabbed){
                        this.wallGrab = -30;
                        grabbed = true;
                        this.dy = 0;
                    }
                }
            }
            this.x += this.dx;
            if (this.wallGrab < 0 && (this.x === canvas.width - this.size || this.x === 0 || (possibleWalls.length > 0 && possibleWalls[0].x - this.size === this.x))){
                this.dy -= 0.9 * gravity;
                this.wallGrab++;
            }
            if (this.y + this.size + this.dy + this.dy + gravity > possibleLandings[0].y) {
                platformOn[0] = possibleLandings[0];
            }
            if (platformOn.length > 0){
                if (this.dy >= screenSize * 3/80){
                    gameOver = true;
                }
                this.onGround = true;
                this.y = platformOn[0].y - this.size;
                this.dy = 0;
                grabbed = false;
            }
            if (this.x < 0){
                this.x = 0;
                this.dx = 0;
                if(!this.onGround && this.wallGrab === 0 && !grabbed){
                    this.wallGrab = -30;
                    grabbed = true;
                    this.dy = 0;
                }
            } else if (this.x > canvas.width - this.size){
                this.x = canvas.width - this.size;
                this.dx = 0;
                if(!this.onGround && this.wallGrab === 0 && !grabbed){
                    this.wallGrab = -30;
                    grabbed = true;
                    this.dy = 0;
                }
            }
            this.draw();
        }
    }

    let platforms = [];

    // platforms.push(new Platform(150, 150, 150, 650));
    // platforms.push(new Platform(75, 710, 75, 10));
    // platforms.push(new Platform(0, 600, 75, 10));
    // platforms.push(new Platform(75, 500, 75, 10));
    // platforms.push(new Platform(75, 390, 75, 10));
    // platforms.push(new Platform(0, 280, 75, 10));
    // platforms.push(new Platform(75, 170, 75, 10));
    // platforms.push(new Platform(450, 0, 200, 650));


    let Player;
    let LevelGoal;

    window.addEventListener('keydown', (e) => {
        const key = e.key;
        e.preventDefault();
        if (key === "ArrowLeft"){
            Player.dx = -playerMove;
        } else if (key === "ArrowRight"){
            Player.dx = playerMove;
        } else if(key === "ArrowUp"){
            if (Player.onGround && !jumped){
                Player.dy = jumpHeight;
                jumped = true;
            } else if(Player.wallGrab < 0 && !jumped){
                Player.dy = jumpHeight;
                Player.wallGrab = 0;
            }
        }
    })
    window.addEventListener('keyup', (e) => {
        const key = e.key;
        if (key === "ArrowLeft"){
            Player.dx = 0;
        } else if (key === "ArrowRight"){
            Player.dx = 0;
        } else if (key === "ArrowUp"){
            jumped = false;
        }
    })

    function init(){
        platforms = []
        gameLevels[currentLevel].forEach(plat => platforms.push(plat))
        playerColor = '#1aa6b7';
        Player = new BlobMan(0, screenSize - screenSize * 2/80);
        LevelGoal = new Goal(screenSize * 175/800, screenSize * 75/800, screenSize* 2/80);
        gameOver = false;
        animate();
    }

    function animate() {
        if (!gameOver){
            requestAnimationFrame(animate);
        } else if (overlap(Player.x, Player.y, Player.size, LevelGoal.x, LevelGoal.y, LevelGoal.size) > 0){
            let timer = document.querySelector('.counter')
            let userid = document.querySelector('h3').id
            createScore(timer.id, userid)
            playerColor = 'green';
            Player.draw();
            setTimeout(init, 2000);
        } else {
            playerColor = 'red';
            Player.draw();
            setTimeout(init, 2000);
        }
        twod.clearRect(0,0,canvas.width,canvas.height);
        platforms.forEach(plat => plat.draw());
        Player.update();
        LevelGoal.update();
        if(overlap(Player.x, Player.y, Player.size, LevelGoal.x, LevelGoal.y, LevelGoal.size) > 0){
            gameOver = true;
        }
    }
    init();

    function overlap(x1, y1, s1, x2, y2, s2) {
        const width = Math.min(x1 + s1, x2 + s2) - Math.max(x1, x2);
        const height = -(Math.max(-y1 - s1, -y2 - s1) - Math.min(-y1, -y2));
        return width > 0 && height > 0 ? width * height : 0;
    }
}
