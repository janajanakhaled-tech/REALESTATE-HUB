const getProfile = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

module.exports = {
  getProfile,
};