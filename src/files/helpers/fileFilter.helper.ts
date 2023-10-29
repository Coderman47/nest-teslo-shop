

export const fileFilter = (
    req: Express.Request, 
    file: Express.Multer.File, 
    callBack: Function 
    )=>{
        
    if(!file) return callBack( new Error('File is empty'), false );

    // console.log(file.mimetype)
    const fileExtension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if(validExtensions.includes(fileExtension)){
        return callBack(null, true);
    }

    callBack(null, false);

}