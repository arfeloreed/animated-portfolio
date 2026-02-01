import { GlassCard } from '../ui/GlassCard';
import { SKILLS } from '../../lib/constants';

export function About() {
  return (
    <section className="flex min-h-screen items-center justify-end px-8 md:px-16 lg:px-24">
      <GlassCard className="max-w-xl">
        <div className="space-y-6">
          {/* Section label */}
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-400">
            About Me
          </p>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Crafting digital experiences with{' '}
            <span className="text-violet-400">purpose</span>
          </h2>

          {/* Bio */}
          <div className="space-y-4 text-slate-400">
            <p>
              I'm a product engineer who loves building things that live on the internet.
              I focus on creating seamless user experiences with clean, efficient code.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open source, or sketching out my next side project.
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-medium text-slate-300">Technologies I work with</h3>

            <div className="space-y-3">
              {/* Frontend */}
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">Frontend</p>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.frontend.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">Backend</p>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.backend.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.tools.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
