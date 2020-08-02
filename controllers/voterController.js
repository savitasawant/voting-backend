const Voter = require("../models/Voter");
const Candidate = require("../models/Candidate");

exports.createVote = async (req, res) => {
  try {
    let reqData = req.body.data;
    let { votes } = req.body.data;

    await Promise.all(
      votes.map(vote => {
        Candidate.updateOne(
          { name: vote.selected_candidate },
          { $inc: { total_vote: 1 } },
          function(err, success) {
            if (err) {
              console.log(`Error : ${err}`);
            } else if (success) {
              console.log(`Success : ${success}`);
            } else {
              console.log(`Error`);
            }
          }
        );
      })
    );

    let result = await Voter.create(reqData);

    if (!result) {
      return res
        .status(422)
        .json({ status: "error", message: "Failed to submit" });
    }
    return res.status(200).json({
      status: "success",
      message: "Data save successfully.",
      data: result
    });
  } catch (err) {
    console.error(`An error occurred white voting: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong, try again later."
    });
  }
};
