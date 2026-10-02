# AW Loading Screen

> A clean, configurable and performance-focused FiveM loading screen by **ARUHAWORKS**.

![AW Loading Screen Showcase](docs/showcase.gif)

## Overview

`aw_loadingscreen` is a custom FiveM loading screen built around a minimal black-and-white visual system.

It combines:

- 🎬 Background video
- 🎵 Configurable background music
- 📊 Native FiveM loading progress
- 🧭 Loading stages
- 🕒 Live clock
- 📰 Animated information ticker
- ✍️ Rotating welcome messages
- 🌡️ Optional weather display
- 🖥️ Responsive layout
- ♿ Reduced-motion support
- ⚙️ Configuration-first architecture

## Showcase

The animated preview above is included in the repository under:

```text
docs/showcase.gif
```

This GIF is intended as a **visual showcase** for the repository and is not required by the resource at runtime.

## Installation

Place the resource inside your FiveM resources directory:

```text
resources/
└── aw_loadingscreen/
```

Add it to `server.cfg`:

```cfg
ensure aw_loadingscreen
```

## Configuration

Most customization is handled from:

```text
html/config.js
```

Example:

```js
const Config = {
  server: {
    name: 'AW',
    subtitle: 'aruhaworks',
    city: 'Los Santos',
    logo: ''
  },

  loading: {
    title: 'LOADING',
    stages: [
      'CORE',
      'RESOURCES',
      'MAP',
      'PLAYER DATA'
    ],
    statusText: 'Loading game'
  },

  welcome: {
    messages: [
      'WELCOME TO THE SERVER!',
      'RESPECT EVERY PLAYER',
      'READ THE RULES ON DISCORD',
      'ENJOY YOUR STORY'
    ],
    interval: 5000
  }
};
```

## Visual System

The default design uses:

```text
BLACK
WHITE
GRAYSCALE
MINIMAL UI
```

The background can automatically be forced into grayscale through:

```js
video: {
  grayscale: true
}
```

## Project Structure

```text
aw_loadingscreen/
├── fxmanifest.lua
├── docs/
│   └── showcase.gif
└── html/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── config.js
    ├── audio/
    │   └── music.mp3
    └── video/
        └── bg.mp4
```

## Technical Details

The loading screen listens for FiveM's native:

```js
loadProgress
```

event and maps the loading fraction to the configured stages.

The project also includes a browser-preview fallback, so the interface can be opened outside FiveM while developing the UI.

The JavaScript keeps user-controlled text escaped before it is inserted into the ticker and welcome-message markup.

## Customization

You can change:

- Server name
- City
- Logo
- Loading stages
- Welcome messages
- Ticker messages
- Clock format
- Time zone
- Weather display
- Background videos
- Music
- Music volume
- Grayscale mode
- Loading text

without changing the core UI logic.

## Performance

The resource is intentionally lightweight:

- No external frontend framework
- No build step
- Vanilla HTML/CSS/JavaScript
- Local assets
- Native FiveM loading progress
- Minimal DOM operations
- Responsive CSS
- Reduced-motion support

## Credits

Created by **ARUHAWORKS**.

```text
ARUHAWORKS
Software Engineer & FiveM Developer
Building clean. Building secure. Building to last.
```

## License

MIT

Copyright (c) 2026 ARUHAWORKS

