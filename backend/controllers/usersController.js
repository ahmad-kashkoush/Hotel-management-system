const AppError = require("../AppError");
const { Users } = require("../db");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const comparePassword = require("../utils/comparePassword");
exports.login = catchAsync(async (req, res, next) => {
    // 1) accept data
    // 2) get row from database
    if (!req.body.email || !req.body.password) {
        throw new AppError("1)invalid email or password", 400);
    }
    const { email, password } = req.body;
    let user = await Users.find({ email });
    if (!user) {
        throw new AppError(`2) invalid email or password`, 400);
    }
    user = user[0];

    // 2) compare password encryption
    if (!await comparePassword(password, user.password)) {
        throw new AppError(`3) invalid email or password`, 400);
    }

    // 3) generate sign token
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,

    );
    // 4) send token with a response
    res.status(201).json({
        status: "success",
        token,
        user: user
    })
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        throw new AppError("invalid token in protect", 401)
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await Users.findById(decoded.id);
        next();
    } catch (err) {
        throw new AppError(err.message, 401);
    }


});
exports.getCurUser = catchAsync(async (req, res, next) => {
    if (!req.user) throw new AppError("not authorized bitch", 403);
    res.status(201).json({
        status: "success",
        data: req.user
    })

})

// exports.signup=catchAsync(async (req, res, next)=>{
//     // email, password, user data
//     // validation
//     const {}
//     next(new AppError("todo:implement signup", 400))
// });
exports.signup = catchAsync(async (req, res, next) => {
    const { fullName, email, password, passwordConfirm } = req.body;
    // validate email exists or not.
    const newUser = await Users.create({ fullName, email, password, passwordConfirm });
    if (!newUser) {
        throw new AppError("error creating user", 400);
    }
    const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET

    );
    return res.status(201).json({
        status: "success",
        message: "Successfully signup",
        token,
        data: newUser
    })

})
exports.updateUser = catchAsync(async (req, res, next) => {
    // email, password, user data
    if (req.body.password) {
        return next();
    }
    const updatedUser = await Users.update(req.user.id, {
        name: req.body.fullName,
        photo: req.body.photo
    })
    if (!updatedUser) {
        throw new AppError("error updating user", 400);
    }
    return res.status(200).json({
        status: "success",
        message: "Successfully update user",
        data: updatedUser
    })
});

// todo(later): check if I want to create a reset token and if it is optimal or not.
exports.updatePassword = catchAsync(async (req, res, next) => {
    const { password, passwordConfirm } = req.body;

    const updatedUser = await Users.update(req.user.id, {
        password: req.body.password,
    });

    if (!updatedUser) {
        throw new AppError("Error updating password", 400);
    }

    return res.status(200).json({
        status: "success",
        message: "Successfully updated password",
    })

})

