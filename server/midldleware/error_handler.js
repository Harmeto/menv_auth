function errorHandler(err, req, res, next){
    res.status(500).send(err.message)
  }

export default errorHandler;