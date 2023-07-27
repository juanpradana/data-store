const fs = require('fs');
const csvParser = require('csv-parser');
const moment = require('moment-timezone');
const db = require('../models');

const Carbon1 = db.carbon1;
const Carbon2 = db.carbon2;
const SCC = db.scc;
const LoggerDevice = db.loggerDevice;

exports.getOneCarbon1 = (request, response) => {
  Carbon1.findOne({
    order: [['ts', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.getOneCarbon2 = (request, response) => {
  Carbon2.findOne({
    order: [['ts', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.getOneLoggerDevice = (request, response) => {
  LoggerDevice.findOne({
    order: [['ts', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.getOneSCC = (request, response) => {
  SCC.findOne({
    order: [['ts', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.getAverageHourCarbon1 = (request, response) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const data = Carbon1.findAll({
      attributes: [
        [db.Sequelize.fn('date_trunc', 'hour', db.sequelize.col('ts')), 'hour'],
        [db.Sequelize.fn('avg', db.sequelize.col('dht22Temp')), 'dht22Temp'],
        [db.Sequelize.fn('avg', db.sequelize.col('dht22Humi')), 'dht22Humi'],
        [db.Sequelize.fn('avg', db.sequelize.col('dht22HeatIndex')), 'dht22HeatIndex'],
        [db.Sequelize.fn('avg', db.sequelize.col('bmp388Pressure')), 'bmp388Pressure'],
        [db.Sequelize.fn('avg', db.sequelize.col('bmp388Temp')), 'bmp388Temp'],
        [db.Sequelize.fn('avg', db.sequelize.col('bmp388ApprxAltitude')), 'bmp388ApprxAltitude'],
        [db.Sequelize.fn('avg', db.sequelize.col('sht85Humi')), 'sht85Humi'],
        [db.Sequelize.fn('avg', db.sequelize.col('sht85Temp')), 'sht85Temp'],
        [db.Sequelize.fn('avg', db.sequelize.col('co2')), 'co2'],
        [db.Sequelize.fn('avg', db.sequelize.col('ch4')), 'ch4'],
        [db.Sequelize.fn('avg', db.sequelize.col('H2OSHT85')), 'H2OSHT85'],
      ],
      where: {
        ts: {
          [db.Op.between]: [yesterday, startOfToday],
        },
      },
      group: [db.Sequelize.fn('date_trunc', 'hour', db.sequelize.col('ts'))],
    });

    response.json(data);
  } catch (error) {
    response.status(500).json({ error: 'Failed to get average data per hour' });
  }
};

exports.getAverageHourCarbon2 = (request, response) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const data = Carbon2.findAll({
      attributes: [
        [db.Sequelize.fn('date_trunc', 'hour', db.sequelize.col('ts')), 'hour'],
        [db.Sequelize.fn('avg', db.sequelize.col('dht22Temp')), 'dht22Temp'],
        [db.Sequelize.fn('avg', db.sequelize.col('dht22Humi')), 'dht22Humi'],
        [db.Sequelize.fn('avg', db.sequelize.col('dht22HeatIndex')), 'dht22HeatIndex'],
        [db.Sequelize.fn('avg', db.sequelize.col('bmp388Pressure')), 'bmp388Pressure'],
        [db.Sequelize.fn('avg', db.sequelize.col('bmp388Temp')), 'bmp388Temp'],
        [db.Sequelize.fn('avg', db.sequelize.col('bmp388ApprxAltitude')), 'bmp388ApprxAltitude'],
        [db.Sequelize.fn('avg', db.sequelize.col('sht85Humi')), 'sht85Humi'],
        [db.Sequelize.fn('avg', db.sequelize.col('sht85Temp')), 'sht85Temp'],
        [db.Sequelize.fn('avg', db.sequelize.col('co2')), 'co2'],
        [db.Sequelize.fn('avg', db.sequelize.col('ch4')), 'ch4'],
        [db.Sequelize.fn('avg', db.sequelize.col('H2OSHT85')), 'H2OSHT85'],
      ],
      where: {
        ts: {
          [db.Op.between]: [yesterday, startOfToday],
        },
      },
      group: [db.Sequelize.fn('date_trunc', 'hour', db.sequelize.col('ts'))],
    });

    response.json(data);
  } catch (error) {
    response.status(500).json({ error: 'Failed to get average data per hour' });
  }
};

exports.getAverageHourLoggerDevice = async (request, response) => {
  try {
    // Hitung timestamp untuk 24 jam yang lalu
    const twentyFourHoursAgo = moment().tz('Asia/Jakarta').subtract(24, 'hours').toDate();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Query data dari database
    const data = await LoggerDevice.findAll({
      attributes: [
        // Kolom yang ingin dihitung rata-ratanya
        [
          db.Sequelize.fn(
            'date_trunc',
            'hour',
            db.Sequelize.fn('AT TIME ZONE', 'Asia/Jakarta', db.Sequelize.col('ts')),
          ),
          'hour',
        ],
        [db.Sequelize.fn('avg', db.Sequelize.col('cpu_usage')), 'cpu_usage'],
        [db.Sequelize.fn('avg', db.Sequelize.col('mem_gpu')), 'mem_gpu'],
        [db.Sequelize.fn('avg', db.Sequelize.col('mem_arm')), 'mem_arm'],
        [db.Sequelize.fn('avg', db.Sequelize.col('temp')), 'temp'],
      ],
      where: {
        ts: {
          [db.Op.gte]: twentyFourHoursAgo,
        },
      },
      group: ['hour'],
      order: [
        db.Sequelize.fn(
          'date_trunc',
          'hour',
          db.Sequelize.fn('AT TIME ZONE', 'Asia/Jakarta', db.Sequelize.col('ts')),
        ),
      ],
    });

    // Kirim respons dengan data hasil query
    response.json(data);
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Failed to fetch data' });
  }
};

exports.getAverageHourSCC = (request, response) => {
  try {
    // Hitung timestamp untuk 24 jam yang lalu
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Query data dari database
    const data = SCC.findAll({
      attributes: [
        // Kolom yang ingin dihitung rata-ratanya
        [db.Sequelize.fn('date_trunc', 'hour', db.sequelize.col('ts')), 'hour'],
        [db.Sequelize.fn('avg', db.sequelize.col('PV_Voltage')), 'PV_Voltage'],
        [db.Sequelize.fn('avg', db.sequelize.col('PV_Current')), 'PV_Current'],
        [db.Sequelize.fn('avg', db.sequelize.col('PV_Power')), 'PV_Power'],
        [db.Sequelize.fn('avg', db.sequelize.col('Battery_Voltage')), 'Battery_Voltage'],
        [db.Sequelize.fn('avg', db.sequelize.col('Battery_Charge_Current')), 'Battery_Charge_Current'],
        [db.Sequelize.fn('avg', db.sequelize.col('Battery_Charge_Power')), 'Battery_Charge_Power'],
        [db.Sequelize.fn('avg', db.sequelize.col('Load_Current')), 'Load_Current'],
        [db.Sequelize.fn('avg', db.sequelize.col('Load_Power')), 'Load_Power'],
        [db.Sequelize.fn('avg', db.sequelize.col('Battery_Remaining_Percentage')), 'Battery_Remaining_Percentage'],
        [db.Sequelize.fn('avg', db.sequelize.col('Battery_Temperature')), 'Battery_Temperature'],
        [db.Sequelize.fn('avg', db.sequelize.col('Battery_Discharge_Current')), 'Battery_Discharge_Current'],
      ],
      where: {
        ts: {
          [db.Op.gte]: twentyFourHoursAgo,
        },
      },
      group: ['hour'],
      order: [db.Sequelize.fn('date_trunc', 'hour', db.Sequelize.col('ts'))],
    });

    // Kirim respons dengan data hasil query
    response.json(data);
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Failed to fetch data' });
  }
};

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
