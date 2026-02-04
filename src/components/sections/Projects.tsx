import { GlassCard } from '../ui/GlassCard';
import { ProjectCard } from '../ui/ProjectCard';
import { PROJECTS } from '../../lib/constants';

export function Projects() {
  return (
    <section id="projects" className="flex min-h-screen items-center px-8 md:px-16 lg:px-24">
      <div className="w-full max-w-4xl">
        <GlassCard className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-400">
            My Work
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-2 text-slate-400">
            A selection of projects I&apos;ve built with passion and purpose
          </p>
        </GlassCard>

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tech={project.tech}
              image={project.image}
              link={project.link}
              github={project.github}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
