// import getControllers from '../controllers/getControllers';
// import express from 'backend/routes/node_modules/express';
const express = require('express');
const getControllers = require('../controllers/getControllers');
const postControllers = require('../controllers/postControllers');
const router = express.Router();
const path = require('path');


//get requests
router.route('/get-blogs').get(getControllers.blogs);
router.route('/detailed-blog').get(getControllers.blogDetail);
router.route('/responces').get(getControllers.responces);
router.route('/read-responces').get(getControllers.readResponces);
router.route('*').get((req,res)=>{
    res.sendFile(path.join(__dirname+'../../build/index.html'));
});
//post requests
// router.route('/').post(postControllers.home);
router.route('/_/batch').post((req,res)=>res.json({success:true}));

// export default router;
module.exports = router;