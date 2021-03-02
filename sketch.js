var notBall, database, position, notBallPosition;

function setup(){
    database = firebase.database();

    createCanvas(500,500);
    notBall = createSprite(250,250,10,10);
    notBall.shapeColor = "red";
    notBallPosition = database.ref('ball/position');
    notBallPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        WritePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        WritePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        WritePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        WritePosition(0,+1);
    }
    drawSprites();
}

function WritePosition(x,y){
    database.ref('ball/position').set({
        'x' : position.x + x, 
        'y' : position.y + y
    })
}

function readPosition(data){
    position = data.val();
    notBall.x = position.x;
    notBall.y = position.y; 
}

function showError(){
    console.log("error in writing to the database");
}