const AppError = require("../AppError");
const { Settings } = require("./../db");
const catchAsync = require("./../utils/catchAsync")
exports.getSettings = catchAsync(async (req, res, next) => {
    let settings = await Settings.getSettings();
    if (!settings) {
        return next(new AppError("No settings found", 404));
    }
    res.status(200).json({
        status: "success",
        data: settings
    })
});

exports.updateSettings = catchAsync(async (req, res, next) => {
    console.log(req.body);
    let updatedSettigns = await Settings.updateSettings(req.body);
    if (!updatedSettigns) {
        return next(new AppError("Could not update settings", 400));
    }
    res.status(200).json({
        status: "success",
        body: {
            data: updatedSettigns
        }
    })
})