const User = require("../models/userModel");

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const user = await User.find({ username: { $regex: req.query.username } })
        .limit(10)
        .select("fullname username avatar");
      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl