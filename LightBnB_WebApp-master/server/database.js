const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});
/// Users
// const queryString = `SELECT properties.*, reservations.*, avg(rating) as average_rating
// FROM reservations
// JOIN properties ON reservations.property_id = properties.id
// JOIN property_reviews ON property_reviews.property_id =  properties.id
// WHERE reservations.guest_id = $1
// AND reservations.end_date > now()::date
// GROUP BY properties.id, reservations.id 
// ORDER BY reservations.start_date
// LIMIT $2`;
// pool
//   .query(queryString, [1, 10])
//   .then((res) => {
//     console.log(res.rows)
//     return res.rows;
//   })
//   .catch((err) => {
//     console.log("query error", err);
//   });
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const queryString = `
  SELECT * 
  FROM users
  WHERE users.email = $1`;
  return pool
    .query(queryString, [email])
    .then((res) => {
      if (res.rows) {
        console.log(res.rows);
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log("query error:", err);
    });
};
exports.getUserWithEmail = getUserWithEmail;
/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = `
  SELECT * FROM users
  WHERE users.id = $1
  `;
  return pool
    .query(queryString, [id])
    .then((res) => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => console.log("query error:", err));
};
exports.getUserWithId = getUserWithId;
/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`;
  const values = [user.name, user.email, user.password];
  return pool
    .query(queryString, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      return console.log("query error:", err);
    });
};
exports.addUser = addUser;
/// Reservations
/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON property_reviews.property_id =  properties.id
  WHERE reservations.guest_id = $1
  AND reservations.end_date > now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2`;
  return pool
    .query(queryString, [guest_id, limit])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      return console.log("query error", err);
    });
};
exports.getAllReservations = getAllReservations;
/// Properties
/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const array = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id `;
  if (options.city) {
    array.push(`%${options.city}%`);
    queryString += `AND properties.city LIKE $${array.length} `;
  }
  if (options.owner_id) {
    array.push(`${options.owner_id}`);
    queryString += `AND properties.owner_id = $${array.length} `;
  }
  if (options.minimum_price_per_night) {
    array.push(options.minimum_price_per_night);
    queryString += `AND properties.cost_per_night >= $${array.length} `;
  }
  if (options.maximum_price_per_night) {
    array.push(options.maximum_price_per_night);
    queryString += `AND properties.cost_per_night <= $${array.length} `;
  }
  if (options.minimum_rating) {
    array.push(options.minimum_rating);
    queryString += `AND rating >= $${array.length} `;
  }
  array.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${array.length};
  `;
  return pool
    .query(queryString, array)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.error("query error", err.stack));
};
exports.getAllProperties = getAllProperties;
/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  console.log(property)
  const queryString = `
  INSERT INTO properties (
    title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code) 
    VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13,$14)
    RETURNING *;
  `;
  return pool
    .query(queryString, [
      property.title,
      property.description,
      property.owner_id,
      property.cover_photo_url,
      property.thumbnail_photo_url,
      property.cost_per_night,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms,
      property.province,
      property.city,
      property.country,
      property.street,
      property.post_code,
    ])
    .then((res) => {
      // console.log(res.rows[0]);
      return res.rows[0];
    });
};
exports.addProperty = addProperty;
