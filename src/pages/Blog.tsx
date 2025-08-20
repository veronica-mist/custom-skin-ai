import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Palette, Camera, Sparkles } from 'lucide-react';
import blogLuxuryBg from '@/assets/blog-luxury-bg.jpg';
import blogBeautyTips from '@/assets/blog-beauty-tips.jpg';
import blogTechnology from '@/assets/blog-technology.jpg';
import blogTutorials from '@/assets/blog-tutorials.jpg';
import blogIndustry from '@/assets/blog-industry.jpg';
import blogSkincare from '@/assets/blog-skincare.jpg';
import blogPhotography from '@/assets/blog-photography.jpg';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryImages = {
    "Beauty Tips": blogBeautyTips,
    "Technology": blogTechnology,
    "Tutorials": blogTutorials,
    "Industry Insights": blogIndustry,
    "Skincare": blogSkincare,
    "Photography": blogPhotography
  };

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Your Skin's Undertone: The Ultimate Guide",
      excerpt: "Learn how to identify your skin's undertone and why it's crucial for finding the perfect foundation match.",
      author: "TrueTone Beauty Team",
      date: "2024-01-15",
      category: "Beauty Tips",
      readTime: "5 min read",
      image: blogBeautyTips
    },
    {
      id: 2,
      title: "The Science Behind AI Skin Analysis",
      excerpt: "Discover how artificial intelligence revolutionizes foundation matching with 95%+ accuracy across all skin tones.",
      author: "Dr. Sarah Chen",
      date: "2024-01-10",
      category: "Technology",
      readTime: "8 min read",
      image: blogTechnology
    },
    {
      id: 3,
      title: "Foundation Application Techniques for Different Coverage Levels",
      excerpt: "Master the art of foundation application with our expert tips for light, medium, and full coverage looks.",
      author: "Maya Patel",
      date: "2024-01-05",
      category: "Tutorials",
      readTime: "6 min read",
      image: blogTutorials
    },
    {
      id: 4,
      title: "Inclusive Beauty: Why Representation Matters in Cosmetics",
      excerpt: "Exploring the importance of diverse shade ranges and how technology is making beauty more inclusive.",
      author: "TrueTone Editorial",
      date: "2024-01-01",
      category: "Industry Insights",
      readTime: "7 min read",
      image: blogIndustry
    },
    {
      id: 5,
      title: "Skincare Ingredients That Work Best with Foundation",
      excerpt: "Learn about skincare additives like Hyaluronic Acid and Vitamin E that can enhance your foundation's performance.",
      author: "Dr. Emily Johnson",
      date: "2023-12-28",
      category: "Skincare",
      readTime: "4 min read",
      image: blogSkincare
    },
    {
      id: 6,
      title: "Photography Tips: How to Take the Perfect Selfie for Skin Analysis",
      excerpt: "Get the most accurate AI analysis results with these professional photography tips for skin tone scanning.",
      author: "Alex Rivera",
      date: "2023-12-25",
      category: "Photography",
      readTime: "5 min read",
      image: blogPhotography
    }
  ];

  const categories = ["All", "Beauty Tips", "Technology", "Tutorials", "Industry Insights", "Skincare", "Photography"];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        className="py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${blogLuxuryBg})`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Beauty & Tech Blog
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Expert tips, tutorials, and insights on personalized beauty technology
            </p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                Explore Topics
              </h2>
              <p className="text-xl text-muted-foreground">
                From beauty tutorials to cutting-edge AI technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="p-8 text-center shadow-card hover-lift">
                <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Beauty Tips</h3>
                <p className="text-muted-foreground">
                  Expert advice on foundation application, color matching, and makeup techniques
                </p>
              </Card>

              <Card className="p-8 text-center shadow-card hover-lift">
                <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Technology</h3>
                <p className="text-muted-foreground">
                  Behind-the-scenes look at AI skin analysis and beauty innovation
                </p>
              </Card>

              <Card className="p-8 text-center shadow-card hover-lift">
                <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Tutorials</h3>
                <p className="text-muted-foreground">
                  Step-by-step guides for perfect application and skin analysis
                </p>
              </Card>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "hero" : "outline"}
                  size="sm"
                  className="hover-lift"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden shadow-card hover-lift transition-smooth">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-primary">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-primary line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {post.readTime}
                      </span>
                      <Link to={`/blog/${post.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="luxury" size="lg">
                Load More Articles
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Popular Articles */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">
              Most Popular Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.slice(0, 4).map((post, index) => (
                <div key={post.id} className="flex items-center space-x-4 p-4 bg-primary-foreground/10 rounded-lg">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold line-clamp-1">{post.title}</h4>
                    <p className="text-sm text-primary-foreground/70">{post.readTime}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/ai-scan">
              <Button variant="secondary" size="xl" className="mt-8">
                Try Our AI Skin Analysis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;