// Enemies our player must avoid
var Enemy = function(x,y) {
	this.x = x; // determines the x coordinate of the enemy
	this.y =y + 55; // determines the y coordinate of the enemy
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.step = 101;
	this.boundary = this.step * 5;
	this.defaultposition = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	if(this.x < this.boundary) {
		this.x += 200 * dt;
	}
	else {
		this.x = this.defaultposition;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

 

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Lets define class Hero
class Hero {
	constructor() { //needed to initialise a new object
		this.step = 101;
		this.jump = 83;
		this.startX = this.step * 2;
		this.startY = (this.jump * 5) - 20;
		this.x = this.startX; //determines the x-position of the player
		this.y = this.startY; //determines the y-position of the player
		//selecting the Hero character
		this.sprite = 'images/char-boy.png';
		}
		// this draws Hero sprite on the x & y coordinate position just like the enemy
		render() {
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
		//this allows the player to move across/along the grid
		handleInput(arrowKey) {
			switch(arrowKey) {
				case 'left':
					if(this.x > 0) {
						this.x -= this.step;
					}
					break;
					case 'up':
						if(this.y > this.jump) {
							this.y -= this.jump;
						}
					break;
					case 'right':
						if(this.x < this.step * 4) {
							this.x += this.step;
						}
					break;
					case 'down':
						if(this.x < this.jump * 4) {
							this.y += this.jump;
						}
					break;
				}
	
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero();
const firstBug = new Enemy(-101, 0);
const secondBug = new Enemy(-101, 83);
const thirdBug = new Enemy((-101*2.5), 83);
const forthBug = new Enemy((-101*1.9), 83);
const allEnemies = [];
allEnemies.push(firstBug,secondBug,thirdBug,forthBug);


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
