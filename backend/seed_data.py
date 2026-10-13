"""
Seed data for the Movie Explorer Flask Backend.
Matches the exact frontend catalog (Telugu, English, 2025-2026 New Releases, Live Cricket, Highlights, Genres, Uploads).
"""

TELUGU_MOVIES = [
    {
        "id": 1159302,
        "title": "Kalki 2898 AD",
        "original_language": "te",
        "language": "Telugu",
        "overview": "Set in a post-apocalyptic world in the year 2898 AD, a modern-day avatar of Vishnu descends to protect the world from evil forces in the city of Kasi.",
        "poster_path": "/rstcAnBeCkxNQjNp3YXrF6IP1tW.jpg",
        "backdrop_path": "/euYIWhGvVOE6alqqusbuowYKfdQ.jpg",
        "vote_average": 8.2,
        "vote_count": 3840,
        "release_date": "2024-06-27",
        "genre_ids": [878, 28, 14],
        "genres": [{"id": 878, "name": "Science Fiction"}, {"id": 28, "name": "Action"}, {"id": 14, "name": "Fantasy"}],
        "runtime": 181,
        "budget": 72000000,
        "revenue": 140000000,
        "tagline": "The future of Indian cinema arrives.",
        "videos": {"results": [{"key": "y1-w1kUGuz8", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Nag Ashwin", "job": "Director"}],
            "cast": [
                {"id": 201, "name": "Prabhas", "character": "Bhairava", "profile_path": "/prabhas.jpg"},
                {"id": 202, "name": "Amitabh Bachchan", "character": "Ashwatthama", "profile_path": "/amitabh.jpg"},
                {"id": 203, "name": "Kamal Haasan", "character": "Supreme Yaskin", "profile_path": "/kamal.jpg"},
                {"id": 204, "name": "Deepika Padukone", "character": "SUM-80", "profile_path": "/deepika.jpg"}
            ]
        },
        "is_new_release": False
    },
    {
        "id": 811941,
        "title": "Devara: Part 1",
        "original_language": "te",
        "language": "Telugu",
        "overview": "A mighty warrior takes a stand against the criminal deeds of his village, while his mild-mannered son grows up to walk his own path in an epic coastal saga.",
        "poster_path": "/lQfuaXjANoTsdx5iS0gCXlK9D2L.jpg",
        "backdrop_path": "/hAQnXxOwCjgYcKRgTdYPRC8neqL.jpg",
        "vote_average": 7.8,
        "vote_count": 2150,
        "release_date": "2024-09-27",
        "genre_ids": [28, 18, 53],
        "genres": [{"id": 28, "name": "Action"}, {"id": 18, "name": "Drama"}, {"id": 53, "name": "Thriller"}],
        "runtime": 178,
        "budget": 36000000,
        "revenue": 60000000,
        "tagline": "All Hail The Tiger.",
        "videos": {"results": [{"key": "rgJsmvUa8Cc", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Koratala Siva", "job": "Director"}],
            "cast": [
                {"id": 211, "name": "N. T. Rama Rao Jr.", "character": "Devara / Vara", "profile_path": "/ntr.jpg"},
                {"id": 212, "name": "Janhvi Kapoor", "character": "Thangam", "profile_path": "/janhvi.jpg"},
                {"id": 213, "name": "Saif Ali Khan", "character": "Bhaira", "profile_path": "/saif.jpg"}
            ]
        },
        "is_new_release": False
    },
    {
        "id": 857598,
        "title": "Pushpa 2: The Rule",
        "original_language": "te",
        "language": "Telugu",
        "overview": "The clash between Pushpa Raj and Bhanwar Singh Shekhawat escalates into an all-out warfare as Pushpa expands his red sandalwood syndicate across international borders.",
        "poster_path": "/eUe5M3D0lLskjirOJ11R6xd7XB0.jpg",
        "backdrop_path": "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
        "vote_average": 8.5,
        "vote_count": 4200,
        "release_date": "2024-12-05",
        "genre_ids": [28, 80, 18],
        "genres": [{"id": 28, "name": "Action"}, {"id": 80, "name": "Crime"}, {"id": 18, "name": "Drama"}],
        "runtime": 195,
        "budget": 60000000,
        "revenue": 180000000,
        "tagline": "His rule begins now.",
        "videos": {"results": [{"key": "g3JUbgOHgdw", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Sukumar", "job": "Director"}],
            "cast": [
                {"id": 221, "name": "Allu Arjun", "character": "Pushpa Raj", "profile_path": "/allu.jpg"},
                {"id": 222, "name": "Rashmika Mandanna", "character": "Srivalli", "profile_path": "/rashmika.jpg"},
                {"id": 223, "name": "Fahadh Faasil", "character": "Bhanwar Singh Shekhawat", "profile_path": "/fahadh.jpg"}
            ]
        },
        "is_new_release": True
    },
    {
        "id": 579974,
        "title": "RRR",
        "original_language": "te",
        "language": "Telugu",
        "overview": "A fictional tale about two legendary revolutionaries—Alluri Sitarama Raju and Komaram Bheem—and their journey away from home before they began fighting for their country in the 1920s.",
        "poster_path": "/i0Y0wP8H6SRgjr6QmuwbtQbS24D.jpg",
        "backdrop_path": "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
        "vote_average": 8.7,
        "vote_count": 14500,
        "release_date": "2022-03-24",
        "genre_ids": [28, 12, 18],
        "genres": [{"id": 28, "name": "Action"}, {"id": 12, "name": "Adventure"}, {"id": 18, "name": "Drama"}],
        "runtime": 187,
        "budget": 66000000,
        "revenue": 160000000,
        "tagline": "Rise. Roar. Revolt.",
        "videos": {"results": [{"key": "f_ExquHBFXU", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "S. S. Rajamouli", "job": "Director"}],
            "cast": [
                {"id": 231, "name": "N. T. Rama Rao Jr.", "character": "Komaram Bheem", "profile_path": "/ntr.jpg"},
                {"id": 232, "name": "Ram Charan", "character": "Alluri Sitarama Raju", "profile_path": "/ramcharan.jpg"},
                {"id": 233, "name": "Alia Bhatt", "character": "Sita", "profile_path": "/alia.jpg"}
            ]
        },
        "is_new_release": False
    },
    {
        "id": 770906,
        "title": "Salaar: Part 1 – Ceasefire",
        "original_language": "te",
        "language": "Telugu",
        "overview": "Set in the fictional dystopian city-state of Khansaar, the film follows the friendship between Deva, a tribesman, and Varadha, the prince of Khansaar.",
        "poster_path": "/nlu9WbcetNFRGXXPWITr30ob7W6.jpg",
        "backdrop_path": "/xtOCTmGemASooRkAxRorYODig1p.jpg",
        "vote_average": 7.6,
        "vote_count": 2800,
        "release_date": "2023-12-21",
        "genre_ids": [28, 80, 53],
        "genres": [{"id": 28, "name": "Action"}, {"id": 80, "name": "Crime"}, {"id": 53, "name": "Thriller"}],
        "runtime": 175,
        "budget": 33000000,
        "revenue": 85000000,
        "tagline": "The most violent men call him God.",
        "videos": {"results": [{"key": "bUR_FKt7Iso", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Prashanth Neel", "job": "Director"}],
            "cast": [
                {"id": 241, "name": "Prabhas", "character": "Deva / Salaar", "profile_path": "/prabhas.jpg"},
                {"id": 242, "name": "Prithviraj Sukumaran", "character": "Varadharaja Mannaar", "profile_path": "/prithvi.jpg"}
            ]
        },
        "is_new_release": False
    },
    {
        "id": 878201,
        "title": "DJ Tillu",
        "original_language": "te",
        "language": "Telugu",
        "overview": "Bala Gangadhar Tilak aka DJ Tillu, a charismatic local disc jockey in Hyderabad, falls head over heels for singer Radhika, which leads him straight into a murder case and a web of comic deception.",
        "poster_path": "/u2PY7lj58h9JngHgoVgSuqswgPH.jpg",
        "backdrop_path": "/qsNMA46KZVzcJnT89bfedOJcpik.jpg",
        "vote_average": 7.9,
        "vote_count": 2900,
        "release_date": "2022-02-12",
        "genre_ids": [35, 80],
        "genres": [{"id": 35, "name": "Comedy"}, {"id": 80, "name": "Crime"}],
        "runtime": 124,
        "budget": 2000000,
        "revenue": 30000000,
        "tagline": "Atla untadi manathoni.",
        "videos": {"results": [{"key": "ZGaVFwbZNxs", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Vimal Krishna", "job": "Director"}],
            "cast": [
                {"id": 261, "name": "Siddhu Jonnalagadda", "character": "DJ Tillu", "profile_path": "/siddhu.jpg"},
                {"id": 262, "name": "Neha Shetty", "character": "Radhika", "profile_path": "/neha.jpg"}
            ]
        },
        "is_new_release": False
    },
    {
        "id": 811944,
        "title": "Game Changer",
        "original_language": "te",
        "language": "Telugu",
        "overview": "An unyielding and honest IAS officer fights relentlessly against corrupt politicians to overhaul the electoral system and restore justice to the people in a high-octane political mass entertainer.",
        "poster_path": "/qtOGsZoLW7QceqKmsOy5nSM6Aik.jpg",
        "backdrop_path": "/34vhD3KFITH2Ymeh1wF73zZXYDZ.jpg",
        "vote_average": 8.4,
        "vote_count": 3200,
        "release_date": "2025-01-10",
        "genre_ids": [28, 18, 53],
        "genres": [{"id": 28, "name": "Action"}, {"id": 18, "name": "Drama"}, {"id": 53, "name": "Thriller"}],
        "runtime": 165,
        "budget": 50000000,
        "revenue": 85000000,
        "tagline": "The Rules Are About To Change.",
        "videos": {"results": [{"key": "QSu9-DBjMPI", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "S. Shankar", "job": "Director"}],
            "cast": [
                {"id": 271, "name": "Ram Charan", "character": "Ram Nandan IAS", "profile_path": "/ramcharan.jpg"},
                {"id": 272, "name": "Kiara Advani", "character": "Deepika", "profile_path": "/kiara.jpg"},
                {"id": 273, "name": "S. J. Suryah", "character": "Bobbili Raja", "profile_path": "/sjsuryah.jpg"}
            ]
        },
        "is_new_release": True
    },
    {
        "id": 1202235,
        "title": "Daaku Maharaaj",
        "original_language": "te",
        "language": "Telugu",
        "overview": "An enigmatic outlaw endowed with fearsome strength and deep compassion rises to defend innocent villagers from ruthless royal warlords in an epic period action saga.",
        "poster_path": "/u5skP8XShAgNTckeEqjhgSULnM8.jpg",
        "backdrop_path": "/fWLfoaen7tv3mUT65KWHg7zCFYn.jpg",
        "vote_average": 8.3,
        "vote_count": 2600,
        "release_date": "2025-01-12",
        "genre_ids": [28, 18],
        "genres": [{"id": 28, "name": "Action"}, {"id": 18, "name": "Drama"}],
        "runtime": 160,
        "budget": 35000000,
        "revenue": 65000000,
        "tagline": "Fear Has A New Name.",
        "videos": {"results": [{"key": "fNDRSver0uM", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Bobby Kolli", "job": "Director"}],
            "cast": [
                {"id": 281, "name": "Nandamuri Balakrishna", "character": "Daaku Maharaaj", "profile_path": "/nbk.jpg"},
                {"id": 282, "name": "Bobby Deol", "character": "Bhavani Singh", "profile_path": "/bobby.jpg"},
                {"id": 283, "name": "Pragya Jaiswal", "character": "Satyavathi", "profile_path": "/pragya.jpg"}
            ]
        },
        "is_new_release": True
    },
    {
        "id": 1380920,
        "title": "Sankranthiki Vasthunam",
        "original_language": "te",
        "language": "Telugu",
        "overview": "A sharp ex-police officer is drawn back into dangerous territory when his former lover seeks his protection against an underworld boss, unleashing non-stop comedy and high-stakes family action.",
        "poster_path": "/gFa07KuR3tWFI6YFTeGz930zeMo.jpg",
        "backdrop_path": "/34vhD3KFITH2Ymeh1wF73zZXYDZ.jpg",
        "vote_average": 8.1,
        "vote_count": 2100,
        "release_date": "2025-01-14",
        "genre_ids": [28, 35, 18],
        "genres": [{"id": 28, "name": "Action"}, {"id": 35, "name": "Comedy"}, {"id": 18, "name": "Drama"}],
        "runtime": 148,
        "budget": 25000000,
        "revenue": 48000000,
        "tagline": "Festive Mass Dhamaka.",
        "videos": {"results": [{"key": "yCkl2Z3PBs0", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Anil Ravipudi", "job": "Director"}],
            "cast": [
                {"id": 291, "name": "Venkatesh Daggubati", "character": "Y. D. Ramana IPS", "profile_path": "/venkatesh.jpg"},
                {"id": 292, "name": "Meenakshi Chaudhary", "character": "Bhavani", "profile_path": "/meenakshi.jpg"},
                {"id": 293, "name": "Aishwarya Rajesh", "character": "Bhagya", "profile_path": "/aishwarya.jpg"}
            ]
        },
        "is_new_release": True
    },
    {
        "id": 1022453,
        "title": "The Raja Saab",
        "original_language": "te",
        "language": "Telugu",
        "overview": "A romantic horror-comedy spectacle featuring a charming prince-like hero who ventures into a haunted heritage palace to solve ancestral secrets and battle eerie supernatural forces.",
        "poster_path": "/nvK6gYa4diCnQkDVN42uoYXPrdT.jpg",
        "backdrop_path": "/kCwmLYy9ZMto1eMH8BI9KcVVIH2.jpg",
        "vote_average": 8.6,
        "vote_count": 4500,
        "release_date": "2026-01-08",
        "genre_ids": [28, 35, 27, 14],
        "genres": [{"id": 28, "name": "Action"}, {"id": 35, "name": "Comedy"}, {"id": 27, "name": "Horror"}, {"id": 14, "name": "Fantasy"}],
        "runtime": 172,
        "budget": 55000000,
        "revenue": 110000000,
        "tagline": "Pride of Indian Cinema.",
        "videos": {"results": [{"key": "YFZMBqyXkqQ", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Maruthi", "job": "Director"}],
            "cast": [
                {"id": 301, "name": "Prabhas", "character": "Raja Saab", "profile_path": "/prabhas.jpg"},
                {"id": 302, "name": "Malavika Mohanan", "character": "Pooja", "profile_path": "/malavika.jpg"},
                {"id": 303, "name": "Niddhi Agerwal", "character": "Maya", "profile_path": "/niddhi.jpg"}
            ]
        },
        "is_new_release": True
    }
]

ENGLISH_MOVIES = [
    {
        "id": 822119,
        "title": "Captain America: Brave New World",
        "original_language": "en",
        "language": "English",
        "overview": "Sam Wilson finds himself in the middle of an international incident after meeting with newly elected U.S. President Thaddeus Ross, discovering a global conspiracy that threatens world peace.",
        "poster_path": "/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
        "backdrop_path": "/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg",
        "vote_average": 8.2,
        "vote_count": 4100,
        "release_date": "2025-02-12",
        "genre_ids": [28, 878, 53],
        "genres": [{"id": 28, "name": "Action"}, {"id": 878, "name": "Science Fiction"}, {"id": 53, "name": "Thriller"}],
        "runtime": 135,
        "budget": 200000000,
        "revenue": 420000000,
        "tagline": "A new world needs a new Captain.",
        "videos": {"results": [{"key": "1pHDWnXmK7Y", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Julius Onah", "job": "Director"}],
            "cast": [
                {"id": 81, "name": "Anthony Mackie", "character": "Sam Wilson / Captain America", "profile_path": "/mackie.jpg"},
                {"id": 82, "name": "Harrison Ford", "character": "President Thaddeus Ross", "profile_path": "/ford.jpg"}
            ]
        },
        "is_new_release": True
    },
    {
        "id": 693134,
        "title": "Dune: Part Two",
        "original_language": "en",
        "language": "English",
        "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
        "poster_path": "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        "backdrop_path": "/xOMo8BRK7PfcJv9JCnx7s52003a.jpg",
        "vote_average": 8.3,
        "vote_count": 5120,
        "release_date": "2024-02-27",
        "genre_ids": [878, 12],
        "genres": [{"id": 878, "name": "Science Fiction"}, {"id": 12, "name": "Adventure"}],
        "runtime": 166,
        "budget": 190000000,
        "revenue": 711844358,
        "tagline": "Long live the fighters.",
        "videos": {"results": [{"key": "Way9Dexny3w", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Denis Villeneuve", "job": "Director"}],
            "cast": [
                {"id": 1, "name": "Timothée Chalamet", "character": "Paul Atreides", "profile_path": "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg"},
                {"id": 2, "name": "Zendaya", "character": "Chani", "profile_path": "/tyFvN1ZcmzV6zC2g2uTzQyQd3j.jpg"}
            ]
        },
        "is_new_release": False
    },
    {
        "id": 872585,
        "title": "Oppenheimer",
        "original_language": "en",
        "language": "English",
        "overview": "The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.",
        "poster_path": "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        "backdrop_path": "/rLb2cw6iw315GsfFiGIJRl9vGLO.jpg",
        "vote_average": 8.1,
        "vote_count": 8940,
        "release_date": "2023-07-19",
        "genre_ids": [18, 36],
        "genres": [{"id": 18, "name": "Drama"}, {"id": 36, "name": "History"}],
        "runtime": 180,
        "budget": 100000000,
        "revenue": 957000000,
        "tagline": "The world forever changes.",
        "videos": {"results": [{"key": "uYPbbksJxIg", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Christopher Nolan", "job": "Director"}],
            "cast": [
                {"id": 10, "name": "Cillian Murphy", "character": "J. Robert Oppenheimer", "profile_path": "/360kPuzc0X1iM5h.jpg"}
            ]
        },
        "is_new_release": False
    },
    {
        "id": 533535,
        "title": "Deadpool & Wolverine",
        "original_language": "en",
        "language": "English",
        "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
        "poster_path": "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        "backdrop_path": "/yDHYTfA3R0jFYba16jBB1jv8AmC.jpg",
        "vote_average": 7.7,
        "vote_count": 5800,
        "release_date": "2024-07-24",
        "genre_ids": [28, 35, 878],
        "genres": [{"id": 28, "name": "Action"}, {"id": 35, "name": "Comedy"}, {"id": 878, "name": "Science Fiction"}],
        "runtime": 128,
        "budget": 200000000,
        "revenue": 1337000000,
        "tagline": "Come together.",
        "videos": {"results": [{"key": "73_1biulkYk", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Shawn Levy", "job": "Director"}],
            "cast": [
                {"id": 20, "name": "Ryan Reynolds", "character": "Wade Wilson / Deadpool", "profile_path": "/4Y7WN.jpg"}
            ]
        },
        "is_new_release": False
    },
    {
        "id": 569094,
        "title": "Spider-Man: Across the Spider-Verse",
        "original_language": "en",
        "language": "English",
        "overview": "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider-Society.",
        "poster_path": "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        "backdrop_path": "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
        "vote_average": 8.4,
        "vote_count": 6700,
        "release_date": "2023-05-31",
        "genre_ids": [16, 28, 12],
        "genres": [{"id": 16, "name": "Animation"}, {"id": 28, "name": "Action"}, {"id": 12, "name": "Adventure"}],
        "runtime": 140,
        "budget": 100000000,
        "revenue": 690516673,
        "tagline": "It’s how you wear the mask that matters.",
        "videos": {"results": [{"key": "cqGjhVJWtEg", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Joaquim Dos Santos", "job": "Director"}],
            "cast": [
                {"id": 30, "name": "Shameik Moore", "character": "Miles Morales (voice)", "profile_path": "/xx.jpg"}
            ]
        },
        "is_new_release": False
    },
    {
        "id": 157336,
        "title": "Interstellar",
        "original_language": "en",
        "language": "English",
        "overview": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
        "poster_path": "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        "backdrop_path": "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
        "vote_average": 8.4,
        "vote_count": 34500,
        "release_date": "2014-11-05",
        "genre_ids": [12, 18, 878],
        "genres": [{"id": 12, "name": "Adventure"}, {"id": 18, "name": "Drama"}, {"id": 878, "name": "Science Fiction"}],
        "runtime": 169,
        "budget": 165000000,
        "revenue": 773867216,
        "tagline": "Mankind was born on Earth. It was never meant to die here.",
        "videos": {"results": [{"key": "zSWdZVtXT7E", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Christopher Nolan", "job": "Director"}],
            "cast": [
                {"id": 40, "name": "Matthew McConaughey", "character": "Cooper", "profile_path": "/mc.jpg"}
            ]
        },
        "is_new_release": False
    },
    {
        "id": 27205,
        "title": "Inception",
        "original_language": "en",
        "language": "English",
        "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.",
        "poster_path": "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        "backdrop_path": "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
        "vote_average": 8.4,
        "vote_count": 36200,
        "release_date": "2010-07-15",
        "genre_ids": [28, 878, 12],
        "genres": [{"id": 28, "name": "Action"}, {"id": 878, "name": "Science Fiction"}, {"id": 12, "name": "Adventure"}],
        "runtime": 148,
        "budget": 160000000,
        "revenue": 836848410,
        "tagline": "Your mind is the scene of the crime.",
        "videos": {"results": [{"key": "YoHD9XEInc0", "type": "Full Movie", "site": "YouTube"}]},
        "credits": {
            "crew": [{"name": "Christopher Nolan", "job": "Director"}],
            "cast": [
                {"id": 50, "name": "Leonardo DiCaprio", "character": "Dom Cobb", "profile_path": "/ld.jpg"}
            ]
        },
        "is_new_release": False
    }
]

NEW_RELEASES_ORDER = [811944, 1202235, 1380920, 1022453, 822119, 857598]

CRICKET_VIDEOS = [
    {
        "id": "crick-vid-1",
        "title": "India vs South Africa - T20 World Cup 2024 Final Match Highlights",
        "tournament": "ICC Men’s T20 World Cup 2024 Final",
        "duration": "12:45",
        "views": "18M views",
        "thumbnail": "https://img.youtube.com/vi/CixKfMJ-Zf0/hqdefault.jpg",
        "videoId": "CixKfMJ-Zf0",
        "description": "Suryakumar Yadav’s unforgettable boundary catch and Hardik Pandya’s historic final over to seal India’s World Cup triumph."
    },
    {
        "id": "crick-vid-2",
        "title": "India Outclass Pakistan - T20 High-Voltage Match Highlights",
        "tournament": "International Cricket Championship",
        "duration": "10:15",
        "views": "24M views",
        "thumbnail": "https://img.youtube.com/vi/IoaRAmeoNsc/hqdefault.jpg",
        "videoId": "IoaRAmeoNsc",
        "description": "Bumrah and Team India bowling masterclass in high-stakes thriller against arch-rivals Pakistan."
    },
    {
        "id": "crick-vid-3",
        "title": "Virat Kohli Masterclass 82* Epic Knock vs Pakistan at MCG",
        "tournament": "Iconic Cricket Moments",
        "duration": "14:20",
        "views": "45M views",
        "thumbnail": "https://img.youtube.com/vi/IoaRAmeoNsc/hqdefault.jpg",
        "videoId": "IoaRAmeoNsc",
        "description": "The greatest T20 chase ever: Virat Kohli’s legendary two straight sixes off Haris Rauf in Melbourne."
    },
    {
        "id": "crick-vid-4",
        "title": "IPL 2024 Final - KKR vs SRH Championship Highlights",
        "tournament": "Tata IPL 2024 Final",
        "duration": "09:30",
        "views": "12M views",
        "thumbnail": "https://img.youtube.com/vi/IxuyFltis6Q/hqdefault.jpg",
        "videoId": "IxuyFltis6Q",
        "description": "Mitchell Starc and Andre Russell lead Kolkata Knight Riders to lift the prestigious IPL 2024 trophy."
    },
    {
        "id": "crick-vid-5",
        "title": "Rohit Sharma 92 (41) Carnage vs Australia Highlights",
        "tournament": "ICC T20 World Cup Super 8s",
        "duration": "08:15",
        "views": "15M views",
        "thumbnail": "https://img.youtube.com/vi/0BjFP5duob0/hqdefault.jpg",
        "videoId": "0BjFP5duob0",
        "description": "The Hitman Rohit Sharma smashing 29 runs in one over against Australia in St Lucia."
    },
    {
        "id": "crick-vid-6",
        "title": "India Champions vs South Africa Champions - World Championship",
        "tournament": "World Championship of Legends",
        "duration": "15:10",
        "views": "8.5M views",
        "thumbnail": "https://img.youtube.com/vi/CixKfMJ-Zf0/hqdefault.jpg",
        "videoId": "CixKfMJ-Zf0",
        "description": "Yuvraj Singh, Suresh Raina, and Harbhajan Singh in thrilling action against South Africa Champions."
    }
]

SPORTS_MATCHES = [
    {
        "id": "cric-1",
        "sport": "Cricket",
        "tournament": "ICC World Cup 2026 - TODAY LIVE MATCH",
        "status": "LIVE",
        "statusDetail": "2nd Innings • Over 38.2 • TODAY",
        "venue": "Wankhede Stadium, Mumbai",
        "team1": {"name": "India", "code": "IND", "score": "324/5 (50)", "flag": "🇮🇳"},
        "team2": {"name": "Australia", "code": "AUS", "score": "241/6 (38.2)", "flag": "🇦🇺"},
        "summary": "Australia need 84 runs from 70 balls to win.",
        "topPerformer": "Virat Kohli 112* (94) & Jasprit Bumrah 3/38",
        "videoId": "CixKfMJ-Zf0",
        "videoTitle": "India vs Australia - Live Match Thriller Video"
    },
    {
        "id": "cric-2",
        "sport": "Cricket",
        "tournament": "IPL 2026 - TODAY LIVE MATCH",
        "status": "LIVE",
        "statusDetail": "1st Innings • Over 17.2 • TONIGHT",
        "venue": "M. Chinnaswamy Stadium, Bengaluru",
        "team1": {"name": "Royal Challengers Bengaluru", "code": "RCB", "score": "188/3 (17.2)", "flag": "🏏"},
        "team2": {"name": "Chennai Super Kings", "code": "CSK", "score": "Yet to bat", "flag": "🦁"},
        "summary": "Virat Kohli 78* (44), Glenn Maxwell 46* (19) in full attack mode.",
        "topPerformer": "Glenn Maxwell (4 Sixes in one over)",
        "videoId": "IxuyFltis6Q",
        "videoTitle": "RCB vs CSK - High Voltage Match Video"
    },
    {
        "id": "cric-3",
        "sport": "Cricket",
        "tournament": "T20 International Series",
        "status": "FINISHED",
        "statusDetail": "Decider 5th T20I",
        "venue": "Eden Gardens, Kolkata",
        "team1": {"name": "India", "code": "IND", "score": "212/4 (20)", "flag": "🇮🇳"},
        "team2": {"name": "England", "code": "ENG", "score": "185/9 (20)", "flag": "🏴󠁧󠁢󠁥󠁮󠁧󠁿"},
        "summary": "India won by 27 runs and clinched the 5-match trophy 3-2!",
        "topPerformer": "Rohit Sharma 68 (32) & Suryakumar Yadav 54 (25)",
        "videoId": "0BjFP5duob0",
        "videoTitle": "India vs England - Decider T20I Highlights"
    },
    {
        "id": "cric-4",
        "sport": "Cricket",
        "tournament": "Tata IPL 2026 - TODAY LIVE MATCH",
        "status": "LIVE",
        "statusDetail": "2nd Innings • Over 14.5 • TODAY",
        "venue": "Rajiv Gandhi International Cricket Stadium, Hyderabad",
        "team1": {"name": "Sunrisers Hyderabad", "code": "SRH", "score": "228/4 (20)", "flag": "🦅"},
        "team2": {"name": "Kolkata Knight Riders", "code": "KKR", "score": "162/5 (14.5)", "flag": "🏏"},
        "summary": "Travis Head 84 (38) and Heinrich Klaasen 62 (24) power SRH to massive score.",
        "topPerformer": "Travis Head 84 (38) & Pat Cummins 2/22",
        "videoId": "IxuyFltis6Q",
        "videoTitle": "SRH vs KKR - IPL Blockbuster Match Action"
    },
    {
        "id": "cric-5",
        "sport": "Cricket",
        "tournament": "ICC Champions Trophy 2026",
        "status": "UPCOMING",
        "statusDetail": "Tonight, 19:30 IST",
        "venue": "Dubai International Cricket Stadium",
        "team1": {"name": "India", "code": "IND", "score": "-", "flag": "🇮🇳"},
        "team2": {"name": "South Africa", "code": "SA", "score": "-", "flag": "🇿🇦"},
        "summary": "High-voltage Champions Trophy match. Team India ready for the clash.",
        "topPerformer": "Rohit Sharma vs Heinrich Klaasen",
        "videoId": "CixKfMJ-Zf0",
        "videoTitle": "India vs South Africa - Match Preview & Live Action"
    }
]

DEFAULT_UPLOADS = [
    {
        "id": "demo-1",
        "title": "Interstellar - Fan Cut Teaser",
        "category": "Trailer",
        "description": "A 4K tribute trailer showcasing the wormhole travel sequence.",
        "fileName": "interstellar_tribute_4k.mp4",
        "fileSize": "48.2 MB",
        "createdAt": "2024-03-12",
        "duration": "2:15"
    },
    {
        "id": "demo-2",
        "title": "The Dark Knight - Joker interrogation Scene Breakdown",
        "category": "Clip",
        "description": "Detailed analysis and remastered clip of the iconic scene.",
        "fileName": "dark_knight_scene.mp4",
        "fileSize": "32.1 MB",
        "createdAt": "2024-03-10",
        "duration": "4:40"
    }
]

GENRES_LIST = [
    {"id": 28, "name": "Action"},
    {"id": 12, "name": "Adventure"},
    {"id": 16, "name": "Animation"},
    {"id": 35, "name": "Comedy"},
    {"id": 80, "name": "Crime"},
    {"id": 99, "name": "Documentary"},
    {"id": 18, "name": "Drama"},
    {"id": 10751, "name": "Family"},
    {"id": 14, "name": "Fantasy"},
    {"id": 36, "name": "History"},
    {"id": 27, "name": "Horror"},
    {"id": 10402, "name": "Music"},
    {"id": 9648, "name": "Mystery"},
    {"id": 10749, "name": "Romance"},
    {"id": 878, "name": "Science Fiction"},
    {"id": 10770, "name": "TV Movie"},
    {"id": 53, "name": "Thriller"},
    {"id": 10752, "name": "War"},
    {"id": 37, "name": "Western"}
]
