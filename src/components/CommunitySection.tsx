import React, { useState } from "react";
import { Star, Camera, Heart, MessageCircle, Upload, Filter } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

// ---------- Types ----------
interface User {
  name: string;
  avatar: string;
  type: "visitor" | "local" | "monk";
}

interface Review {
  id: string;
  user: User;
  rating: number;
  title: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  monastery: string;
  date: string;
  verified: boolean;
  likedByUser?: boolean;
  userComments?: string[];
}

// ---------- Sample Data ----------
const initialReviews: Review[] = [
  {
    id: "1",
    user: { name: "Anjali Sharma", avatar: "/api/placeholder/40/40", type: "visitor" },
    rating: 5,
    title: "Breathtaking spiritual experience at Rumtek",
    content:
      "Rumtek was absolutely breathtaking! The chanting, the murals, and the peaceful atmosphere made me feel deeply connected.",
    images: ["/rumtek1.jpg", "/rumtek2.jpg"],
    likes: 24,
    comments: 8,
    monastery: "Rumtek Monastery",
    date: "2 days ago",
    verified: true,
    likedByUser: false,
    userComments: ["This is so true, I had the same experience!"],
  },
  {
    id: "2",
    user: { name: "Tashi Bhutia", avatar: "/api/placeholder/40/40", type: "local" },
    rating: 4,
    title: "Sharing stories from my village monastery",
    content:
      "I grew up near Enchey Monastery. This project is wonderful — finally our stories are being heard worldwide.",
    images: [],
    likes: 12,
    comments: 3,
    monastery: "Enchey Monastery",
    date: "5 days ago",
    verified: false,
  },
];

// ---------- Component ----------
const CommunitySection = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  return (
    <div className="container mx-auto px-4">
      {/* Animated heading */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
          Voices of the Community
        </h2>
        <p className="text-lg text-muted-foreground">
          Real experiences from visitors, locals, and monastery guardians
        </p>
      </motion.div>

      {/* Review grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-shadow rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{review.user.name}</h3>
                  <p className="text-sm text-muted-foreground">{review.user.type}</p>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <h4 className="font-bold mb-2">{review.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{review.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{review.monastery}</Badge>
                  {review.verified && <Badge>Verified</Badge>}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{review.date}</span>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" /> {review.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" /> {review.comments}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunitySection;
