const roleRestriction = (...roles) => {
    return (req, res ,next) => {
        if(!roles.includes(req.userAuth.role)) {
            throw new Error('You do not have permission to perfom this action');
        }
        next();
    }
}

module.exports = roleRestriction;