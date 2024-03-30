const oracledb = require('oracledb');
// Database connection configuration

const dbConfig = {
    user: 'COMP122_M23_za_56 ',
    password: '300500869 ',
    connectString: '199.212.26.208:1521/sqld' // Example connectString format for Oracle XE
  };

  async function connectDatabase() {
    // oracledb.initOracleClient({
    //   // initialization configuration
    // });
  
    try {
      await oracledb.createPool(dbConfig);
      console.log('Connected to the database');
  
      // Test the database connection by executing a simple query
      const connection = await oracledb.getConnection();
      // await connection.execute('SELECT 1 FROM DUAL');
      console.log('Database connection test successful');
  
      // Release the connection back to the pool
      await connection.close();
    } catch (err) {
      console.error('Error connecting to the database:', err);
    }
  }
  

module.exports = connectDatabase;