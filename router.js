import { Router } from "express";
import Auth from "./authentication/Auth.js";

import * as rh from './reqhandler.js'

const router=Router();
router.route('/addUser').post(rh.addUser)
router.route('/login').post(rh.login)
router.route('/display').get(Auth,rh.display)
router.route("/getuserdata").get(Auth,rh.getuserdata)
router.route('/addpost').post(Auth,rh.addpost)
router.route('/delete/:id').delete(rh.dltusr)
router.route('/details/:id').get(rh.editdata)
router.route('/update/:id').put(rh.update)
router.route('/deletepost/:id').delete(rh.delpost)
router.route('/otp').post(rh.generateOTP)
router.route('/otpcheck').post(rh.verifyotp)
router.route('/passcheck').post(rh.updatepass)





export default router;
