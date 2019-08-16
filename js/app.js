// Enemies our player must avoid
var Enemy = function(x,y,s) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y =y;
    this.s = s;
};

var e1 = new Enemy(0,60,200);
var e2 = new Enemy(0,150,200);
var e3 = new Enemy(0,230,200);
allEnemies = [e1,e2,e3];

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.s * dt;

    if (this.x > 500){
        this.x = -50;
        this.s = 100 + Math.floor(Math.random()*200);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(xpos, ypos){
    this.image = 'images/char-boy.png';
    this.xpos = xpos;
    this.ypos = ypos;

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.image), this.xpos, this.ypos);
};

Player.prototype.update =function(dt){};

var player = new Player(400,400);

Player.prototype.handleInput = function (direction){

        if(direction === 'left' && this.xpos >0 ){
            this.xpos -= 100;
        } else if (direction === 'right' && this.xpos < 400 ){
            this.xpos +=100;
        }else if (direction === 'up' && this.ypos >0 ){
            this.ypos -= 85;
        } else if (direction === 'down' && this.ypos < 400){
            this.ypos += 85;
        }
        if (this.ypos < 10){
           this.xpos = 400;
           this.ypos = 400;
        }
};

Player.prototype.checkCollisions = function(){

    for(var i =0; i< allEnemies.length; i++){
//if the player is not in the safe zone
        if((player.xpos < allEnemies[i].x + 70) &&
            ((player.xpos + 70) > allEnemies[i].x) &&
            (player.ypos < (allEnemies[i].y + 20)) &&
            ((player.ypos + 20) > allEnemies[i].y)) {
            player.xpos = 200;
            player.ypos = 400;
        }
    }

};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
