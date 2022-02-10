INSERT INTO users (name, email, password)
VALUES ('Billy', 'billybob@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('sam', 'sam@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('raj', 'raj@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, 
cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, 
city, province, post_code)
VALUES (1, 'property1', 'description', 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
120, 3, 5, 6, 'CA', 'BnB Ave', 'Toronto', 'ON', 'M6N 1P1'),
(2, 'Lake House Sauaga', 'description', 'https://theinspiredroom.net/wp-content/uploads/2020/07/Lake-House-Atlanta-Homes.jpg', 'https://theinspiredroom.net/wp-content/uploads/2020/07/Lake-House-Atlanta-Homes.jpg', 
320, 5, 6, 7, 'US', 'Bootcamp Road', 'SQL Drive', 'AZ', 'G4G 3H5'),
(3, 'Condo Views', 'description', 'http://d2kcmk0r62r1qk.cloudfront.net/imageSponsors/xlarge/2020_12_11_04_08_12_elle_condo2.jpg', 'http://d2kcmk0r62r1qk.cloudfront.net/imageSponsors/xlarge/2020_12_11_04_08_12_elle_condo2.jpg', 
170, 2, 2, 2, 'CA', 'Wam Road', 'Toronto', 'ON', 'M7M 4H4');

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 40, 'message'),
(2, 2, 2, 23, 'message'),
(3, 3, 3, 75, 'message');