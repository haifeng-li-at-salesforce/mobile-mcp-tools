# Customizing the Android Login Screen Programmatically

Mobile SDK for Android provides extensive options for customizing the style and behavior of the login screen. Starting in Mobile SDK 13.0, you can use the `LoginViewModel` class to customize the login screen.

## LoginViewModel

The `LoginViewModel` controls the login interface by using data and logic from various sources. You can customize the login interface by modifying the values directly in the `LoginViewModel` class or by creating a subclass of `LoginViewModel`. If you decide to implement your own view model, set the `loginViewModelFactory` property in `SalesforceSDKManager`.

The login screen includes these components.

- `TopAppBar`: The app bar across the top of the screen
- `WebView`: The web browser embedded in the app
- `ProgressIndicator`: Shows the user’s progress in the login flow
- `BottomAppBar`: The app bar across the bottom of the screen

### TopAppBar

By default, the background color of the `TopAppBar` dynamically changes to match the webview background. To keep the top bar a static color, set `topBarColor` to the color of your choice. You can also set the `titleTextColor` accordingly. To change the text, set the `titleText` property.

### BottomAppBar

You can leave the bottom bar blank or configure it to include a single button. For example, the bottom bar can include a button for biometric authentication or authentication by using an identity provider (IDP). To add a button, implement the `customBottomBarButton` property.

### Further Customization

For further customization, you can implement public properties like `shouldShowBackButton`, `showServerPicker`, and `loading` when building the login interface.

To fully replace the `TopAppBar`, `ProgressIndicator`, or `BottomAppBar`, provide composable functions for the `topAppBar`, `loadingIndicator`, or `bottomAppBar` properties.

## Appearance and Color

Starting in Mobile SDK 13.0, you can set light or dark color schemes in `SalesforceSDKManager`. Like before, you can modify individual color values by overriding `sf__colors.xml`.
