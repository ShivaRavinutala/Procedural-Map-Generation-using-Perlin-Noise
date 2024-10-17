// Nathan Altice
// Created: 5/4/20
// Updated: 1/13/24
// Mappy
// Tilemap examples
// Some examples adapted from Michael Hadley's "Modular Game Worlds in Phaser 3" tutorial series

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    //pixelArt: true,
    width: 64*40,
    height: 64*30,
    zoom: 0.35,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true,
        }
    },
    scene: [ PerlinNoiseMap ]
}

const game = new Phaser.Game(config)

// globals
const centerX = game.config.width / 2
const centerY = game.config.height / 2
const w = game.config.width
const h = game.config.height
let cursors = null