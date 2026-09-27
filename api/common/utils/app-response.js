
class ApiResponse{
    static ok(res,message="success",data=null) {
        return res.status(200).json({
            message,
            data,
            success:true
        })
    }
    static created(res, message = "created", data = null) {
        return res.status(201).json({
            message,
            data,
            success: true
        })
    }

    static noContent(res) {
        return res.status(204).send()
    }
}

export default ApiResponse;