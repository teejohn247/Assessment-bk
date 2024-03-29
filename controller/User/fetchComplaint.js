import User from '../../model/Lasepa';
import dotenv from 'dotenv';


dotenv.config();


const fetchComplaints = async(req, res) => {
    try{

        const { page, limit } = req.query;

        const user = await  User.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();


        const count = await  User.find().countDocuments();


        if(!user){
            res.status(404).json({
                status:404,
                success: false,
                error:'No user Found'
            })
            return
        }else{
            res.status(201).json({
                status: 201,
                success: true,
                data: user,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            })
        }
       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default fetchComplaints;
