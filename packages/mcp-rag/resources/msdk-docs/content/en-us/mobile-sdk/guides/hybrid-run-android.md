# Build and Run Your Hybrid App on Android

Before building, be sure that you’ve installed Android Studio, including Android SDK and at least one Android emulator. Refer to the Android requirements for Mobile SDK to make sure you install the correct versions of the Android components.

After you’ve run `cordova prepare`, build and run the project.

To run the app in Android Studio:

1.  Launch Android Studio.

2.  From the welcome screen, select **Import project (Eclipse ADT, Gradle, etc.)**. Or, if Android Studio is already running, select **File** | **New** | **Import Project**.

3.  Select `<*your_project_dir*>/platforms/android` and click **OK**. If you’re prompted to use the Gradle wrapper, accept the prompt.<!-- Had to select whether to use the Gradle wrapper or manually configure Gradle.-->

4.  After the build finishes, select the `android` target and click **Run ‘android’** from either the menu or the toolbar.

5.  Select a connected Android device or emulator.

:::important

If Android Studio offers to update your Gradle wrapper version, accept the offer. After the process finishes, Android Studio automatically re-imports your project.

<!-- No longer needed in 5.0...but will this be permanent?-->
<!--
- If your Android Studio build fails with this error:

  ```nolang
  Error:Execution failed for task ':processDebugManifest'. > Manifest merger failed with multiple errors, see logs
  ```

  Open your app’s `android/manifests/AndroidManifest.xml` file and remove the line that exactly matches this text, then rebuild:

  ```nolang
  <activity android:exported="true" android:name="com.adobe.phonegap.push.PushHandlerActivity" />
  ```
-->

:::
