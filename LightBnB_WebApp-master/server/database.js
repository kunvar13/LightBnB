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
 * @param {{name: string, password: string, email: string}} user
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
const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
