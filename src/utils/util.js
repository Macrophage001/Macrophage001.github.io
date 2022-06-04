const tryCatch = (t, c = (e => console.error('Error: ', e))) => {
    return function () {
        try {
            t(arguments)
        } catch (e) {
            c(e)
        }
    }
}

export default tryCatch;