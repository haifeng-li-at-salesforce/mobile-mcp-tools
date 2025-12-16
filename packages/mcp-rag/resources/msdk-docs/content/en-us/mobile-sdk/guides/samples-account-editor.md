# Account Editor Sample

Account Editor is the most complex Mobile Sync-based sample application in Mobile SDK 2.0. It allows you to create/edit/update/delete accounts online and offline, and also demonstrates conflict detection.

To run the sample:

1.  If you’ve made changes to `external/shared/sampleApps/mobilesync/bootconfig.json`, revert it to its original content.
2.  Launch Account Editor.

This application contains three screens:

- Accounts search
- Accounts detail
- Sync

When the application first starts, you see the Accounts search screen listing the most recently used accounts. In this screen, you can:

- Type a search string to find accounts whose names contain the given string.
- Tap an account to launch the account detail screen.
- Tap **Create** to launch an empty account detail screen.
- Tap **Online** to go offline. If you are already offline, you can tap the **Offline** button to go back online. (You can also go offline by putting the device in airplane mode.)

To launch the Account Detail screen, tap an account record in the Accounts search screen. The detail screen shows you the fields in the selected account. In this screen, you can:

- Tap a field to change its value.
- Tap **Save** to update or create the account. If validation errors occur, the fields with problems are highlighted.

  If you’re online while saving and the server’s record changed since the last fetch, you receive warnings for the fields that changed remotely.

  Two additional buttons, **Merge** and **Overwrite**, let you control how the app saves your changes. If you tap **Overwrite,** the app saves to the server all values currently displayed on your screen. If you tap **Merge**, the app saves to the server only the fields you changed, while keeping changes on the server in fields you did not change.

- Tap **Delete** to delete the account.
- Tap **Online** to go offline, or tap **Offline** to go online.

To see the Sync screen, tap **Online** to go offline, then create, update, or delete an account. When you tap **Offline** again to go back online, the Sync screen shows all accounts that you modified on the device.

Tap **Process _n_ records** to try to save your local changes to the server. If any account fails to save, it remains in the list with a notation that it failed to sync. You can tap any account in the list to edit it further or, in the case of a locally deleted record, to undelete it.

## Looking Under the Hood

To view the source code for this sample, open `AccountEditor.html` in an HTML or text editor.

Here are the key sections of the file:<!-- Need short descriptions here.-->

- Script includes
- Templates
- Models
- Views
- Router

## Script Includes

This sample includes the standard list of libraries for Mobile Sync applications.

