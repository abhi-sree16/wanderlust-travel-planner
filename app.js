// Note: We will dynamically update the image paths once the images are generated.

const destinationsData = [
    {
        id: 1,
        title: "Maldives Blue Lagoon",
        location: "Maldives",
        category: "beach",
        rating: 4.9,
        reviews: 1240,
        price: "₹1,85,000",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
        description: "Experience the ultimate tropical getaway with crystal clear turquoise waters, overwater bungalows, and pristine white sand beaches.",
        accommodation: "Luxury overwater villas & beachfront resorts.",
        transport: "Speedboat or seaplane from Malé airport.",
        food: "Mas Huni, Garudhiya, and fresh seafood.",
        acc_img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1544487679-0520aa7f394c?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80",
        userReviews: [
            { user: "Sarah L.", rating: 5, comment: "Absolutely breathtaking! The water is as clear as it looks in the pictures." },
            { user: "Mark T.", rating: 5, comment: "A perfect honeymoon destination. The service at the resorts is world-class." }
        ]
    },
    {
        id: 2,
        title: "Swiss Alps Retreat",
        location: "Switzerland",
        category: "mountain",
        rating: 4.8,
        reviews: 856,
        price: "₹1,50,000",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80",
        description: "Breathtaking views of snow-capped peaks, perfect for winter sports enthusiasts or those seeking a peaceful mountain sanctuary.",
        accommodation: "Cozy mountain chalets and ski resorts.",
        transport: "Swiss Travel Pass, panoramic trains, and cable cars.",
        food: "Cheese Fondue, Raclette, and Swiss Chocolate.",
        acc_img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1510619808386-8ad84a4ba643?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1596791478206-addd5440edee?w=600&q=80",
        userReviews: [
            { user: "John D.", rating: 4, comment: "The skiing was incredible, though the food was a bit expensive." },
            { user: "Emma W.", rating: 5, comment: "It felt like stepping into a postcard. Highly recommend visiting in winter!" }
        ]
    },
    {
        id: 3,
        title: "Machu Picchu Ruins",
        location: "Peru",
        category: "historical",
        rating: 4.9,
        reviews: 2100,
        price: "₹1,15,000",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
        description: "Explore the mysteries of the ancient Incan citadel set high in the Andes Mountains, surrounded by lush vegetation and steep ridges.",
        accommodation: "Hotels in Aguas Calientes or Cusco.",
        transport: "Train to Aguas Calientes, then bus to the ruins.",
        food: "Lomo Saltado, Ceviche, and Alpaca meat.",
        acc_img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1541832069-eec8c0cc87ff?w=600&q=80",
        userReviews: [
            { user: "Carlos R.", rating: 5, comment: "A life-changing experience. The trek is totally worth the view." },
            { user: "Anita P.", rating: 5, comment: "Stunning history and architecture. Make sure to book tickets well in advance." }
        ]
    },
    {
        id: 4,
        title: "Tokyo Neon Nights",
        location: "Japan",
        category: "city",
        rating: 4.7,
        reviews: 3420,
        price: "₹1,65,000",
        duration: "8 Days / 7 Nights",
        image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80",
        description: "Immerse yourself in a dazzling metropolis that blends ultra-modern neon-lit skyscrapers with deep-rooted traditions and temples.",
        accommodation: "High-tech business hotels and traditional ryokans.",
        transport: "Shinkansen (bullet trains) and efficient subway system.",
        food: "Sushi, Ramen, and Takoyaki.",
        acc_img: "https://images.unsplash.com/photo-1558211583-02f4a43b7e7d?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1549429177-3e1ee9e17b35?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80",
        userReviews: [
            { user: "Ken O.", rating: 5, comment: "The food scene is unbeatable, and the transportation is so efficient." },
            { user: "Lisa H.", rating: 4, comment: "Vibrant and exciting, but can be overwhelming at first." }
        ]
    },
    {
        id: 5,
        title: "Santorini Sunset",
        location: "Greece",
        category: "beach",
        rating: 4.9,
        reviews: 2800,
        price: "₹1,40,000",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
        description: "A beautiful sunset over the white and blue buildings of Santorini, Greece, overlooking the Aegean Sea. Truly a romantic paradise.",
        accommodation: "Cliff-side boutique hotels with caldera views.",
        transport: "Rental ATVs, public buses, and ferries.",
        food: "Moussaka, Souvlaki, and Greek Salad.",
        acc_img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1515594833202-b3648fbc2e77?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80",
        userReviews: [
            { user: "Elena G.", rating: 5, comment: "The most beautiful sunsets I have ever seen!" },
            { user: "Tom M.", rating: 5, comment: "Incredible views and amazing local cuisine." }
        ]
    },
    {
        id: 6,
        title: "Banff National Park",
        location: "Canada",
        category: "mountain",
        rating: 4.8,
        reviews: 1540,
        price: "₹95,000",
        duration: "4 Days / 3 Nights",
        image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80",
        description: "A breathtaking view of Moraine Lake in Banff National Park, Canada, with turquoise water and snow-capped mountains.",
        accommodation: "Log cabins and luxury wilderness lodges.",
        transport: "Rental cars and Roam public transit.",
        food: "Poutine, Alberta Beef, and BeaverTails.",
        acc_img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1586805608485-add336722759?w=600&q=80",
        userReviews: [
            { user: "David C.", rating: 5, comment: "A hiker's dream! The lakes are truly that blue." },
            { user: "Sophie B.", rating: 4, comment: "Gorgeous scenery but gets quite crowded during summer." }
        ]
    },
    {
        id: 7,
        title: "Colosseum Rome",
        location: "Italy",
        category: "historical",
        rating: 4.8,
        reviews: 4200,
        price: "₹1,20,000",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
        description: "The Colosseum in Rome, bathed in golden hour sunlight. Step back in time to the days of gladiators and emperors.",
        accommodation: "Historic center hotels and bed & breakfasts.",
        transport: "Metro, buses, and significant walking.",
        food: "Carbonara, Gelato, and Roman Pizza.",
        acc_img: "https://images.unsplash.com/photo-1551882547-ff40c0d13c11?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1506456209581-fd1fcebe2137?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80",
        userReviews: [
            { user: "Marco V.", rating: 5, comment: "Unbelievable history right in the middle of a bustling city." },
            { user: "Julia L.", rating: 5, comment: "A must-see when in Rome. Take a guided tour to get the full experience." }
        ]
    },
    {
        id: 8,
        title: "Paris Eiffel Tower",
        location: "France",
        category: "city",
        rating: 4.7,
        reviews: 5120,
        price: "₹1,35,000",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
        description: "The Eiffel Tower in Paris, at twilight with city lights starting to glow. The epitome of romance and culture.",
        accommodation: "Charming Parisian apartments and boutique hotels.",
        transport: "Paris Métro, buses, and RER trains.",
        food: "Croissants, Escargot, and Macarons.",
        acc_img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1516086701831-29e61db1d044?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
        userReviews: [
            { user: "Claire D.", rating: 5, comment: "Seeing it sparkle at night is magical!" },
            { user: "Henry K.", rating: 4, comment: "Beautiful, but the lines to go up can be very long." }
        ]
    },
    {
        id: 9,
        title: "Taj Mahal",
        location: "Agra, India",
        category: "historical",
        rating: 4.9,
        reviews: 12500,
        price: "₹15,000",
        duration: "3 Days / 2 Nights",
        image: "https://images.unsplash.com/photo-1564507592208-0272097e163b?w=800&q=80",
        description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife. A masterpiece of architectural style in conception, treatment and execution.",
        accommodation: "Heritage hotels and luxury resorts near the monument.",
        transport: "Taxis, auto-rickshaws, and cycle-rickshaws.",
        food: "Petha, Mughlai Cuisine, and Bedai with Jalebi.",
        acc_img: "https://images.unsplash.com/photo-1564507592208-0272097e163b?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1563725585094-1a2d1d497be3?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
        userReviews: [
            { user: "Priya S.", rating: 5, comment: "Absolutely stunning architecture. A magnificent symbol of love." },
            { user: "Rahul K.", rating: 5, comment: "Breathtaking at sunrise. A must-visit at least once in your lifetime." }
        ]
    },
    {
        id: 10,
        title: "Varanasi Ghats",
        location: "Varanasi, India",
        category: "devotional",
        rating: 4.8,
        reviews: 5200,
        price: "₹12,000",
        duration: "4 Days / 3 Nights",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        description: "The spiritual capital of India. The riverfront of the Ganges is lined with long flights of stone steps called ghats, filled with pilgrims performing ancient rituals and ceremonies.",
        accommodation: "Riverfront guesthouses and heritage properties.",
        transport: "Boats on the Ganges, auto-rickshaws, and walking.",
        food: "Kachori Sabzi, Malaiyyo, and Banarasi Paan.",
        acc_img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1506461883276-59454319ddbe?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
        userReviews: [
            { user: "Amit T.", rating: 5, comment: "The Ganga Aarti in the evening is a truly mesmerizing and spiritual experience." },
            { user: "Neha J.", rating: 4, comment: "A deeply spiritual place, though quite crowded. A unique cultural immersion." }
        ]
    },
    {
        id: 11,
        title: "Golden Temple",
        location: "Amritsar, India",
        category: "devotional",
        rating: 4.9,
        reviews: 8300,
        price: "₹10,500",
        duration: "3 Days / 2 Nights",
        image: "https://images.unsplash.com/photo-1587515598692-f04bf40232ed?w=800&q=80",
        description: "The preeminent spiritual site of Sikhism. The stunning golden architecture surrounded by the peaceful Sarovar (pool) creates an intensely divine and calming atmosphere.",
        accommodation: "Dharamshalas and hotels near the temple complex.",
        transport: "Auto-rickshaws and cycle-rickshaws.",
        food: "Amritsari Kulcha, Chole Bhature, and Lassi.",
        acc_img: "https://images.unsplash.com/photo-1587515598692-f04bf40232ed?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1555581971-ce9eb2db41f0?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&q=80",
        userReviews: [
            { user: "Manpreet S.", rating: 5, comment: "The peace and serenity you feel here is unmatched. The langar (community meal) is divine." },
            { user: "Karan D.", rating: 5, comment: "A beautiful and welcoming place for people of all faiths." }
        ]
    },
    {
        id: 12,
        title: "Kerala Backwaters",
        location: "Kerala, India",
        category: "beach",
        rating: 4.7,
        reviews: 4100,
        price: "₹25,000",
        duration: "4 Days / 3 Nights",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
        description: "A chain of brackish lagoons and lakes lying parallel to the Arabian Sea coast. Exploring this network on traditional houseboat cruises offers a relaxing escape into pristine nature.",
        accommodation: "Traditional houseboats and backwater resorts.",
        transport: "Houseboats, shikaras, and local ferries.",
        food: "Karimeen Pollichathu, Appam with Stew, and Puttu.",
        acc_img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=600&q=80",
        userReviews: [
            { user: "Ananya M.", rating: 5, comment: "The houseboat stay was so peaceful and the traditional local food was delicious." },
            { user: "Vikram R.", rating: 4, comment: "A very calm and refreshing trip away from the bustling city." }
        ]
    },
    {
        id: 13,
        title: "Tirupati Balaji Temple",
        location: "Andhra Pradesh, India",
        category: "devotional",
        rating: 4.9,
        reviews: 15500,
        price: "₹8,000",
        duration: "2 Days / 1 Night",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Venkateswara_Temple_%28Tirupati_Mandir%29.jpg",
        description: "One of the richest and most visited religious sites in the world, dedicated to Lord Venkateshwara, an incarnation of Vishnu. Expect extraordinary spiritual energy.",
        accommodation: "TTD guest houses and budget to luxury hotels.",
        transport: "APSRTC buses, private taxis to Tirumala.",
        food: "Tirupati Laddu, Pulihora, and South Indian Thali.",
        acc_img: "https://images.unsplash.com/photo-1605342416399-5fbe608be04d?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=600&q=80",
        userReviews: [
            { user: "Suresh P.", rating: 5, comment: "Incredible spiritual energy. The darshan is an unforgettable experience." },
            { user: "Lakshmi N.", rating: 5, comment: "Excellently managed despite the huge crowds of pilgrims." }
        ]
    },
    {
        id: 14,
        title: "Roopkund Trek",
        location: "Uttarakhand, India",
        category: "adventure",
        rating: 4.8,
        reviews: 1200,
        price: "₹18,500",
        duration: "8 Days / 7 Nights",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        description: "A high-altitude glacial lake trek in the Uttarakhand Himalayas. Famous for the mysterious skeletal remains found at the edge of the lake, challenging terrains, and incredible alpine views.",
        accommodation: "Tents and campsites during the trek.",
        transport: "Trek on foot, drive to Lohajung basecamp.",
        food: "Pahadi Food, Dal Bhat, and Maggi at camps.",
        acc_img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1577713437145-8da8c5ec1e65?w=600&q=80",
        userReviews: [
            { user: "Aditya C.", rating: 5, comment: "Physically challenging but deeply rewarding. The peak vistas are insane!" },
            { user: "Pooja V.", rating: 4, comment: "An absolute adventure. Bring very warm clothing because it gets freezing at night." }
        ]
    },
    {
        id: 15,
        title: "Rishikesh White Water Rafting",
        location: "Rishikesh, India",
        category: "adventure",
        rating: 4.9,
        reviews: 6400,
        price: "₹5,500",
        duration: "2 Days / 1 Night",
        image: "https://images.unsplash.com/photo-1627885438840-7e61ea2fc02f?w=800&q=80",
        description: "Get your adrenaline pumping as you crash through the rapids of the holy Ganges river, followed by riverside camping, bonfires, and cliff jumping.",
        accommodation: "Riverside camps and ashrams.",
        transport: "Walking, auto-rickshaws, and shared jeeps.",
        food: "Aloo Puri, Chole Bhature, and Ayurvedic food.",
        acc_img: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1533583271701-d707cbedfc2a?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1626777553258-00ba20cdfc19?w=600&q=80",
        userReviews: [
            { user: "Ravi S.", rating: 5, comment: "The best weekend getaway ever. The Grade 3+ rapids are incredibly fun." },
            { user: "Shreya T.", rating: 5, comment: "Our rafting guide was super professional, and the riverside tents were so peaceful." }
        ]
    },
    {
        id: 16,
        title: "Ranthambore Tiger Safari",
        location: "Rajasthan, India",
        category: "adventure",
        rating: 4.8,
        reviews: 3200,
        price: "₹14,000",
        duration: "3 Days / 2 Nights",
        image: "https://images.unsplash.com/photo-1615598285526-972115160c5a?w=800&q=80",
        description: "Embark on an exciting Jeep safari through Ranthambore National Park. Experience the thrill of spotting Royal Bengal Tigers and diverse wildlife in their natural habitat.",
        accommodation: "Jungle resorts and luxury tents.",
        transport: "Open-top gypsies and canters for safaris.",
        food: "Dal Baati Churma, Laal Maas, and Ghevar.",
        acc_img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
        userReviews: [
            { user: "Vikesh K.", rating: 5, comment: "We saw a majestic tigress on our very first safari! An unforgettable experience." },
            { user: "Priya M.", rating: 4, comment: "The forest is beautiful. Safaris are early morning, so bring a jacket!" }
        ]
    },
    {
        id: 17,
        title: "Andaman Scuba Exploration",
        location: "Andaman & Nicobar Islands",
        category: "beach",
        rating: 4.9,
        reviews: 4500,
        price: "₹35,000",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        description: "Dive into the crystal-clear waters of the Andaman Sea. Explore vibrant coral reefs, swim with sea turtles, and relax on the pristine white sands of Radhanagar Beach.",
        accommodation: "Beach resorts and eco-huts in Havelock.",
        transport: "Government ferries and private cruises.",
        food: "Fresh Seafood, Fish Curry, and Coconut Water.",
        acc_img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=600&q=80",
        userReviews: [
            { user: "Arjun N.", rating: 5, comment: "The scuba diving in Havelock Island was world-class. The marine life is spectacular." },
            { user: "Riya D.", rating: 5, comment: "A perfect blend of relaxation and underwater adventure. Highly recommended." }
        ]
    },
    {
        id: 18,
        title: "Jaipur Royal Heritage",
        location: "Rajasthan, India",
        category: "historical",
        rating: 4.7,
        reviews: 8900,
        price: "₹18,500",
        duration: "4 Days / 3 Nights",
        image: "https://images.unsplash.com/photo-1599661559905-24e526a0d014?w=800&q=80",
        description: "Step into the 'Pink City' and marvel at Rajput architecture. Visit the magnificent Amer Fort, the beautiful Hawa Mahal, and experience royal Rajasthani hospitality.",
        accommodation: "Heritage Havelis and palace hotels.",
        transport: "Auto-rickshaws, e-rickshaws, and cabs.",
        food: "Pyaz Kachori, Ghevar, and Dal Baati Churma.",
        acc_img: "https://images.unsplash.com/photo-1599661559905-24e526a0d014?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1563725585094-1a2d1d497be3?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
        userReviews: [
            { user: "Sneha G.", rating: 4, comment: "The forts are massive and full of rich history. Taking a guided tour is a must!" },
            { user: "Mohit J.", rating: 5, comment: "Culturally rich and vibrant. The local food is spicy and amazing." }
        ]
    },
    {
        id: 19,
        title: "Munnar Tea Estates",
        location: "Kerala, India",
        category: "mountain",
        rating: 4.8,
        reviews: 5600,
        price: "₹12,500",
        duration: "3 Days / 2 Nights",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80",
        description: "Escape to the rolling green hills of Munnar. Wander through endless emerald tea plantations, breathe in the crisp mountain air, and spot waterfalls hidden in the valleys.",
        accommodation: "Tea estate bungalows and mist-covered resorts.",
        transport: "Taxis, local buses, and walking.",
        food: "Kerala Parotta with Beef Fry, and fresh Tea.",
        acc_img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80",
        trans_img: "https://images.unsplash.com/photo-1555581971-ce9eb2db41f0?w=600&q=80",
        food_img: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=600&q=80",
        userReviews: [
            { user: "Divya R.", rating: 5, comment: "So picturesque! The tea museum and the views from the hills are breathtaking." },
            { user: "Samir A.", rating: 5, comment: "A perfect, calm getaway from city life. The weather is so pleasant." }
        ]
    }
];

