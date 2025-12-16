# Mini-Tutorial: Conflict Detection

The following mini-tutorial demonstrates how merge modes affect save operations under various circumstances. It takes the form of an extended example within an HTML context.

1.  Set up the necessary caches:

    ```javascript
    var cache = new Force.StoreCache(soupName);
    var cacheForOriginals = new Force.StoreCache(soupNameForOriginals);
    var Account = Force.SObject.extend({
      sobjectType: "Account",
      fieldlist: ["Id", "Name", "Industry"],
      cache: cache,
      cacheForOriginals: cacheForOriginals,
    });
    ```

2.  Get an existing account:

    ```javascript
    var account = new Account({Id:<some actual account id>});
    account.fetch();
    ```

3.  Let's assume that the account has Name:"Acme" and Industry:"Software". Change the name to “Acme2.”

    ```javascript
    Account.set("Name", "Acme2");
    ```

4.  Save to the server without specifying a merge mode, so that the default "overwrite" merge mode is used:

    ```javascript
    account.save(null);
    ```

    The account’s Name is now "Acme2" and its Industry is "Software" Let's assume that Industry changes on the server to "Electronics."

5.  Change the account Name again:

    ```javascript
    Account.set("Name", "Acme3");
    ```

    You now have a change in the cache (Name) and a change on the server (Industry).

6.  Save again, using "merge-fail-if-changed" merge mode.

    ```javascript
    account.save(null,
       {mergeMode: "merge-fail-if-changed", error: function(err) {
       // err will be a map of the form:
       // {base:…, theirs:…, yours:…,
       // remoteChanges:["Industry"], localChanges:["Name"],
       // conflictingChanges:[]}
    });
    ```

    The error callback is called because the server record has changed.

7.  Save again, using "merge-fail-if-conflict" merge mode. This merge succeeds because no conflict exists between the change on the server and the change on the client.

    ```javascript
    account.save(null, { mergeMode: "merge-fail-if-conflict" });
    ```

    The account’s Name is now "Acme3" (yours) and its Industry is "Electronics" (theirs). Let's assume that, meanwhile, Name on the server changes to "NewAcme" and Industry changes to "Services."

8.  Change the account Name again:

    ```javascript
    Account.set("Name", "Acme4");
    ```

9.  Save again, using "merge-fail-if-changed" merge mode. The error callback is called because the server record has changed.

    ```javascript
    account.save(null, {mergeMode: "merge-fail-if-changed", error: function(err) {
       // err will be a map of the form:
       // {base:…, theirs:…, yours:…,
       // remoteChanges:["Name", "Industry"],
       // localChanges:["Name"], conflictingChanges:["Name"]}
    });
    ```

10. Save again, using "merge-fail-if-conflict" merge mode:

    ```javascript
    account.save(null, {
      mergeMode: "merge-fail-if-changed",
      error: function (err) {
        // err will be a map of the form:
        // {base:…, theirs:…, yours:…,
        // remoteChanges:["Name", "Industry"],
        // localChanges:["Name"], conflictingChanges:["Name"]}
      },
    });
    ```

    The error callback is called because both the server and the cache change the Name field, resulting in a conflict:

11. Save again, using "merge-accept-yours" merge mode. This merge succeeds because your merge mode tells the `save()` function which Name value to accept. Also, since you haven’t changed Industry, that field doesn’t conflict.

    ```javascript
    account.save(null, { mergeMode: "merge-accept-yours" });
    ```

    Name is “Acme4” (yours) and Industry is “Services” (theirs), both in the cache and on the server.
