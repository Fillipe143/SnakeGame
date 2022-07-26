export function darkenColor(hex) {
    let rgb = hexToRGB(hex)
    let hsv = rgbToHSV(rgb)

    hsv.v = Math.max(0, hsv.v - 10)
    rgb = hsvToRGB(hsv)

    return rgbToHEX(rgb)
}

function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

function rgbToHEX({r, g, b}) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function rgbToHSV({ r, g, b }) {
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    let hue = 0
    if (max == r && g >= b)
        hue = 60 * (g - b) / (max - min)
    else if (max == r && g < b)
        hue = 60 * (g - b) / (max - min) + 360
    else if (max == g)
        hue = 60 * (b - r) / (max - min) + 120
    else
        hue = 60 * (r - g) / (max - min) + 240

    let sat = (max > 0 ? (max - min) / max : 0) * 100
    let val = max * 100 / 255

    return {
        h: hue,
        s: sat,
        v: val
    }
}

function hsvToRGB({ h, s, v }) {
    let rgb = [0, 0, 0]

    for (let i = 0; i < 4; i++) {
        if (Math.abs(h - i * 120) < 120) {
            const delta = Math.max(60, Math.abs(h - i * 120))
            rgb[i % 3] = 1 - (delta - 60) / 60
        }
    }

    const max = Math.max(...rgb)
    const factor = 255 * (v / 100)

    for (let i = 0; i < 3; i++) {
        rgb[i] = Math.round((rgb[i] + (max - rgb[i]) * (1 - s / 100)) * factor)
    }

    return {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2]
    }
}