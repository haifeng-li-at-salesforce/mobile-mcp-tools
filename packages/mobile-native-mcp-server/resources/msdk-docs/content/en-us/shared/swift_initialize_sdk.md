```swift
import Foundation
import UIKit
import MobileSync


class AppDelegate : UIResponder, UIApplicationDelegate
{
    var window: UIWindow?

    override
    init()
    {
        super.init()
        MobileSyncSDKManager.initializeSDK()
...
```
