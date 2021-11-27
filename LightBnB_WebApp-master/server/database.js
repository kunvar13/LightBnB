const { query } = require('express');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT * 
          FROM users 
          WHERE email = $1`, [email])
    .then((result) => result.rows)
    .catch((err) => {
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`SELECT * 
        FROM users 
        WHERE email = $1`, [id])
    .then((result) => result.rows)
    .catch((err) => {
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name, password, email}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool
    .query(`INSERT INTO users VALUES($1, $2, $3) RETURNING *`,[user.name, user.email, user.password])
    .then((result) => result.rows)
    .catch((err) => {});
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`SELECT reservations.id,  properties.title, properties.cost_per_night, reservations.start_date, AVG(property_reviews.property_id) AS average_rating
            FROM reservations
            JOIN users ON users.id = reservations.guest_id
            JOIN properties ON properties.id = reservations.property_id
            JOIN property_reviews ON property_reviews.property_id = reservations.property_id
            WHERE users.id = $1 AND end_date < now()::date
            GROUP BY reservations.id, properties.id LIMIT $2
            ORDER BY reservations.start_date ASC`, [guest_id,limit])
    .then((result) => result.rows)
    .catch((err) =>{});

};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  let queryParams;
  let queryString = ``;

  if (options !== null) {

    queryParams = [];

    // 2
    queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;
  
    // 3
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }
  
    // 4
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  } else {
    queryString = `SELECT * FROM properties LIMIT $1`;
    queryParams = [limit];
  }

  
  
  // 5
  //console.log(queryString, queryParams);
  
  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const values = [property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms];
  
  const querystr = `INSERT INTO properties VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;

  return pool
    .query(querystr, values)
    .then((result) => {
      console.log(result.rows);
    })
    .catch((err) => {});


};
exports.addProperty = addProperty;


