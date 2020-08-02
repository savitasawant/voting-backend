const Position = require('../models/Position');
const Candidate = require('../models/Candidate');

exports.createPosition = async(req, res) => {
  try{

    let position = req.body.data;

    // create candidate
    let candidateArray = await Candidate.insertMany(position.candidates, { ordered: false});

    let idsArray = candidateArray.map(res => res._id);

    // store sub application ids
    position.candidates = idsArray;
    
    let result = await Position.create(position); 

    if (!result) {
      return res
        .status(422)
        .json({ status: "error", message: "Failed to create position" });
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
    console.error(`An error occurred white adding a position: ${err}`);
    return res
      .status(500)
      .json({
        status: "error",
        message: "Something went wrong, try again later."
      });
  }
}

// fetch all existing positions
exports.getPositions = async (req, res) => {
  try {
    let [total, positions] = await Promise.all([
      Position.countDocuments({}),
      Position.find({})
        .populate("candidates")
        .exec()
    ]);

    if (!positions) {
      return res
        .status(422)
        .json({ status: "error", message: "Data not found" });
    }
    return res
      .status(200)
      .json({ status: "success", data: { total, positions } });
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
