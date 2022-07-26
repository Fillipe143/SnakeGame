import { setSpeed } from "./index.js";

export function keyboardController() {
    const validKeys = {
        'w': () => setSpeed({ x: 0, y: -1 }),
        'a': () => setSpeed({ x: -1, y: 0 }),
        's': () => setSpeed({ x: 0, y: 1 }),
        'd': () => setSpeed({ x: 1, y: 0 })
    }

    document.addEventListener('keydown', ({ key }) => {
        if (validKeys.hasOwnProperty(key)) validKeys[key]()
    })
}