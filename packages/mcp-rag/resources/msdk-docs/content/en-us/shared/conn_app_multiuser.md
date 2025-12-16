## Multi-User Behavior of the Lock Screen

When multiple users are logged into the same app on the same device, the lock screen behaves as follows.

1.  When resuming an app that requires passcode, the customer is first prompted by a lock screen to authenticate through the mobile operating system.
2.  If the customer cancels authentication, **Logout** and **Retry Unlock** buttons appear on the lock screen.
3.  The **Logout** button works only for customers that require the lock screen.
4.  If the last user that requires the lock screen logs out, Mobile SDK no longer shows the lock screen.
