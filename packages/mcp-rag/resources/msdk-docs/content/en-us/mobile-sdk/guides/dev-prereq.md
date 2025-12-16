# Development Prerequisites for iOS and Android

We recommend some background knowledge and system setup before you begin building Mobile SDK apps.

It’s helpful to have some experience with Salesforce Platform. Familiarity with OAuth, login and passcode flows, and Salesforce connected apps is essential to designing and debugging Mobile SDK apps. See [Authentication, Security, and Identity in Mobile Apps](intro-oauth.md).

<!-- UN-COMMENT WHEN TH PROJECT IS RESTORED:::note

Have you completed the Mobile SDK Trailhead project, [“Set Up Your Mobile SDK Developer Tools”](https://trailhead.salesforce.com/en/projects/mobilesdk_setup_dev_tools)? It’s the easiest route to a complete Mobile SDK installation.:::

-->

## General Requirements (for All Platforms and Environments)

The following software is required for all Mobile SDK development.

- A Salesforce [Developer Edition organization](dev-de.md) with a [connected app](connected-apps-howto.md).

## iOS Native Requirements

- iOS SDK:
  - Deployment target: iOS 16
  - Base SDK: iOS 17
- Xcode version: 15 or later. (We recommend the latest version.)

## Android Native Requirements

::include{src="../../shared/prereq.md"}

## Hybrid Requirements

- For each mobile platform you support, all native requirements except for forceios and forcedroid npm packages.
- Cordova CLI 12.0.1 for Android, 7.1.0 for iOS.
- Forcehybrid npm package, version 11.1.
- Proficiency in HTML5 and JavaScript languages.
- For hybrid remote applications:
  - A Salesforce organization that has Visualforce.
  - A Visualforce start page.

## React Native Requirements

- For each mobile platform you support, all native requirements except for forceios and forcedroid npm packages.
- Forcereact npm package, version 11.1.
- Proficiency in JavaScript ([ES2015](https://babeljs.io/learn-es2015/)).