// App State
let currentCategory = 'all';
let currentSearch = '';

// Load Favorites
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Load Custom Destinations
const customDestinations = JSON.parse(localStorage.getItem('customDestinations')) || [];
if (customDestinations.length > 0) {
    destinationsData.push(...customDestinations);
}

// DOM Elements
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.page-section');
const grid = document.getElementById('destinations-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('dest-search');
const heroSearchInput = document.getElementById('hero-search-input');
const heroSearchBtn = document.getElementById('hero-search-btn');
const categoryCards = document.querySelectorAll('.category-card');
const modal = document.getElementById('destination-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contact-form');
const suggestionForm = document.getElementById('suggestion-form');
const toast = document.getElementById('toast');
const themeToggleBtn = document.getElementById('theme-toggle');

// Initialize App
let map;

function init() {
    renderDestinations(destinationsData);
    populateDestinationsDropdown();
    setupEventListeners();
    initTheme();
    setTimeout(initMap, 500); // Wait for DOM
}

function initTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if(themeToggleBtn) themeToggleBtn.innerHTML = "<i class='bx bx-sun'></i>";
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = "<i class='bx bx-sun'></i>";
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = "<i class='bx bx-moon'></i>";
    }
}

function populateDestinationsDropdown() {
    const destSelect = document.getElementById('destination');
    if (!destSelect) return;
    destinationsData.forEach(dest => {
        const option = document.createElement('option');
        option.value = dest.title;
        option.textContent = dest.title;
        destSelect.appendChild(option);
    });
}

