# Debugging a Hybrid App On an Android Device

To debug hybrid apps on Android devices, use Google Chrome.

The following steps summarize the full instructions posted at [https://developer.chrome.com/docs/devtools/remote-debugging](https://developer.chrome.com/docs/devtools/remote-debugging)

1.  Enable USB debugging on your device: [https://developer.chrome.com/docs/devtools/remote-debugging](https://developer.chrome.com/docs/devtools/remote-debugging)

2.  Open Chrome on your desktop (development) machine and navigate to: `chrome://inspect`

3.  Select **Discover USB Devices**.

4.  Select your device.

5.  To use your device to debug a web application that’s running on your development machine:

    1.  Click **Port forwarding…**.

    2.  Set the device port and the localhost port.

    3.  Select **Enable port forwarding**. See [https://developer.chrome.com/docs/devtools/remote-debugging/local-server](https://developer.chrome.com/docs/devtools/remote-debugging/local-server) for details.
