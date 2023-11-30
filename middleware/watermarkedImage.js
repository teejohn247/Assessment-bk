import s3 from "../config/Aws-S3";
import fs from "fs";


const uploadWaterMark = async(fileStream, image) => {
    return new Promise((resolve, reject) => {
        // const image = fileData;
        
        // Specify the bucket name and file path
        const bucketName = process.env.AWS_BUCKET_NAME;
        // const filePath = image.path;
        // const fileStream = fs.createReadStream(filePath);
        
        // Set the S3 upload parameters
        const params = {
            Bucket: bucketName,
            Key: image.name, // Set the destination path in S3
            Body: fileStream,
            ContentType: image.type // Set the content type of the file
        };
        
        if (image.type === null) {
            resolve('');
            return;
        }else{
        // Upload the file to S3
            s3.upload(params, (err, data) => {
                if (err) {
                    // reject(err);
                    console.log(err);
                } else {
                    resolve(data.Location);
                // console.log('File uploaded successfully. S3 location:', data.Location);
                } 
            });
        }
    });
}

export default uploadWaterMark;