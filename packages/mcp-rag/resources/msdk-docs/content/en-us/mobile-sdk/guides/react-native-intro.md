# React Native Development

React Native is a third-party framework that lets you access native UI elements directly with JavaScript, style sheets, and markup. You can combine this technology with special Mobile SDK native modules for rapid development using native resources.

Since its inception, Mobile SDK has supported two types of mobile apps:

- **Native apps** provide the best user experience and performance. However, you have to use a different development technology for each mobile platform you support.
- **Hybrid apps** let you share your JavaScript and style sheets code across platforms, but the generic underlying web view can comprise the user experience.

In Mobile SDK 4.0 and later, you have a third option: React Native. React Native couples the cross-platform advantages of JavaScript development with the platform-specific "look and feel" of a native app. At the same time, the developer experience matches the style and simplicity of hybrid development.

- You use flexible, widely known web technologies (JavaScript, style sheets, and markup) for layout and styling.
- No need to recompile to check your code updates. You simply refresh the browser to see your changes.
- To debug, you use your favorite browser’s developer tools.
- All views are rendered natively, so your customers get the user experience of a native app.

Mobile SDK 11.1 uses React Native 0.70.14. You can find React Native 0.70.14 source code and documentation at [github.com/facebook/react-native/releases/](https://github.com/facebook/react-native/releases/) under the 0.70.14 tag.

## Getting Started

React Native requires some common Mobile SDK components and at least one native development environment—iOS or Android. On a macOS machine, you can develop both iOS and Android versions of your app. On Windows, you’re limited to developing for Android.

In Mobile SDK 9.0, you have the option of developing your React Native app using plain JavaScript (ES2015) or TypeScript. TypeScript gives you compile-time static type checking and custom types in a standard JavaScript environment. To learn more, see [TypeScript Documentation](https://www.staging-typescript.org/docs/).

Your best bet for getting started is the React Native [Trailhead module](https://trailhead.salesforce.com/trails/mobile_sdk_intro/modules/mobile_sdk_react_native). See you back here afterwards.

## Set Up Your React Native Development Environment

<!-- Remove this section when the TH project is retired and add a link to the project.-->

Mobile SDK provides forcereact, a command-line script for installing React Native and Mobile SDK libraries, and creating projects from template apps. To support this tool, install the following packages.

1.  Install git.
    1.  To check if git is already installed, at the operating system command prompt type `git version` and press Return.
    2.  If you get a “command not found” error message, download and install the git package for your operating system at [git-scm.com/downloads](https://git-scm.com/downloads).
2.  Install Node.js and npm.
    1.  To check if these tools are already installed, at the command prompt type `npm -v` and press Return.
    2.  If you get a “command not found” error message, download and install the Node.js package for your operating system at [https://nodejs.org/en/](https://nodejs.org/en/).
3.  Install yarn.

    ```nolang
    [sudo] npm install -g yarn
    ```

    For more information, see **Getting Started** | **Installation** at [https://yarnpkg.com/](https://yarnpkg.com/)

4.  Install the TypeScript compiler.

    ```nolang
    [sudo] npm install -g typescript
    ```

    For more information, see **Download** at [https://www.typescriptlang.org](https://www.typescriptlang.org).

    :::warning

    Don’t use `npm install -g tsc`. This variation installs an incompatible version of TypeScript that causes forcereact to fail.

    :::

5.  Install forcereact.

    ```nolang
    [sudo] yarn global add forcereact
    ```

:::important

To satisfy Google Play requirements, Mobile SDK 7.2 upgrades its React Native component to a version that supports 64-bit builds. Starting **August 1, 2019**, _new_ and _updated_ Mobile SDK React Native apps that will be published on the Google Play store must be built with Mobile SDK 7.2 or later. See [https://android-developers.googleblog.com/2019/01/get-your-apps-ready-for-64-bit.html?m=1](https://android-developers.googleblog.com/2019/01/get-your-apps-ready-for-64-bit.html?m=1) for full details.

:::
