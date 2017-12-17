function Hero(game, x, y) {
    // call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'hero');
    this.anchor.set(0.5, 0.5);
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.animations.add('walk', [0, 1], 8, false);
    this.animations.add('attack', [2, 3, 2], 8, false);
}

// inherit from Phaser.Sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;
Hero.prototype.isMoving = false;
Hero.prototype.attack = function () {
    this.animations.play('attack');
};

Hero.prototype.update = function() {
    if (this.isMoving) {
        this.animations.play('walk');
    }
}

PlayState = {};
PlayState.init = function() {
    this.game.renderer.renderSession.roundPixels = true;
    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT,
        right: Phaser.KeyCode.RIGHT,
        up: Phaser.KeyCode.UP,
        down: Phaser.KeyCode.DOWN,
        enter: Phaser.KeyCode.SPACEBAR
    });
    this.keys.enter.onDown.add(function() {
        this.hero.attack();
    }, this);
};

PlayState.create = function() {
    this.game.world.setBounds(-150+16, -150+16, 900-32, 900-32);
    this.game.add.image(0, 0, 'background')
    this._spawnCharacters();
};

// load game assets here
PlayState.preload = function() {
    this.game.load.image('background', 'images/background.png');
    this.game.load.spritesheet('hero', 'images/hero.png', 32, 32);
};

PlayState._spawnCharacters = function () {
    // spawn hero
    this.hero = new Hero(this.game, 0, 0);
    this.hero.fixedToCamera = true;
    this.hero.cameraOffset.setTo(150, 150);
    this.game.add.existing(this.hero);
};

PlayState.update = function() {
    this._handleCollisions();
    this._handleInput();
};

PlayState._handleCollisions = function() {
};

PlayState._handleInput = function() {
    if (this.keys.left.isDown) {
        //this.hero.move(-1, 0);
        this.game.camera.x -= 4;
        this.hero.angle = 270;
        this.hero.isMoving = true;
    }
    else if (this.keys.right.isDown) {
        //this.hero.move(1, 0);
        this.game.camera.x += 4;
        this.hero.angle = 90;
        this.hero.isMoving = true;
    }
    else if (this.keys.up.isDown) {
        //this.hero.move(0, -1);
        this.game.camera.y -= 4;
        this.hero.angle = 0;
        this.hero.isMoving = true;
    }
    else if (this.keys.down.isDown) {
        //this.hero.move(0, 1);
        this.game.camera.y += 4;
        this.hero.angle = 180;
        this.hero.isMoving = true;
    }
    else {
        //this.hero.move(0, 0)
        this.hero.isMoving = false;
    }
};

function render() {
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
};

window.onload = function () {
    let game = new Phaser.Game(300, 300, Phaser.AUTO, 'game');
    game.state.add('play', PlayState);
    game.state.start('play');
};
