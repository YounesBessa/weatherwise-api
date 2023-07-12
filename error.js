module.exports.createError = (status , errorMessage) =>{
    const err = new Error();
    err.status = status
    err.errorMessage = errorMessage
    return err;
}