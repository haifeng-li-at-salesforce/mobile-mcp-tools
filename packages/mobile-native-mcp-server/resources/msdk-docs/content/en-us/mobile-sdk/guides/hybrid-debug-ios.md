# Debug a Hybrid App Running on an iOS Device

To debug hybrid apps on real or simulated iOS devices, use Safari on the desktop and the device.

1.  Open Safari on the desktop.

2.  Select **Safari** | **Preferences**.

3.  Click the **Advanced** tab.

4.  Click **Show Develop menu in menu bar**.

5.  If you’re using the iOS simulator:

    - In the system task bar, press CONTROL and click the Xcode icon, then select **Open Developer Tool** | **Simulator**.
    - Or, in a Terminal window, type `open -a Simulator.app`.

6.  In the iOS Simulator menu, select **File** | **Open Simulator**.

7.  Select a device.

8.  Open Safari from the home screen of the device or iOS Simulator.

9.  Navigate to the location of your web app.

10. In Safari on your desktop, select **Developer** | **\<_your device_>**, and then select the URL that you opened in Safari on the device or simulator.

    The Web Inspector window opens and attaches itself to the running Safari instance on your device.
