const { Cabins } = require("./../db");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../AppError");
const mapper = {
    "maxcapacity": "maxCapacity",
    "name": "name",
    "regularprice": "regularPrice",
    "discount": "discount",
    "description": "description",
    "image": "image",
    

}
const filteredCabin = (obj) => {
    const res = {};
    ["name", "maxcapacity", "regularprice", "discount", "description", "image"].forEach(field => {
        if (obj[mapper[field]]) {
            res[field] = obj[mapper[field]];
        }
    });
    return res;
}
exports.getCabins = catchAsync(async (req, res, next) => {
    let cabins = await Cabins.filter({ ...req.query }).findAll();

    if (!cabins) {
        return next(new AppError("Server error", 500))
    }
    let data = cabins;
    if (data.length === 0)
        data = "empty cabins right now"

    res.status(200).json({
        status: "success",
        data
    })

})
exports.getCabinById = catchAsync(async (req, res, next) => {
    let cabin = await Cabins.findById(req.params.id);
    if (!cabin) {
        return next(new AppError("cabin not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            cabin
        }
    })

})
exports.insertCabin = catchAsync(async (req, res, next) => {
    let cabin = await Cabins.create(filteredCabin(req.body));
    if (!cabin) {
        return next(new AppError("Cabin could not be inserted", 400));
    }
    res.status(200).json({
        status: "success",
        data: cabin
    })

})
exports.deleteCabin = catchAsync(async (req, res, next) => {
    let cabin = await Cabins.delete(req.params.id);
    if (!cabin) {
        return next(new AppError(`Cabin with id ${req.params.id} does not exist`, 404))
    }
    res.status(204).json({
        status: "success",
        data: null
    })

})
exports.updateCabin = catchAsync(async (req, res, next) => {

    let cabin = await Cabins.update(req.params.id, filteredCabin(req.body));
    if (!cabin) {
        return next(new AppError("Cabin could not be updated", 400));
    }
    res.status(200).json({
        status: "success",
        data: cabin
    })

})

// done: Delete api/v1/cabins/:id
// done: patch api/v1/cabins/:id
// done: post api/v1/cabins/
// done: GET api/v1/cabins/:id
// done: GET api/v1/cabins