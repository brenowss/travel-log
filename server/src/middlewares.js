const notFound = (req, res ,next) => {
    const error = new Error(`Não encontrei ${req.originalUrl}`)
    res.status(404)
    next(error)
}  // lida com problema de rota

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: error.message,
        stack: 'production' === 'production' ? 'erro ao usuario 😛' : error.stack
    })
}  // lida com qualquer outro erro que possa acontecer

module.exports = {
    notFound,
    errorHandler,
}