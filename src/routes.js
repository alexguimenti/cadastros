const express = require('express')
const mysql = require('mysql')
//const ObjectsToCsv = require('objects-to-csv')
const routes = express.Router()
const credentials = require("./app/controllers/DBController");

customers = [];

var connection = mysql.createConnection({
  // properties...
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database
})

connection.connect(error => {
  if (error) {
    console.log(error)
  } else {
    console.log('Connected!')
  }
})

routes.get('/', (req, res) => {
  return res.send('Hello World')
})

routes.get('/test', (req, res) => {
  
  // about mysql
  connection.query(
    `SELECT customer_id, B/A AS 'diff' from 

    (SELECT  P.customer_id,
        COUNT(
            CASE 
                WHEN date(P.create_date)='2019-08-07' 
                THEN 1 
                ELSE NULL 
            END
        ) AS A, 
       COUNT(
            CASE 
                WHEN date(P.create_date)='2019-08-08' 
                THEN 1 
                ELSE NULL 
            END
        ) AS B
          
    FROM    cadastros P
    GROUP BY P.customer_id) AS C
    WHERE B/A < 0.7
    group BY customer_id `,
    (error, rows, fiedls) => {
      if (error) {
        console.log(error)
      } else {

        console.log("")
        console.log("")
        console.log('Succesful query!')
        console.log("")
        console.log(`Amount: ${rows.length}`)
        console.log("")
        for(let i = 0; i < rows.length; i++){
          customers.push(rows[i].customer_id);
        }
        console.log("==========")
        console.log("Customers:")
        console.log(customers)
        res.send(rows)

      }
    }
  )
})

routes.get('*', (req, res) => {
  return res.send('Essa página não existe!')
})

module.exports = routes
