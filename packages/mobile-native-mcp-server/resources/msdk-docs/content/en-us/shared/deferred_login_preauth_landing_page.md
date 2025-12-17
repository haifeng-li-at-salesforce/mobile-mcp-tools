```xml
   <?xml version="1.0" encoding="utf-8"?>

   <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
       android:layout_width="match_parent"
       android:layout_height="match_parent"
       android:orientation="vertical"
       android:background="@android:color/white"
       android:id="@+id/root">

       <Button android:id="@+id/login_button"
           android:layout_width="80dp"
           android:layout_height="60dp"
           android:text="@string/login"
           android:textColor="@android:color/black"
           android:textStyle="bold"
           android:gravity="center"
           android:layout_gravity="center"
           android:textSize="18sp"
           android:onClick="onLoginClicked" />
   </LinearLayout>
```
