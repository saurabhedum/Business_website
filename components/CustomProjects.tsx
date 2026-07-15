import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../src/firebase';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';

export const CustomProjects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs: any[] = [];
      snapshot.forEach((doc) => {
        projs.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projs);
    });
    return unsubscribe;
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="py-24 bg-dark relative z-10" id="custom-projects">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">New Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/30 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors flex flex-col"
            >
              {project.imageUrl && (
                <div className="w-full h-48 bg-dark/50 overflow-hidden shrink-0">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                <div className="text-white/70 text-sm markdown-body prose prose-invert max-w-none">
                  <Markdown>{project.description}</Markdown>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
