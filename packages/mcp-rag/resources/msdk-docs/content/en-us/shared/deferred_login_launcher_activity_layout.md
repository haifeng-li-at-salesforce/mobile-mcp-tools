```xml
<!-- Launcher screen -->
<activity android:name=
"LauncherActivity"
   android:label="@string/app_name"
   android:theme="@style/SalesforceSDK.ActionBarTheme">
   <intent-filter>
       <action android:name="android.intent.action.MAIN" />
       <category
           android:name="android.intent.category.LAUNCHER" />
   </intent-filter>
</activity>

<!-- Main screen -->
<activity android:name=
"MainActivity"
   android:label="@string/app_name"
   android:theme="@style/SalesforceSDK.ActionBarTheme">
   <intent-filter>
       <category android:name=
           "android.intent.category.DEFAULT" />
   </intent-filter>
</activity>

```
