const roleCheck = (availableRoles) => {
  return (req, res, next) => {
    //for create sub user start
    if (req.user.role === "root") req.canCreate = ["admin", "uploader"];
    if (req.user.role === "admin") req.canCreate = ["uploader"];
    // for update sub user end
    if (!availableRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You don't have permission to do this action",
      });
    }
    next();
  };
};
module.exports = roleCheck;
