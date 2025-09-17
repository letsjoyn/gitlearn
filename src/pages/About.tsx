import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Globe, Users, Shield, Award, BookOpen, Quote } from "lucide-react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { number: 25, suffix: "+", label: "Sacred Monasteries", icon: Heart },
    { number: 6, suffix: "", label: "Languages Supported", icon: Globe },
    { number: 10000, suffix: "+", label: "Visitors Served", icon: Users },
    { number: 500, suffix: "+", label: "Years of Heritage", icon: BookOpen },
  ];

  const team = [
    {
      name: "Dr. Karma Lama",
      role: "Cultural Heritage Director",
      bio: "Buddhist scholar and monastery preservation expert with 20 years of experience.",
      image: "/a.jpeg"
    },
    {
      name: "Pema Sherpa",
      role: "Local Community Liaison",
      bio: "Born in Sikkim, connecting traditional wisdom with modern digital preservation.",
      image: "/a1.jpeg"
    },
    {
      name: "Sarah Chen",
      role: "Technology Lead",
      bio: "Specializes in immersive technologies and cultural digitization projects.",
      image: "/a2.jpeg"
    }
  ];

  const testimonials = [
    {
      quote: "Monastery360 helped me connect with my heritage even while living abroad.",
      author: "Tenzin, New York"
    },
    {
      quote: "A beautiful initiative that preserves culture while embracing technology.",
      author: "Sonam, Sikkim"
    },
    {
      quote: "The digital tours are breathtaking — I felt like I was there in person.",
      author: "Emily, London"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-6">
              Preserving Sacred Heritage
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Monastery360 bridges ancient wisdom with modern technology, making Sikkim's 
              spiritual treasures accessible to the world while preserving them for future generations.
            </p>
            <div className="text-2xl font-display italic bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mb-6 drop-shadow">
              "Digitizing today, preserving forever."
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We believe that sacred spaces and ancient wisdom should be accessible to all, 
                  regardless of physical or geographical limitations. Through cutting-edge technology 
                  and deep respect for Buddhist traditions, we create immersive digital experiences 
                  that honor the spiritual essence of these holy sites.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our work supports local communities, preserves cultural heritage, and promotes 
                  sustainable tourism that benefits both visitors and the monasteries themselves.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Cultural Preservation</Badge>
                  <Badge variant="secondary">Sustainable Tourism</Badge>
                  <Badge variant="secondary">Community Support</Badge>
                  <Badge variant="secondary">Digital Innovation</Badge>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/src/assets/monastery-interior.jpg"
                  alt="Monastery Interior"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Impact & Reach
            </h2>
            <p className="text-lg text-muted-foreground">
              Connecting global audiences with Sikkim's spiritual heritage
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center transition-transform transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 text-black mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">
                      <CountUp end={stat.number} duration={2} />{stat.suffix}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Bringing together traditional wisdom and modern innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center transition-transform transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader>
                    <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-4 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-accent font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Voices from the Community
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from those who have experienced our mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="relative p-6 text-center shadow-lg rounded-2xl">
                  <Quote className="w-6 h-6 text-primary mx-auto mb-4" />
                  <p className="italic text-muted-foreground mb-4">"{t.quote}"</p>
                  <p className="font-semibold text-primary">— {t.author}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Join Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Help us preserve and share Sikkim's spiritual heritage with the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Support Our Work
                <Heart className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Become a Partner
                <Users className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
