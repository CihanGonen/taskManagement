const router = require("express").Router();
const generalController = require("../controllers/generalController");
const authorization = require("../middlewares/authorization");

router.get("/baskanlik", generalController.baskanlik_get);
router.post("/baskanlik", generalController.baskanlik_post);

router.get("/yetki", generalController.yetki_get);

router.post("/talep", authorization, generalController.talep_post);
router.get("/talep", generalController.talep_getAll);
router.get("/talep/:talepId", authorization, generalController.talep_getOne);
router.put("/talep/:talepId", generalController.talep_ataPut);

router.post("/yorum", generalController.yorum_post);
router.get("/yorum/:talepId", generalController.yorum_get);

module.exports = router;
