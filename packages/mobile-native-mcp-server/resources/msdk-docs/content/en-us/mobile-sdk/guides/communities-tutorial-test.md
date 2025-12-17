# Test Your New Experience Cloud Site Login

Test your Experience Cloud site setup by logging in to your Mobile SDK native or hybrid local app as your new contact.

To log in to your Experience Cloud site from your Mobile SDK app, configure your app to recognize your site login URL.

1.  For Android:

    1.  Open your Android project in Android Studio.

    2.  In the Project Explorer, go to the `res` folder and create a new (or select the existing) `xml` folder.

    3.  In the `xml` folder, create a text file. You can do this using either the **File** menu or the `CTRL-Click` (or `Right-Click`) menu.

    4.  In the new text file, add the following XML. Replace the server URL with your Experience Cloud site login URL:

        ```xml
        <?xml version="1.0" encoding="utf-8"?>
        <servers>
            <server name="Experience Cloud Site Login" url=
            "https://fineapps-dev-ed.my.site.com/fineapps">
        </servers>
        ```

    5.  Save the file as `servers.xml`.

2.  For iOS:

    ::include{src="../../shared/ios_login_configuration.md"}

    Alternatively, set the login screen through MDM if you’re using MDM for configuration.

3.  Start your app on your device, simulator, or emulator, and log in with username `jimparker@fineapps.com` and password `mobiletest1234`.

:::note

If your mobile app remains at the login screen for an extended time, you can get an “insufficient privileges” error upon login. In this case, close and reopen the app, and then log in immediately.

:::
