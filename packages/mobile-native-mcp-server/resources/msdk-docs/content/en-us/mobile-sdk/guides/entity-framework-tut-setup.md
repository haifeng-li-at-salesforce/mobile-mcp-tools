# Create a Template Project

First, make sure you’ve installed Salesforce Mobile SDK using the NPM installer. For iOS instructions, see [iOS Preparation](install-ios.md). For Android instructions, see [Android Preparation](install-android.md).

Also, download the `ratchet.css` file from [http://goratchet.com/](http://goratchet.com/).

Once you’ve installed Mobile SDK, create a local hybrid project for your platform.

1.  At a Terminal window or Windows command prompt, run the `forcehybrid create` command using the following values:

    | Prompt (or Parameter)            | Value                                                                                           |
    | -------------------------------- | ----------------------------------------------------------------------------------------------- |
    | Platform (`--platform`)          | `ios`, `android`, or `ios,android`                                                              |
    | Application type (`--apptype`)   | `hybrid_local`                                                                                  |
    | Application name (`--appname`)   | `UserSearch`                                                                                    |
    | Package name (`--packagename`)   | `com.acme.usersearch`                                                                           |
    | Organization (`--organization`)  | `“Acme Widgets, Inc.”`                                                                          |
    | Output directory (`--outputdir`) | Leave blank for current directory, or enter a name to create a new subdirectory for the project |

    Here’s a command line example:

    ```nolang
    forcehybrid create --platform=ios,android --apptype=hybrid_local
        --appname=UserSearch --packagename=com.acme.usersearch
        --organization="Acme Widgets, Inc." --outputdir=""
    ```

2.  Copy all files—actual and symbolic—from the `samples/usersearch` directory of the [https://github.com/forcedotcom/SalesforceMobileSDK-Shared/](https://github.com/forcedotcom/SalesforceMobileSDK-Shared) repository into the `www/` folder, as follows:

    - In a Mac OS X terminal window, change to your project’s root directory—./UserSearch/—and type this command:

      ```nolang
      cp -RL <INSERT LOCAL PATH TO SALESFORCEMOBILESDK-SHARED>/samples/UserSearch/* www/
      ```

    - In Windows, make sure that every file referenced in the `<*shared repo*>\samples\usersearch` folder also appears in your `<*project_name*>\www` folder. Resolve the symbolic links explicitly, as shown in the following script:

      ```nolang
      cd <YOUR PROJECT'S ROOT DIRECTORY>
      set SHARED_REPO=<INSERT LOCAL PATH TO SALESFORCEMOBILESDK-SHARED>
      copy %SHARED_REPO%\samples\usersearch\UserSearch.html www
      copy %SHARED_REPO%\samples\usersearch\bootconfig.json www
      copy %SHARED_REPO%\dependencies\ratchet\ratchet.css www
      copy %SHARED_REPO%\samples\common\styles.css www
      copy %SHARED_REPO%\test\MockCordova.js www
      copy %SHARED_REPO%\samples\common\auth.js www
      copy %SHARED_REPO%\dependencies\backbone\backbone-min.js www
      copy %SHARED_REPO%\libs\cordova.force.js www
      copy %SHARED_REPO%\dependencies\fastclick\fastclick.js www
      copy %SHARED_REPO%\libs\ www
      copy %SHARED_REPO%\libs\force+promise.js www
      copy %SHARED_REPO%\dependencies\jquery\jquery.min.js www
      copy %SHARED_REPO%\libs\ www
      copy %SHARED_REPO%\samples\common\stackrouter.js www
      copy %SHARED_REPO%\dependencies\underscore\underscore-min.js www

      ```

3.  Run the following command:

    ```nolang
    cordova prepare
    ```

4.  Open the `platforms/android/` project folder in Android Studio (for Android) or Xcode (for iOS) by following the onscreen instructions printed by forcehybrid.

5.  From the `www` folder, open `UserSearch.html` in your code editor and delete all its contents.
