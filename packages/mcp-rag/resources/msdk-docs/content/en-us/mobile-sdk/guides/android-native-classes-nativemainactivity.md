# SalesforceActivity, SalesforceListActivity, and SalesforceExpandableListActivity Classes

`SalesforceActivity`, `SalesforceListActivity`, and `SalesforceExpandableListActivity` are the skeletal base classes for native SDK activities. They extend `android.app.Activity`, `android.app.ListActivity`, and `android.app.ExpandableListActivity`, respectively.

Each of these activity classes contains a single abstract method:

<!-- owner=MobileSDK,date="2019-08-09",repo=”SalesforceMobileSDK-Android”,path=”/libs/SalesforceSDK/src/com/salesforce/androidsdk/ui/SalesforceActivityInterface.java”,line=43-->

```java
public abstract void onResume(RestClient client);
```

This method overloads the `Activity.onResume()` method, which is also implemented by the class. The Mobile SDK superclass delegate, `SalesforceActivityDelegate`, calls your overload when it has created a `RestClient` instance. Use this method to cache the client that’s passed in, and then use that client to perform your REST requests. For example, in the Kotlin Mobile SDK template app, the `MainActivity` class uses the following code:

<!-- owner=MobileSDK,date="2020-01-21",repo=”SalesforceMobileSDK-Templates”,path=”/AndroidNativeKotlinTemplate/app/src/com/salesforce/androidnativekotlintemplate/MainActivity.kt”,line=77,length=-->

```java
override fun onResume(client: RestClient) {
    // Keeping reference to rest client
    this.client = client

    // Show everything
    findViewById<ViewGroup>(R.id.root).visibility = View.VISIBLE
}
```
