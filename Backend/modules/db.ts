const { MongoClient } = require('mongodb');

const url = "mongodb+srv://sukoco:T8dv9N3FYAuiKtJy@cse416.xaulrya.mongodb.net/?retryWrites=true&w=majority";;
const dbName = 'sukoco';

// Create a connection pool
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to connect to the database
async function connect() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const db = client.db(dbName);
    
    // Return the database connection
    return db;
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
}

// Export the connect function
module.exports = connect;