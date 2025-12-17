# iOS Native Quick Start

1.  Make sure you meet the [native iOS requirements](ios-requirements.md).
2.  Create a project in the style that you prefer:

    - Wizard Style (Recommended)

      - : To create a project with forceios, CocoaPods, node.js, and npm:

        - Install nodejs (includes npm)—[https://nodejs.org](https://nodejs.org)
        - Install CocoaPods, latest version—[https://www.cocoapods.org](https://www.cocoapods.org).
        - Using npm, install forceios. (npm is automatically installed with nodejs).

          ```nolang
          sudo npm install -g forceios
          ```

        - In a Terminal window, use forceios to create an app.

          ```nolang
          forceios create
          ```

    - Semi-Manually

      - : To add Mobile SDK Swift template files, libraries, and settings to an Xcode template project without using forceios and its third-party dependencies, see [Creating an iOS Swift Project Manually](ios-new-native-project-manual.md), option 1.

    - Fully Manually

      - : To manually recode an Xcode Swift template project as a Mobile SDK project, without using forceios and its third-party dependencies, see [Creating an iOS Swift Project Manually](ios-new-native-project-manual.md), option 2.

:::note

For help with setup and installation, check out [Set Up Your Mobile SDK Developer Tools](https://trailhead.salesforce.com/content/learn/projects/mobilesdk_setup_dev_tools?trail_id=mobile_sdk_intro) in Trailhead.

:::
