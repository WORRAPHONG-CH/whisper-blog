import supabase from "../client";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";

type UploadImageProps = {
    file: File;
    bucket: string;
    folder?: string;
}



type ResponseUploadImage = {
    imageUrl:string,
    error:string
}

export const uploadImage = async({file,bucket,folder}:UploadImageProps):Promise<ResponseUploadImage> =>{
    const filename = file.name;
    const fileExtension = filename.slice(filename.lastIndexOf('.'));
    const path = `${folder ? folder +'/': '' }${uuidv4()}.${fileExtension}`;
    console.log('path:',path);

    // Compress image file 
    try {
        const fileCompressed = await imageCompression(file,{
            maxSizeMB:1,
            useWebWorker:true, //use multi-thread web worker, fallback to run in main-thread
        })
    // console.log('fileCompressed:',fileCompressed);

    // Upload compress image to storage
    const {data:resultUpload, error:uploadError} = await supabase.storage.from(bucket).upload(path,fileCompressed as File,{
        cacheControl:'3600',
        upsert:true,
        metadata:{filename:path}});

    if(uploadError){
        console.log('uploadError:', uploadError)
        throw new Error(uploadError.message);
    }

    // Get the image url 
    const {data} = supabase.storage.from(bucket).getPublicUrl(resultUpload.path);
    console.log('data:',data);

    return {imageUrl:data.publicUrl,error:''};
    

    }catch(error){
        return({imageUrl:'',error:(error as Error).message})
    }
}


export const deleteImage = async (imageUrl:string) =>{
    const splitSubPath = imageUrl.split('/storage/v1/object/public/')[1];
    const bucketandImagePath = splitSubPath.split('/'); // bucket name => [0]
    const imagePath = bucketandImagePath.slice(1).join('/');
    console.log(splitSubPath)
    console.log(bucketandImagePath[0],"+",imagePath)
    
    try{
        const { data, error } = await supabase.storage.from(bucketandImagePath[0]).remove([imagePath])
        if(error){
            console.log(error.message)
            throw new Error(error.message);
        }
        console.log('data:',data)

    }catch(error){
        console.log('error:',error)
        return {data: null, error: (error as Error).message};
    }
    
}