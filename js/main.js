var grid_width = 64;
var grid_height = 64;
var screen_width = 25*grid_width;
var screen_height = 21*grid_width;
var map_width = 2560;
var map_height = 2560;

PlayState = {};
PlayState.init = function() {
    this.game.renderer.renderSession.roundPixels = true;
}
PlayState.create = function() {
    this.game.input.mouse.capture = true;
    this.game.world.setBounds(0, 0, map_width, map_height);

    // background image
    this.game.add.image(0, 0, 'background');

    // move square
    this.move = this.game.add.sprite(0, 0, 'move');
    this.move.anchor.set(0.5, 0.5)
    this.move.fixedToCamera = true;
    this.move.cameraOffset.setTo(screen_width/2, screen_height/2);

    // pointer
    this.pointer = this.game.add.sprite(0, 0, 'pointer');
}
PlayState.preload = function() {
    this.game.load.image('background', 'images/background.png');
    this.game.load.image('move', 'images/move.png');
    this.game.load.image('pointer', 'images/pointer.png');
}
PlayState.update = function() {
    var x = this.game.input.mousePointer.x;
    var y = this.game.input.mousePointer.y;
    var grid_x = Math.floor(x / grid_width);
    var grid_y = Math.floor(y / grid_height);

    if (this.game.input.activePointer.leftButton.isDown) {
    }

    this.game.debug.text(
        'Left: ' + this.game.input.activePointer.leftButton.isDown,
        10, 20
    );
    this.game.debug.text(
        'Right: ' + this.game.input.activePointer.rightButton.isDown,
        10, 40
    );
    this.game.debug.text(
        'X: ' + grid_x.toFixed(0) + ' Y: ' + grid_y.toFixed(0),
        10, 60
    );
    this.pointer.x = grid_x * grid_width;
    this.pointer.y = grid_y * grid_height;
}

window.onload = function() {
    let game = new Phaser.Game(
        screen_width, screen_height, Phaser.AUTO, 'game'
    );
    game.state.add('play', PlayState);
    game.state.start('play');
};
