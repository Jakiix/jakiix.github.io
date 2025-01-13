import { Github, Instagram, Linkedin, X } from 'lucide-react';

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/vincent-jacquet/',
    label: 'LinkedIn',
  },
  {
    icon: Github,
    href: 'https://github.com/Jakiix',
    label: 'GitHub',
  },
  {
    icon: X,
    href: 'https://bsky.app/profile/jakix.bsky.social',
    label: 'Bluesky',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/vincent.jacquet_/',
    label: 'Instagram',
  },
] as const;

export function SocialLinks() {
  return (
    <div className="flex justify-center gap-8 mt-16 mb-12">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
          aria-label={label}
        >
          <Icon className="w-8 h-8" />
        </a>
      ))}
    </div>
  );
}