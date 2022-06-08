const tryCatch = (t, c = (e => console.error('Error: ', e))) => {
    return function () {
        try {
            t(arguments)
        } catch (e) {
            c(e)
        }
    }
}

const generateUUID = (item) => {
    return `${item.toString()}-${Date.now}`
}

export { tryCatch, generateUUID }