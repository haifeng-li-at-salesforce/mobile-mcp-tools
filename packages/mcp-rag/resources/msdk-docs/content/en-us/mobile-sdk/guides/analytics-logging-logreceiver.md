# Receiving Logs with LogReceiver

To receive logs on your app with LogReceiver, register your custom LogReceiver objects with Mobile SDK. Each LogReceiver is provided to Mobile SDK by the LogReceiverFactory interface. Mobile SDK provides the component name upon instantiation, as well as the log entry’s level, tag, message, and error.

For example, see these code samples. You can add the code where your app initializes Mobile SDK.

## Android

```kotlin
setLogReceiverFactory(object : SalesforceLogReceiverFactory {
    override fun create(componentName: String): SalesforceLogReceiver =
    logReceiversByComponentName[componentName] ?: object : SalesforceLogReceiver {
        override fun receive(
            level: Level,
            tag: String,
            message: String
        ) {
            val resolvedMessage = "$componentName - $message"
            when (level) {
                OFF -> {}
                ERROR -> Log.e("AppMsdkLogReceiver", resolvedMessage)
                WARN -> Log.w("AppMsdkLogReceiver", resolvedMessage)
                INFO -> Log.i("AppMsdkLogReceiver", resolvedMessage)
                DEBUG -> Log.d("AppMsdkLogReceiver", resolvedMessage)
                VERBOSE -> Log.v("AppMsdkLogReceiver", resolvedMessage)
            }
        }

        override fun receive(
            level: Level,
            tag: String,
            message: String,
            throwable: Throwable?
        ) {
            val resolvedMessage = "$componentName - $message"
            when (level) {
                OFF -> {}
                ERROR -> Log.e("RestExplorerApp", resolvedMessage, throwable)
                WARN -> Log.w("RestExplorerApp", resolvedMessage, throwable)
                INFO -> Log.i("RestExplorerApp", resolvedMessage, throwable)
                DEBUG -> Log.d("RestExplorerApp", resolvedMessage, throwable)
                VERBOSE -> Log.v("RestExplorerApp", resolvedMessage, throwable)
            }
        }
    }
})
```

## iOS

```swift
class MyLogReceiver: SalesforceLogReceiver {
    func receive(level: SalesforceLogger.Level,
    cls: AnyClass, component: String, message: String) {
        print("AppMsdkLogReceiver: '\(cls)', [\(level)],
        '\(component)', '\(message)'")
    }
}

class MyLogReceiverFactory : SalesforceLogReceiverFactory {
    func create(componentName: String) ->
    any SalesforceSDKCommon.SalesforceLogReceiver {
        return MyLogReceiver()
    }
}

SalesforceLogger.setLogReceiverFactory(MyLogReceiverFactory())
```
