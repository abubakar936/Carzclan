

function imageuploader(req,res,next)
{
    const uploader = async (path) => await cloudinary.uploads(path, 'Images');
    var urls = []
    const files = req.files;
    if(files.length==0)
    {
        return res.json
        ({
            success: false,
            message: "Please upload logo of manufacturer",
        })
    }
    for (const file of files)
    {
    const { path } = file;
    const newPath = await uploader(path)
    urls.push(newPath)
    fs.unlinkSync(path)
    }
    var photos=[];
    console.log(urls)
    const url = urls[0].url 
    console.log(photos)
    //

}
