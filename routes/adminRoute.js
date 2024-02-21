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
import addTextOnImage from '../controller/User/rounded';
import test from '../controller/User/test';
import fetchComplaints from '../controller/User/fetchComplaint';
import fetchComplaintDetails from '../controller/User/fetchComplaintDetails';
const multer  = require('multer');
const path= require('path');
const sharp = require('sharp');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/public/')
    },
    filename: function (req, file, cb) {
        // generate the public name, removing problematic characters
        const originalName = encodeURIComponent(path.parse(file.originalname).name).replace(/[^a-zA-Z0-9]/g, '')
        const timestamp = Date.now()
        const extension = path.extname(file.originalname).toLowerCase()
        cb(null, originalName + '_' + timestamp + extension)
    }
})


const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1 Mb
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg']
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        callback(null, true)
    }
})




const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();


router.post('/register', userRegister);
router.post('/addUser', auth, addUser);
router.post('/login', login);
router.post('/text', addTextOnImage);

router.post('/createComplaint',  useComplaint);
router.post('/test', test);
router.get('/fetchComplaints', fetchComplaints);
router.get('/fetchComplaints/:id', fetchComplaintDetails);
router.get('/fetchUsers', auth, fetchUsers);
router.get('/fetchUsers/:id', auth, fetchUserDetails);
router.patch('/editUser/:id', auth, editUser);
router.delete('/deleteUser/:id', auth, deleteUser);


export default router;