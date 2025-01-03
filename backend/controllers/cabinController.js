const { Cabins } = require("./../db");
const catchAsync = require("../utils/catchAsync");

// done: GET api/v1/cabins
exports.getCabins = catchAsync(async (req, res, next) => {
    let cabins = await Cabins.filter({...req.query}).findAll();
    
    if (!cabins) throw new Error("todo: (getCabins) appError");
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
    if (!cabin) throw new Error("todo: (getCabinsById) appError");
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
    if (!cabin) throw Error("todo:insertCabin appError")
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
    if (cabin === null) throw Error("todo:deleteCabin appError")
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
    if (!cabin) throw Error("todo:deleteCabin appError")
    res.status(200).json({
        status: "success",
        data: {
            cabin
        }
    })

})
// done : test