const oracledb = require('oracledb');

const executeQuery = async (query) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query);
    return result.rows.map(row => {
      const obj = {};
      result.metaData.forEach((meta, index) => {
        obj[meta.name] = row[index];
      });
      return obj;
    });
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await executeQuery('SELECT * FROM cp_product');
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching data from database');
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const products = await executeQuery('SELECT * FROM cp_product');
    const single = products.filter(product => product.PRODUCT_ID == req.params.id);
    res.json(single);
  } catch (err) {
    res.status(500).send('Error fetching data from database');
  }
};


const getCustomers = async (req, res) => {
  try {
    const products = await executeQuery('SELECT * FROM cp_customer');
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching data from database');
  }
};

const getOrders = async (req, res) => {
  try {
    const products = await executeQuery('SELECT * FROM cp_orders');
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching data from database');
  }
};

const getManufacturers = async (req, res) => {
  try {
    const products = await executeQuery('SELECT * FROM cp_manufacturer');
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching data from database');
  }
};

const getOrderItems = async (req, res) => {
  try {
    const products = await executeQuery('SELECT * FROM cp_orderitems');
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching data from database');
  }
};

const registerUser = async (req, res) => {
  const { fname, lname, email, address, city, province, postalcode} = req.body;
  const pquery = `
      BEGIN
      cp_add_customer_sp('${fname}', '${lname}', '${email}', '${address}', '${city}', '${province}', '${postalcode}');
      END;
    `;
    const connection = await oracledb.getConnection();
    try {
      const result = await connection.execute(pquery);
      await connection.commit();
      res.status(200).json({ message: 'User registered successfully' });

    }
    catch (err) {
      res.status(500).send('Error registering user: ' + err.message);
      console.log(err)
    }
}

const addProduct = async (req, res) => {
  const { pname, manufactureid, details, colour, size, storage, cost, retail, sale, photos, stock } = req.body;
  // const query = `
  //   INSERT INTO cp_product (product_id, product_name, manuf_id, prod_details, colour, screen_size, storage_size, cost, retail_price, sale_price, photos, stock)
  //   VALUES (product_num_seq.nextval, '${pname}', ${manufactureid}, '${details}', '${colour}', ${size}, ${storage}, ${cost}, ${retail}, ${sale}, '${photos}', ${stock})
  // `;
  const pquery = `
      BEGIN
      cp_add_product_sp('${pname}', ${manufactureid}, '${details}', '${colour}', ${size}, ${storage}, ${cost}, ${retail}, ${sale}, '${photos}', ${stock});
      END;
    `;
  const connection = await oracledb.getConnection();
  try {
    const result = await connection.execute(pquery);
    await connection.commit();
    res.status(200).json({ message: 'Product added successfully' });

  }
  catch (err) {
    res.status(500).send('Error fetching data from database');
    console.log(err)
  }
}

const updateProduct = async (req, res) => {
  const { id, pname, manufactureid, details, colour, size, storage, cost, retail, sale, photos, stock } = req.body;
  const query = `
  UPDATE cp_product 
  SET 
      product_name = '${pname}',
      manuf_id = ${manufactureid},
      prod_details = '${details}',
      colour = '${colour}',
      screen_size = ${size},
      storage_size = ${storage},
      cost = ${cost},
      retail_price = ${retail},
      sale_price = ${sale},
      photos = '${photos}',
      stock = ${stock}
  WHERE 
    product_id = ${id}
  `;


  const connection = await oracledb.getConnection();
  try {
    const result = await connection.execute(query);
    await connection.commit();
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).send('Error updating product in the database');
    console.error(err);
  } finally {
    await connection.close(); // Close connection after usage
  }
}
const updatecustomer = async (req, res) => {
  const { id, fname, lname, email, address, city, province, postalcode} = req.body;
  const query = `
    UPDATE cp_customer
    SET
      first_name = '${fname}',
      last_name = '${lname}',
      email = '${email}',
      address = '${address}',
      city = '${city}',
      province = '${province}',
      postal_code = '${postalcode}'
    WHERE
      cust_num = ${id}
  `;
  
  const connection = await oracledb.getConnection();
  try {
    const result = await connection.execute(query);
    await connection.commit();
    res.status(200).json({ message: 'User details updated successfully' });
  } catch (err) {
    res.status(500).send('Error updating user details: ' + err.message);
    console.error(err);
  }
}

const deleteuser = async(req, res) => {
  const id = req.params.id;
  // console.log(customerId)
  // Construct SQL DELETE statement
  const query = `
    DELETE FROM cp_customer
    WHERE cust_num = ${Number(id)}
  `;

  const connection = await oracledb.getConnection();
  try {
    // Execute the DELETE query
    const result = await connection.execute(query);
    await connection.commit();
    // Check if any rows were affected
    if (result.rowsAffected && result.rowsAffected > 0) {
      res.status(200).json({ message: 'Customer deleted successfully' });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).send('Error deleting customer: ' + error.message);
    console.error(error);
  } finally {
    // Release the database connection
    await connection.close();
  }
}

const deleteproduct = async(req, res) => {
  const id = req.params.id;
  // console.log(typeofid)
  // Construct SQL DELETE statement
  const query = `
    DELETE FROM cp_product
    WHERE product_id = ${Number(id)}
  `;

  const connection = await oracledb.getConnection();
  try {
    // Execute the DELETE query
    const result = await connection.execute(query);
    await connection.commit();
    // Check if any rows were affected
    if (result.rowsAffected && result.rowsAffected > 0) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).send('Error deleting customer: ' + error.message);
    console.error(error);
  } finally {
    // Release the database connection
    await connection.close();
  }
}

module.exports = { getProducts, getCustomers, getOrders, getManufacturers, getOrderItems, getSingleProduct, addProduct,registerUser,updateProduct ,updatecustomer,deleteuser,deleteproduct}