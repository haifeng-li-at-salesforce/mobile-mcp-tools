# Create Hybrid Apps

Once you’ve installed forcehybrid and the Cordova command line, you’re ready to create functioning hybrid apps.

## Set Up Your Tools

If you haven’t already set up the required tools, use the following instructions. Or, if you prefer, complete the [Set Up Your Mobile SDK Developer Tools](https://trailhead.salesforce.com/en/projects/mobilesdk_setup_dev_tools) Trailhead project and win Trailhead points for your efforts. Afterwards, return here and pick up at [Create a Hybrid Mobile SDK App](#create-a-hybrid-mobile-sdk-app).

:::note

Some of the following steps use the `sudo` keyword. This keyword is required in Mac OS X if you lack read/write permissions. Omit the `sudo` command if you’re sure you don’t need it or if you’re installing on Windows.

:::

1.  Make sure that you meet the requirements listed at [Development Prerequisites for iOS and Android](dev-prereq.md). Hybrid development requires at least one native environment, which can be either iOS or Android.
2.  Open a command prompt or terminal window.
3.  Run `cordova -v`.
4.  If `cordova -v` reports that the command is not found, install the Cordova command line, version 12.0.0 or later:

    ```nolang
    sudo npm install -g cordova
    ```

5.  Install the forcehybrid npm package:

    ```nolang
    sudo npm install -g forcehybrid
    ```

    If you previously installed an earlier version of forcehybrid, be sure to uninstall it before reinstalling forcehybrid.

## Create a Hybrid Mobile SDK App

1.  At a command prompt or terminal window, run `forcehybrid create`.
    - For platform, enter “ios”, “android”, or “ios,android”.
    - For application type:
      - Specify `hybrid_local` for a Cordova hybrid app that stores its code on the mobile device.
      - Specify `hybrid_remote` for a Cordova hybrid app that runs a Visualforce app on the server.
    - Provide your own app name, package name, and organization strings.
    - (Hybrid remote apps only) For start page, specify the relative URL of your Apex landing page—for example, `apex/BasicVFPage`.
2.  If you’re importing HTML, JavaScript, CSS, or `bootconfig.json` files, put them in your project’s `<outputdir>/www/` directory.

    :::important

    Do not include `cordova.js`, `cordova.force.js`, or any Cordova plug-ins.

    :::

3.  In your project directory, open the `www/bootconfig.json` file in a UTF-8 compliant text editor and replace the values of the following properties:
    - `remoteAccessConsumerKey`—Replace the default value with the consumer key from your connected app
    - `oauthRedirectURI`—Replace the default value with the callback URL from your connected app
4.  `cd` to your app’s project directory. The force script prints the directory name to the screen when it has finished creating your project. For example: “Your application project is ready in \<_project directory name_>.”
5.  For each additional Cordova plug-in you want to add, type:

    ```nolang
    cordova plugin add <PLUG-IN REPO OR PLUG-IN NAME>
    ```

    :::note

    Go to [https://plugins.cordova.io](http://cordova.apache.org/blog/releases/2013/07/23/cordova-3.html) to search for available plug-ins.

    :::

6.  (Optional—Mac only) To add a second platform “after the fact”:

    - To add iOS support, type:

      ```nolang
      cordova platform add ios@
      ```

    - To add Android support, type:

      ```nolang
      cordova platform add android@
      ```

7.  Type:

    ```nolang
    cordova prepare
    ```

    to deploy your web assets to their respective platform-specific directories under the `www/` directory.

    :::important

    During development, always run `cordova prepare` after you’ve changed the contents of the `www/` directory, to deploy your changes to the platform-specific project folders.

    :::

<!--
1.  To run your hybrid app in an emulator, type:

    ```nolang
    cordova emulate ios
    ```

    or

    ```nolang
    cordova emulate android
    ```
-->

See “The Command-Line Interface” in the [Cordova 3.5 documentation](http://cordova.apache.org/docs/en/3.5.0/) for more information on the Cordova command line.
