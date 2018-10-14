class Player_SpaceShip{
	constructor(ctx,x,y,w,h,speed,shoot_damage=100){
		this.shoot_damage = shoot_damage;
		this.destroyed = false;
		this.ctx = ctx;
		this.image = new Image();
		this.image.src = "img/player/player_ship.png";
		this.laser_image = new Image();
		this.laser_image.src = "img/player/lasers/lv_1.png";
		this.shoot_audio = new Audio("audio/lasers/sfx_laser2.ogg");
		this.explosion_images = []
		this.explosion_audio = new Audio("audio/player/explosion.mp3");
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
		this.dt;
		this.lasers = []
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		if (!this.destroyed) {
			this.ctx.beginPath();
			this.ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
			for (var i in this.lasers){
				var laser = this.lasers[i];	
				if (this.lasers[i].y < 0){
					this.lasers.splice(i,1);
				}
				if (this.lasers[i]){
					this.ctx.drawImage(this.laser_image,laser.x,laser.y,laser.w,laser.h);
					this.lasers[i].y -= laser.speed * this.dt;
				}
			}
		} else {
			if (this.explosion_images[0]){
				this.explosion_audio.play();
				this.ctx.beginPath();
				this.ctx.drawImage(this.explosion_images[0],this.x,this.y,this.w,this.h);
				this.explosion_images.splice(0,1);
			} else if (this.explosion_audio.currentTime > 0 && !this.explosion_audio.paused) {
				this.explosion_audio.currentTime = 0;
				this.explosion_audio.pause();
			}
		}
	}
	get move(){
		this.move_player();
	}
	move_player(){
		if (!this.destroyed){
			if (keyState["ArrowUp"] || keyState["w"]){
				this.y -= this.speed * this.dt;
			}
			if (keyState["ArrowLeft"] || keyState["a"]){
				this.x -= this.speed * this.dt;
			}
			if (keyState["ArrowDown"] || keyState["s"]){
				this.y += this.speed * this.dt;
			}
			if (keyState["ArrowRight"] || keyState["d"]){
				this.x += this.speed * this.dt;
			}
			if (keyState[" "]) {
				this.shoot();
			}
		}
	}
	shoot(){
		this.shoot_audio.currentTime = 0;
		var middle = this.x + this.w - (this.w / 2) - 5;
		this.lasers.push({"x":middle,"y":this.y - 25,"w":10,"h":30,"speed":1000});
		this.shoot_audio.play();
	}
}