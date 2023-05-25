module.exports = {
  siteTitle: 'Navin Seaab | Software Developer | Data scientist',
  siteDescription:
    'Navin seab is a softwaare engineer and self taught data scientist',
  siteKeywords:
    'Navin seab, ML engineer, self taught data scienttist',
  siteUrl: '',
  siteLanguage: 'en_US',
  googleAnalyticsID: 'UA-45666519-2',
  googleVerification: 'DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk',
  name: 'Chandrika Deb',
  location: 'Jamshedpur, India',
  email: 'seab.navin19@kit.edu.kh',
  github: 'https://seabnavin19.github.io/',
  twitterHandle: '',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/seabnavin19',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/navin-seab-95750b1b5/',
    },
   
   
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  navHeight: 100,

  colors: {
    green: '#ff8500',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.25,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
