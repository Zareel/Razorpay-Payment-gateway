export const processPayment = async(req, res) => {
    try{
        res.status(200).json({
            success:true,
            message:"Payment process initialized successfully"
        })

    }catch(error){
        console.log(error)
    }
}