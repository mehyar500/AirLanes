const router = require("express").Router();
const controllers = require("../../db/controllers");

//Matches with "/api/airlane"
router
  .route("/")
  .get(controllers.airlane.findAll)
  .post(controllers.airlane.create);

//Matches with "/api/airlane/:id"
router
  .route("/:id")
  .get(controllers.airlane.findById)
  .put(controllers.airlane.update)
  .delete(controllers.airlane.remove);

module.exports = router;
