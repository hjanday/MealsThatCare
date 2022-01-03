const parse = require("pg-connection-string").parse;
const { Client } = require("pg");
const prompt = require("prompt");
const express = require('express');
const server = express();
const port = 3000;


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
    client.connect();
    const selectQ = `SELECT * FROM bankData WHERE items LIKE '%can%'`;
        const querying = client.query(selectQ);
  server.get('/test', (req, res) => {
    res.send(`Name: ${querying.rows[0].name} Address: ${querying.rows[0].address}  Link: ${querying.rows[0].hyperlink}`);

})
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