// Event Listeners
function setupEventListeners() {
    // Navigation routing (SPA behavior)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                e.preventDefault();
                navigateTo(targetId);
            }
        });
    });

    // Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active styling
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Set state and render
            currentCategory = btn.getAttribute('data-filter');
            filterAndRender();
        });
    });

    // Gallery Search
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        filterAndRender();
    });

    // Hero Search
    heroSearchBtn.addEventListener('click', () => {
        const query = heroSearchInput.value;
        if (query) {
            navigateTo('destinations');
            searchInput.value = query;
            currentSearch = query.toLowerCase();
            filterAndRender();
        }
    });

    // Hero Category Cards
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category');
            navigateTo('destinations');
            // Trigger filter
            const btn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
            if (btn) btn.click();
        });
    });

    // Modal Close
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Contact Form Submit
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Save to LocalStorage for Admin Panel
        const newInquiry = {
            id: Date.now(),
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            destination: document.getElementById('destination').value,
            message: document.getElementById('message').value,
            date: new Date().toLocaleDateString()
        };

        const existingInquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
        existingInquiries.push(newInquiry);
        localStorage.setItem('inquiries', JSON.stringify(existingInquiries));

        toast.innerText = "Inquiry sent successfully! We'll contact you soon.";
        showToast();
        contactForm.reset();
    });

    // Suggestion Form Submit
    if (suggestionForm) {
        suggestionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newSuggestion = {
                id: Date.now(),
                name: document.getElementById('sugg-name').value,
                email: document.getElementById('sugg-email').value,
                suggestion: document.getElementById('sugg-message').value,
                date: new Date().toLocaleDateString()
            };

            const existingSuggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
            existingSuggestions.push(newSuggestion);
            localStorage.setItem('suggestions', JSON.stringify(existingSuggestions));

            toast.innerText = "Suggestion submitted successfully!";
            showToast();
            suggestionForm.reset();
        });
    }

    // Theme Toggle
    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
}

