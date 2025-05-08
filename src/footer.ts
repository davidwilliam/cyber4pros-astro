// src/footer.ts
export const footerData = {
  theme: 'light',

  // small, legal links under the logo
  secondaryLinks: [
    { text: 'Privacy Policy', href: '#' },
    { text: 'Terms of Service', href: '#' }
  ],

  // primary columns of links
  links: [
    {
      title: 'Product',
      links: [
        { text: 'R²IS²E Platform',      href: '#' },
        { text: 'TrustLinkShield™',     href: '#' },
        { text: 'CyberGuard™ Chips',    href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us',             href: '#' },
        { text: 'Leadership Team',      href: '#' },
        { text: 'Careers',              href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog',                 href: '#' },
        { text: 'Support',              href: '#' },
        { text: 'Contact',              href: '#' }
      ]
    },
    {
      title: 'Partners',
      links: [
        { text: 'TP‑Link',              href: '#' },
        { text: 'IC‑Enable',            href: '#' },
        { text: 'SkyWater Technology',  href: '#' }
      ]
    }
  ],

  // social links with icons (using Tabler by default)
  socialLinks: [
    {
      ariaLabel: 'LinkedIn',
      href: '#',
      icon: 'tabler:brand-linkedin'
    },
    {
      ariaLabel: 'Twitter',
      href: '#',
      icon: 'tabler:brand-twitter'
    },
    {
      ariaLabel: 'GitHub',
      href: '#',
      icon: 'tabler:brand-github'
    }
  ],

  // the small copyright / footnote text
  footNote: '© 2025 Cyber4Pros. All rights reserved.'
};
