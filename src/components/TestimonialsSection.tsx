import { Quote } from "lucide-react";
import { TESTIMONIALS } from "../config/site";
import { Card } from "./ui/card";

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-16 md:py-24" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            O que as familias encontram por aqui
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            O foco e apoiar a rotina real com materiais claros, afetivos e faceis
            de colocar em pratica.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <Card
              className="rounded-[2rem] border-none bg-quaternary/20 p-8 shadow-sm"
              key={testimonial.name}
            >
              <Quote aria-hidden="true" className="h-8 w-8 text-primary" />
              <p className="mt-6 text-lg leading-8 text-gray-700">
                {testimonial.content}
              </p>
              <footer className="mt-8 border-t border-primary/10 pt-5">
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </footer>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
