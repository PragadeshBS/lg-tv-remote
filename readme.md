# LG WebOS TV Controller

Welcome to the LG WebOS TV Controller repository! This Electron-based desktop application allows you to control your LG WebOS TVs seamlessly. Whether you want to launch apps, switch inputs, control volume/mute, navigate with arrow keys, or launch the home screen, this app has you covered.

## Features

- **Launch Apps:** Easily launch your favorite apps on your LG WebOS TV with just a click.

- **Switch Inputs:** Switch between different inputs on your TV effortlessly using the desktop app.

- **Control Volume/Mute:** Adjust the volume or mute your TV directly from the application.

- **Navigate and type with your PC:** Use your computer's keyboard and mouse for smooth navigation on your LG WebOS TV.

- **Launch Home:** Return to the home screen of your TV conveniently.

## Screenshot

![LG WebOS TV Controller](screenshots/ss.png)
![LG WebOS TV Controller](screenshots/ss2.png)

## Known Issues

- **Disconnected Status not Displayed:** The application currently does not show a disconnected status when the TV gets disconnected. This is a known issue. Please raise a pull request if you have a fix for this.

## How to Run the Application in development mode

1. Clone the repository to your local machine.

   ```
   git clone https://github.com/PragadeshBS/lg-tv-remote
   ```

2. Install dependencies and start the UI development server.

   ```
   npm install && cd new-view && npm install && npm run dev
   ```

3. In main.js, change/comment the line that loads the URL to load the development server instead of the production build.

   ```javascript
   // main.js
   // Change this line:
   // win.loadFile("./new-view/dist/index.html")
   // To this:
   win.loadURL("http://localhost:5173");
   ```

4. Run the application from the repository root.

   ```
   npm start # this needs to be run from repository root, not from new-view
   ```

5. Enjoy controlling your LG WebOS TV from your desktop!

## Contributing

If you encounter any issues or have suggestions for improvement, feel free to create an issue or submit a pull request.
