class PerlinNoiseMap extends Phaser.Scene {
    constructor() {
        super("perlinNoiseMap");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("kenney_tiles", "mapPack_tilesheet.png");
    }

    create() {
        noise.seed(Math.random());

        // Initialize the sample window size
        this.noiseScale = 15; // Start with a default scale for Perlin noise
        this.sizeX = 30;
        this.sizeY = 40;

        // Add key listeners for resizing the noise sample window
        this.shrinkKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
        this.growKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
        this.reload = this.input.keyboard.addKey('R');

        this.generateMap(); // Initial map generation
    }

    generateMap() {
        const grass = Array.from({ length: this.sizeX }, () => Array(this.sizeY).fill(16));
        const foliage = Array.from({ length: this.sizeX }, () => Array(this.sizeY).fill(16));
        const mountain = Array.from({ length: this.sizeX }, () => Array(this.sizeY).fill(16));
        const water = Array.from({ length: this.sizeX }, () => Array(this.sizeY).fill(203));

        for (let i = 0; i < this.sizeX; i++) {
            for (let j = 0; j < this.sizeY; j++) {
                var noiseVal = noise.perlin2(i / this.noiseScale, j / this.noiseScale);
                var randomNumber = Math.random() * 100;
                
                if (noiseVal >= 0.15 && noiseVal < 0.5) {
                    grass[i][j] = 23; // grass tile
                    if (randomNumber > 5 && randomNumber < 7) {
                        foliage[i][j] = 59;
                    } else if (randomNumber > 40 && randomNumber < 42) {
                        foliage[i][j] = 43;
                    } else if (randomNumber > 60 && randomNumber < 63) {
                        foliage[i][j] = 60;
                    } else if (randomNumber > 32 && randomNumber < 33) {
                        foliage[i][j] = 128;
                    }
                } else if (noiseVal >= 0.5) {
                    grass[i][j] = 23;
                    mountain[i][j] = 91;
                }
            }
        }

        // Create the tilemaps
        for (let i = 0; i < this.sizeX; i++) {
            for (let j = 0; j < this.sizeY; j++) {
                //smoothening the landscape
                for (let k = 0; k < 1; k++) {
                    if (((i!=0 && j!=0 && i!=this.sizeX-1 && j!=this.sizeY-1) && (grass[i][j] != 16 && (grass[i][j+1] == 16) && (grass[i][j-1] == 16) && (grass[i-1][j] == 16) && (grass[i-1][j-1] == 16) && (grass[i-1][j+1] == 16))) || 
                    ((i!=0 && j!=0 && i!=this.sizeX-1 && j!=this.sizeY-1) && (grass[i][j] != 16 && (grass[i+1][j] == 16) && (grass[i][j-1] == 16) && (grass[i-1][j] == 16) && (grass[i-1][j-1] == 16) && (grass[i+1][j-1] == 16))) || 
                    ((i!=0 && j!=0 && i!=this.sizeX-1 && j!=this.sizeY-1) && (grass[i][j] != 16 && (grass[i][j-1] == 16) && (grass[i][j-1] == 16) && (grass[i-1][j] == 16) && (grass[i+1][j-1] == 16) && (grass[i+1][j+1] == 16))) || 
                    ((i!=0 && j!=0 && i!=this.sizeX-1 && j!=this.sizeY-1) && (grass[i][j] != 16 && (grass[i][j+1] == 16) && (grass[i-1][j] == 16) && (grass[i+1][j] == 16) && (grass[i-1][j+1] == 16) && (grass[i+1][j+1] == 16)))) {
                        grass[i][j] = 16;
                        foliage[i][j] = 16;
                    }

                    if (((i!=0 && j!=0 && i!=this.sizeX-1 && j!=this.sizeY-1) && (mountain[i][j] != 16 && (mountain[i][j+1] == 16) && (mountain[i][j-1] == 16) && (mountain[i-1][j] == 16) && (mountain[i-1][j-1] == 16) && (mountain[i-1][j+1] == 16))) || 
                    ((i!=0 && j!=0 && i!=this.sizeX-1 && j!=this.sizeY-1) && (mountain[i][j] != 16 && (mountain[i+1][j] == 16) && (mountain[i][j-1] == 16) && (mountain[i-1][j] == 16) && (mountain[i-1][j-1] == 16) && (mountain[i+1][j-1] == 16))) || 
                    ((i!=0 && j!=0 && i!=this.sizeX-1 && j!=this.sizeY-1) && (mountain[i][j] != 16 && (mountain[i][j-1] == 16) && (mountain[i][j-1] == 16) && (mountain[i-1][j] == 16) && (mountain[i+1][j-1] == 16) && (mountain[i+1][j+1] == 16))) || 
                    ((i!=0 && j!=0 && i!=this.sizeX-1 && j!=this.sizeY-1) && (mountain[i][j] != 16 && (mountain[i][j+1] == 16) && (mountain[i-1][j] == 16) && (mountain[i+1][j] == 16) && (mountain[i-1][j+1] == 16) && (mountain[i+1][j+1] == 16)))) {
                        mountain[i][j] = 16;
                        foliage[i][j] = 16;
                    }
                }

                if ((i!=0 && j!=0) && (grass[i][j] == 23 && (grass[i-1][j] == 16) && (grass[i-1][j-1] == 16) && (grass[i][j-1] == 16))) {
                    grass[i][j] = 5;
                    foliage[i][j] = 16;
                } else if ((i!=0 && j!=this.sizeY-1) && (grass[i][j] == 23 && (grass[i-1][j] == 16) && (grass[i-1][j+1] == 16) && (grass[i][j+1] == 16))) {
                    grass[i][j] = 7;
                    foliage[i][j] = 16;
                } else if ((i!=this.sizeX-1 && j!=this.sizeY-1) && (grass[i][j] == 23 && (grass[i+1][j] == 16) && (grass[i+1][j+1] == 16) && (grass[i][j+1] == 16))) {
                    grass[i][j] = 58;
                    foliage[i][j] = 16;
                } else if ((i!=this.sizeX-1 && j!=0) && (grass[i][j] == 23 && (grass[i+1][j] == 16) && (grass[i+1][j-1] == 16) && (grass[i][j-1] == 16))) {
                    grass[i][j] = 56;
                    foliage[i][j] = 16;
                } else if ((grass[i][j] == 23 && ((i != 0) && grass[i-1][j] == 16))) {
                     grass[i][j] = 6;
                     foliage[i][j] = 16;
                } else if ((grass[i][j] == 23 && ((i != this.sizeX-1) && grass[i+1][j] == 16))) {
                    grass[i][j] = 57;
                    foliage[i][j] = 16;
                } else if ((grass[i][j] == 23 && ((j != this.sizeY-1) && grass[i][j+1] == 16))) {
                    grass[i][j] = 24;
                    foliage[i][j] = 16;
                } else if ((grass[i][j] == 23 && ((j != 0) && grass[i][j-1] == 16))) {
                    grass[i][j] = 22;
                    foliage[i][j] = 16;
                } else if ((i!=0 && j!=0) && ((grass[i][j] == 23) && (grass[i-1][j] == 23) && (grass[i-1][j-1] == 16) && (grass[i][j-1] == 23))) {
                    grass[i][j] = 26;
                    console.log("WORKED");
                } else if ((i!=0 && j!=this.sizeY-1) && (grass[i][j] == 23 && (grass[i-1][j] == 23) && (grass[i-1][j+1] == 16) && (grass[i][j+1] == 23))) {
                    grass[i][j] = 9;
                    console.log("WORKED");
                }

                if ((i!=0 && j!=0) && (mountain[i][j] == 91 && (mountain[i-1][j] == 16) && (mountain[i-1][j-1] == 16) && (mountain[i][j-1] == 16))) {
                    mountain[i][j] = 73;
                    foliage[i][j] = 16;
                } else if ((i!=0 && j!=this.sizeY-1) && (mountain[i][j] == 91 && (mountain[i-1][j] == 16) && (mountain[i-1][j+1] == 16) && (mountain[i][j+1] == 16))) {
                    mountain[i][j] = 75;
                    foliage[i][j] = 16;
                } else if ((i!=this.sizeX-1 && j!=this.sizeY-1) && (mountain[i][j] == 91 && (mountain[i+1][j] == 16) && (mountain[i+1][j+1] == 16) && (mountain[i][j+1] == 16))) {
                    mountain[i][j] = 126;
                    foliage[i][j] = 16;
                } else if ((i!=this.sizeX-1 && j!=0) && (mountain[i][j] == 91 && (mountain[i+1][j] == 16) && (mountain[i+1][j-1] == 16) && (mountain[i][j-1] == 16))) {
                    mountain[i][j] = 124;
                    foliage[i][j] = 16;
                } else if ((mountain[i][j] == 91 && ((i != 0) && mountain[i-1][j] == 16))) {
                    mountain[i][j] = 74;
                    foliage[i][j] = 16;
                } else if ((mountain[i][j] == 91 && ((i != this.sizeX-1) && mountain[i+1][j] == 16))) {
                    mountain[i][j] = 125;
                    foliage[i][j] = 16;
                } else if ((mountain[i][j] == 91 && ((j != this.sizeY-1) && mountain[i][j+1] == 16))) {
                    mountain[i][j] = 92;
                    foliage[i][j] = 16;
                } else if ((mountain[i][j] == 91 && ((j != 0) && mountain[i][j-1] == 16))) {
                    mountain[i][j] = 90;
                } else if ((i!=0 && j!=0) && ((mountain[i][j] == 91) && (mountain[i-1][j] == 91) && (mountain[i-1][j-1] == 16) && (mountain[i][j-1] == 91))) {
                    mountain[i][j] = 26;
                    console.log("WORKED");
                } else if ((i!=0 && j!=this.sizeY-1) && (mountain[i][j] == 91 && (mountain[i-1][j] == 91) && (mountain[i-1][j+1] == 16) && (mountain[i][j+1] == 91))) {
                    mountain[i][j] = 9;
                    console.log("WORKED");
                }
            }
        }

        
        this.createTilemap("kenney_tiles", water, grass, mountain, foliage);
    }

