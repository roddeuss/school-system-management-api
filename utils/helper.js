const bcrypt = require("bcryptjs")

// hash the password

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

exports.isPassMatched = async (password, hash) => {
    return bcrypt.compare(password, hash)
}