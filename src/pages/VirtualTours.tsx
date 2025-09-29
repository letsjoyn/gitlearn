import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Map, Volume2, Globe, Clock, Star, Loader2, Search, X } from "lucide-react";

const tours = [
    {
      id: 1,
      name: "Rumtek Monastery",
      description: "Seat of the Karmapa with rich murals and golden stupa",
      duration: "45 minutes",
      rating: 4.9,
      languages: ["English", "Hindi", "Tibetan", "Japanese"],
      image: "/monastery-interior.jpg",
      highlights: ["Golden Stupa", "Ancient Murals", "Prayer Hall", "Monk Quarters"],
      difficulty: "Easy",
      tourUrl: "https://www.google.com/maps/embed?pb=!4v1758038690706!6m8!1m7!1sPr4Y5YdcAkJf4rLIs50hUg!2m2!1d27.28732667290907!2d88.56125372801195!3f286.98917850014675!4f-0.5000657199454821!5f0.7820865974627469",
      audioFiles: {
        english: "/RUMTEK-ENGLISH.mp3",
        hindi: "/RUMTEK-HINDI.mp3",
        tibetan: "/audio/rumtek_tibetan.mp3",
        japanese: "/RUMTEK-JAPANESE.mp3",
      },
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      description: "17th century monastery with breathtaking Himalayan views",
      duration: "35 minutes",
      rating: 4.8,
      languages: ["English", "Hindi", "Nepali", "French"],
      image: "/prayer-flags.jpg",
      highlights: ["Wooden Art", "Mountain Views", "Sacred Texts", "Meditation Hall"],
      difficulty: "Moderate",
      tourUrl: "https://app.lapentor.com/sphere/pemayangtse-monastery",
      audioFiles: {
        english: "/P-ENGLISH.mp3",
        hindi: "/P-HINDI.mp3",
        nepali: "/audio/pemayangtse_nepali.mp3",
        french: "/P-FRENCH.mp3",
      },
    },
    {
      id: 3,
      name: "Tashiding Monastery",
      description: "Sacred site known for the holy Bumchu festival",
      duration: "40 minutes",
      rating: 4.7,
      languages: ["English", "Hindi", "Tibetan"],
      image: "/hero-monastery.jpg",
      highlights: ["Bumchu Vase", "Sacred Lake", "Ancient Chortens", "Festival Grounds"],
      difficulty: "Easy",
      tourUrl: "https://myvirtualtourlink3.com/embed",
      audioFiles: {
        english: "/audio/tashiding_english.mp3",
        hindi: "/audio/tashiding_hindi.mp3",
        tibetan: "/audio/tashiding_tibetan.mp3",
      },
    },
    {
      id: 4,
      name: "Enchey Monastery",
      description: "A small monastery in Gangtok famous for its mask dance festivals.",
      duration: "30 minutes",
      rating: 4.6,
      languages: ["English", "Hindi"],
      image: "/enchey-monastery.jpg",
      highlights: ["Cham Dance", "Statues", "Tibetan Calendar"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/enchey",
      audioFiles: {
        english: "/audio/enchey_english.mp3",
        hindi: "/audio/enchey_hindi.mp3",
      },
    },
    {
      id: 5,
      name: "Dubdi Monastery",
      description: "Sikkim's first monastery, established in 1701.",
      duration: "25 minutes",
      rating: 4.5,
      languages: ["English", "Hindi", "Nepali"],
      image: "/dubdi-monastery.jpg",
      highlights: ["Historical Significance", "Traditional Architecture", "Scenic Walk"],
      difficulty: "Moderate",
      tourUrl: "https://virtualtour.com/dubdi",
      audioFiles: {
        english: "/audio/dubdi_english.mp3",
        hindi: "/audio/dubdi_hindi.mp3",
        nepali: "/audio/dubdi_nepali.mp3",
      },
    },
    {
      id: 6,
      name: "Khecheopalri Lake & Monastery",
      description: "A sacred wish-fulfilling lake with a serene monastery nearby.",
      duration: "50 minutes",
      rating: 4.9,
      languages: ["English", "Hindi", "Tibetan"],
      image: "/khecheopalri-lake.jpg",
      highlights: ["Sacred Lake", "Wish-Fulfilling Spot", "Prayer Flags", "Nature Views"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/khecheopalri",
      audioFiles: {
        english: "/audio/khecheopalri_english.mp3",
        hindi: "/audio/khecheopalri_hindi.mp3",
        tibetan: "/audio/khecheopalri_tibetan.mp3",
      },
    },
    {
      id: 7,
      name: "Ralang Monastery",
      description: "A vibrant monastery complex in Ravangla with a new and old section.",
      duration: "55 minutes",
      rating: 4.7,
      languages: ["English", "Hindi", "Bhutia"],
      image: "/ralang-monastery.jpg",
      highlights: ["Buddhist Festival", "Traditional Dances", "Murals"],
      difficulty: "Moderate",
      tourUrl: "https://virtualtour.com/ralang",
      audioFiles: {
        english: "/audio/ralang_english.mp3",
        hindi: "/audio/ralang_hindi.mp3",
        bhutia: "/audio/ralang_bhutia.mp3",
      },
    },
    {
      id: 8,
      name: "Phodong Monastery",
      description: "One of the most beautiful monasteries with ancient murals and relics.",
      duration: "40 minutes",
      rating: 4.5,
      languages: ["English", "Hindi"],
      image: "/phodong-monastery.jpg",
      highlights: ["Ancient Murals", "Buddhist Festivals", "Ornate Wall Paintings"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/phodong",
      audioFiles: {
        english: "/audio/phodong_english.mp3",
        hindi: "/audio/phodong_hindi.mp3",
      },
    },
    {
      id: 9,
      name: "Sanga Choeling Monastery",
      description: "One of the oldest monasteries in Sikkim, offering great views.",
      duration: "30 minutes",
      rating: 4.7,
      languages: ["English", "Hindi", "Nepali"],
      image: "/sanga-choeling.jpg",
      highlights: ["Oldest Monastery", "Views of Pelling", "Historical Artifacts"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/sangachoeling",
      audioFiles: {
        english: "/audio/sangachoeling_english.mp3",
        hindi: "/audio/sangachoeling_hindi.mp3",
        nepali: "/audio/sangachoeling_nepali.mp3",
      },
    },
    {
      id: 10,
      name: "Lachen Monastery",
      description: "A small, serene monastery near the Lachen village.",
      duration: "20 minutes",
      rating: 4.3,
      languages: ["English", "Tibetan"],
      image: "/lachen-monastery.jpg",
      highlights: ["Scenic Views", "Peaceful Atmosphere", "Colorful Interiors"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/lachen",
      audioFiles: {
        english: "/audio/lachen_english.mp3",
        tibetan: "/audio/lachen_tibetan.mp3",
      },
    },
    {
      id: 11,
      name: "Labrang Monastery",
      description: "Known for its traditional Sikkimese architecture and quiet location.",
      duration: "35 minutes",
      rating: 4.5,
      languages: ["English", "Hindi"],
      image: "/labrang-monastery.jpg",
      highlights: ["Sikkimese Architecture", "Statues and Idols", "Cultural Significance"],
      difficulty: "Moderate",
      tourUrl: "https://virtualtour.com/labrang",
      audioFiles: {
        english: "/audio/labrang_english.mp3",
        hindi: "/audio/labrang_hindi.mp3",
      },
    },
    {
      id: 12,
      name: "Ghum Monastery",
      description: "Home to a 15-foot high statue of Maitreya Buddha.",
      duration: "40 minutes",
      rating: 4.7,
      languages: ["English", "Hindi", "Nepali"],
      image: "/ghum-monastery.jpg",
      highlights: ["Maitreya Buddha Statue", "Rare Manuscripts", "Thangka Paintings"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/ghum",
      audioFiles: {
        english: "/audio/ghum_english.mp3",
        hindi: "/audio/ghum_hindi.mp3",
        nepali: "/audio/ghum_nepali.mp3",
      },
    },
    {
      id: 13,
      name: "Do Drul Chorten",
      description: "A large stupa complex with a serene atmosphere and a tranquil garden.",
      duration: "20 minutes",
      rating: 4.6,
      languages: ["English", "Hindi"],
      image: "/do-drul-chorten.jpg",
      highlights: ["Golden Stupa", "Tranquil Garden", "Prayer Wheels"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/dodrul",
      audioFiles: {
        english: "/audio/dodrul_english.mp3",
        hindi: "/audio/dodrul_hindi.mp3",
      },
    },
    {
      id: 14,
      name: "Samdruptse Hill",
      description: "Features a massive 45-meter high statue of Guru Padmasambhava.",
      duration: "35 minutes",
      rating: 4.7,
      languages: ["English", "Hindi", "Nepali"],
      image: "/samdruptse-hill.jpg",
      highlights: ["Guru Padmasambhava Statue", "Panoramic Views", "Scenic Location"],
      difficulty: "Moderate",
      tourUrl: "https://virtualtour.com/samdruptse",
      audioFiles: {
        english: "/audio/samdruptse_english.mp3",
        hindi: "/audio/samdruptse_hindi.mp3",
        nepali: "/audio/samdruptse_nepali.mp3",
      },
    },
    {
      id: 15,
      name: "Buddha Park (Tathagata Tsal)",
      description: "A massive Buddha statue complex surrounded by a beautiful park.",
      duration: "45 minutes",
      rating: 4.8,
      languages: ["English", "Hindi", "Tibetan"],
      image: "/buddha-park.jpg",
      highlights: ["Giant Buddha Statue", "Manicured Gardens", "Inaugurated by Dalai Lama"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/buddhapark",
      audioFiles: {
        english: "/audio/buddhapark_english.mp3",
        hindi: "/audio/buddhapark_hindi.mp3",
        tibetan: "/audio/buddhapark_tibetan.mp3",
      },
    },
    {
      id: 16,
      name: "Siddheshwar Dham (Char Dham)",
      description: "A large pilgrimage complex with replicas of four Dhams of India.",
      duration: "60 minutes",
      rating: 4.8,
      languages: ["English", "Hindi"],
      image: "/char-dham.jpg",
      highlights: ["Char Dham Replicas", "Large Shiva Statue", "Pilgrimage Site"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/siddheshwar",
      audioFiles: {
        english: "/audio/siddheshwar_english.mp3",
        hindi: "/audio/siddheshwar_hindi.mp3",
      },
    },
    {
      id: 17,
      name: "Rinchenpong Monastery",
      description: "Offers panoramic views of the Kanchenjunga range and a statue of Ati Buddha.",
      duration: "30 minutes",
      rating: 4.6,
      languages: ["English", "Hindi", "Tibetan"],
      image: "/rinchenpong-monastery.jpg",
      highlights: ["Kanchenjunga Views", "Ati Buddha Statue", "Historical Significance"],
      difficulty: "Moderate",
      tourUrl: "https://virtualtour.com/rinchenpong",
      audioFiles: {
        english: "/audio/rinchenpong_english.mp3",
        hindi: "/audio/rinchenpong_hindi.mp3",
        tibetan: "/audio/rinchenpong_tibetan.mp3",
      },
    },
    {
      id: 18,
      name: "Namgyal Institute of Tibetology",
      description: "A center for the study of Tibetology and Buddhist culture, featuring a museum and library.",
      duration: "45 minutes",
      rating: 4.7,
      languages: ["English", "Hindi"],
      image: "/tibetology-institute.jpg",
      highlights: ["Rare Manuscripts", "Museum", "Buddhist Artifacts"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/tibetology",
      audioFiles: {
        english: "/audio/tibetology_english.mp3",
        hindi: "/audio/tibetology_hindi.mp3",
      },
    },
    {
      id: 19,
      name: "Lachung Monastery",
      description: "A serene monastery offering stunning views of the Lachung Valley.",
      duration: "20 minutes",
      rating: 4.4,
      languages: ["English", "Tibetan"],
      image: "/lachung-monastery.jpg",
      highlights: ["Valley Views", "Meditative Space", "Local Culture"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/lachung",
      audioFiles: {
        english: "/audio/lachung_english.mp3",
        tibetan: "/audio/lachung_tibetan.mp3",
      },
    },
    {
      id: 20,
      name: "Chungthang Monastery",
      description: "A historic monastery at the confluence of two rivers, believed to have been blessed by Guru Padmasambhava.",
      duration: "30 minutes",
      rating: 4.2,
      languages: ["English", "Hindi"],
      image: "/chungthang-monastery.jpg",
      highlights: ["River Confluence", "Historical Site", "Unique Geography"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/chungthang",
      audioFiles: {
        english: "/audio/chungthang_english.mp3",
        hindi: "/audio/chungthang_hindi.mp3",
      },
    },
    {
      id: 21,
      name: "Lingdum Monastery",
      description: "A large monastery with stunning architecture and beautiful murals, also known as Ranka Monastery.",
      duration: "45 minutes",
      rating: 4.6,
      languages: ["English", "Hindi", "Tibetan"],
      image: "/lingdum-monastery.jpg",
      highlights: ["Stunning Architecture", "Murals", "Meditation Hall"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/lingdum",
      audioFiles: {
        english: "/audio/lingdum_english.mp3",
        hindi: "/audio/lingdum_hindi.mp3",
        tibetan: "/audio/lingdum_tibetan.mp3",
      },
    },
    {
      id: 22,
      name: "Phalut Monastery",
      description: "A small, remote monastery on the Singalila ridge, perfect for meditation.",
      duration: "25 minutes",
      rating: 4.2,
      languages: ["English", "Nepali"],
      image: "/phalut-monastery.jpg",
      highlights: ["Remote Location", "Himalayan Trek Point", "Mountain Wilderness"],
      difficulty: "Hard",
      tourUrl: "https://virtualtour.com/phalut",
      audioFiles: {
        english: "/audio/phalut_english.mp3",
        nepali: "/audio/phalut_nepali.mp3",
      },
    },
    {
      id: 23,
      name: "Yuksom Monastery",
      description: "A historic monastery in the first capital of Sikkim, a great trekking base.",
      duration: "30 minutes",
      rating: 4.2,
      languages: ["English", "Hindi"],
      image: "/yuksom-monastery.jpg",
      highlights: ["Historical Significance", "Trekking Base", "Cultural Heritage"],
      difficulty: "Moderate",
      tourUrl: "https://virtualtour.com/yuksom",
      audioFiles: {
        english: "/audio/yuksom_english.mp3",
        hindi: "/audio/yuksom_hindi.mp3",
      },
    },
    {
      id: 24,
      name: "Chomri Monastery",
      description: "A quiet retreat in a beautiful, forested area.",
      duration: "20 minutes",
      rating: 4.1,
      languages: ["English", "Hindi"],
      image: "/chomri-monastery.jpg",
      highlights: ["Quiet Retreat", "Nature Walks", "Bird Watching"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/chomri",
      audioFiles: {
        english: "/audio/chomri_english.mp3",
        hindi: "/audio/chomri_hindi.mp3",
      },
    },
    {
      id: 25,
      name: "Gelling Monastery",
      description: "A beautiful monastery with traditional Sikkimese designs near Yuksom.",
      duration: "25 minutes",
      rating: 4.2,
      languages: ["English", "Hindi", "Nepali"],
      image: "/gelling-monastery.jpg",
      highlights: ["Sikkimese Design", "Buddhist Art", "Local Rituals"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/gelling",
      audioFiles: {
        english: "/audio/gelling_english.mp3",
        hindi: "/audio/gelling_hindi.mp3",
        nepali: "/audio/gelling_nepali.mp3",
      },
    },
    {
      id: 26,
      name: "Martam Monastery",
      description: "A small, quiet monastery with panoramic views of the surrounding hills.",
      duration: "20 minutes",
      rating: 4.1,
      languages: ["English", "Hindi"],
      image: "/martam-monastery.jpg",
      highlights: ["Panoramic Views", "Scenic Retreat", "Local History"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/martam",
      audioFiles: {
        english: "/audio/martam_english.mp3",
        hindi: "/audio/martam_hindi.mp3",
      },
    },
    {
      id: 27,
      name: "Rakdong Monastery",
      description: "A unique monastery known for its vibrant festivals and traditional dances.",
      duration: "30 minutes",
      rating: 4.3,
      languages: ["English", "Hindi", "Tibetan"],
      image: "/rakdong-monastery.jpg",
      highlights: ["Vibrant Festivals", "Traditional Dances", "Prayer Gatherings"],
      difficulty: "Moderate",
      tourUrl: "https://virtualtour.com/rakdong",
      audioFiles: {
        english: "/audio/rakdong_english.mp3",
        hindi: "/audio/rakdong_hindi.mp3",
        tibetan: "/audio/rakdong_tibetan.mp3",
      },
    },
    {
      id: 28,
      name: "Gantok Monastery",
      description: "A historically significant monastery in Lachung, a great place for peaceful reflection.",
      duration: "25 minutes",
      rating: 4.2,
      languages: ["English", "Tibetan"],
      image: "/gantok-monastery.jpg",
      highlights: ["Historical Significance", "Peaceful Surroundings", "Buddhist Teachings"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/gantok",
      audioFiles: {
        english: "/audio/gantok_english.mp3",
        tibetan: "/audio/gantok_tibetan.mp3",
      },
    },
    {
      id: 29,
      name: "Yongda Monastery",
      description: "A lesser-known monastery offering solitude and beautiful views of the Dzongu Valley.",
      duration: "30 minutes",
      rating: 4.1,
      languages: ["English", "Lepcha"],
      image: "/yongda-monastery.jpg",
      highlights: ["Solitude", "Views", "Spiritual Retreat"],
      difficulty: "Moderate",
      tourUrl: "https://virtualtour.com/yongda",
      audioFiles: {
        english: "/audio/yongda_english.mp3",
        lepcha: "/audio/yongda_lepcha.mp3",
      },
    },
    {
      id: 30,
      name: "Dzongu Monastery",
      description: "A serene monastery located in the Lepcha reserve, showcasing tribal history and culture.",
      duration: "40 minutes",
      rating: 4.7,
      languages: ["English", "Lepcha", "Hindi"],
      image: "/dzongu-monastery.jpg",
      highlights: ["Lepcha Culture", "Tribal History", "Cultural Center"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/dzongu",
      audioFiles: {
        english: "/audio/dzongu_english.mp3",
        lepcha: "/audio/dzongu_lepcha.mp3",
        hindi: "/audio/dzongu_hindi.mp3",
      },
    },
    {
      id: 31,
      name: "Takyong Gumpa",
      description: "A lesser-known monastery with a unique charm near the Temi Tea Garden.",
      duration: "25 minutes",
      rating: 4.1,
      languages: ["English", "Hindi"],
      image: "/takyong-gumpa.jpg",
      highlights: ["Unique Charm", "Rural Setting", "Authentic Experience"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/takyong",
      audioFiles: {
        english: "/audio/takyong_english.mp3",
        hindi: "/audio/takyong_hindi.mp3",
      },
    },
    {
      id: 32,
      name: "Gathang Monastery",
      description: "A quiet retreat known for its traditional Buddhist art and intricate designs.",
      duration: "30 minutes",
      rating: 4.3,
      languages: ["English", "Tibetan"],
      image: "/gathang-monastery.jpg",
      highlights: ["Buddhist Art", "Traditional Teachings", "Peaceful Surroundings"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/gathang",
      audioFiles: {
        english: "/audio/gathang_english.mp3",
        tibetan: "/audio/gathang_tibetan.mp3",
      },
    },
    {
      id: 33,
      name: "Thangu Gumpa",
      description: "A small, high-altitude monastery in the stunning Thangu Valley, surrounded by snow-capped peaks.",
      duration: "35 minutes",
      rating: 4.5,
      languages: ["English", "Tibetan"],
      image: "/thangu-gumpa.jpg",
      highlights: ["High-Altitude Location", "Snow-Capped Peaks", "Yak Pastures"],
      difficulty: "Hard",
      tourUrl: "https://virtualtour.com/thangu",
      audioFiles: {
        english: "/audio/thangu_english.mp3",
        tibetan: "/audio/thangu_tibetan.mp3",
      },
    },
    {
      id: 34,
      name: "Gurudongmar Lake & Temple",
      description: "A sacred lake and temple for both Buddhists and Sikhs, a site of immense natural beauty.",
      duration: "50 minutes",
      rating: 4.9,
      languages: ["English", "Hindi", "Sikh"],
      image: "/gurudongmar-lake.jpg",
      highlights: ["Sacred Lake", "High-Altitude", "Religious Harmony"],
      difficulty: "Hard",
      tourUrl: "https://virtualtour.com/gurudongmar",
      audioFiles: {
        english: "/audio/gurudongmar_english.mp3",
        hindi: "/audio/gurudongmar_hindi.mp3",
        sikh: "/audio/gurudongmar_sikh.mp3",
      },
    },
    {
      id: 35,
      name: "Chungthang Gurudwara",
      description: "A historical Gurudwara believed to have been visited by Guru Nanak.",
      duration: "20 minutes",
      rating: 4.7,
      languages: ["English", "Hindi", "Sikh"],
      image: "/chungthang-gurudwara.jpg",
      highlights: ["Historical Significance", "Holy Spring", "Sikh Pilgrimage"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/chungthang-gurudwara",
      audioFiles: {
        english: "/audio/chungthang_gurudwara_english.mp3",
        hindi: "/audio/chungthang_gurudwara_hindi.mp3",
        sikh: "/audio/chungthang_gurudwara_sikh.mp3",
      },
    },
    {
      id: 36,
      name: "Doling Gumpa",
      description: "A beautiful monastery near the Temi Tea Garden, offering peaceful views.",
      duration: "25 minutes",
      rating: 4.3,
      languages: ["English", "Hindi"],
      image: "/doling-gumpa.jpg",
      highlights: ["Tea Garden Views", "Peaceful Location", "Scenic Environment"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/doling",
      audioFiles: {
        english: "/audio/doling_english.mp3",
        hindi: "/audio/doling_hindi.mp3",
      },
    },
    {
      id: 37,
      name: "Legship Monastery",
      description: "A small monastery with a rich history and beautiful views of the Teesta River.",
      duration: "25 minutes",
      rating: 4.2,
      languages: ["English", "Hindi", "Nepali"],
      image: "/legship-monastery.jpg",
      highlights: ["Historical Significance", "Teesta River Views", "Tranquil Atmosphere"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/legship",
      audioFiles: {
        english: "/audio/legship_english.mp3",
        hindi: "/audio/legship_hindi.mp3",
        nepali: "/audio/legship_nepali.mp3",
      },
    },
    {
      id: 38,
      name: "Martam Lower Monastery",
      description: "A peaceful retreat with stunning views and a rich local history.",
      duration: "20 minutes",
      rating: 4.1,
      languages: ["English", "Hindi"],
      image: "/martam-lower-monastery.jpg",
      highlights: ["Stunning Views", "Local History", "Quiet Retreat"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/martam-lower",
      audioFiles: {
        english: "/audio/martam_lower_english.mp3",
        hindi: "/audio/martam_lower_hindi.mp3",
      },
    },
    {
      id: 39,
      name: "Lingthem Monastery",
      description: "A remote monastery offering a deep sense of solitude and natural beauty.",
      duration: "30 minutes",
      rating: 4.0,
      languages: ["English", "Lepcha"],
      image: "/lingthem-monastery.jpg",
      highlights: ["Remote Location", "Solitude", "Natural Beauty"],
      difficulty: "Hard",
      tourUrl: "https://virtualtour.com/lingthem",
      audioFiles: {
        english: "/audio/lingthem_english.mp3",
        lepcha: "/audio/lingthem_lepcha.mp3",
      },
    },
    {
      id: 40,
      name: "Tinthang Monastery",
      description: "A serene monastery located in a beautiful valley, perfect for a peaceful visit.",
      duration: "25 minutes",
      rating: 4.1,
      languages: ["English", "Hindi"],
      image: "/tinthang-monastery.jpg",
      highlights: ["Beautiful Valley", "Serene Location", "Local Culture"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/tinthang",
      audioFiles: {
        english: "/audio/tinthang_english.mp3",
        hindi: "/audio/tinthang_hindi.mp3",
      },
    },
    {
      id: 41,
      name: "Pabong Monastery",
      description: "A small monastery known for its stunning views and rural setting.",
      duration: "20 minutes",
      rating: 4.0,
      languages: ["English", "Nepali"],
      image: "/pabong-monastery.jpg",
      highlights: ["Stunning Views", "Rural Setting", "Trekking Routes"],
      difficulty: "Moderate",
      tourUrl: "https://virtualtour.com/pabong",
      audioFiles: {
        english: "/audio/pabong_english.mp3",
        nepali: "/audio/pabong_nepali.mp3",
      },
    },
    {
      id: 42,
      name: "Yungdrung Phodrang Monastery",
      description: "A beautiful monastery known for its intricate carvings and peaceful surroundings in Lachung.",
      duration: "30 minutes",
      rating: 4.5,
      languages: ["English", "Tibetan"],
      image: "/yungdrung-phodrang.jpg",
      highlights: ["Intricate Carvings", "Traditional Art", "Religious Studies"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/yungdrung",
      audioFiles: {
        english: "/audio/yungdrung_english.mp3",
        tibetan: "/audio/yungdrung_tibetan.mp3",
      },
    },
    {
      id: 43,
      name: "Shingba Monastery",
      description: "Known for its vibrant murals and statues, offering a peaceful setting in Lachung.",
      duration: "25 minutes",
      rating: 4.5,
      languages: ["English", "Tibetan"],
      image: "/shingba-monastery.jpg",
      highlights: ["Vibrant Murals", "Ornate Designs", "Peaceful Setting"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/shingba",
      audioFiles: {
        english: "/audio/shingba_english.mp3",
        tibetan: "/audio/shingba_tibetan.mp3",
      },
    },
    {
      id: 44,
      name: "Gaden Monastery",
      description: "A small, colorful monastery with vibrant prayer flags and a scenic mountain backdrop.",
      duration: "20 minutes",
      rating: 4.4,
      languages: ["English", "Tibetan"],
      image: "/gaden-monastery.jpg",
      highlights: ["Colorful Flags", "Tibetan Art", "Mountain Scenery"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/gaden",
      audioFiles: {
        english: "/audio/gaden_english.mp3",
        tibetan: "/audio/gaden_tibetan.mp3",
      },
    },
    {
      id: 45,
      name: "Phensang Monastery",
      description: "A large monastery with stunning architecture and beautiful murals, known for its religious festivals.",
      duration: "40 minutes",
      rating: 4.6,
      languages: ["English", "Hindi"],
      image: "/phensang-monastery.jpg",
      highlights: ["Stunning Architecture", "Religious Festivals", "Monastic Life"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/phensang",
      audioFiles: {
        english: "/audio/phensang_english.mp3",
        hindi: "/audio/phensang_hindi.mp3",
      },
    },
    {
      id: 46,
      name: "Yangang Gumpa",
      description: "A small, serene monastery offering peaceful surroundings and a space for meditation.",
      duration: "25 minutes",
      rating: 4.1,
      languages: ["English", "Hindi"],
      image: "/yangang-gumpa.jpg",
      highlights: ["Serene Surroundings", "Meditation Space", "Local Culture"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/yangang",
      audioFiles: {
        english: "/audio/yangang_english.mp3",
        hindi: "/audio/yangang_hindi.mp3",
      },
    },
    {
      id: 47,
      name: "Singhik Monastery",
      description: "A small, scenic monastery with breathtaking views of Mt. Kanchenjunga.",
      duration: "30 minutes",
      rating: 4.4,
      languages: ["English", "Hindi", "Nepali"],
      image: "/singhik-monastery.jpg",
      highlights: ["Kanchenjunga View", "Scenic Location", "Peaceful Atmosphere"],
      difficulty: "Moderate",
      tourUrl: "https://virtualtour.com/singhik",
      audioFiles: {
        english: "/audio/singhik_english.mp3",
        hindi: "/audio/singhik_hindi.mp3",
        nepali: "/audio/singhik_nepali.mp3",
      },
    },
    {
      id: 48,
      name: "Bhaichung Monastery",
      description: "A historical monastery with a peaceful ambiance and ancient artifacts.",
      duration: "30 minutes",
      rating: 4.3,
      languages: ["English", "Hindi"],
      image: "/bhaichung-monastery.jpg",
      highlights: ["Historical Site", "Ancient Artifacts", "Traditional Teachings"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/bhaichung",
      audioFiles: {
        english: "/audio/bhaichung_english.mp3",
        hindi: "/audio/bhaichung_hindi.mp3",
      },
    },
    {
      id: 49,
      name: "Lingtam Gumpa",
      description: "A beautiful monastery on the way to Nathu La, offering stunning Himalayan views.",
      duration: "35 minutes",
      rating: 4.3,
      languages: ["English", "Hindi"],
      image: "/lingtam-gumpa.jpg",
      highlights: ["Nathu La Route", "Himalayan Views", "Traditional Rituals"],
      difficulty: "Moderate",
      tourUrl: "https://virtualtour.com/lingtam",
      audioFiles: {
        english: "/audio/lingtam_english.mp3",
        hindi: "/audio/lingtam_hindi.mp3",
      },
    },
    {
      id: 50,
      name: "Baba Harbhajan Mandir",
      description: "A sacred site and temple dedicated to an Indian army soldier, Major 'Baba' Harbhajan Singh.",
      duration: "40 minutes",
      rating: 4.9,
      languages: ["English", "Hindi"],
      image: "/baba-harbhajan-mandir.jpg",
      highlights: ["Military History", "Patriotic Site", "High-Altitude Pilgrimage"],
      difficulty: "Hard",
      tourUrl: "https://virtualtour.com/baba-harbhajan",
      audioFiles: {
        english: "/audio/baba_harbhajan_english.mp3",
        hindi: "/audio/baba_harbhajan_hindi.mp3",
      },
    },
    {
      id: 51,
      name: "Nathang Gumpa",
      description: "A small monastery in the beautiful Nathang Valley, known for its snow-capped mountains.",
      duration: "30 minutes",
      rating: 4.6,
      languages: ["English", "Tibetan"],
      image: "/nathang-gumpa.jpg",
      highlights: ["Nathang Valley", "High-Altitude Location", "Scenic Views"],
      difficulty: "Hard",
      tourUrl: "https://virtualtour.com/nathang",
      audioFiles: {
        english: "/audio/nathang_english.mp3",
        tibetan: "/audio/nathang_tibetan.mp3",
      },
    },
    {
      id: 52,
      name: "Singhik Viewpoint",
      description: "A beautiful monastery offering panoramic views of the Kanchenjunga range and the Teesta Valley.",
      duration: "25 minutes",
      rating: 4.8,
      languages: ["English", "Hindi", "Nepali"],
      image: "/singhik-viewpoint.jpg",
      highlights: ["Panoramic Views", "Kanchenjunga View", "Scenic Beauty"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/singhik-viewpoint",
      audioFiles: {
        english: "/audio/singhik_viewpoint_english.mp3",
        hindi: "/audio/singhik_viewpoint_hindi.mp3",
        nepali: "/audio/singhik_viewpoint_nepali.mp3",
      },
    },
    {
      id: 53,
      name: "Pakyong Gumpa",
      description: "A quiet monastery with a peaceful setting and traditional rituals.",
      duration: "20 minutes",
      rating: 4.1,
      languages: ["English", "Hindi"],
      image: "/pakyong-gumpa.jpg",
      highlights: ["Peaceful Setting", "Meditative Space", "Serene Environment"],
      difficulty: "Easy",
      tourUrl: "https://virtualtour.com/pakyong",
      audioFiles: {
        english: "/audio/pakyong_english.mp3",
        hindi: "/audio/pakyong_hindi.mp3",
      },
    },
  ];
const VirtualTours = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [audioLang, setAudioLang] = useState("english");
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchBarRef = useRef(null);

  const currentTour = tours.find((t) => t.tourUrl === selectedTour);

  // Enhanced: Show suggestions for any input length, highlight matches, keyboard navigation
  useEffect(() => {
    if (searchQuery.length > 0) {
      const matchingTours = tours.filter((tour) =>
        tour.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(matchingTours);
    } else {
      setSuggestions([]);
    }
    setActiveSuggestion(-1);
  }, [searchQuery]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSelectSuggestion = (tourName) => {
    setSearchQuery(tourName);
    setSuggestions([]);
  };

  // Keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      setActiveSuggestion((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveSuggestion((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeSuggestion >= 0) {
      setSearchQuery(suggestions[activeSuggestion].name);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedTours = showAll || searchQuery.length > 0 ? filteredTours : filteredTours.slice(0, 3);

  // Helper to highlight matched text
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="bg-yellow-200 text-primary font-semibold rounded">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-[#c3cfe2] to-[#e2eafc]">
      {/* Hero Section */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/hero-monastery.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/30 to-background/80 backdrop-blur-sm" />
        <div className="relative container mx-auto px-4 text-center max-w-4xl z-10">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6 animate-fadeIn">
            Virtual Tours
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fadeIn delay-100">
            Immerse yourself in 360° panoramic experiences of Sikkim's sacred monasteries.<br />
            Walk through centuries of wisdom from anywhere in the world.
          </p>
          <div className="flex flex-col items-center mb-8 relative w-full" ref={searchBarRef}>
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a monastery..."
                className="w-full pl-10 pr-10 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition bg-white/80 shadow-md backdrop-blur-md text-lg"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X />
                </button>
              )}
            </div>
            {searchQuery.length > 0 && (
              <ul className="absolute top-full w-full max-w-lg bg-white/95 border border-gray-200 rounded-xl shadow-2xl mt-2 z-20 max-h-60 overflow-y-auto animate-fadeIn">
                {suggestions.length === 0 ? (
                  <li className="p-3 text-gray-500 text-left">No results found.</li>
                ) : (
                  suggestions.map((tour, idx) => (
                    <li
                      key={tour.id}
                      className={`p-3 hover:bg-primary/10 cursor-pointer text-left transition rounded ${
                        idx === activeSuggestion ? "bg-primary/20" : ""
                      }`}
                      onClick={() => handleSelectSuggestion(tour.name)}
                      onMouseEnter={() => setActiveSuggestion(idx)}
                    >
                      {highlightMatch(tour.name, searchQuery)}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fadeIn delay-200">
            <Badge variant="secondary" className="text-sm flex items-center gap-1 bg-white/80 text-primary shadow">
              <Globe className="w-4 h-4" /> 6 Languages
            </Badge>
            <Badge variant="secondary" className="text-sm flex items-center gap-1 bg-white/80 text-primary shadow">
              <Volume2 className="w-4 h-4" /> Audio Narration
            </Badge>
            <Badge variant="secondary" className="text-sm flex items-center gap-1 bg-white/80 text-primary shadow">
              <Map className="w-4 h-4" /> Interactive Navigation
            </Badge>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayedTours.map((tour) => (
              <Card
                key={tour.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/70 backdrop-blur-lg border-0 shadow-lg animate-fadeIn"
                style={{ borderRadius: "1.5rem" }}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Button
                    size="icon"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 border-white/20 shadow-lg"
                    onClick={() => {
                      setLoading(true);
                      setSelectedTour(tour.tourUrl);
                      setAudioLang(tour.languages[0].toLowerCase());
                    }}
                  >
                    <Play className="w-7 h-7 text-primary" fill="currentColor" />
                  </Button>
                  <Badge className="absolute top-4 right-4 bg-accent/90 text-accent-foreground shadow">
                    {tour.difficulty}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-display">{tour.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{tour.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" /> {tour.duration}
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Available Languages:</p>
                    <div className="flex flex-wrap gap-1">
                      {tour.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Tour Highlights:</p>
                    <div className="flex flex-wrap gap-1">
                      {tour.highlights.map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="text-xs">{highlight}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 group"
                    onClick={() => {
                      setLoading(true);
                      setSelectedTour(tour.tourUrl);
                      setAudioLang(tour.languages[0].toLowerCase());
                    }}
                  >
                    Experience Virtual Tour with Guided Audio
                    <Play className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {!showAll && filteredTours.length > 3 && searchQuery.length === 0 && (
            <div className="text-center mt-12">
              <Button onClick={() => setShowAll(true)} className="text-lg px-8 py-6 shadow-lg rounded-xl">
                Explore All {filteredTours.length} Tours
              </Button>
            </div>
          )}
          {showAll && (
            <div className="text-center mt-12">
              <Button onClick={() => setShowAll(false)} variant="outline" className="text-lg px-8 py-6 rounded-xl">
                Show Less
              </Button>
            </div>
          )}
        </div>
      </section>
      {selectedTour && currentTour && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="relative w-full max-w-5xl h-[85vh] bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl overflow-hidden shadow-2xl animate-scaleIn">
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary/90 to-accent/90 text-white p-4 flex justify-between items-center z-50">
              <h3 className="text-lg font-semibold">{currentTour.name}</h3>
              <button
                className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition"
                onClick={() => setSelectedTour(null)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute top-20 left-4 z-50 bg-white/90 rounded-md p-2 shadow">
              <label htmlFor="langSelect" className="text-xs font-medium mr-2">Audio:</label>
              <select
                id="langSelect"
                value={audioLang}
                onChange={(e) => setAudioLang(e.target.value)}
                className="text-xs p-1 rounded border"
              >
                {currentTour.languages.map((lang) => (
                  <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                ))}
              </select>
            </div>
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-40">
                <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
                <p className="text-white text-lg font-medium animate-pulse">
                  Loading Virtual Tour…
                </p>
                <p className="text-white/70 text-sm mt-2">
                  Please wait while we prepare your immersive experience
                </p>
              </div>
            )}
            <iframe
              src={selectedTour}
              frameBorder="0"
              width="100%"
              height="100%"
              className="h-full"
              scrolling="no"
              allow="vr; gyroscope; accelerometer"
              allowFullScreen
              onLoad={() => setLoading(false)}
            />
            <audio
              key={audioLang}
              src={currentTour.audioFiles[audioLang]}
              controls
              autoPlay
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 
                        w-11/12 sm:w-2/3 md:w-2/5 
                        bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-2"
            />
          </div>
        </div>
      )}
      {/* Animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.7s both; }
        .animate-scaleIn { animation: scaleIn 0.4s both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </div>
  );
};

export default VirtualTours;
