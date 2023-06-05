const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.rotation = 0;
        const image = new Image();
        image.src = '/assets//images/wukong.png';
        //image
        image.onload = () => {
            const scale = 0.1;
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
            const scale = 0.25;
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
const player = new Player();
const player2 = new Player2();

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
};

function animate() {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    player.update();
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
    console.log(key);
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
        case 'o':
            keys.o.pressed = true;
            break;
        case ' ':
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
            break;
    }
});
