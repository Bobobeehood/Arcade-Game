var winCount = 0;
var loseCount = 0;
var winGame = false;
var loseGame = false;



//Credit https://matthewcranford.com
// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    this.x = x;
	this.y = y + 58;
	this.step = 101;
	this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
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
		// increase x by speed * dt
		this.x += this.speed * dt;
	}
	else {
		//return to starting position
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

//The class below defines the Hero(Player)
//Credit https://matthewcranford.com
class Hero {
	constructor() {  //needed to initialise a new object
		this.step = 101;
		this.jump = 83;
		this.startX = this.step * 2;
		this.startY = (this.jump * 5) + 58;
		this.x = this.startX; //determines the x-position of the player
		this.y = this.startY; //determines the y-position of the player
		this.sprite = 'images/char-boy.png'; // the Hero Character
	}
	
	//This draws the player onto the screen
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	
	update() {
		//Win condition
		//did the player get to the river?
		if(this.y === -25) {
			scoreWin();
			this.reset();
			this.checkWin();
		}
		else {
		//this checks for collision between the player and the bugs
		for(let enemy of allEnemies) {
			if(this.y === enemy.y  //player's position on y axis = bug's position 
			&& (enemy.x + enemy.step/2 > this.x   //bug's x-position and bug step (on the right) is greater than player's position
			&& enemy.x < this.x + this.step/2)) { //enemy's x-position (on the left side) is less than player's position and player step (on the right)
				reduceScore();
				this.reset();
				this.checkWin();
				
			}
			
		}
	  }
			
	}
	
	//this send the player back to initial position after collision
		reset() {
			this.y = this.startY;
			this.X = this.startX;
		}
		
		checkWin() {
           if (winCount === 10) {
       //change to win status
               winGame = true;
           }
            else {
                if(loseCount === 8) {
                    loseGame = true
                    }
                }
				
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
						if(this.y > 0) {
							this.y -= this.jump;
						}
					break;
					case 'right':
						if(this.x < this.step * 4) {
							this.x += this.step;
						}
					break;
					case 'down':
						if(this.y < this.jump * 5) {
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


const myFirstBug = new Enemy(-101, 0, 150);
const mySecondBug = new Enemy(-101, 83, 250);
const myThirdBug = new Enemy(-101, (83*2), 280);
const myForthBug = new Enemy(-101, (83*3), 130);
const myfifthBug = new Enemy(-101, 83, 180);
const allEnemies = [];
allEnemies.push(myFirstBug, mySecondBug, myThirdBug, myForthBug, myfifthBug);




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


// credit https://github.com/bencodezen/frogger-clone/blob/master/js/app.js


var scoreWin = function() {
    winCount++;
    document.getElementById("win").innerHTML = winCount.toString();
};

var reduceScore = function() {
    loseCount++;
    document.getElementById("loss").innerHTML = loseCount.toString();
};
