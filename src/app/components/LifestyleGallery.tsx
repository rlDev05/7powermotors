import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function LifestyleGallery() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1715327876958-011d71c0682d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwY29tbXVuaXR5JTIwcmlkZXJzJTIwZ3JvdXB8ZW58MXx8fHwxNzcwMDAwNDIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Community Events',
    },
    {
      url: 'https://images.unsplash.com/photo-1764748067741-1215f8975c22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwbW91bnRhaW4lMjByb2FkfGVufDF8fHx8MTc3MDAwMDQyMXww&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Epic Rides',
    },
    {
      url: 'https://images.unsplash.com/photo-1769537754949-65dcaa720995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwc2hvd3Jvb20lMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc3MDAwMDQyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Our Showroom',
    },
    {
      url: 'https://images.unsplash.com/photo-1549636367-13c144c47063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBtb3RvcmN5Y2xlJTIwZ2FyYWdlfGVufDF8fHx8MTc2OTk2MDY3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Custom Builds',
    },
  ];

  return (
    <section id="about" className="py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span
            className="text-accent tracking-[0.2em] mb-4 block"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            LIFESTYLE & COMMUNITY
          </span>
          <h2
            className="mb-6"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            More Than Motorcycles
          </h2>
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}
          >
            Join a community of passionate riders. From group rides to exclusive
            events, 7POWER MOTORS is where riders connect, share, and celebrate the
            freedom of the open road.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden border border-border/50 hover:border-accent/50 transition-all duration-500 h-80"
            >
              <ImageWithFallback
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  {image.caption}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
