import express from 'express';

import userRegister from '../controller/User/createUser';
import addUser from '../controller/User/addUser';
import login from '../controller/User/adminLogin';
import auth from '../middleware/auth';
import fetchUsers from '../controller/User/fetchUser';
import fetchUserDetails from '../controller/User/fetchUserDetails';
import editUser from '../controller/User/editUser';
import deleteUser from '../controller/User/deleteUser';



const router = express.Router();



router.post('/register', userRegister);
router.post('/addUser', auth, addUser);
router.post('/login', login);
router.get('/fetchUsers', auth, fetchUsers);
router.get('/fetchUsers/:id', auth, fetchUserDetails);
router.patch('/editUser/:id', auth, editUser);
router.delete('/deleteUser/:id', auth, deleteUser);


















export default router;