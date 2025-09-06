// Protected profile route
export const getProfile = (req, res) => {
  res.json({
    message: "Your profile",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
};
