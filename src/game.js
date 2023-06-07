const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
console.log(canvas.width);

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0,
        };
        //độ xoay(nghiêng)
        this.rotation = 0;

        const image = new Image();
        image.src = '/assets//images/wukong.png';
        //load image
        image.onload = () => {
            const scale = 0.2;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20,
            };
        };
    }
    draw() {
        c.save();
        c.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2,
        );
        c.rotate(this.rotation);
        c.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.width / 2,
        );
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );
        c.restore();
    }
    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
}
class Invader {
    constructor({ position }) {
        this.velocity = {
            x: 0,
            y: 0,
        };

        const image = new Image();
        image.src = '/assets/images//invader.png';
        image.onload = () => {
            const scale = 1.5;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: position.x,
                y: position.y,
            };
        };
    }
    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );
    }
    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
}
class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0,
        };
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.invaders = [];
        const rows = Math.floor(Math.random() * 5);
        const colums = Math.floor(Math.random() * 10);

        for (let x = 0; x < colums; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(
                    new Invader({
                        position: {
                            x: x * 50,
                            y: y * 20,
                        },
                    }),
                );
            }
            console.log(this.invaders);
        }
    }
    update() {}
}
class Player2 {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.rotation = 0;
        const image = new Image();
        image.src = '/assets//images/pic.png';
        //image
        image.onload = () => {
            const scale = 0.5;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20,
            };
        };
    }
    draw() {
        c.save();
        c.translate(
            player2.position.x + player2.width / 2,
            player2.position.y + player2.height / 2,
        );
        c.rotate(this.rotation);
        c.translate(
            -player2.position.x - player2.width / 2,
            -player2.position.y - player2.width / 2,
        );
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );
        c.restore();
    }
    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
}
class Projectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 3;
    }
    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'red';
        c.fill();
        c.closePath();
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
const player = new Player();
const grids = [new Grid()];
const player2 = new Player2();
const projectiles = [];

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
    ArrowDown: {
        pressed: false,
    },
    space: {
        pressed: false,
    },
    Enter: {
        pressed: false,
    },
};

function animate() {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    // invader.update();
    grids.forEach((grid) => {
        grid.update();
        grid.invaders.forEach((invader) => {
            invader.update();
        });
    });
    player.update();
    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        } else {
            projectile.update();
        }
    });
    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -8;
        player.rotation = -0.15;
    } else if (
        keys.d.pressed &&
        player.position.x + player.width <= canvas.width
    ) {
        player.velocity.x = 8;
        player.rotation = 0.15;
    } else if (keys.w.pressed && player.position.y >= 0) {
        player.velocity.y = -8;
    } else if (
        keys.s.pressed &&
        player.position.y + player.height <= canvas.height
    ) {
        player.velocity.y = 8;
    } else {
        player.velocity.x = 0;
        player.velocity.y = 0;
        player.rotation = 0;
    }
    player2.update();
    if (keys.ArrowLeft.pressed && player2.position.x >= 0) {
        player2.velocity.x = -8;
        player2.rotation = -0.15;
    } else if (
        keys.ArrowRight.pressed &&
        player2.position.x + player2.width <= canvas.width
    ) {
        player2.velocity.x = 8;
        player2.rotation = 0.15;
    } else if (keys.ArrowUp.pressed && player2.position.y >= 0) {
        player2.velocity.y = -8;
    } else if (
        keys.ArrowDown.pressed &&
        player2.position.y + player2.height <= canvas.height
    ) {
        player2.velocity.y = 8;
    } else {
        player2.velocity.x = 0;
        player2.velocity.y = 0;
        player2.rotation = 0;
    }
}

animate();

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case 'w':
            keys.w.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            break;
        case 'Enter':
            projectiles.push(
                new Projectile({
                    position: {
                        x: player2.position.x + player2.width / 2,
                        y: player2.position.y + player2.height / 2,
                    },
                    velocity: {
                        x: -10,
                        y: -5,
                    },
                }),
            );
            break;
        case ' ':
            projectiles.push(
                new Projectile({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y + player.height / 2,
                    },
                    velocity: {
                        x: +10,
                        y: 0,
                    },
                }),
            );
            break;
    }
});
addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break;
        case ' ':
            // projectiles.push(
            //     new Projectile({
            //         position: {
            //             x: player.position.x + player.width / 2,
            //             y: player.position.y + player.height / 2,
            //         },
            //         velocity: {
            //             x: +10,
            //             y: 0,
            //         },
            //     }),
            // );
            break;
        case 'Enter':
            // projectiles.push(
            //     new Projectile({
            //         position: {
            //             x: player2.position.x + player2.width / 2,
            //             y: player2.position.y + player2.height / 2,
            //         },
            //         velocity: {
            //             x: -10,
            //             y: -5,
            //         },
            //     }),
            // );
            break;
    }
});
