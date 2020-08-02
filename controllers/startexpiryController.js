const StartExpiry = require('../models/StartExpiry');

exports.createStartExpiry = async(req, res) => {
  try{

    let startexpiry = req.body.data;
    
    let result = await StartExpiry.create(startexpiry); 

    if (!result) {
      return res
        .status(422)
        .json({ status: "error", message: "Failed to submit date" });
    }
    return res
      .status(200)
      .json({
        status: "success",
        message: "Data created successfully.",
        data: result
      });

  }
  catch (err) {
    console.error(`An error occurred white submission: ${err}`);
    return res
      .status(500)
      .json({
        status: "error",
        message: "Something went wrong, try again later."
      });
  }
}

// fetch all existing positions
exports.getStartExpiry = async (req, res) => {
  try {
    let result = await StartExpiry.find();

    if (!result) {
      return res
        .status(422)
        .json({ status: "error", message: "Data not found" });
    }
    return res
      .status(200)
      .json({ status: "success", data: result });
  } catch (err) {
    console.error(`An error occurred while fetching the data: ${err}`);
    return res
      .status(500)
      .json({
        status: "error",
        message: "Something went wrong, try again later."
      });
  }
};

exports.updateStartExpiry = async(req, res) => {
  try{

    let { data } = req.body;
    let { id } = req.params;

    let result = await StartExpiry.findByIdAndUpdate(id, data, { new: true });

    if (!result) {
      return res
        .status(422)
        .json({ status: "error", message: "Failed to update date" });
    }
    return res
      .status(200)
      .json({
        status: "success",
        message: "Data created successfully.",
        data: result
      });

  }
  catch (err) {
    console.error(`An error occurred white submission: ${err}`);
    return res
      .status(500)
      .json({
        status: "error",
        message: "Something went wrong, try again later."
      });
  }
}