// Navigation Function
function navigateTo(sectionId) {
    // Update links
    navLinks.forEach(link => {
        if (link.getAttribute('data-target') === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update sections
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active-section');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            section.classList.remove('active-section');
        }
    });
}

// Filter Logic
function filterAndRender() {
    let filtered;
    if (currentCategory === 'favorites') {
        filtered = destinationsData.filter(d => favorites.includes(d.id));
    } else {
        filtered = destinationsData.filter(dest => {
            const matchesCategory = currentCategory === 'all' || dest.category === currentCategory;
            const matchesSearch = dest.title.toLowerCase().includes(currentSearch) ||
                dest.location.toLowerCase().includes(currentSearch);
            return matchesCategory && matchesSearch;
        });
    }
    renderDestinations(filtered);
}

// Render Grid
function renderDestinations(data) {
    grid.innerHTML = '';

    if (data.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted);">No destinations found matching your criteria.</p>';
        return;
    }

    data.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'dest-card';
        card.innerHTML = `
            <div class="dest-img-wrapper" style="cursor:pointer;">
                <div class="heart-btn ${favorites.includes(dest.id) ? 'active' : ''}" onclick="toggleFavorite(event, ${dest.id})" title="Add to Favorites">
                    <i class='bx bxs-heart'></i>
                </div>
                <img src="${dest.image}" alt="${dest.title}" class="dest-img" onclick="openModal(${dest.id})">
                <div class="dest-badge">${capitalize(dest.category)}</div>
            </div>
            <div class="dest-info">
                <h3>${dest.title}</h3>
                <div class="dest-location">
                    <i class='bx bx-map'></i> ${dest.location}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                    <div class="dest-rating">
                        <i class='bx bxs-star'></i> ${dest.rating} <span style="font-size: 0.8rem;">(${dest.reviews})</span>
                    </div>
                    <div style="font-weight: 700; color: var(--primary); font-size: 1.1rem; background: rgba(37, 99, 235, 0.1); padding: 0.2rem 0.6rem; border-radius: 4px;">
                        ${dest.price}
                    </div>
                </div>
                <div class="dest-footer" style="margin-top: 1rem; padding-top: 1rem;">
                    <button class="view-btn" onclick="openModal(${dest.id})">
                        Explore <i class='bx bx-right-arrow-alt'></i>
                    </button>
                    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;"><i class='bx bx-time-five' style="vertical-align: middle;"></i> ${dest.duration}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Modal Logic
window.openModal = function (id) {
    const dest = destinationsData.find(d => d.id === id);
    if (!dest) return;

    let reviewsHtml = '';
    // Fetch custom reviews for this location from LocalStorage if exists
    let allReviews = JSON.parse(localStorage.getItem('reviews_' + id)) || (dest.userReviews || []);

    if (allReviews.length > 0) {
        reviewsHtml = allReviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <span class="reviewer-name">${review.user}</span>
                    <span class="reviewer-rating"><i class='bx bxs-star'></i> ${review.rating} / 5</span>
                </div>
                <p class="review-comment">"${review.comment}"</p>
            </div>
        `).join('');
    }

    const weatherIcons = {
        'beach': { i: 'bx-sun', t: '29°C', txt: 'Sunny' },
        'mountain': { i: 'bx-cloud-snow', t: '5°C', txt: 'Cold' },
        'city': { i: 'bx-cloud', t: '22°C', txt: 'Cloudy' },
        'historical': { i: 'bx-sun', t: '25°C', txt: 'Clear' },
        'devotional': { i: 'bx-cloud-light-rain', t: '20°C', txt: 'Pleasant' },
        'adventure': { i: 'bx-wind', t: '15°C', txt: 'Breezy' }
    };
    const w = weatherIcons[dest.category] || weatherIcons['city'];

    modalBody.innerHTML = `
        <img src="${dest.image}" alt="${dest.title}" class="modal-img">
        <div class="modal-info">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; color: var(--primary); font-weight:600;">
                <div class="dest-location">
                    <i class='bx bx-map'></i> ${dest.location}
                </div>
                <div class="weather-badge">
                    <i class='bx ${w.i}'></i> ${w.t} ${w.txt}
                </div>
            </div>
            <h2>${dest.title}</h2>
            
            <div class="modal-tags">
                <span class="tag"><i class='bx bx-category'></i> ${capitalize(dest.category)}</span>
                <span class="tag"><i class='bx bxs-star' style="color:var(--accent)"></i> ${dest.rating} / 5</span>
                <span class="tag" style="background: rgba(37, 99, 235, 0.1); color: var(--primary); border: 1px solid rgba(37, 99, 235, 0.2); font-weight: 600;">${dest.price} <small style="font-weight:normal; color:#64748b;">/ person</small></span>
                <span class="tag"><i class='bx bx-time-five'></i> ${dest.duration}</span>
            </div>
            
            <p style="margin-top: 1.5rem; line-height: 1.8; color: var(--text-muted);">
                ${dest.description}
            </p>

            <div class="accordion-container" style="margin-top: 1.5rem;">
                ${dest.accommodation ? `
                <div class="accordion-item" style="margin-bottom: 0.5rem; border: 1px solid var(--border); border-radius: 8px; overflow: hidden;">
                    <div class="accordion-header" onclick="toggleAccordion(this)" style="padding: 1rem; background: rgba(37, 99, 235, 0.05); cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease;">
                        <h4 style="color: var(--primary); margin: 0; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem;"><i class='bx bx-bed'></i> Accommodation</h4>
                        <i class='bx bx-chevron-down accordion-icon' style="color: var(--primary); font-size: 1.2rem; transition: transform 0.3s ease;"></i>
                    </div>
                    <div class="accordion-content" style="display: none; padding: 1rem; border-top: 1px solid var(--border); background: #fdfdfd;">
                        <img src="${dest.acc_img || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80'}" alt="Accommodation Place" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6;">${dest.accommodation}</p>
                    </div>
                </div>
                ` : ''}
                ${dest.transport ? `
                <div class="accordion-item" style="margin-bottom: 0.5rem; border: 1px solid var(--border); border-radius: 8px; overflow: hidden;">
                    <div class="accordion-header" onclick="toggleAccordion(this)" style="padding: 1rem; background: rgba(37, 99, 235, 0.05); cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease;">
                        <h4 style="color: var(--primary); margin: 0; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem;"><i class='bx bx-bus'></i> Transport</h4>
                        <i class='bx bx-chevron-down accordion-icon' style="color: var(--primary); font-size: 1.2rem; transition: transform 0.3s ease;"></i>
                    </div>
                    <div class="accordion-content" style="display: none; padding: 1rem; border-top: 1px solid var(--border); background: #fdfdfd;">
                        <img src="${dest.trans_img || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80'}" alt="Transport" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6;">${dest.transport}</p>
                    </div>
                </div>
                ` : ''}
                ${dest.food ? `
                <div class="accordion-item" style="margin-bottom: 0.5rem; border: 1px solid var(--border); border-radius: 8px; overflow: hidden;">
                    <div class="accordion-header" onclick="toggleAccordion(this)" style="padding: 1rem; background: rgba(37, 99, 235, 0.05); cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease;">
                        <h4 style="color: var(--primary); margin: 0; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem;"><i class='bx bx-restaurant'></i> Famous Food</h4>
                        <i class='bx bx-chevron-down accordion-icon' style="color: var(--primary); font-size: 1.2rem; transition: transform 0.3s ease;"></i>
                    </div>
                    <div class="accordion-content" style="display: none; padding: 1rem; border-top: 1px solid var(--border); background: #fdfdfd;">
                        <img src="${dest.food_img || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'}" alt="Famous Food" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6;">${dest.food}</p>
                    </div>
                </div>
                ` : ''}
            </div>

            <div class="reviews-section" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem;">
                <h3 style="margin-bottom: 1rem; font-family: var(--font-serif); font-size: 1.4rem;">Traveler Reviews</h3>
                <div class="reviews-list">
                    ${reviewsHtml || '<p style="color: var(--text-muted);">No reviews yet.</p>'}
                </div>
                
                <div class="review-form">
                    <h4>Submit Your Review</h4>
                    <div class="stars-input" id="star-rating">
                        <i class='bx bxs-star active' data-val="1"></i>
                        <i class='bx bxs-star active' data-val="2"></i>
                        <i class='bx bxs-star active' data-val="3"></i>
                        <i class='bx bxs-star active' data-val="4"></i>
                        <i class='bx bxs-star active' data-val="5"></i>
                    </div>
                    <input type="hidden" id="review-val" value="5">
                    <input type="text" id="review-name" placeholder="Your Name" required>
                    <textarea id="review-comment" rows="3" placeholder="Share your experience..." required></textarea>
                    <button class="submit-btn" style="width: auto; padding: 0.5rem 1.5rem;" onclick="submitReview(${dest.id})">Post Review</button>
                </div>
            </div>
            
            <button class="submit-btn" style="margin-top: 2rem; width: auto; display: inline-flex;" onclick="bookTrip('${dest.title}')">
                Book This Trip <i class='bx bx-paper-plane'></i>
            </button>
        </div>
    `;

    modal.classList.add('show');
}

