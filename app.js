const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const app = express();
const initialPort = process.env.PORT || 3050;
let currentPort = initialPort;
const maxPortAttempts = 20; // Try up to 20 ports
let portAttempts = 0;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/documentation', (req, res) => {
  res.render('documentation');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy');
});

app.get('/terms-of-service', (req, res) => {
  res.render('terms-of-service');
});

app.get('/cookies-policy', (req, res) => {
  res.render('cookies-policy');
});

// Handle waitlist form submission
app.post('/join-waitlist', (req, res) => {
  const { email } = req.body;
  // Here you would typically save this to a database
  console.log(`New waitlist signup: ${email}`);
  res.redirect('/?waitlist=success');
});

// Function to try starting the server
function startServer(port) {
  const server = http.createServer(app);
  
  server.listen(port);
  
  server.on('listening', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      portAttempts++;
      if (portAttempts < maxPortAttempts) {
        const nextPort = port + 1;
        console.log(`Port ${port} is busy, trying port ${nextPort}...`);
        startServer(nextPort);
      } else {
        console.error(`Unable to find an available port after ${maxPortAttempts} attempts.`);
        console.error('Please close some applications and try again.');
      }
    } else {
      console.error('Server error:', err);
    }
  });
}

// Start the server
startServer(currentPort); 