import {Router} from 'express';
import AuthController from '../../Controllers/AuthController.js';
const router = Router();

router.post('/google', async (req, res) => {
  // router code here
  try {
    const token = req.body.idToken;
    if (!token) {
      return res.send({auth: false, message: 'No Token Provided'});
    } else {
      const auth= new AuthController();
      auth.storeUserInfoIntoDb(req.body.email, req.body.name, req.body.photo, req.body.idToken)
      .then(value=>{
        res.status(201).send(value)
      })
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
});


export default router;
