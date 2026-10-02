// ============================================================
//  AW Loading Screen – everything is configured here
// ============================================================
const Config = {
  server: {
    name: 'AW',                  // shown in the logo block
    subtitle: 'aruhaworks',      // small text under the logo
    city: 'Los Santos',
    logo: ''                     // e.g. 'logo.png' (put it in html/) – empty = built-in animated AW mark
  },

  loading: {
    title: 'LOADING',
    // Stage bars (top left). They fill one after another as the game loads.
    stages: ['CORE', 'RESOURCES', 'MAP', 'PLAYER DATA'],
    statusText: 'Loading game'   // bottom right → "Loading game (80%)"
  },

  // Big line under the ticker – cycles through these
  welcome: {
    messages: [
      'WELCOME TO THE SERVER!',
      'RESPECT EVERY PLAYER',
      'READ THE RULES ON DISCORD',
      'ENJOY YOUR STORY'
    ],
    interval: 5000
  },

  ticker: {
    label: 'BREAKING NEWS',
    speed: 90,                   // px per second
    messages: [
      'Check out our latest information and updates!',
      "Don't forget to join our Discord for news and support",
      'New jobs and vehicles have been added',
      'Server restarts: 06:00 and 18:00',
      'Welcome to the server!'
    ]
  },

  clock: {
    enabled: true,
    format: 12,                  // 12 or 24
    showSeconds: false,
    timeZone: ''                 // '' = player time, or e.g. 'America/New_York'
  },

  weather: {
    enabled: false,
    unit: 'C',                   // 'C' or 'F' (enter temperature in Celsius)
    temperature: 18,
    condition: 'Cloudy',
    icon: '☁'
  },

  video: {
    enabled: true,
    files: ['video/bg.mp4'],     // several allowed – random one is picked
    muted: true,
    grayscale: true,             // forces the black & white look
    dimOpacity: 0.4   // (kept for compatibility)
  },

  music: {
    enabled: true,
    files: ['audio/music.mp3'],
    volume: 0.35,
    loop: true,
    shuffle: false
  }
};
