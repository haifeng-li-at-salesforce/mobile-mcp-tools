# Migrate All Apps from 9.2 to 10.0

Mobile SDK 10.0 migration is easiest if you use the Salesforce CLI plugin or the Mobile SDK npm scripts.

Before you begin upgrading, read about new 10.0 features in [What’s New in Mobile SDK 11.1](gs-whatsnew.md).

- Native iOS (Swift, Objective-C)

  - :

    - Make sure that you’ve installed the supported versions of iOS and Xcode. See [iOS Basic Requirements](ios-requirements.md), or [Supported Versions of Tools and Components for Mobile SDK 11.1](reference-current-versions.md).
    - Choose one of the following options.

      - **Use the Salesforce CLI Mobile SDK plugin or the forceios npm script (recommended):** Recreate your app, and then migrate your app’s artifacts into the new template. For Salesforce CLI, follow the instructions at the command line by typing

        `sfdx mobilesdk:ios:create help`

        For forceios, follow the instructions in “Updating Native and React Native Apps” at [Updating Mobile SDK Apps (5.0 and Later)](general-update-app.md).

      - **Use CocoaPods:** If you created your app manually using CocoaPods, see [Refreshing Mobile SDK Pods](ios-pods-refresh.md).
      - **Do it manually:** Manually create a new native template app in Swift, and then migrate your app’s artifacts into the new template. Follow the instructions in [Creating an iOS Swift Project Manually](ios-new-native-project-manual.md).

    After you’ve recreated your app:

    - Migrate your app’s artifacts into the new template.
    - Review the list of APIs removed in Mobile SDK 10.0, and address any items that affect your code base. See [iOS APIs Removed in Mobile SDK 11.0](reference-current-removed-ios.md).
    - Review the list of APIs deprecated for future removal, and address any items that affect your code base. See [iOS Current Deprecations](reference-current-deprecations-ios.md).
    - After a successful build, check compiler warnings for deprecations or other Mobile SDK issues you’ve missed.
    - Consider adopting new features. See [What’s New in Mobile SDK 11.1](gs-whatsnew.md).

- Native Android (Java, Kotlin)

  - :

    - Make sure that you’ve installed the supported versions of Android SDK and Android Studio. See [Native Android Requirements](android-requirements.md), or [Supported Versions of Tools and Components for Mobile SDK 11.1](reference-current-versions.md).
    - Choose one of the following options.

      - **Use the Salesforce CLI Mobile SDK plugin or forcedroid npm script (recommended):** Recreate your app with the plugin or script, and then migrate your app’s artifacts into the new template. For Salesforce CLI, follow the instructions at the command line by typing

        `sfdx mobilesdk:android:create help`

        For forcedroid, follow the instructions in “Updating Native and React Native Apps” at [Updating Mobile SDK Apps (5.0 and Later)](general-update-app.md).

      - **Use Maven:** If you created your app manually using Maven, see [Using Maven to Update Mobile SDK Libraries in Android Apps](android-update-maven.md).

    After you’ve recreated your app:

    - Migrate your app’s artifacts into the new template.
    - Review the list of APIs removed in Mobile SDK 10.0, and address any items that affect your code base. See [Android APIs Removed in Mobile SDK 11.0](reference-current-removed-android.md).
    - Review the list of APIs deprecated for future removal, and address any items that affect your codebase until your build succeeds. See [Android Current Deprecations](reference-current-deprecations-android.md).
    - After a successful build, check the compiler warnings for deprecations or other Mobile SDK issues you’ve missed.
    - Consider adopting new features. See [What’s New in Mobile SDK 11.1](gs-whatsnew.md).

- React Native

  - : Mobile SDK 10.0 requires no code changes.

    - Make sure that you’ve installed the supported versions of the mobile platforms you’re targeting. See [Supported Versions of Tools and Components for Mobile SDK 11.1](reference-current-versions.md).
    - Recreate your app with the Salesforce CLI Mobile SDK plug-in or the forcereact npm script. For Salesforce CLI, follow the instructions at the command line by typing

      `sfdx mobilesdk:reactnative:create help`

      For forcereact help, type

      `forcereact`

    - After you’ve recreated your app, migrate your app’s artifacts into the new template.

- Hybrid

  - : Mobile SDK 10.0 requires no code changes.

    - Make sure that you’ve installed the supported versions of the mobile platforms you’re targeting. See [Supported Versions of Tools and Components for Mobile SDK 11.1](reference-current-versions.md).
    - Recreate your app with the Salesforce CLI Mobile SDK plug-in or the forcehybrid npm script. For Salesforce CLI, follow the instructions at the command line by typing

      `sfdx mobilesdk:hybrid:create help`

      For forcehybrid, follow the instructions in “Updating Hybrid Apps” at [Updating Mobile SDK Apps (5.0 and Later)](general-update-app.md).

## See Also

- [Set Up Salesforce DX](https://trailhead.salesforce.com/en/content/learn/modules/sfdx_app_dev/sfdx_app_dev_setup_dx)
