INSERT INTO users VALUES (1, 'kalpesh', 'knk.fetr@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users VALUES (2, 'gayatri', 'gayatri@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users VALUES (3, 'aadi', 'aadi@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties VALUES (1,1,'wascan cove', 'east', '@wascanathumb', '@wascancover', 100, 2,3,3,'canada','cove', 'regina', 'sk', '123');
INSERT INTO properties VALUES (2,2,'harbour', 'south', '@harborthumb', '@harborcover', 80, 2,1,1,'US','harbour', 'texas', 'tx', '111');
INSERT INTO properties VALUES (3,3,'kesar', 'bardoli', '@kesarthumb', '@kesarcover', 1000, 2,4,4,'IN','gandhi', 'surat', 'GJ', '1313');

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
 VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews(id, guest_id, property_id, rating, message)
VALUES(1,1,1,4,'good'),
(2,2,2,2,'fair'),
(3,3,3,5,'verygood');