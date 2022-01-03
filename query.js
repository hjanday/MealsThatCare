const parse = require("pg-connection-string").parse;
const { Client } = require("pg");
const prompt = require("prompt");
const express = require('express');
const server = express();
const port = 3000;





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

    
    

    // for (let i = 0; i < 3; i++) {
    //   console.log(result.rows[i])
    // }
    //console.log(await (await client.query(selectQ)));
  
    
        // const table = document.getElementById("Table");
        // let count = querying.rows.length;
    
        // let h = 200*count;
        // table.style.height=h+"px";  
        // for (let i=0; i<count; i++){
        //   let row = table.insertRow(i);
    
          
    
        //    row.innerHTML = `<td class="bankName">${querying.rows[i].name}``</td><td class="desription"><p id="test">${querying.rows[i].description}``</p></td><td><a class= "hyper" id="'+i+'" href="second.html" onclick=" return MoreId(this.id)">Learn More</a></td>`;
        // }
         
      



        const selectQ = `SELECT * FROM bankData WHERE items LIKE '%can%'`;
        const querying = (await (await (client.query(selectQ))));

    
    for(var i = 0; i<querying.rows.length;i++){
      console.log(`Names: ${querying.rows[i].name}`);
      console.log(`Addresses: ${querying.rows[i].address}`);
      console.log(`Links: ${querying.rows[i].hyperlink}`);
      
      
    }

  } catch (err) {
    console.log(`error connecting: ${err}`)
  }

  

 
//   server.get('/test', (req, res) => {
//     res.send(`Name: ${querying.rows[0].name} Address: ${querying.rows[0].address}  Link: ${querying.rows[0].hyperlink}`);

// })
// server.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
 
  //Exit program
  process.exit();
})().catch((err) => console.log(err.stack));

