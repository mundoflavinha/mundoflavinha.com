import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    content: "The products are absolutely amazing! The quality is outstanding and the customer service is impeccable. I've been a loyal customer for years.",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Enthusiast",
    content: "I've tried many similar products, but these stand out in terms of performance and design. Definitely worth every penny!",
    avatar: "https://i.pravatar.cc/150?img=69",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "First-time Buyer",
    content: "I was skeptical at first, but after trying the product, I'm completely sold. Will definitely be purchasing again!",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 4
  },
  {
    id: 4,
    name: "David Kim",
    role: "Business Owner",
    content: "These products have transformed how we operate our business. Efficient, reliable, and a great investment.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === Math.ceil(testimonials.length / 2) - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.ceil(testimonials.length / 2) - 1 : prev - 1));
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={i < rating ? "fill-primary text-primary" : "text-gray-300"} 
        />
      ));
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Don't just take our word for it. See what our customers have to say about our products.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array(Math.ceil(testimonials.length / 2))
                .fill(0)
                .map((_, slideIndex) => (
                  <div key={slideIndex} className="min-w-full px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {testimonials
                        .slice(slideIndex * 2, slideIndex * 2 + 2)
                        .map((testimonial) => (
                          <Card key={testimonial.id} className="h-full shadow-md hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                              <div className="flex flex-col h-full">
                                <div className="flex items-center mb-4">
                                  <img 
                                    src={testimonial.avatar} 
                                    alt={testimonial.name} 
                                    className="rounded-full w-12 h-12 mr-4"
                                  />
                                  <div>
                                    <h4 className="font-semibold">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                  </div>
                                </div>
                                <div className="flex mb-4">
                                  {renderStars(testimonial.rating)}
                                </div>
                                <p className="text-gray-700 italic flex-grow">"{testimonial.content}"</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-primary" size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-primary" size={24} />
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          {Array(Math.ceil(testimonials.length / 2))
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentSlide === index ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;