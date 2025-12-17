```java
class LauncherActivity : Activity() {
    public override fun onCreate(savedInstance: Bundle?) {
        super.onCreate(savedInstance)
        setContentView(R.layout.launcher)
    }

    /**
     * Callback received when the 'Login' button is clicked.
     *
     * @param v View that was clicked.
     */
    fun onLoginClicked(v: View) {
        /*
         * TODO: Add logic here to determine if we are already
         * logged in, and skip this screen by calling
         * 'finish()', if that is the case.
         */
        val mainIntent = Intent(this, MainActivity::class.java)
        mainIntent.addCategory(Intent.CATEGORY_DEFAULT)
        startActivity(mainIntent)
        finish()
    }
}
```
