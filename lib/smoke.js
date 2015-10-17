export default class Smoke {

    constructor(x, y, maxLifeTime, direction = 'top') {
        this.x = x;
        this.y = y;

        this.size = 2;
        this.startSize = 25;
        this.endSize = 40;
        this.direction = direction;

        this.angle = Math.random() * 339;

        this.startLife = new Date().getTime();
        this.lifeTime = 0;
        this.maxLifeTime = maxLifeTime;


        switch (this.direction) {
            case 'left':
                    this.velY = Math.floor(Math.random() * (-6) + 3) / 10;
                    this.velX = -1 - (Math.random() * 0.5);
                break;
            case 'right':
                    this.velY = Math.floor(Math.random() * (-6) + 3) / 10;
                    this.velX = 1 + (Math.random() * 0.5);
                break;
            case 'top':
            default:
                this.velY = -1 - (Math.random() * 0.5);
                this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
        }
    }

    update() {
        this.lifeTime = new Date().getTime() - this.startLife;
        this.angle += 0.2;

        var lifePerc = ((this.lifeTime / this.maxLifeTime) * 100);

        this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);

        this.alpha = 1 - (lifePerc * .01);
        this.alpha = Math.max(this.alpha, 0);

        this.x += this.velX;
        this.y += this.velY;

    }
}
