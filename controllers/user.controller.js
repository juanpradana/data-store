const fs = require('fs');
const csvParser = require('csv-parser');
const db = require('../models');

const Carbon1 = db.carbon1;
const Carbon2 = db.carbon2;
const SCC = db.scc;
const LoggerDevice = db.loggerDevice;

exports.addLoggerCondition = (request, response) => {
  LoggerDevice.create({
    ts: request.body.ts,
    humanTime: request.body.humanTime,
    cpu_usage: request.body.cpu_usage,
    mem_gpu: request.body.mem_gpu,
    mem_arm: request.body.mem_arm,
    temp: request.body.temp,
  });
  response.status(200).send({ message: 'success' });
};

exports.addSCC = (request, response) => {
  SCC.create({
    ts: request.body.ts,
    humanTime: request.body.humanTime,
    PV_Voltage: request.body.PV_Voltage,
    PV_Current: request.body.PV_Current,
    PV_Power: request.body.PV_Power,
    Battery_Voltage: request.body.Battery_Voltage,
    Battery_Charge_Current: request.body.Battery_Charge_Current,
    Battery_Charge_Power: request.body.Battery_Charge_Power,
    Load_Current: request.body.Load_Current,
    Load_Power: request.body.Load_Power,
    Battery_Remaining_Percentage: request.body.Battery_Remaining_Percentage,
    Battery_Temperature: request.body.Battery_Temperature,
    Battery_Discharge_Current: request.body.Battery_Discharge_Current,
  });
  response.status(200).send({ message: 'success' });
};

exports.addCarbon1 = (request, response) => {
  if (!request.file) {
    return response.status(400).send('No CSV file uploaded');
  }

  const data = [];
  fs.createReadStream(request.file.path)
    .pipe(csvParser())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      // Masukkan data dari CSV ke tabel di database
      Carbon1.bulkCreate(data)
        .then(() => {
          response.status(200).send('Data imported successfully');
        })
        .catch((err) => {
          console.error('Error:', err);
          response.status(500).send('Failed to import data');
        });
    });
};

exports.addCarbon2 = (request, response) => {
  if (!request.file) {
    return response.status(400).send('No CSV file uploaded');
  }

  const data = [];
  fs.createReadStream(request.file.path)
    .pipe(csvParser())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      // Masukkan data dari CSV ke tabel di database
      Carbon2.bulkCreate(data)
        .then(() => {
          response.status(200).send('Data imported successfully');
        })
        .catch((err) => {
          console.error('Error:', err);
          response.status(500).send('Failed to import data');
        });
    });
};
