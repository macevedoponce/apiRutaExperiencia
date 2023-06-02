const { Router } = require('express');
const {
  getSedes,
  //   getSede,
  //   postSede,
  //   putSede,
  //   deleteSede,
} = require('../controllers/sede');

const router = Router();

router.get('/', getSedes);

// router.get("/:id", getSede);

// router.post("/", postSede);

// router.put("/:id", putSede);

// router.delete("/:id", deleteSede);

module.exports = router;
