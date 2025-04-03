# GOAT Trading Bot Website

A Node.js website for the GOAT Trading Bot - the greatest bot for the greatest traders on Base chain.

## Features

- Responsive website showcasing the GOAT Trading Bot
- Large hero banner for image placement
- Features section highlighting key benefits
- How-it-works section explaining the process
- Use cases and testimonials sections
- FAQ section with accordion functionality
- Waitlist signup form
- Documentation page

## Tech Stack

- Node.js
- Express.js
- EJS (Embedded JavaScript templates)
- CSS3
- JavaScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd goat-trading-bot
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
npm start
```

The website will be available at http://localhost:3000

### Development Mode

For development with auto-restart on file changes, use:
```bash
npm run dev
```

## Project Structure

```
goat-trading-bot/
├── public/               # Static assets
│   ├── css/              # CSS files
│   ├── js/               # JavaScript files
│   └── images/           # Image files
├── views/                # EJS templates
│   ├── index.ejs         # Home page
│   └── documentation.ejs # Documentation page
├── app.js                # Main application file
├── package.json          # Project metadata and dependencies
└── README.md             # This file
```

## Customization

- To add an image to the hero banner, place your image in the public/images directory and update the hero section in views/index.ejs
- To modify the website content, edit the EJS template files in the views directory
- To change styles, modify the CSS files in the public/css directory

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgements

- Design inspiration from the original GOAT Trading Bot website
- Font Awesome for icons
- Google Fonts for typography 