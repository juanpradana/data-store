const fs = require('fs');
const csvParser = require('csv-parser');
const moment = require('moment-timezone');
const db = require('../models');

const Carbon1 = db.carbon1;
const Carbon2 = db.carbon2;
const SCC = db.scc;
const LoggerDevice = db.loggerDevice;
const DHT1 = db.dht1;
const DHT2 = db.dht2;
const LogStatus1 = db.logStatus1;
const LogStatus2 = db.logStatus2;

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

exports.getOneDHT1 = (request, response) => {
  DHT1.findOne({
    order: [['ts', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.getOneDHT2 = (request, response) => {
  DHT2.findOne({
    order: [['ts', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.get50LogStatus1 = (request, response) => {
  LogStatus1.findOne({
    limit: 50,
    order: [['createdAt', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.get50LogStatus2 = (request, response) => {
  LogStatus2.findOne({
    limit: 50,
    order: [['createdAt', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.getAverageHourCarbon1 = async (request, response) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const data = await Carbon1.findAll({
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

exports.getAverageHourCarbon2 = async (request, response) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const data = await Carbon2.findAll({
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

    // Query data dari database
    const data = await LoggerDevice.findAll({
      attributes: [
        // Kolom yang ingin dihitung rata-ratanya
        [
          db.Sequelize.literal(
            'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
          ),
          'time',
        ],
        [db.Sequelize.literal('avg("cpu_usage")'), 'cpu_usage'],
        [db.Sequelize.literal('avg("mem_gpu")'), 'mem_gpu'],
        [db.Sequelize.literal('avg("mem_arm")'), 'mem_arm'],
        [db.Sequelize.literal('avg("temp")'), 'temp'],
      ],
      where: {
        ts: {
          [db.Op.gte]: twentyFourHoursAgo,
        },
      },
      group: [
        db.Sequelize.literal(
          'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
        ),
      ],
      order: [
        db.Sequelize.literal(
          'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
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

exports.getAverageHourSCC = async (request, response) => {
  try {
    // Hitung timestamp untuk 24 jam yang lalu
    const twentyFourHoursAgo = moment().tz('Asia/Jakarta').subtract(24, 'hours').toDate();

    // Query data dari database
    const data = await SCC.findAll({
      attributes: [
        // Kolom yang ingin dihitung rata-ratanya
        [
          db.Sequelize.literal(
            'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
          ),
          'time',
        ],
        [db.Sequelize.literal('avg("PV_Voltage")'), 'PV_Voltage'],
        [db.Sequelize.literal('avg("PV_Current")'), 'PV_Current'],
        [db.Sequelize.literal('avg("PV_Power")'), 'PV_Power'],
        [db.Sequelize.literal('avg("Battery_Voltage")'), 'Battery_Voltage'],
        [db.Sequelize.literal('avg("Battery_Charge_Current")'), 'Battery_Charge_Current'],
        [db.Sequelize.literal('avg("Battery_Charge_Power")'), 'Battery_Charge_Power'],
        [db.Sequelize.literal('avg("Load_Current")'), 'Load_Current'],
        [db.Sequelize.literal('avg("Load_Power")'), 'Load_Power'],
        [db.Sequelize.literal('avg("Battery_Remaining_Percentage")'), 'Battery_Remaining_Percentage'],
        [db.Sequelize.literal('avg("Battery_Temperature")'), 'Battery_Temperature'],
        [db.Sequelize.literal('avg("Battery_Discharge_Current")'), 'Battery_Discharge_Current'],
      ],
      where: {
        ts: {
          [db.Op.gte]: twentyFourHoursAgo,
        },
      },
      group: [
        db.Sequelize.literal(
          'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
        ),
      ],
      order: [
        db.Sequelize.literal(
          'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
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

exports.getAverageHourDHT1 = async (request, response) => {
  try {
    // Hitung timestamp untuk 24 jam yang lalu
    const twentyFourHoursAgo = moment().tz('Asia/Jakarta').subtract(24, 'hours').toDate();

    // Query data dari database
    const data = await DHT1.findAll({
      attributes: [
        // Kolom yang ingin dihitung rata-ratanya
        [
          db.Sequelize.literal(
            'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
          ),
          'time',
        ],
        [db.Sequelize.literal('avg("humanTime")'), 'humanTime'],
        [db.Sequelize.literal('avg("dht22Temp")'), 'dht22Temp'],
        [db.Sequelize.literal('avg("dht22Humi")'), 'dht22Humi'],
        [db.Sequelize.literal('avg("dht22HeatIndex")'), 'dht22HeatIndex'],
      ],
      where: {
        ts: {
          [db.Op.gte]: twentyFourHoursAgo,
        },
      },
      group: [
        db.Sequelize.literal(
          'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
        ),
      ],
      order: [
        db.Sequelize.literal(
          'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
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

exports.getAverageHourDHT2 = async (request, response) => {
  try {
    // Hitung timestamp untuk 24 jam yang lalu
    const twentyFourHoursAgo = moment().tz('Asia/Jakarta').subtract(24, 'hours').toDate();

    // Query data dari database
    const data = await DHT2.findAll({
      attributes: [
        // Kolom yang ingin dihitung rata-ratanya
        [
          db.Sequelize.literal(
            'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
          ),
          'time',
        ],
        [db.Sequelize.literal('avg("humanTime")'), 'humanTime'],
        [db.Sequelize.literal('avg("dht22Temp")'), 'dht22Temp'],
        [db.Sequelize.literal('avg("dht22Humi")'), 'dht22Humi'],
        [db.Sequelize.literal('avg("dht22HeatIndex")'), 'dht22HeatIndex'],
      ],
      where: {
        ts: {
          [db.Op.gte]: twentyFourHoursAgo,
        },
      },
      group: [
        db.Sequelize.literal(
          'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
        ),
      ],
      order: [
        db.Sequelize.literal(
          'date_trunc(\'hour\', "ts" AT TIME ZONE \'Asia/Jakarta\')',
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

exports.addDHT1 = (request, response) => {
  DHT1.create({
    ts: request.body.ts,
    humanTime: request.body.humanTime,
    dht22Temp: request.body.dht22Temp,
    dht22Humi: request.body.dht22Humi,
    dht22HeatIndex: request.body.dht22HeatIndex,
  });
  response.status(200).send({ message: 'success' });
};

exports.addDHT2 = (request, response) => {
  DHT2.create({
    ts: request.body.ts,
    humanTime: request.body.humanTime,
    dht22Temp: request.body.dht22Temp,
    dht22Humi: request.body.dht22Humi,
    dht22HeatIndex: request.body.dht22HeatIndex,
  });
  response.status(200).send({ message: 'success' });
};

exports.addLogStatus1 = (request, response) => {
  LogStatus1.create({
    log: request.body.log,
  });
  response.status(200).send({ message: 'success' });
};

exports.addLogStatus2 = (request, response) => {
  LogStatus2.create({
    log: request.body.log,
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
