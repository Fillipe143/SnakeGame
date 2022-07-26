import { playerSpeed, setSpeed } from "./index.js";

export function keyboardController() {
    const validKeys = {
        'w': () => { if (playerSpeed.y != 1) setSpeed({ x: 0, y: -1 }) },
        'a': () => { if (playerSpeed.x != 1) setSpeed({ x: -1, y: 0 }) },
        's': () => { if (playerSpeed.y != -1) setSpeed({ x: 0, y: 1 }) },
        'd': () => { if (playerSpeed.x != -1) setSpeed({ x: 1, y: 0 }) }
    }

    document.addEventListener('keydown', ({ key }) => {
        if (validKeys.hasOwnProperty(key)) validKeys[key]()
    })
}