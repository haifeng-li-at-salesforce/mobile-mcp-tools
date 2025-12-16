```nolang
      @Override
      public void logout(Activity frontActivity) {
         // Clean up all persistent and non-persistent app artifacts
         // ...
         // Call superclass after doing your own cleanup
         super.logout(frontActivity);
      }
```
