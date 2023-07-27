# data-store
This project used for data store carbon monitoring data (for temporary and can be enhance the features soon)

## Requirement
Node.js version on author machine running: **v18.13.0**

## Database Setup
- Install Postgresql server
- Create user, example using ```psql```: ```CREATE USER zan WITH PASSWORD 'zan123';```
- Create database, example using ```psql```: ```CREATE DATABASE zan_db;```
- Give zan_db database permission to user zan, example using ```psql```: ```GRANT ALL PRIVILEGES ON DATABASE zan_db TO zan;```
- Connect to zan_db database, example using ```psql```: ```\c zan_db```
- From zan_db give public schema permission to user zan, example using ```psql```: ```GRANT ALL ON SCHEMA public TO zan;```

## Backend Setup
- install nodejs v18.13.0
- ```git clone https://github.com/juanpradana/data-store.git```
- ```cd data-store```
- ```npm i```
- Make adjustments to the files *dataCarbon.config.js* or *.env*, and adjust file data-store/model/index.js
- ```node index```

## Request Documentation
| Methods | Endpoints | Details |
| --- | --- | --- |
| GET | /api | Return message: 'ZAN API!' |
| GET | /api/getOneCarbon1 | Return json one of last data on carbon1 from database |
| GET | /api/getOneCarbon2 | Return json one of last data on carbon2 from database |
| GET | /api/getOneLoggerDevice | Return json one of last data on loggerDevice from database |
| GET | /api/getOneSCC | Return json one of last data on scc from database |
| GET | /api/getLastDayCarbon1 | Return json data average every hour yerterday carbon1 from database |
| GET | /api/getLastDayCarbon2 | Return json data average every hour yerterday carbon2 from database |
| GET | /api/getAvgLoggerDevice | Return json data average every hour last 24 hours logger condition from database |
| GET | /api/getAvgSCC | Return json data average every hour last 24 hours SCC from database |
| POST | /api/upCarbon1 | Body data is form-data with key csvFile and value file <urCSVfile.csv> will be saved on server directory eddyCov1 and append to database |
| POST | /api/upCarbon2 | Body data is form-data with key csvFile and value file <urCSVfile.csv> will be saved on server directory eddyCov2 and append to database |
| POST | /api/loggerCondition | Body data is json will be saved on database |
| POST | /api/scc | Body data is json will be saved on database |

### Note
- csv header file carbon and value must be:
  ```text
    ts: INTEGER,
    humanTime: STRING,
    dht22Temp: FLOAT,
    dht22Humi: FLOAT,
    dht22HeatIndex: FLOAT,
    bmp388Pressure: FLOAT,
    bmp388Temp: FLOAT,
    bmp388ApprxAltitude: FLOAT,
    sht85Humi: FLOAT,
    sht85Temp: FLOAT,
    co2: INTEGER,
    ch4: INTEGER,
    H2OSHT85: FLOAT
  ```
- json example for /loggerCondition:
  ```json
  {
    "ts": 1690269949330,
    "humanTime": "2023/07/25 14:25:49",
    "cpu_usage": 21,
    "mem_gpu": 76M,
    "mem_arm": 948,
    "temp": 43.8
  }
  ```
- json example for /scc:
  ```json
  {
    "ts": 1690269957302,
    "humanTime": "2023/07/25 14:25:57",
    "PV_Voltage": 64.28,
    "PV_Current": 0.36,
    "PV_Power": 23.72,
    "Battery_Voltage": 55.18,
    "Battery_Charge_Current": 0.43,
    "Battery_Charge_Power": 23.18,
    "Load_Current": 0.32,
    "Load_Power": 17.67,
    "Battery_Remaining_Percentage": 99,
    "Battery_Temperature": 0,
    "Battery_Discharge_Current": 0.1
  }
  ```
## Example Request Result
### POST /api/loggerCondition
![image](https://github.com/juanpradana/data-store/assets/30497994/e72e32ec-d8f3-45ec-949d-3f6489391bae)
![image](https://github.com/juanpradana/data-store/assets/30497994/902bb9b5-9e04-4db0-88f6-4934837b6f24)

### POST /api/scc
![image](https://github.com/juanpradana/data-store/assets/30497994/13503599-2d94-4b9f-8e14-e84967d4f2e7)
![image](https://github.com/juanpradana/data-store/assets/30497994/e4f4e82c-3ed6-4dc0-9957-7b1d36d4ae53)

### POST /api/upCarbon1 and /api/upCarbon2
![image](https://github.com/juanpradana/data-store/assets/30497994/835f62d5-16e8-4243-8230-4dd32828390a)
![image](https://github.com/juanpradana/data-store/assets/30497994/dc03e2e1-f823-47fa-a8dc-305a5f90f082)
![image](https://github.com/juanpradana/data-store/assets/30497994/1df9bb18-f2be-4560-a2fa-5a3534c1de4e)

### GET /api
![image](https://github.com/juanpradana/data-store/assets/30497994/d54493ed-5afc-4306-9fb7-e57dd5561e2c)

### GET /api/getOneCarbon1
![image](https://github.com/juanpradana/data-store/assets/30497994/62596018-127d-4aa3-8560-76bff5b9c70f)

### GET /api/getOneCarbon2
![image](https://github.com/juanpradana/data-store/assets/30497994/68cc7a8b-f799-470b-9257-78f35e03389b)

### GET /api/getOneLoggerDevice
![image](https://github.com/juanpradana/data-store/assets/30497994/44b5c98e-c473-4d60-97da-c97be3e2eefb)

### GET /api/getOneSCC
![image](https://github.com/juanpradana/data-store/assets/30497994/37a945c5-b8b8-4ddf-aff5-77c6d384c773)
