# Musically 🎵

Welcome to Musically, your go-to music application with a clean and fully responsive UI, bringing the magic of music to your fingertips.

## Preview 📷

<img src="/src/assets/musically-1.png" alt="musically-1" />
<img src="/src/assets/musically-2.png" alt="musically-2" />

## Key Features 🚀

- **Fully Responsive UI**: Enjoy a seamless experience on any device.
- **Spotify-like Music Player**: Control your music with play, pause, previous, next, repeat, shuffle, fast forward, and volume controls.
- **Search Functionality**: Find music, singers, or albums effortlessly.
- **Music Genres**: Dive into your favorite music genres.
- **Top Charts**: Discover the top songs and popular artists.
- **Artist Exploration**: Click on artists to explore related songs.
- **Song Details Page**: Get lyrics and related songs for a detailed music experience.
- **Around You Tab**: Explore popular music in your country.

## Technologies Used 💻

- **React**: Powering the entire front-end design.
- **Tailwind CSS**: Leveraging CSS utility classes for sleek styling.
- **React Icons**: Adding a touch of icons to the interface.
- **React Router**: Seamlessly navigating among various components.
- **Redux Toolkit**: Efficient state management.

## APIs 🌐

- **Shazam Core API**: Gathering music data for a rich experience.
- **IP Geolocation API**: Getting user location for personalized content.

## Getting Started 🚀

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/musically.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd musically
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the application:**

   ```bash
   npm start
   ```

5. **Open your browser and visit:**
   ```bash
   http://localhost:3000
   ```

## Contributing 🤝

Contributions are welcome! Feel free to open issues or create pull requests for enhancements.

## Acknowledgments 🙌

- Special thanks to Shazam Core API and IP Geolocation API.
- Gratitude to the open-source community.

Let the music play! 🎶✨

## Deployment (GitHub Pages) 🌍

This project is configured to deploy to **GitHub Pages** using the `gh-pages` branch.

### 1. Configure Repository Settings

Ensure your repository is public (or that you have access to GitHub Pages for private repos with a proper plan). In GitHub:

- Go to Settings > Pages
- Set Source to `Deploy from a branch`
- Select branch: `gh-pages` and folder: `/ (root)`

### 2. Deployment Scripts

The following npm scripts are available:

```
npm run predeploy   # Builds the production bundle
npm run deploy      # Publishes the dist/ folder to gh-pages branch
```

### 3. Deploy

```
npm run deploy
```

### 4. Access Your Site

Visit: `https://<your-username>.github.io/musically/`

If you fork/rename the repo, update `base` in `vite.config.js` accordingly.

### 5. Troubleshooting

- Blank page? Confirm the `base` path matches the repository name.
- Old assets? Force refresh (Ctrl+F5) or clear cache; GitHub Pages can cache aggressively.
- 404 on refresh of a client route: GitHub Pages serves static files only. Consider adding a `404.html` copy of `index.html` if deep links are important.
