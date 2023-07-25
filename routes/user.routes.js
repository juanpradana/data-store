const multer = require('multer');
const express = require('express');
const fs = require('fs');

const router = express.Router();
const controller = require('../controllers/user.controller');

const edCov1Dir = 'eddyCov1';
const edCov2Dir = 'eddyCov2';

const createDirectoryIfNotExist = (directoryName) => {
  if (!fs.existsSync(directoryName)) {
    fs.mkdirSync(directoryName);
    console.log(`Direktori ${directoryName} berhasil dibuat.`);
  } else {
    console.log(`Direktori ${directoryName} sudah ada.`);
  }
};

createDirectoryIfNotExist(edCov1Dir);
createDirectoryIfNotExist(edCov2Dir);

// Set up multer for file upload
const storageUpED1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, edCov1Dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const storageUpED2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, edCov2Dir);
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

router.get('/', (req, res) => {
  res.json({ message: 'ZAN API!' });
});

router.get(
  '/getOneCarbon1',
  controller.getOneCarbon1,
);

router.get(
  '/getOneCarbon2',
  controller.getOneCarbon2,
);

router.get(
  '/getOneLoggerDevice',
  controller.getOneLoggerDevice,
);

router.get(
  '/getOneSCC',
  controller.getOneSCC,
);

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

module.exports = router;
