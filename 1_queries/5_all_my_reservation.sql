SELECT reservations.id,  properties.title, properties.cost_per_night, reservations.start_date, AVG(property_reviews.property_id) AS average_rating
FROM reservations
JOIN users ON users.id = reservations.guest_id
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON property_reviews.property_id = reservations.property_id
WHERE users.id = 1 AND end_date < now()::date
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date ASC;