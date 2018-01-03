const router = require("express").Router();
const airlaneRoutes = require("./airlane");

// Saved routes
router.use("/airlane", airlaneRoutes);

module.exports = router;
