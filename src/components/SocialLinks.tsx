import { Github, Instagram, Linkedin, X } from 'lucide-react';

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/vincent-jacquet/',
    label: 'LinkedIn',
    hoverColor: 'hover:text-[#0A66C2]'
  },
  {
    icon: Github,
    href: 'https://github.com/Jakiix',
    label: 'GitHub',
    hoverColor: 'hover:text-[#333]'
  },
  {
    icon: X,
    href: 'https://bsky.app/profile/jakix.bsky.social',
    label: 'Bluesky',
    hoverColor: 'hover:text-[#0EA5E9]'
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/vincent.jacquet_/',
    label: 'Instagram',
    hoverColor: 'hover:text-[#E4405F]' 
  },
] as const;

export function SocialLinks() {
  return (
    <div className="flex justify-center gap-8 mt-16 mb-12">
      {socialLinks.map(({ icon: Icon, href, label, hoverColor }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-600 ${hoverColor} transition-all duration-300 hover:scale-110`}
          aria-label={label}
        >
          <Icon className="w-8 h-8" />
        </a>
      ))}
    </div>
  );
}