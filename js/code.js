var move;
let start = false;
let ball = document.getElementById("ball");
let ballRect = ball.getBoundingClientRect();
let positionBall = [0, 0];      //0 = horizontal, 1 = vertical
let direccionBall = false;      //false = direcion player2, true = direccion player1
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let player1points = 0;
let player2points = 0;
let player1Pos = 0;
let player2Pos = 0;
let player1Rect = player1.getBoundingClientRect();
let player2Rect = player2.getBoundingClientRect();
let counterPoints = document.getElementById("points");
let direcReb = 0;
let firstRebote = false;
let wallright = document.getElementById("wallright");
let wallleft = document.getElementById("wallleft");
let wallrightRect = wallright.getBoundingClientRect();
let wallleftRect = wallleft.getBoundingClientRect();

randomStart();

function ballMove() {
    if (start == true) {
        var x, y = getWindowsResolution();
        if (ballRect.right > wallrightRect.right - 30) {
            player1points += 1;
            randomStart();
            firstRebote = false;
        }
        if (ballRect.right < wallleftRect.right + 30) {
            player2points += 1;
            randomStart();
            firstRebote = false;
        }
        if (ballRect.top < y - 60 && ballRect.top > 30) {
            if (direccionBall == false) {   
                if (ballRect.left < player2Rect.left - 30 || ballRect.right > player2Rect.right) {  //comprobar ball-horizontal == player2-horizontal
                    positionBall[0] += 2;
                } else {
                    if (ballRect.top < player2Rect.top - 25 || ballRect.bottom > player2Rect.bottom + 30) {  //comprobar ball-vertical == player2-vertical 
                        positionBall[0] += 2;
                    } else {
                        direccionBall = true;
                        firstRebote = true;
                    }
                }
            }
            if (direccionBall == true) {
                if (ballRect.left > player1Rect.left + 30 || ballRect.right < player1Rect.right - 30) {
                    positionBall[0] -= 2;
                } else {
                    if (ballRect.top < player1Rect.top - 25 || ballRect.bottom > player1Rect.bottom + 30) {
                        positionBall[0] -= 2;
                    } else {
                        direccionBall = false;
                        firstRebote = true;
                    }
                }
            }
            //Change direction
            if (direcReb == 0 && firstRebote == true) {
                positionBall[1] += 2;
            } else if (direcReb == 1 && firstRebote == true) {
                positionBall[1] -= 2;
            }
        } else {
            if (direcReb == 0 && firstRebote == true) {
                positionBall[1] -= 2;
                direcReb = 1;
            } else if (direcReb == 1 && firstRebote == true) {
                positionBall[1] += 2;
                direcReb = 0;
            }
        }
        //BOT
        if (positionBall[0] < 0 && direccionBall == true) {
            if (ballRect.top < player1Rect.top + 45) {
                movePlayer("player1", -1);
            } else if (ballRect.top > player1Rect.top + 45) {
                movePlayer("player1", 1);
            }
        }
        positionBallStr = "translate(" + positionBall[0].toString() +  "px, " + positionBall[1].toString() + "px)";
        ball.style.transform = positionBallStr;
        counterPoints.innerHTML = player1points.toString() + " - " + player2points.toString()
        ballRect = ball.getBoundingClientRect();
        player1Rect = player1.getBoundingClientRect();
        player2Rect = player2.getBoundingClientRect();
    }
}

move = setInterval(ballMove, 2);

function randomStart() {
    numRandDirecH = Math.round(Math.random() * (0, 1) * 1);
    numRandDirecV = Math.round(Math.random() * (0, 1) * 1);
    numRandPosV = (Math.round(Math.random() * (0, 100))) * (Math.random() < 0.5 ? -1 : 1);
    if (numRandDirecH == 0) {
        direccionBall = false;
    } else if (numRandDirecH == 1) {
        direccionBall = true;
    }
    if (numRandDirecV == 0) {
        direcReb = 0;
    } else if (numRandDirecV == 1){
        direcReb = 1;
    }
    positionBall[1] = numRandPosV;
    positionBall[0] = 0;
}

function movePlayer(player, direction) {
    var x, y = getWindowsResolution();
    var bottomArea = ((y - 60) / 2 - 60);
    if (player == "player1") {
        if (player1Pos + direction >= -bottomArea && player1Pos + direction <= bottomArea) {
            player1Pos += direction;
            positionPlayer1Str = "translate(0px, " + player1Pos.toString() + "px)";
            player1.style.transform = positionPlayer1Str;
        }
    } else if (player == "player2") {
        if (player2Pos + direction >= -bottomArea && player2Pos + direction <= bottomArea) {
            player2Pos += direction;
            positionPlayer2Str = "translate(0px, " + player2Pos.toString() + "px)";
            player2.style.transform = positionPlayer2Str;
        } 
    }
}

function getWindowsResolution() {
    var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
    return x, y;
}


window.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp") {
        movePlayer("player2", -30);
    } else if (event.key == "ArrowDown") {
        movePlayer("player2", 30);
    }
},false);


function playGame(menu) {
    start = true;
    menu.parentElement.remove();
}
