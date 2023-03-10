import AbstractViewComponent from "../../abstract/AbstractViewComponent";
import { EVT } from "../../EventEmitter";
import DisplayView from "../display/DisplayView";

export default class TimeView extends AbstractViewComponent {
    /**@type {number} */
    #value = 0

    constructor(root, eventEmitter) {
        super(root, eventEmitter)

        this.display = new DisplayView(this._root)
        this.render(0)
        this.start()
    }

    render(val) {
        this.display.render(val)
    }

    start() {
        this.int = setInterval(() => {
            this.#value+=1
            this.render(this.#value)
        }, 1000)
    }

    stop() {
        clearInterval(this.int)
        this.#value = 0
    }

    bindEvents() {
        this._eventEmitter.on(EVT.win, () => this.stop())
        this._eventEmitter.on(EVT.lose, () => this.stop())
        this._eventEmitter.on(EVT.restart, () => {
            this.stop()
            this.render(0)
            this.start()
        })
    }
}