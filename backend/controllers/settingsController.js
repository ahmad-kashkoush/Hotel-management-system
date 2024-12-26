const { Settings } = require("./../db");
const catchAsync = require("./../utils/catchAsync")
exports.getSettings = catchAsync(async (req, res, next) => {
    console.log(Settings);
    let settings = await Settings.getSettings();
    if (!settings)
        throw new Error("todo: use AppError in settings")
    res.status(200).json({
        status: "success",
        body: {
            data: settings
        }
    })
});

exports.updateSettings = catchAsync(async (req, res, next) => {
    let updatedSettigns = await Settings.updateSettings(req.body);
    if(!updatedSettigns)throw new Error("todo: appError in updateSettings")
    res.status(200).json({
        status: "success",
        body: {
            data: updatedSettigns
        }
    })
})