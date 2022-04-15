function errorHanlder (err,req,res,next) {
    if(err.status) {
      res.status(err.status).json({
        message: err.message
      })
    }
    else{
      console.log(err);
      res.status(500).json({
        message: `internal servel error`
      })
    }
    // console.log(err);
  
  }
  
  module.exports= errorHanlder