- jQuery—See [http://jquery.com/](http://jquery.com/).
- Underscore—Utility-belt library for JavaScript, required by backbone. See [http://underscorejs.org/](http://underscorejs.org/).
- Backbone—Gives structure to web applications. Used by Mobile Sync. See [http://backbonejs.org/](http://backbonejs.org/).
- `cordova.js`—Required for hybrid applications using the Salesforce Mobile SDK.
- `force.js`—Salesforce Platform JavaScript library for making REST API calls. Required by Mobile Sync.
- `mobilesync.js`—Mobile Sync.
- `fastclick.js`—Library used to eliminate the 300 ms delay between physical tap and firing of a click event. See [https://github.com/ftlabs/fastclick](https://github.com/ftlabs/fastclick).
- `stackrouter.js` and `auth.js`—Helper JavaScript libraries used by all three sample applications.

## Templates

Templates for this application include:

- search-page
- sync-page
- account-list-item
- edit-account-page (for the Account detail page)

## Models

This sample defines three models: `AccountCollection`, `Account` and `OfflineTracker`.

`AccountCollection` is a subclass of Mobile Sync’s `Force.SObjectCollection` class, which is a subclass of the Backbone framework’s `Collection` class.

The `AccountCollection.config()` method returns an appropriate query to the collection. The query mode can be:

- Most recently used (MRU) if you are online and haven’t provided query criteria
- SOQL if you are online and have provided query criteria
- SmartSQL when you are offline

When the app calls `fetch()` on the collection, the `fetch()` function executes the query returned by `config()`. It then uses the results of this query to populate `AccountCollection` with Account objects from either the offline cache or the server.

`AccountCollection` uses the two global caches set up by the AccountEditor application: `app.cache` for offline storage, and `app.cacheForOriginals` for conflict detection.<!-- See ...--> The code shows that the `AccountCollection` model:

- Contains objects of the `app.models.Account` model (`model` field)
- Specifies a list of fields to be queried (`fieldlist` field)
- Uses the sample app’s global offline cache (`cache` field)
- Uses the sample app’s global conflict detection cache (`cacheForOriginals` field)
- Defines a `config()` function to handle online as well as offline queries

Here’s the code (shortened for readability):

<!-- prettier-ignore-start -->
```javascript
app.models.AccountCollection = Force.SObjectCollection.extend({
  model: app.models.Account,
  fieldlist: ["Id", "Name", "Industry", "Phone", "Owner.Name",
      "LastModifiedBy.Name", "LastModifiedDate",],
  cache: function () { return app.cache;},
  cacheForOriginals: function () {
    return app.cacheForOriginals;},

  config: function () {
    // Offline: do a cache query
    if (!app.offlineTracker.get("isOnline")) {
      // ...
    }
    // Online
    else {
      // ...
    }
  },
});
```
<!-- prettier-ignore-end -->

`Account` is a subclass of Mobile Sync’s `Force.SObject` class, which is a subclass of the Backbone framework’s `Model` class. Code for the `Account` model shows that it:

- Uses a `sobjectType` field to indicate which type of sObject it represents (Account, in this case).
- Defines `fieldlist` as a method rather than a field, because the fields that it retrieves from the server are not the same as the ones it sends to the server.
- Uses the sample app’s global offline cache (`cache` field).
- Uses the sample app’s global conflict detection cache (`cacheForOriginals` field).
- Supports a `cacheMode()` method that returns a value indicating how to handle caching based on the current offline status.

Here’s the code:

<!-- prettier-ignore-start -->
```javascript
app.models.Account = Force.SObject.extend({
  sobjectType: "Account",
  fieldlist: function (method) {
    return method == "read"
      ? ["Id", "Name", "Industry", "Phone", "Owner.Name", "LastModifiedBy.Name", "LastModifiedDate"]
      : ["Id", "Name", "Industry", "Phone"];
  },
  cache: function () { return app.cache;},
  cacheForOriginals: function () { return app.cacheForOriginals;},
  cacheMode: function (method) {
    if (!app.offlineTracker.get("isOnline")) {
      return Force.CACHE_MODE.CACHE_ONLY;
    }
    // Online
    else {
      return method == "read" ? 
          Force.CACHE_MODE.CACHE_FIRST : 
          Force.CACHE_MODE.SERVER_FIRST;
    }
  }
});
```
<!-- prettier-ignore-end -->

`OfflineTracker` is a subclass of Backbone’s `Model` class. This class tracks the offline status of the application by observing the browser’s offline status. It automatically switches the app to offline when it detects that the browser is offline. However, it goes online only when the user requests it.

Here’s the code:

<!-- prettier-ignore-start -->
```javascript
app.models.OfflineTracker = Backbone.Model.extend({
  initialize: function () {
    var that = this;
    this.set("isOnline", navigator.onLine);
    document.addEventListener("offline", function () {
        console.log("Received OFFLINE event");
        that.set("isOnline", false);
      }, false,);
    document.addEventListener("online", function () {
        console.log("Received ONLINE event");
        // User decides when to go back online
      }, false,);
  }
});
```
<!-- prettier-ignore-end -->

## Views

This sample defines five views:

- SearchPage
- AccountListView
- AccountListItemView
- EditAccountView
- SyncPage

A view typically provides a template field to specify its design template, an `initialize()` function, and a `render()` function.

Each view can also define an `events` field. This field contains an array whose key/value entries specify the event type and the event handler function name. Entries use the following format:

```nolang
"<EVENT-TYPE>[ <CONTROL>]": "<EVENT-HANDLER-FUNCTION-NAME>"
```

For example:

```nolang
events: {
    "click .button-prev": "goBack",
    "change": "change",
    "click .save": "save",
    "click .merge": "saveMerge",
    "click .overwrite": "saveOverwrite",
    "click .toggleDelete": "toggleDelete"
},
```

- SearchPage

  - : View for the entire search screen. It expects an `AccountCollection` as its model. It watches the search input field for changes (the `keyup` event) and updates the model accordingly in the `search()` function.

    ```nolang
    events: {
        "keyup .search-key": "search"
    },
    search: function(event) {
        this.model.setCriteria($(".search-key", this.el).val());
        this.model.fetch();
    }
    ```

- AcountListView

  - : View for the list portion of the search screen. It expects an `AccountCollection` as its model and creates `AccountListItemView` object for each account in the `AccountCollection` object.

- AccountListItemView

  - : View for an item within the list.

- EditAccountPage

  - : View for account detail page. This view monitors several events:

    | Event Type | Target Control                    | Handler function name |
    | ---------- | --------------------------------- | --------------------- |
    | click      | button-prev                       | goBack                |
    | change     | Not set (can be any edit control) | change                |
    | click      | save                              | save                  |
    | click      | merge                             | saveMerge             |
    | click      | overwrite                         | saveOverwrite         |
    | click      | toggleDelete                      | toggleDelete          |

    A couple of event handler functions deserve special attention. The `change()` function shows how the view uses the event target to send user edits back to the model:

    ```nolang
    change: function(evt) {
        // apply change to model
        var target = event.target;
        this.model.set(target.name, target.value);
        $("#account" + target.name + "Error", this.el).hide();
    }
    ```

    The `toggleDelete()` function handles a toggle that lets the user delete or undelete an account. If the user clicks to undelete, the code sets an internal `__locally_deleted__ flag` to false to indicate that the record is no longer deleted in the cache. Else, it attempts to delete the record on the server by destroying the local model.

    ```nolang
    toggleDelete: function() {
        if (this.model.get("__locally_deleted__")) {
            this.model.set("__locally_deleted__", false);
            this.model.save(null, this.getSaveOptions(
                null, Force.CACHE_MODE.CACHE_ONLY));
        }
        else {
            this.model.destroy({
                success: function(data) {
                    app.router.navigate("#", {trigger:true});
                },
                error: function(data, err, options) {
                    var error = new Force.Error(err);
                    alert("Failed to delete account:
                        " + (error.type === "RestError" ?
                             error.details[0].message :
                             "Remote change detected - delete aborted"));
                }
            });
        }
    }

    ```

- SyncPage

  - : View for the sync page. This view monitors several events:

    | Event Type | Control     | Handler function name |
    | ---------- | ----------- | --------------------- |
    | click      | button-prev | goBack                |
    | click      | sync        | sync                  |

    To see how the screen is rendered, look at the render method:

    ```javascript
    render: function(eventName) {

        $(this.el).html(this.template(_.extend(
            {countLocallyModified: this.model.length},
            this.model.toJSON())));

        this.listView.setElement($("ul", this.el)).render();

        return this;

    },
    ```

    Let’s take a look at what happens when the user taps **Process** (the sync control).

    The `sync()` function looks at the first locally modified Account in the view’s collection and tries to save it to the server. If the save succeeds and there are no more locally modified records, the app navigates back to the search screen. Otherwise, the app marks the account as having failed locally and then calls `sync()` again.

    ```nolang
    sync: function(event) {
        var that = this;
        if (this.model.length == 0 ||
            this.model.at(0).get("__sync_failed__")) {
            // We push sync failures back to the end of the list.
            // If we encounter one, it means we are done.
            return;
        }
        else {
            var record = this.model.shift();

            var options = {
                mergeMode: Force.MERGE_MODE.MERGE_FAIL_IF_CHANGED,
                success: function() {
                    if (that.model.length == 0) {
                        app.router.navigate("#", {trigger:true});
                    }
                    else {
                        that.sync();
                    }
                },
                error: function() {
                    record = record.set("__sync_failed__", true);
                    that.model.push(record);
                    that.sync();
                }
            };
            return record.get("__locally_deleted__")
                ? record.destroy(options) :
                record.save(null, options);
        }
    });
    ```

## Router

When the router is initialized, it sets up the two global caches used throughout the sample.

```nolang
setupCaches: function() {
    // Cache for offline support
    app.cache = new Force.StoreCache("accounts",
        [ {path:"Name", type:"string"} ]);

    // Cache for conflict detection
    app.cacheForOriginals = new Force.StoreCache("original-accounts");

    return $.when(app.cache.init(), app.cacheForOriginals.init());
},
```

Once the global caches are set up, it also sets up two `AccountCollection` objects: One for the search screen, and one for the sync screen.

```nolang
// Collection behind search screen
app.searchResults = new app.models.AccountCollection();

// Collection behind sync screen
app.localAccounts = new app.models.AccountCollection();
app.localAccounts.config = {
    type:"cache",
    cacheQuery: {
        queryType:"exact",
        indexPath:"__local__",
        matchKey:true,
        order:"ascending",
        pageSize:25}};
```

Finally, it creates the view objects for the Search, Sync, and EditAccount screens.

```nolang
// We keep a single instance of SearchPage / SyncPage and EditAccountPage
app.searchPage = new app.views.SearchPage({model: app.searchResults});
app.syncPage = new app.views.SyncPage({model: app.localAccounts});
app.editPage = new app.views.EditAccountPage();

```

The router has a `routes` field that maps actions to methods on the router class.

```nolang
routes: {
    "": "list",
    "list": "list",
    "add": "addAccount",
    "edit/accounts/:id": "editAccount",
    "sync":"sync"
},

```

The `list` action fills the search result collections by calling `fetch()` and brings the search page into view.

```nolang
list: function() {
    app.searchResults.fetch();
    // Show page right away - list will redraw when data comes in
    this.slidePage(app.searchPage);
},

```

The `addAccount` action creates an empty account object and bring the edit page for that account into view.

```nolang
addAccount: function() {
    app.editPage.model = new app.models.Account({Id: null});
    this.slidePage(app.editPage);
},

```

The `editAccount` action fetches the specified Account object and brings the account detail page into view.

```nolang
editAccount: function(id) {
    var that = this;
    var account = new app.models.Account({Id: id});
    account.fetch({
        success: function(data) {
            app.editPage.model = account;
            that.slidePage(app.editPage);
        },
        error: function() {
            alert("Failed to get record for edit");
        }
    });
}
```

The sync action computes the `localAccounts` collection by calling fetch and brings the sync page into view.

```nolang
sync: function() {
    app.localAccounts.fetch();
    // Show page right away - list will redraw when data comes in
    this.slidePage(app.syncPage);
}

```