// Switch to contact section and select the destination
window.bookTrip = function (title) {
    modal.classList.remove('show');
    navigateTo('contact');
    const destSelect = document.getElementById('destination');
    if (destSelect) {
        destSelect.value = title;
    }
}

// Accordion Toggle Logic
window.toggleAccordion = function (element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('.accordion-icon');

    // Check if what we clicked is already open
    const isCurrentlyOpen = content.style.display === 'block';

    // Close all accordions in this container
    const allContents = element.parentElement.parentElement.querySelectorAll('.accordion-content');
    const allIcons = element.parentElement.parentElement.querySelectorAll('.accordion-icon');

    allContents.forEach(c => c.style.display = 'none');
    allIcons.forEach(i => {
        i.classList.remove('bx-chevron-up');
        i.classList.add('bx-chevron-down');
    });

    // If it wasn't open, open it
    if (!isCurrentlyOpen) {
        content.style.display = 'block';
        icon.classList.remove('bx-chevron-down');
        icon.classList.add('bx-chevron-up');
    }
}

// Utils
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Map Logic
function initMap() {
    const mapContainer = document.getElementById('dest-map');
    if (!mapContainer || typeof L === 'undefined') return;

    // Center map roughly around India / Global
    map = L.map('dest-map').setView([20.5937, 78.9629], 3);

    // Using Carto Voyager tiles which provide English labels globally
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    // Mock locations for fallback based on category
    const baseCoords = { 'beach': [10, 75], 'mountain': [32, 78], 'city': [28, 77], 'historical': [27, 78], 'devotional': [25, 83], 'adventure': [30, 78] };
    
    destinationsData.forEach((dest, index) => {
        // Very rough mock coords for demonstration
        const offsetLat = (Math.random() - 0.5) * 10;
        const offsetLng = (Math.random() - 0.5) * 10;
        const base = baseCoords[dest.category] || [20, 78];
        const lat = base[0] + offsetLat;
        const lng = base[1] + offsetLng;

        L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>${dest.title}</b><br>${dest.location}<br><button onclick="openModal(${dest.id})" style="color:var(--primary); cursor:pointer; background:none; border:none; padding-top:5px; text-decoration:underline;">View Details</button>`);
    });
}

// Favorites Logic
window.toggleFavorite = function(e, id) {
    e.stopPropagation();
    if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    filterAndRender();
    showToastMsg(favorites.includes(id) ? 'Added to Favorites ❤️' : 'Removed from Favorites 💔');
}

function showToastMsg(msg) {
    toast.innerText = msg;
    showToast();
}

// Review Logic
window.submitReview = function(id) {
    const name = document.getElementById('review-name').value;
    const comment = document.getElementById('review-comment').value;
    const rating = document.getElementById('review-val').value;

    if(!name || !comment) {
        alert("Please fill in your name and comment.");
        return;
    }

    const dest = destinationsData.find(d => d.id === id);
    const newReview = { user: name, rating: parseInt(rating), comment: comment };

    let allReviews = JSON.parse(localStorage.getItem('reviews_' + id)) || (dest.userReviews || []);
    allReviews.unshift(newReview);
    localStorage.setItem('reviews_' + id, JSON.stringify(allReviews));

    showToastMsg('Review submitted successfully!');
    openModal(id); // re-render modal
};

// Handle star click
document.addEventListener('click', function(e) {
    if(e.target.classList.contains('bx-star') || e.target.classList.contains('bxs-star')) {
        const parent = e.target.parentElement;
        if(parent.id === 'star-rating') {
            const val = parseInt(e.target.getAttribute('data-val'));
            document.getElementById('review-val').value = val;
            const stars = parent.querySelectorAll('i');
            stars.forEach(s => {
                const sVal = parseInt(s.getAttribute('data-val'));
                if(sVal <= val) {
                    s.classList.replace('bx-star', 'bxs-star');
                    s.classList.add('active');
                } else {
                    s.classList.replace('bxs-star', 'bx-star');
                    s.classList.remove('active');
                }
            });
        }
    }
});

// Start
init();
