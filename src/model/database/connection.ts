import * as mysql from "mysql";
import SessionDataRow from "../sessions/SessionDataRow";
const connection = mysql.createConnection({
  host: "80.211.192.47",
  port: 3306,
  user: "root",
  password: "dlugie_haslo_do_bazy"
});

connection.connect();
connection.query("use projekt");

function formatDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function prepareDataForInsert(
  data: Array<SessionDataRow>,
  dataType: string,
  sessionId: Number
) {
  let values = "";
  for (let i = 0; i < data.length - 1; i++) {
    const entry = data[i];
    values += `(${entry.x}, ${entry.y}, ${entry.z}, ${
      entry.time
    }, "${dataType}", ${sessionId}),`;
  }
  const lastEntry = data[data.length - 1];
  values += `(${lastEntry.x}, ${lastEntry.y}, ${lastEntry.z}, ${
    lastEntry.time
  }, "${dataType}", ${sessionId})`;

  return values;
}

export function insertSession(
  date: Date,
  author: string,
  accData: Array<SessionDataRow>,
  gyroData: Array<SessionDataRow>
) {
  return new Promise((resolve, _reject) => {
    //insert into sesje (data,kto) values ("2019-04-05 20:01:44","Bartek");
    //insert into wpisy (x,y,z,timestamp,typ,id_sesji) values (5.5132112,2.5135151,4.31231231,194819841289,"gyro",2);
    let insertedSessionId = -1;
    connection.query(
      `insert into sesje (data, kto) values ("${formatDate(
        date
      )}", "${author}")`,
      function(error, results, fields) {
        if (error) throw error;
        insertedSessionId = results.insertId;

        const values = `${prepareDataForInsert(
          accData,
          "acc",
          insertedSessionId
        )},${prepareDataForInsert(gyroData, "gyro", insertedSessionId)}`;
        connection.query(
          `insert into wpisy (x, y, z, timestamp, typ, id_sesji) values ${values}`,
          function(error, results, fields) {
            resolve();
          }
        );
      }
    );
  });
}

export function getSessions(): Promise<[]> {
  return new Promise((resolve, _) => {
    connection.query("select * from sesje", function(error, results, fields) {
      resolve(results);
    });
  });
}

export function getSessionEntries(sessionId: number) {
  return new Promise((resolve, _) => {
    connection.query(
      `select * from wpisy where id_sesji=${sessionId}`,
      function(error, results, fields) {
        resolve(results);
      }
    );
  });
}
