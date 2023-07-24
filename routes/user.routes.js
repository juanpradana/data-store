const multer = require('multer');
const express = require('express');

const router = express.Router();
const controller = require('../controllers/user.controller');

// Set up multer for file upload
const storageUpED1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'eddyCov1/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const storageUpED2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'eddyCov2/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadUpED1 = multer({ storage: storageUpED1 });
const uploadUpED2 = multer({ storage: storageUpED2 });

router.use((request, response, next) => {
  response.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

router.post(
  '/upCarbon1',
  uploadUpED1.single('csvFile'),
  controller.addCarbon1,
);

router.post(
  '/upCarbon2',
  uploadUpED2.single('csvFile'),
  controller.addCarbon2,
);

router.post(
  '/loggerCondition',
  controller.addLoggerCondition,
);

router.post(
  '/scc',
  controller.addSCC,
);

router.get('/', (req, res) => {
  res.json({ message: 'ZAN API!' });
});

module.exports = router;
