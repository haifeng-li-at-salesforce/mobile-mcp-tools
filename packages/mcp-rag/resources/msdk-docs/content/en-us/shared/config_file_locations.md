## Configuration File Locations

Configuration file placement varies according to app type and platform. Mobile SDK looks for configuration files in the following locations:

- iOS (Native and React Native)

  - : Under `/` in the Resources bundle

- Android (Native and React Native)

  - : In the `/res/raw` project folder

- Hybrid

  - : In your Cordova project, do the following:

    1.  Place the configuration file in the top-level `www/` folder.
    2.  In the top-level project directory, run: `cordova prepare`
