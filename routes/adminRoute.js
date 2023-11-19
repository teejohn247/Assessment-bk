import express from 'express';

import userRegister from '../controller/User/createUser';
import addUser from '../controller/User/addUser';
import login from '../controller/User/adminLogin';
import auth from '../middleware/auth';
import fetchUsers from '../controller/User/fetchUser';
import fetchUserDetails from '../controller/User/fetchUserDetails';
import editUser from '../controller/User/editUser';
import deleteUser from '../controller/User/deleteUser';
import useComplaint from '../controller/User/createComplaint';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();


router.post('/register', userRegister);
router.post('/addUser', auth, addUser);
router.post('/login', login);

router.post('/createComplaint', useComplaint);

router.get('/fetchUsers', auth, fetchUsers);
router.get('/fetchUsers/:id', auth, fetchUserDetails);
router.patch('/editUser/:id', auth, editUser);
router.delete('/deleteUser/:id', auth, deleteUser);

// router.post('/createComplaint', (req, res) => {
//     // Log the incoming request headers

//     console.log(req.fields)
//     console.log('Incoming request headers:', req.headers);

//     // Check the Content-Type header
//     const contentType = req.headers['content-type'];
//     console.log('Content-Type:', contentType);

//     // Process FormData here
//     const formData = req.body;

//     // Continue with your existing logic
//     // ...

// });
















export default router;