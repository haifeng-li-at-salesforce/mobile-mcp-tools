# Creating Hybrid Apps

Hybrid apps combine the ease of HTML5 Web app development with the power and features of the native platform. They run within a Salesforce mobile container—a native layer that translates the app into device-specific code—and define their functionality in HTML5 and JavaScript files. These apps fall into one of two categories:

- **Hybrid local**—Hybrid apps developed with the `force.js` library wrap a Web app inside the mobile container. These apps store their HTML, JavaScript, and CSS files on the device.
- **Hybrid remote** — Hybrid apps developed with Visualforce technology deliver Apex pages through the mobile container. These apps store some or all of their HTML, JavaScript, and CSS files either on the Salesforce server or on the device (at `http://localhost`).

In addition to providing HTML and JavaScript code, you also must maintain a minimal container app for your target platform. These apps are little more than native templates that you configure as necessary.

<!-- A diagram would be nice here to show how server-based apps are delivered to and presented on the device.-->

If you’re creating libraries or sample apps for use by other developers, we recommend posting your public modules in a version-controlled online repository such as GitHub ([https://github.com](https://github.com/)). For smaller examples such as snippets, GitHub provides _gist_, a low-overhead code sharing forum ([https://gist.github.com](https://gist.github.com/)).

**See Also**

- [Updating Mobile SDK Apps (5.0 and Later)](general-update-app.md)
