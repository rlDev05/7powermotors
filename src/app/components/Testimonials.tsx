import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'The bike stays easier to clean after long rides. It still looks polished even after rain and road dust.',
    name: 'Motorcycle Owner',
    role: 'Rider',
  },
  {
    quote:
      'CR-1 gives our shop a premium service with a stronger story than ordinary coating packages.',
    name: 'Detailing Shop Partner',
    role: 'Service Center',
  },
  {
    quote:
      'Customers understand the value quickly when they see the cleaner finish, gloss, and professional process.',
    name: 'Motorcycle Dealer',
    role: 'Dealer Partner',
  },
];

export function Testimonials() {
  return (
    <section id="proof" className="racing-section bg-card">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="racing-container">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="racing-kicker">
            Rider & Partner Proof
          </span>
          <h2 className="racing-title">
            Let the riding community do the talking.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="racing-card p-8"
            >
              <Quote className="mb-6 h-10 w-10 text-accent" />
              <p className="min-h-32 text-lg leading-8 text-foreground">
                "{item.quote}"
              </p>
              <div className="mt-8 flex gap-1">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <div className="mt-5 border-t border-border/50 pt-5">
                <p className="font-[Rajdhani] text-xl font-black uppercase text-foreground">
                  {item.name}
                </p>
                <p className="text-sm font-bold uppercase tracking-wider text-accent">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
    </section>
  );
}
