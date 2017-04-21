/**
 * Handles Key Input
 * Inspired by http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/
 * @type {{_pressed: {}, LEFT: number, RIGHT: number, UP: number, DOWN: number, isDown: Key.isDown, onKeyDown: Key.onKeyDown, onKeyUp: Key.onKeyUp}}
 */

export class Key {
    static _pressed = {};

    static LEFT = 65;
    static RIGHT = 68;
    static UP = 87;
    static DOWN = 83;
    static CLEFT = 37;
    static CRIGHT = 39;
    static CUP = 38;
    static CDOWN = 40;
    static SHOOT = 32;

    static isDown(keyCode) {
        return this._pressed[keyCode];
    }

    static onKeyDown(event) {
        this._pressed[event.keyCode] = true;
    }

    static onKeyUp(event) {
        delete this._pressed[event.keyCode];
    }
}

/**
 * Mouse handler
 * @type {{_position: {x: number, y: number}, _delta: {x: number, y: number}, getPosition: Mouse.getPosition, getX: Mouse.getX, getY: Mouse.getY, getDelta: Mouse.getDelta, getDX: Mouse.getDX, getDY: Mouse.getDY, update: Mouse.update}}
 */
export class Mouse {
    _position = {x: 0, y: 0};
    _delta = {x: 0, y: 0};

    static getPosition() {
        return this._position;
    }

    static getX() {
        return this._position.x;
    }

    static getY() {
        return this._position.y;
    }

    static getDelta() {
        return this._delta;
    }

    static getDX() {
        return this._delta.x;
    }

    static getDY() {
        return this._delta.y;
    }

    static update(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        this._position.x = evt.clientX - rect.left;
        this._position.y =  evt.clientY - rect.top;
        this._delta.x = evt.movementX;
        this._delta.y = evt.movementY;
    }

}