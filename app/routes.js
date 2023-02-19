const router = require('express').Router();

router.get('/health',(_req, res)=>{
    const error = new Error('Hello Error');
    error.status = 400
    throw error
    res.status(200).json({
        message:'success'
    });
} );



module.exports = router;