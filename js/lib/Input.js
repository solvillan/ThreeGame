/**
 * Inspired by http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/
 * @type {{_pressed: {}, LEFT: number, RIGHT: number, UP: number, DOWN: number, isDown: Key.isDown, onKeyDown: Key.onKeyDown, onKeyUp: Key.onKeyUp}}
 */

var Key = {
    _pressed: {},

    LEFT: 65,
    RIGHT: 68,
    UP: 87,
    DOWN: 83,
    CLEFT: 37,
    CRIGHT: 39,
    CUP: 38,
    CDOWN: 40,
    SHOOT: 32,

    isDown: function (keyCode) {
        return this._pressed[keyCode];
    },

    onKeyDown: function (event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyUp: function(event) {
        delete this._pressed[event.keyCode];
    }
};

var Mouse = {
    _position: {x: 0, y: 0},
    _delta: {x: 0, y: 0},

    getPosition: function () {
        return this._position;
    },

    getX: function () {
        return this._position.x;
    },

    getY: function () {
        return this._position.y;
    },

    getDelta: function () {
        return this._delta;
    },

    getDX: function () {
        return this._delta.x;
    },

    getDY: function () {
        return this._delta.y;
    },

    update: function (canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        this._position.x = evt.clientX - rect.left;
        this._position.y =  evt.clientY - rect.top;
        this._delta.x = evt.movementX;
        this._delta.y = evt.movementY;
    }

};