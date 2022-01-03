const parse = require("pg-connection-string").parse;
const { Client } = require("pg");
const prompt = require("prompt");

(async () => {

  prompt.start()
  const URI = await prompt.get("connectionString");
  var connectionString;
  // Expand $env:appdata environment variable in Windows connection string
  if (URI.connectionString.includes("env:appdata")) {
    connectionString = await URI.connectionString.replace(
      "$env:appdata",
      process.env.APPDATA
    );
  }
  // Expand $HOME environment variable in UNIX connection string
  else if (URI.connectionString.includes("HOME")) {
    connectionString = await URI.connectionString.replace(
      "$HOME",
      process.env.HOME
    );
  }
  var config = parse(connectionString);
  config.port = 26257;
  config.database = 'bank';
  const client = new Client(config);

  // Connect to database
  try {
    await client.connect();
    console.log("Hey! You successfully connected to your CockroachDB cluster.")

    //Displaying the database info
    const selectQ = "SELECT * FROM bankData";
    const querying = await (await client.query(selectQ));
    for(var i = 0; i<querying.rows.length;i++){
      console.log(querying.rows[i]);
    }

  } catch (err) {
    console.log(`error connecting: ${err}`)
  }

  // Exit program
  process.exit();
})().catch((err) => console.log(err.stack));