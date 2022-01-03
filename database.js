const parse = require("pg-connection-string").parse;
const { Client } = require("pg");
const prompt = require("prompt");
let Table = [];
let TableOfItems = [];
let learnMoreIDs = [];
let locations = [];

let contact = [];
(async () => {

  prompt.start()
  const URI = await prompt.get("connectionString");
  var connectionString;
  
  if (URI.connectionString.includes("env:appdata")) {
    connectionString = await URI.connectionString.replace(
      "$env:appdata",
      process.env.APPDATA
    );
  }


  var config = parse(connectionString);
  config.port = 26257;
  config.database = 'bank';
  const client = new Client(config);
  client.connect();
  const selectQ = "SELECT * FROM bankData";
  const querying = await (await client.query(selectQ));

for(var i = 0; i<querying.rows.length;i++){
  Table.push(querying.rows[i].name);
  TableOfItems.push([querying.rows[i].items]);
  locations.push([querying.rows[i].longlat])
  contact.push([querying.rows[i].address, querying.rows[i].contact, querying.rows[i].hyperlink])

}
})