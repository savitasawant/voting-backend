
const Candidate = require('../models/Candidate');

// update sub application
exports.updateCandidate = async (req, res) => {
  try {
    let { candidate } = req.body;
    let { id } = req.params;

    let result = await SubApp.findByIdAndUpdate(id, subApp, { new: true })
      .exec();

    if (!result) {
      return res
        .status(422)
        .json({ status: "error", message: "Sub application not found." });
    }
    return res
      .status(200)
      .json({
        status: "success",
        message: "Sub application has been updated.",
        data: result
      });
  } catch (err) {
    console.error(`An error occurred while updating sub application: ${err}`);
    return res
      .status(500)
      .json({
        status: "error",
        message: "Something went wrong, try again later."
      });
  }
};