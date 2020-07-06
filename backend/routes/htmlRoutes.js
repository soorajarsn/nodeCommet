const express = require('express');
const getControllers = require('../controllers/getControllers');
const postControllers = require('../controllers/postControllers');
const router = express.Router();
const path = require('path');


//get requests
router.route('/get-blogs').get(getControllers.blogs);
router.route('/detailed-blog').get(getControllers.blogDetail);
router.route('/home').get(getControllers.home);
router.route('*').get((req,res)=>{
    res.sendFile(path.join(__dirname+'../../../crawler/build/index.html'));
});
//post requests
router.route('/_/batch').post((req,res)=>res.json({success:true}));
router.route('/').post(postControllers.getTag);
// export default router;
module.exports = router;