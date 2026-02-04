import { GlassCard } from './GlassCard';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: readonly string[];
  image?: string;
  link?: string;
  github?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  tech,
  image,
  link,
  github,
  className,
}: ProjectCardProps) {
  return (
    <GlassCard hover className={cn('group', className)}>
      <div className="space-y-4">
        {/* Project image */}
        <div className="aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
          {image ? (
            <img
              src={image}
              alt={title}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl opacity-50">
              💻
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-indigo-400">
            {title}
          </h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2">
          {link && link !== '#' && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-400 transition-colors hover:text-indigo-300"
            >
              View Live →
            </a>
          )}
          {github && github !== '#' && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
