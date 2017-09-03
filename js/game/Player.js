//#############################################################################
//### Entity: Player
//#############################################################################
function Player() {
    Phaser.Sprite.call(this, game, 0, 0, 'player', 0);
    
    this.radius = this.width / 2;
    this.anchor.setTo(0.5, 0.5);
    
    game.add.existing(this);
}

// inherits from Phaser.Sprite
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.moveBy = function(pixels) {
    this.x += pixels;
}

Player.prototype.resetTo = function(x, y) {
    this.x = x;
    this.y = y;
}

Player.prototype.update = function() {
    
}