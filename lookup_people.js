const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query("SELECT * FROM famous_people WHERE first_name LIKE 'Lincoln' OR last_name LIKE 'Lincoln'", (err, queryResult) => {

    if (err) return console.error("error running query", err);

    console.log("queryResult.rows =\n", queryResult.rows);

    function logPersonInfo(queryResult) {
      for (idx in queryResult.rows) {
        let person = {
          id: queryResult.rows[idx].id,
          first_name: queryResult.rows[idx].first_name,
          last_name: queryResult.rows[idx].last_name,
          birthdate: queryResult.rows[idx].birthdate
        };
        console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born '${person.birthdate}'`);
      }
    }

    console.log("Searching ...");
    console.log(`Found ${queryResult.rows.length} person(s) by the name 'Lincoln':\n`);
    logPersonInfo(queryResult);

    client.end();
  });
});



//--------------------------------
// const person = process.argv[2];
// console.log("name given =", person);

//SELECT * FROM famous_people WHERE name LIKE '${person}%' OR name LIKE '%${person}'