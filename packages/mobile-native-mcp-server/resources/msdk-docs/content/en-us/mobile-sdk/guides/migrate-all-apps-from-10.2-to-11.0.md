# Migrate All Apps from 10.2 to 11.0

Mobile SDK 11.0 migration is easiest if you use the Salesforce CLI plugin or the Mobile SDK npm scripts.

Before you begin upgrading, read about new 11.0 features in [What’s New in Mobile SDK 11.1](gs-whatsnew.md). Mobile SDK 11.0 requires no code changes.

<!-- No version number updates needed below this line.-->

- Native iOS (Swift, Objective-C)

  - :

    - Make sure that you’ve installed the supported versions of iOS and Xcode. See [iOS Basic Requirements](ios-requirements.md), or use the [Set Up Your Mobile SDK Developer Tools](https://trailhead.salesforce.com/en/content/learn/projects/mobilesdk_setup_dev_tools) Trailhead project.
    - Choose one of the following options.

      - (Recommended) **Use the Salesforce CLI Mobile SDK plugin or the forceios npm script:** Recreate your app. For Saleforce CLI, follow the instructions at the command line by typing

        `sfdx mobilesdk:ios:create help`

        For forceios, follow the instructions in “Updating Native and React Native Apps” at [Updating Mobile SDK Apps (5.0 and Later)](general-update-app.md).

      - **Use CocoaPods:** If you created your app manually using CocoaPods, see [Refreshing Mobile SDK Pods](ios-pods-refresh.md).
      - **Do it manually:** Manually create a new native template app in Swift. Follow the instructions in [Creating an iOS Swift Project Manually](ios-new-native-project-manual.md).

    After you’ve recreated your app:

    - Migrate your app’s artifacts into the new template.
    - Review the list of APIs deprecated for future removal, and address any items that affect your codebase. See [iOS Current Deprecations](reference-current-deprecations-ios.md).
    - After a successful build, check compiler warnings for deprecations or other Mobile SDK issues you’ve missed.
    - Consider adopting new features. See [What’s New in Mobile SDK 11.1](gs-whatsnew.md).

- Native Android (Java, Kotlin)

  - :

    - Make sure that you’ve installed the supported versions of Android SDK and Android Studio. See [Native Android Requirements](android-requirements.md), or use the [Set Up Your Mobile SDK Developer Tools](https://trailhead.salesforce.com/en/content/learn/projects/mobilesdk_setup_dev_tools) Trailhead project.
    - Choose one of the following options.

      - (Recommended) **Use the Salesforce CLI Mobile SDK plugin or forcedroid npm script:** Recreate your app. For Saleforce CLI, follow the instructions at the command line by typing

        `sfdx mobilesdk:android:create help`

        For forcedroid, follow the instructions in “Updating Native and React Native Apps” at [Updating Mobile SDK Apps (5.0 and Later)](general-update-app.md).

      - **Use Maven:** If you created your app manually using Maven, see [Using Maven to Update Mobile SDK Libraries in Android Apps](android-update-maven.md).

    After you’ve recreated your app:

    - Migrate your app’s artifacts into the new template.
    - Review the list of APIs deprecated for future removal, and address any items that affect your codebase until your build succeeds. See [Android Current Deprecations](reference-current-deprecations-android.md).
    - After a successful build, check the compiler warnings for deprecations or other Mobile SDK issues you’ve missed.
    - Consider adopting new features. See [What’s New in Mobile SDK 11.1](gs-whatsnew.md).

- React Native

  - :

    - Recreate your app with the Salesforce CLI Mobile SDK plug-in or the forcereact npm script. For Saleforce CLI, follow the instructions at the command line by typing

      `sfdx mobilesdk:reactnative:create help`

      For forcereact, follow the instructions in “Updating Native and React Native Apps” at [Updating Mobile SDK Apps (5.0 and Later)](general-update-app.md).

    After you’ve recreated your app:

    - Migrate your app’s artifacts into the new template.
    - Make sure that you’ve installed the supported versions of the mobile platforms you’re targeting. See the [Set Up Your Mobile SDK Developer Tools](https://trailhead.salesforce.com/en/content/learn/projects/mobilesdk_setup_dev_tools) Trailhead project.
    - Consider adopting new features. See [What’s New in Mobile SDK 11.1](gs-whatsnew.md).

- Hybrid

  - :

    - Make sure that you’ve installed the supported versions of the mobile platforms you’re targeting. See the [Set Up Your Mobile SDK Developer Tools](https://trailhead.salesforce.com/en/content/learn/projects/mobilesdk_setup_dev_tools) Trailhead project.
    - Recreate your app with the Salesforce CLI Mobile SDK plug-in or the forcehybrid npm script. For Saleforce CLI, follow the instructions at the command line by typing

      `sfdx mobilesdk:hybrid:create help`

      For forcehybrid, follow the instructions in “Updating Hybrid Apps” at [Updating Mobile SDK Apps (5.0 and Later)](general-update-app.md).

    - After you’ve recreated your app:

      - Migrate your app’s artifacts into the new template.
      - Make sure that you’ve installed the supported versions of the mobile platforms you’re targeting. See the [Set Up Your Mobile SDK Developer Tools](https://trailhead.salesforce.com/en/content/learn/projects/mobilesdk_setup_dev_tools) Trailhead project.
      - Consider adopting new features. See [What’s New in Mobile SDK 11.1](gs-whatsnew.md).

## See Also

- [Set Up Salesforce DX](https://trailhead.salesforce.com/en/content/learn/modules/sfdx_app_dev/sfdx_app_dev_setup_dx)
