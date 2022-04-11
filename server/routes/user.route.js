const router = require("express").Router();

//check user role
const roleCheckMiddleware = require("../middlewares/roleCheck.middleware");
//check user token
const { checkToken } = require("../middlewares/auth");

const userController = require("../controllers/user.controller");

const canCreateMiddleware = (req, res, next) => {
    console.log(req.canCreate);
  if (!req.canCreate.includes(req.body.role)) {
    return res.status(403).json({
        message: "You can't create this role",
      });
    } else {
      next();
  }
};

router.use(checkToken);
router.use(roleCheckMiddleware(["root", "admin"]));

router.route("/createUser").post(canCreateMiddleware,userController.createUser);


module.exports = router;
