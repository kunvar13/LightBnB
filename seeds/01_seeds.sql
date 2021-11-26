INSERT INTO users (name, email, password) 
VALUES ('kalpesh', 'knk.fetr@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) 
VALUES ('gayatri', 'gayatri@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) 
VALUES ('aadi', 'aadi@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code)
    VALUES ('wascan cove', 'east', '@wascanathumb', '@wascancover', 100, 2,3,3,'canada','cove', 'regina', 'sk', '123');
INSERT INTO properties (title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code)
    VALUES ('harbour', 'south', '@harborthumb', '@harborcover', 80, 2,1,1,'US','harbour', 'texas', 'tx', '111');
INSERT INTO properties (title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
    VALUES ('kesar', 'bardoli', '@kesarthumb', '@kesarcover', 1000, 2,4,4,'IN','gandhi', 'surat', 'GJ', '1313');

INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) 
VALUES (1, 1, 1,  '2018-09-11', '2018-09-26');
INSERT INTO reservations (id, guest_id, property_id, start_date, end_date)
VALUES (2, 2, 2,'2019-01-04', '2019-02-01');
INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) 
VALUES (3, 3, 3,'2021-10-01', '2021-10-14');

INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message) 
VALUES (1,1,1,4,'good');
INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message) 
VALUES (2,2,2,2,'fair');
INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message) 
VALUES (3,3,3,5,'verygood');