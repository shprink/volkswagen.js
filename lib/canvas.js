import requestAnimationFrame from 'requestanimationframe';
import merge from 'merge';
import Smoke from './smoke.js';
import debounce from 'lodash/function/debounce';

export default class Volkswagen {

    constructor(options = {}, el) {
        console.log('el', el)
        let self = this;
        this.element = el;
        this.parts = [];
        this.startTime = new Date().getTime();
        this.lastTime = this.startTime;

        this.image = new Image();
        this.image.src = require('./img.js');
        this.image.onload = () => this.render();
        this.options = merge({
            height: 400,
            width: 400,
            minSpawnTime: 40
        }, options);

        this.canvas = document.createElement("canvas");
        this.canvas.height = this.options.height;
        this.canvas.width = this.options.width;
        this.canvas.style.position = "absolute";
        this.ctx = this.canvas.getContext("2d");

        switch (this.options.direction) {
            case 'left':
                this.canvas.style.top = `${this.getSize().top + (this.getSize().height / 2) - (this.canvas.height / 2)}px`;
                this.canvas.style.left = `${this.getSize().left - this.canvas.width}px`;
                this.emitterX = this.canvas.width - 20;
                this.emitterY = this.canvas.height / 2;
                break;
            case 'right':
                this.canvas.style.top = `${this.getSize().top + (this.getSize().height / 2) - (this.canvas.height / 2)}px`;
                this.canvas.style.left = `${this.getSize().left + this.getSize().width}px`;
                this.emitterX = 0;
                this.emitterY = this.canvas.height / 2;
                break;
            case 'top':
            default:
                this.canvas.style.top = `${this.getSize().top - this.canvas.height}px`;
                this.canvas.style.left = `${this.getSize().left + (this.getSize().width / 2) - (this.canvas.width / 2)}px`;
                this.emitterX = this.canvas.width / 2;
                this.emitterY = this.canvas.height - 20;
        }
        this.maxLifeTime = Math.min(5000, (this.canvas.height / (1.5 * 60) * 1000));
        this.minSpawnTime = this.options.minSpawnTime;
        this.onResize = (e) => {
            self.resize(e);
        }
        window.addEventListener('resize', debounce(this.onResize, 200), true);
        document.body.appendChild(this.canvas);
    }

    getCanvas() {
        this.canvas;
    }

    spawn() {
        if (this.options.timeout && (new Date().getTime() > this.startTime + this.options.timeout)) {
            if (!this.parts.length) {
                this.destroy();
            }
            return;
        }
        if (new Date().getTime() > this.lastTime + this.minSpawnTime) {
            this.lastTime = new Date().getTime();
            this.parts.push(new Smoke(this.emitterX, this.emitterY, this.maxLifeTime, this.options.direction));
        }
    }

    render() {
        let self = this;
        var len = this.parts.length;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        while (len--) {
            if (this.parts[len].y < 0 || this.parts[len].lifeTime > this.maxLifeTime) {
                this.parts.splice(len, 1);
            } else {
                this.parts[len].update();

                this.ctx.save();
                var offsetX = -this.parts[len].size / 2,
                    offsetY = -this.parts[len].size / 2;

                this.ctx.translate(this.parts[len].x - offsetX, this.parts[len].y - offsetY);
                this.ctx.rotate(this.parts[len].angle / 180 * Math.PI);
                this.ctx.globalAlpha = this.parts[len].alpha;
                this.ctx.drawImage(this.image, offsetX, offsetY, this.parts[len].size, this.parts[len].size);
                this.ctx.restore();
            }
        }
        this.spawn();
        if (len) {
            requestAnimationFrame(() => {
                self.render();
            });
        }
    }

    getSize() {
        return {
            top: this.element.getBoundingClientRect().top,
            left: this.element.getBoundingClientRect().left,
            height: this.element.offsetHeight,
            width: this.element.offsetWidth
        }
    }

    resize() {
        console.log('resizing', this.getSize());
        switch (this.options.direction) {
            case 'left':
                this.canvas.style.top = `${this.getSize().top + (this.getSize().height / 2) - (this.canvas.height / 2)}px`;
                this.canvas.style.left = `${this.getSize().left - this.canvas.width}px`;
                break;
            case 'right':
                this.canvas.style.top = `${this.getSize().top + (this.getSize().height / 2) - (this.canvas.height / 2)}px`;
                this.canvas.style.left = `${this.getSize().left + this.getSize().width}px`;
                break;
            case 'top':
            default:
                this.canvas.style.top = `${this.getSize().top - this.canvas.height}px`;
                this.canvas.style.left = `${this.getSize().left + (this.getSize().width / 2) - (this.canvas.width / 2)}px`;
        }
    }

    destroy() {
        document.body.removeChild(this.canvas);
        window.removeEventListener('resize', this.onResize);
    }
}
