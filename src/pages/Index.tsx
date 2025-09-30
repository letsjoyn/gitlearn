import { useState, useRef, useEffect } from 'react';
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowRight, MapPin, Calendar, Users, Globe } from "lucide-react"; // Removed Play, Pause as video is auto-play
import { Link } from "react-router-dom";

const Index = () => {
    const featuredMonasteries = [ // These are only used if you uncomment the Featured Monasteries section
        {
            name: "Rumtek Monastery",
            description: "Seat of the Karmapa with golden stupa and ancient murals.",
            image: "/rumtek-monastery-exterior.jpg", // Example path for distinct image
            location: "Gangtok"
        },
        {
            name: "Pemayangtse Monastery",
            description: "A 17th-century monastery with breathtaking Himalayan views.",
            image: "/pemayangtse-monastery-view.jpg", // Example path for distinct image
            location: "Pelling"
        },
        {
            name: "Tashiding Monastery",
            description: "A sacred site known for the holy Bumchu festival.",
            image: "/tashiding-monastery-flags.jpg", // Example path for distinct image
            location: "West Sikkim"
        }
    ];

    const monasteriesForSlider = [
        {
            name: "Rumtek Monastery",
            location: "Gangtok",
            image: "/monastery-interior.jpg", // Example image
            description: "The largest monastery in Sikkim, a vibrant center of Buddhist learning."
        },
        {
            name: "Pemayangtse Monastery",
            location: "Pelling",
            image: "/prayer-flags.jpg", // Example image
            description: "One of the oldest and most significant monasteries, offering stunning views."
        },
        {
            name: "Tashiding Monastery",
            location: "West Sikkim",
            image: "/hero-monastery.jpg", // Example image
            description: "Considered the most sacred monastery in Sikkim, nestled on a hillock."
        },
        {
            name: "Enchey Monastery",
            location: "Gangtok",
            image: "/enchey-monastery.jpg", // Example image
            description: "A beautiful monastery in Gangtok, famous for its unique architecture and serenity."
        },
        {
            name: "Dubdi Monastery",
            location: "Yuksom",
            image: "/dubdi-monastery.jpg", // Example image
            description: "Sikkim's first monastery, an ancient and serene place of worship."
        },
        {
            name: "Khecheopalri Lake",
            location: "West Sikkim",
            image: "/khecheopalri-lake.jpg", // Example image
            description: "A sacred wish-fulfilling lake, believed to be footprint of Goddess Tara."
        },
        {
            name: "Ralang Monastery",
            location: "Ravangla",
            image: "/ralang-monastery.jpg", // Example image
            description: "Known for its magnificent collection of thangkas and a vibrant annual festival."
        },
        {
            name: "Ghum Monastery",
            location: "Darjeeling",
            image: "/ghum-monastery.jpg", // Example image
            description: "One of the oldest Tibetan Buddhist monasteries in the Darjeeling area."
        },
        {
            name: "Buddha Park",
            location: "Ravangla",
            image: "/buddha-park.jpg", // Example image
            description: "Features a gigantic statue of Lord Buddha amidst a beautifully landscaped park."
        },
        {
            name: "Samdruptse Hill",
            location: "Namchi",
            image: "/samdruptse-hill.jpg", // Example image
            description: "Home to an colossal statue of Guru Padmasambhava, offering panoramic views."
        },
        {
            name: "Lingdum Monastery",
            location: "East Sikkim",
            image: "/lingdum-monastery.jpg", // Example image
            description: "A modern monastery known for its striking architecture and serene environment."
        },
        {
            name: "Phodong Monastery",
            location: "North Sikkim",
            image: "/phodong-monastery.jpg", // Example image
            description: "One of the six major monasteries in Sikkim, known for its ancient murals."
        },
        {
            name: "Lachung Monastery",
            location: "Lachung",
            image: "/lachung-monastery.jpg", // Example image
            description: "A small, charming monastery overlooking the picturesque Lachung Valley."
        },
        {
            name: "Yuksom Monastery",
            location: "Yuksom",
            image: "/yuksom-monastery.jpg", // Example image
            description: "A historical site where the first Chogyal of Sikkim was crowned."
        },
    ];

    const quickStats = [
        { icon: MapPin, label: "25+ Monasteries", value: "Sacred Sites" },
        { icon: Globe, label: "6 Languages", value: "Global Access" },
        { icon: Users, label: "10K+ Visitors", value: "Community" },
        { icon: Calendar, label: "500+ Years", value: "Heritage" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <HeroSection />

            
            {/* Sliding Monastery Carousel - More Attractive */}
            <section className="bg-white dark:bg-gray-900 rounded-xl shadow-inner py-8"> {/* Changed background for visual separation */}
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-10">
                     
                    </div>
                    <div className="overflow-hidden relative group py-4"> {/* Added group for hover effect and relative for child positioning */}
                        <div className="flex space-x-6 animate-slide group-hover:animation-pause"> {/* Pause on hover */}
                            {/* Duplicate content for seamless loop */}
                            {monasteriesForSlider.concat(monasteriesForSlider).map((monastery, index) => (
                                <Card
                                    key={index}
                                    className="flex-none w-72 md:w-80 lg:w-96 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden" // Slightly larger cards
                                >
                                    <div className="relative overflow-hidden rounded-t-lg h-52"> {/* Fixed height for images */}
                                        <img
                                            src={monastery.image}
                                            alt={monastery.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" /> {/* Stronger gradient */}
                                        <Badge className="absolute top-4 right-4 bg-black text-white text-sm font-semibold px-3 py-1 rounded-full drop-shadow-md"> {/* Enhanced badge */}
                                            <MapPin className="w-3 h-3 inline-block mr-1" /> {monastery.location}
                                        </Badge>
                                    </div>
                                    <CardHeader className="p-4">
                                        <CardTitle className="font-display text-xl text-primary font-bold">{monastery.name}</CardTitle>
                                        <CardDescription className="line-clamp-2 text-base text-gray-700 dark:text-gray-300">{monastery.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <Link to="/tours"> {/* Dynamic link */}
                                            <Button variant="outline" className="w-full mt-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                                               Start virtual Tour
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    {/* Removed the Central Call-to-Action from here */}
                </div>
            </section>

            {/* Central Call-to-Action for the slider section - Moved Outside */}
            <div className="container mx-auto px-4 mt-8 mb-16 text-center">
                <Link to="/monasteries">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg">
                        Explore All Monasteries
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </Link>
            </div>
                
            <FeaturesSection />
            {/* Uncomment if you wish to re-include this section */}
            {/*
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                            Featured Sacred Sites
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Discover some of Sikkim's most renowned monasteries
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {featuredMonasteries.map((monastery, index) => (
                            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-xl">
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img
                                        src={monastery.image}
                                        alt={monastery.name}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
                                    <Badge className="absolute top-4 right-4 bg-accent/90">
                                        {monastery.location}
                                    </Badge>
                                </div>
                                <CardHeader>
                                    <CardTitle className="font-display">{monastery.name}</CardTitle>
                                    <CardDescription>{monastery.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/monasteries">
                            <Button size="lg">
                                Explore All Monasteries
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            */}

            {/* Quick Stats */}
            <section className="py-16 ">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {quickStats.map((stat, index) => (
                            <Card 
                              key={index} 
                              className="text-center rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white text-black"
                            >
                                <CardContent className="pt-6">
                                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <div className="text-3xl font-bold font-display">{stat.value}</div>
                                    <p className="text-sm font-body text-muted-foreground mt-1">{stat.label}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Index;
