SELECT properties.city AS city, COUNT(reservations.property_id) AS total_reservation
FROM properties
JOIN reservations ON property_id = properties.id
GROUP BY city
ORDER BY total_reservation DESC;