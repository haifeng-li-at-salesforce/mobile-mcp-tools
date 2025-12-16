# Deferring Login in Native Android Apps

When you create Mobile SDK apps using forcedroid, forcedroid bases your project on a template app that gives you lots of free standard functionality. For example, you don’t have to implement authentication—login and passcode handling are built into your launcher activity. This design works well for most apps, and the free code is a big time-saver. However, after you’ve created your forcedroid app you might find reasons for deferring Salesforce authentication until some point after the launcher activity runs.

You can implement deferred authentication easily while keeping the template app’s built-in functionality. Here are the guidelines and caveats:

- Replace the launcher activity (named `MainActivity` in the template app) with an activity that does _not_ extend any of the following Mobile SDK activities:

  - `SalesforceActivity`
  - `SalesforceListActivity`
  - `SalesforceExpandableListActivity`
    This rule likewise applies to any other activities that run before you authenticate with Salesforce.

- Do not call the `peekRestClient()` or the `getRestClient()` `ClientManager` method from your launcher activity or from any other pre-authentication activities.
- Do not change the `initNative()` call in the `TemplateApp` class. It must point to the activity class that launches after authentication (`MainActivity` in the template app).
- When you’re ready to authenticate with Salesforce, launch the `MainActivity` class.

The following example shows how to place a non-Salesforce activity ahead of Salesforce authentication. You can of course expand and embellish this example with additional pre-authentication activities, observing the preceding guidelines and caveats.

1.  Create an XML layout for the pre-authentication landing page of your application. For example, the following layout file, `launcher.xml`, contains only a button that triggers the login flow.

    :::note

    The following example defines a string resource, `@string/login`, in the `res/strings.xml` file as follows:

    ```html
    <string name="login">Login</string>
    ```

    :::

    ::include{src="../../shared/deferred_login_preauth_landing_page.md"}

2.  Create a landing screen activity. For example, here’s a landing screen activity named `LauncherActivity`. This screen simply inflates the XML layout defined in `launcher.xml`. This class must not extend any of the Salesforce activities or call `peekRestClient()` or `getRestClient()`, since these calls trigger the authentication flow. When the user taps the login button, the `onLoginClicked()` button handler launches `MainActivity`, and login ensues.

    - Kotlin

      - :
        ::include{src="../../shared/kotlin_deferred_login_launcher_activity.md"}

    - Java

      - :
        ::include{src="../../shared/deferred_login_launcher_activity.md"}

3.  Modify the `AndroidManifest.xml` to specify `LauncherActivity` as the activity to be launched when the app first starts.

    ::include{src="../../shared/deferred_login_launcher_activity_layout.md"}

When you start the application. the `LauncherActivity` screen appears. Click the login button to initiate the Salesforce authentication flow. After authentication completes, the app launches `MainActivity`.