    createTilemap(tilesheetName, water, grass, mountain, foliage) {
        // Clear any existing layers before creating new ones
        if (this.layers) {
            this.layers.forEach(layer => layer.destroy());
        }

        const mapWater = this.make.tilemap({ data: water, tileWidth: 64, tileHeight: 64 });
        const mapGrass = this.make.tilemap({ data: grass, tileWidth: 64, tileHeight: 64 });
        const mapMountain = this.make.tilemap({ data: mountain, tileWidth: 64, tileHeight: 64 });
        const mapFoliage = this.make.tilemap({ data: foliage, tileWidth: 64, tileHeight: 64 });

        const tilesheetWater = mapWater.addTilesetImage(tilesheetName);
        const tilesheetGrass = mapGrass.addTilesetImage(tilesheetName);
        const tilesheetMountain = mapMountain.addTilesetImage(tilesheetName);
        const tilesheetFoliage = mapFoliage.addTilesetImage(tilesheetName);

        // Create layers and store them in an array for easier destruction when regenerating the map
        this.layers = [
            mapWater.createLayer(0, tilesheetWater, 0, 0),
            mapGrass.createLayer(0, tilesheetGrass, 0, 0),
            mapMountain.createLayer(0, tilesheetMountain, 0, 0),
            mapFoliage.createLayer(0, tilesheetFoliage, 0, 0)
        ];

        // Adjust camera to fit the map size
        this.cameras.main.setBounds(0, 0, mapWater.widthInPixels, mapWater.heightInPixels);
    }

    update() {
        // Reload the scene if 'R' key is pressed
        if (Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.start("perlinNoiseMap");
        }

        // Shrink the sample window if ',' is pressed
        if (Phaser.Input.Keyboard.JustDown(this.shrinkKey)) {
            this.noiseScale -= 1; // Ensure scale does not go below 5
            this.generateMap(); // Regenerate the map with the new noise scale
        }

        // Grow the sample window if '.' is pressed
        if (Phaser.Input.Keyboard.JustDown(this.growKey)) {
            this.noiseScale += 1; // Increase the scale
            this.generateMap(); // Regenerate the map with the new noise scale
        }
    }
}
