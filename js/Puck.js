/**************************************************
** GAME PUCK CLASS
**************************************************/
var Puck = function (startX, startY, radius, canvasObject, canvasContext) {
	var x = startX,
		y = startY,
		r = radius,
		canvas = canvasObject,
		context = canvasContext;
		
	var	velX = 1,
		velY = 2;
 
	var draw = function() {
		context.beginPath();
	    context.arc(x, y, r, 0, 2 * Math.PI, false);
	    context.fillStyle = 'red';
	    context.fill();
	    context.lineWidth = 4;
	    context.strokeStyle = '#444040';
	    context.stroke();
	    context.closePath();

	};

	var update = function(pusher) {
		checkBorderCollision();
		checkCollisions(pusher);
		x += velX;
		y += velY;
		draw();
	};

	var checkBorderCollision = function() {
		var a  = Math.sqrt((x - canvas.width / 2) * (x - canvas.width / 2) + (y - canvas.height / 2) * (y - canvas.height / 2));
		if(a + r * 2> canvas.width / 2){
			var c = 2 * (velX * getLocalX(x) + velY * getLocalY(y)) / 
						(getLocalX(x) * getLocalX(x) + getLocalY(y) * getLocalY(y));
            velX = velX - c * getLocalX(x);
            velY = velY - c * getLocalY(y);
		}
	}

	var checkCollisions = function(pusher) {
		var X = x - pusher.x; // x Component of the vector from puck to pusher
        var Y = y - pusher.y; // y Component of the vector from puck to pusher
        var a  = Math.sqrt(X * X + Y * Y); // Magnitude of the vector from puck to pusher
        //dot product of unit distance vector
        //then the formula
        if(a == r + pusher.r){
            var c = 2 * ((velX * X + velY * Y) / (X * X + Y * Y));
            velX = velX - c * X;
            velY = velY - c * Y;
        } else if(a < r + pusher.){
            x = ((r + pusher.r) / a) * X + pusher.x - canvas.width;
            y = ((r + pusher.r) / a) * Y + pusher.y - canvas.height;
            X = x - pusher.getX();
            Y = y - pusher.getY();
            var c = 2 * ((velX * X + velY * Y) / (X * X + Y * Y));
            setVelX(velX - c * X);
            setVelY(velY - c * Y);
        }
	}

	var getLocalX = function(pos){
		return pos - canvas.width / 2;
	}

	var getLocalY = function(pos){
		return pos - canvas.height / 2;
	}

	return {
		draw: draw,
		update: update
	}
};