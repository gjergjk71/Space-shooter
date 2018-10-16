class Asteroid{
	constructor(ctx,health,x,y,w,h,speed,dt){
		this.health = health;
		this.destroyed = false;
		this.ctx = ctx;
		this.image = document.getElementById("asteroid");
		this.explosion_images = []
		for (var x=1;x<=27;x++){
			var explosion_img = new Image();
			explosion_img.src = `img/explosions/explosion_${String(x)}.png`;
			this.explosion_images.push(explosion_img);
		}
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.speed = speed;
		this.dt = dt;
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		if (!this.health){
			this.destroyed = true;
		}
		if (!this.destroyed){
			this.ctx.beginPath();
			this.ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
		} else {
			if (this.explosion_images[0]){
				this.ctx.beginPath();
				this.ctx.drawImage(this.explosion_images[0],this.x,this.y,this.w,this.h);
				this.explosion_images.splice(0,1);
			}
		}
	}
}

var asteroids_at_once = 2
var asteroids_thrown = 0

function createAsteroid(dt,score){
	if (dt){
		if (asteroids_thrown < 0){
			asteroids_thrown = 2;
		}
		if (asteroids_at_once > asteroids_thrown){
			x = Math.floor((Math.random() * canvas.width) + 1);
			y = Math.floor((Math.random() * 60) * -1);
			asteroid = new Asteroid(ctx,100,undefined,undefined,50,50,undefined);
			asteroid.x  = x;
			asteroid.y = y;
			asteroid.speed = 150 + (score * 0.01);
			asteroids.push(asteroid);
			asteroids_thrown++;
		}
		asteroids_thrown -= asteroids_at_once * dt;
	}
}