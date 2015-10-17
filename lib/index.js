import Delegate from 'delegate-events';
import Canvas from './canvas.js';

export default class Volkswagen {
    constructor(selector = null, options = {}) {
        if (!selector || selector.length) {
            throw new Error('Volkswagen must be instanciated with one element');
        }

        this.canvas = null;
        this.binding = null;
        this.options = options;
        (options.trigger) ? this.triggerOnEvent(selector): this.init(selector);
    }

    triggerOnEvent(element) {
        let self = this;
        this.addEventListener = () => {
            self.init(element);
        }
        element.addEventListener(this.options.trigger, this.addEventListener);
    }

    init(el) {
        if (el.volkswagen){
            throw new Error('Volkswagen is already instanciated in this element', el);
        }

        this.canvas = new Canvas(this.options, el.getBoundingClientRect());
        if (this.options.trigger){
            el.removeEventListener(this.options.trigger, this.addEventListener);
        }
    }

    destroy() {
        this.undelegateClick();

        if (this.canvas) {
            this.canvas.destroy();
            this.canvas = null;
        }
    }
}
