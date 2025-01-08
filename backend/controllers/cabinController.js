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

    res.status(200).json({
        status: "success",
        data: {
            cabins
        }
    })

})
// done: GET api/v1/cabins/:id
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
// done: post api/v1/cabins/
exports.insertCabin = catchAsync(async (req, res, next) => {
    let cabin = await Cabins.create(req.body);
    if (!cabin) {
        return next(new AppError("Cabin could not be inserted", 400));
    }
    res.status(200).json({
        status: "success",
        data: {
            cabin
        }
    })

})
// done: Delete api/v1/cabins/:id
exports.deleteCabin = catchAsync(async (req, res, next) => {
    let cabin = await Cabins.delete(req.params.id);
    if (cabin === null) {
        return next(new AppError("Cabin could not be deleted", 404))
    }
    res.status(201).json({
        status: "success",
        data: {
            cabin
        }
    })

})

// done: patch api/v1/cabins/:id
exports.updateCabin = catchAsync(async (req, res, next) => {
    let cabin = await Cabins.update(req.params.id, req.body);
    if (!cabin) {
        return next(new AppError("Cabin could not be updated", 400));
    }
    res.status(200).json({
        status: "success",
        data: {
            cabin
        }
    })

})
// done : test