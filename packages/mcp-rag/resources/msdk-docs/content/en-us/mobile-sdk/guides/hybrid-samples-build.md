# Build Hybrid Sample Apps

To build hybrid apps from the `samples` directory of the [SalesforceMobileSDK-Shared](https://github.com/forcedotcom/SalesforceMobileSDK-Shared) repository, you use forcehybrid and the Cordova command line. You create a `hybrid_local` or `hybrid_remote` app and then add the web assets—HTML, JavaScript, and CSS files—and the `bootconfig.json` file from the Shared repo.

:::note

The ContactExplorer sample requires the `cordova-plugin-contacts` and `cordova-plugin-statusbar` plug-ins.

The other hybrid sample apps do not require special Cordova plug-ins.

:::

To build one of the sample apps:

1.  Open a command prompt or terminal window.
2.  Clone the shared repo:

    ```nolang
    git clone https://github.com/forcedotcom/SalesforceMobileSDK-Shared
    ```

3.  Use forcehybrid to create an app.
    - For platform, enter one or both platform names: “ios”, “android”, or “ios,android”.
    - For application type (or the `apptype` parameter), enter “hybrid_local”.
4.  Change to your new app directory:

    ```nolang
    cd <APP_TARGET_DIRECTORY>
    ```

::include{src="../../shared/hybrid_step_plugin_add.md"}

6. (Optional—Mac only) To add iOS support to an Android project “after the fact”:

   ```nolang
   cordova platform add ios@
   ```

7. (Optional—Mac only) To add Android support to an iOS project “after the fact”:

   ```nolang
   cordova platform add android@
   ```

8. Copy the sample source files to the `www` folder of your new project directory.

   On Mac:

   ```nolang
   cp -RL <LOCAL PATH TO SALESFORCEMOBILESDK-SHARED>/SampleApps/<TEMPLATE>/* www/
   ```

   On Windows:

   ```nolang
   copy <LOCAL PATH TO SALESFORCEMOBILESDK-SHARED>\SampleApps\<TEMPLATE>\*.* www
   ```

   If you’re asked, affirm that you want to overwrite existing files.

9. Do the final Cordova preparation:

   ```nolang
   cordova prepare
   ```

:::note

- Android Studio refers to forcehybrid projects by the platform name ("android"). For example, to run your project, select "android" as the startup project and then click Run.
- On Windows, Android Studio sets the default project encoding to `windows-1252`. This setting conflicts with the `UTF-8` encoding of the forcehybrid Gradle build files. For best results, change the default project encoding to `UTF-8`.
- On Windows, be sure to run Android Studio as administrator.

:::
