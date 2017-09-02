//#############################################################################
//### Entity: Border
//#############################################################################
function Border() {
    
    this.spriteHeight = 100;
    
    this.area = new Phaser.Rectangle(16, 0, CFG.WIDTH-16, CFG.HEIGHT);
    
    this.sprites = [];
    for(let i=-1; i < (CFG.HEIGHT / this.spriteHeight + 1); i++) {
        let left = this.createSingleSpriteObject(i, true);
        let right = this.createSingleSpriteObject(i, false);
        
        this.sprites.push(left, right);
    }
    
    this.pos = {x: 0, y:0};
    this.vel = {x: 0, y:0};
    this.acc = {x: 0, y:0};
}
Border.prototype.constructor = Border;


Border.prototype.applyForce = function(x, y) {
    this.acc.x += x;
    this.acc.y += y;
}

Border.prototype.update = function() {
    // add acceleration
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    
    // update position
    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;
    
    // reset acceleration
    this.acc.x = 0;
    this.acc.y = 0;
    
    
    // update sprite position
    this.sprites.forEach(obj => {
        obj.sprite.y = this.pos.y + obj.start;
    }, this);
    
    // reset sprites position if range reached
    if(this.sprites[0].sprite.y < this.sprites[0].start - this.sprites[0].sprite.height
      || this.sprites[0].sprite.y > this.sprites[0].start + this.sprites[0].sprite.height) {
        this.sprites.forEach(obj => {obj.sprite.y = obj.start;});
        this.pos.y = 0;
    }
}



Border.prototype.createSingleSpriteObject = function(positionId, isLeftBorder) {
    let posY = positionId * this.spriteHeight;
    let posX = (isLeftBorder ? 0 : CFG.WIDTH - 16);
    
    return {
        sprite: game.add.sprite(posX, posY, 'border'),
        start: posY
    }
    
}