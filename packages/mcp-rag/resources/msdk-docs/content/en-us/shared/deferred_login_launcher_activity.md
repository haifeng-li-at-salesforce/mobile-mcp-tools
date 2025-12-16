```java

public class LauncherActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstance) {
        super.onCreate(savedInstance);
        setContentView(R.layout.launcher);
    }

    /**
      * Callback received when the 'Login' button is clicked.
      *
      * @param v View that was clicked.
    */
    public void onLoginClicked(View v) {
        /*
         * TODO: Add logic here to determine if we are already
         * logged in, and skip this screen by calling
         * 'finish()', if that is the case.
        */
        final Intent mainIntent =
            new Intent(this, MainActivity.class);
        mainIntent.addCategory(Intent.CATEGORY_DEFAULT);
        startActivity(mainIntent);
        finish();
    }
}
```
