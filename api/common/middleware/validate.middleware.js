

const validate = (dto) => {
    return (req, res, next) => {
        const { error, value } = dto.validate(req.body);
        if (error.length === 0) {
            ApiError.badRequest(error.join("; "));
        }
        req.body = value;
        next();
    }
}
export default validate;