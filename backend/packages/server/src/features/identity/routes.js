const Router = require("koa-router");
const { getIds } = require("./controllers/ids");

const router = new Router();
router.post("/pass3d/short-ids", getIds);

module.exports = router;
