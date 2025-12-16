# Using SmartStore in Swift Apps

You can easily install the basic plumbing for SmartStore in a forceios native Swift project.

In this example, you create a SmartStore soup and upsert the queried list of contact names into that soup. You then change the Swift template app flow to populate the table view from the soup instead of directly from the REST response. If you’re not familiar with Xcode project structure, consult the _Xcode Help_.

1.  Using forceios, create a native Swift project similar to the following example:

    ::include{src="../../shared/forceios_create_native_swift_example.md"}

2.  In your project’s root directory, create a `userstore.json` file with the following content.

    ```nolang
    { "soups": [
        {
        "soupName": "Contact",
        "indexes": [
            { "path": "Name", "type": "string"},
            { "path": "Id", "type": "string"}
            ]
        }
    ]}
    ```

3.  Open your app's `.xcworkspace` file in Xcode.
4.  Add your configuration file to your project.
    1.  In the Xcode Project navigator, select the project node.
    2.  In the Editor window, select **Build Phases**.
    3.  Expand **Copy Bundle Resources**.
    4.  Click **+** (”Add items”).
    5.  Select your soup configuration file. If your file is not already in an Xcode project folder:
        1.  To select your file in Finder, click **Add Other...**.
        2.  Click **Open**, then click **Finish**.
5.  In your project’s source code folder, select `Classes/AppDelegate.swift`.
6.  In the `application(_:didFinishLaunchingWithOptions:)` callback method, load `userstore.json` definitions in the call to `AuthHelper.loginIfRequired`.

    ```nolang
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool
    {
        self.window = UIWindow(frame: UIScreen.main.bounds)
        self.initializeAppViewState();
        ...

        AuthHelper.loginIfRequired { [weak self] in
            MobileSyncSDKManager.shared.setupUserStoreFromDefaultConfig()
            self?.setupRootViewController()
        }
        return true
    }
    ```

    Your app is now set up to load your SmartStore configuration file at startup. This action creates the soups you specified as empty tables. Let's configure the `RootViewController` class to use SmartStore.

7.  In `RootViewController.swift`, import `SmartStore`:

    ```nolang
    import SmartStore
    ```

    <!-- Add a constant for the soup name?-->

8.  At the top of the `RootViewController` class, declare a variable for a `SmartStore` instance.

    ```nolang
    class RootViewController : UITableViewController
    {
        var dataRows = [NSDictionary]()
        var store = SmartStore.shared(withName: SmartStore.defaultStoreName)
    ```

9.  On the next line, declare a constant that defines an `OSLog` component.

    ```nolang
    class RootViewController : UITableViewController
    {
        var dataRows = [NSDictionary]()
        var store = SmartStore.shared(withName: SmartStore.defaultStoreName)
        let mylog = OSLog(subsystem: "com.testapp.swift", category: "tutorial")
    ```

10. In the `loadView()` method, find the call to `.query` and add the `Id` field to the SOQL statement.

    ```nolang
    let request = RestClient.shared.request(forQuery: "SELECT Name, Id FROM Contact LIMIT 10")
    ```

11. In the `handleSuccess(_:_:)` method, immediately after the `guard` block, add the following code.

    ```nolang
    func handleSuccess(response: RestResponse, request: RestRequest) {
        guard let jsonResponse  = try? response.asJson() as? [String:Any],
            let records = jsonResponse["records"] as? [[String:Any]]  else {
            SalesforceLogger.d(RootViewController.self, message:"Empty Response for : \(request)")
            return
        }

        if let smartstore = self.store,
           smartstore.soupExists(forName: "Contact") {
                smartstore.clearSoup("Contact")
                smartstore.upsert(entries: records, forSoupNamed: "Contact")
                os_log("\nSmartStore loaded records.", log: self.mylog, type: .debug)
           }


        SalesforceLogger.d(type(of:self), message:"Invoked: \(request)")
        DispatchQueue.main.async {
            self.dataRows = records
            self.tableView.reloadData()
        }
    }// end of handleSuccess method
    ```

    This code checks whether the Contact soup exists. If the soup exists, the code clears all data from the soup, and then upserts the retrieved records.

12. Launch the app, then check your work using the Dev Tools menu.

    1.  To bring up the menu, type `control + command + z` if you’re using the iOS emulator, or shake your iOS device.
    2.  Click **Inspect SmartStore**.
    3.  To list your Contact soup and number of records, click **Soups**.

        :::note

        If you get a "Query: No soups found" message, chances are you have an error in your `userstore.json` file.

        :::

<!-- All good for 8.0 to this point-->You’ve now created and populated a SmartStore soup. However, at this point your soup doesn’t actually serve a purpose. Let's make it more useful by populating the list view from SmartStore records rather than directly from the REST response.

1.  After the `handleSuccess(_:_:)` method, add a method named `loadFromStore()`.

    ```nolang
    func loadFromStore() {

    }
    ```

2.  In `loadFromStore()`, define an `if` block that builds a Smart SQLquery specification as its first condition. Configure the query to extract the first 10 Name values from the Contact soup.

    ```nolang
    func loadFromStore() {
        if let querySpec = QuerySpec.buildSmartQuerySpec(
            smartSql: "select {Contact:Name} from {Contact}", pageSize: 10),

    }
    ```

3.  Add a second condition that verifies the SmartStore handle and a third condition that runs the SmartStore query. Since the `query` method throws an exception, call it from a `do...try...catch` block.

    ```nolang
    func loadFromStore() {
        if let querySpec = QuerySpec.buildSmartQuerySpec(
            smartSql: "select {Contact:Name} from {Contact}", pageSize: 10),
            let smartStore = self.store,
            let records = try? smartStore.query(using: querySpec,
                startingFromPageIndex: 0) as? [[String]] {

        }

    }
    ```

4.  Transfer the names returned by the SmartStore query to the view’s `dataRows` member .
    <!-- ```nolang
    func loadFromStore() {
        let querySpec = QuerySpec.buildSmartQuerySpec(
            smartSql: "select {Contact:Name}, {Contact:Id} from {Contact}",
            pageSize: 10)
        do {
            let records = try self.store.query(using: querySpec!, startingFromPageIndex: 0)
            guard let rows = records as? [[String]] else {
                os_log("\nBad data returned from SmartStore query.", log: self.mylog, type: .debug)
                return
            }
            self.dataRows = rows.map({ row in
                return ["Name": row[0]]
            })
            // ...
        } catch let e as Error? {

        }

    }

    ````

    1. Convert the records returned into a dictionary of dictionaries.

    -->

    ```nolang
    func loadFromStore() {
        if let querySpec = QuerySpec.buildSmartQuerySpec(
            smartSql: "select {Contact:Name} from {Contact}", pageSize: 10),
            let smartStore = self.store,
            let records = try? smartStore.query(using: querySpec,
                startingFromPageIndex: 0) as? [[String]] {
            self.dataRows = records.map({ row in
                return ["Name": row[0]]
            })
        }
    }
    ```

5.  Using the `DispatchQueue` system object, switch to the main thread and refresh the view’s displayed data.

    ```nolang
    func loadFromStore() {
        if let querySpec = QuerySpec.buildSmartQuerySpec(
            smartSql: "select {Contact:Name} from {Contact}", pageSize: 10),
            let smartStore = self.store,
            let records = try? smartStore.query(using: querySpec,
                startingFromPageIndex: 0) as? [[String]] {
            self.dataRows = records.map({ row in
                return ["Name": row[0]]
            })
            DispatchQueue.main.async {
                self.tableView.reloadData()
            }
        }
    }
    ```

6.  Scroll back to the `handleSuccess(_:_:)` method and remove the existing code that reloads the view’s data.

    ```nolang
    func handleSuccess(response: RestResponse, request: RestRequest) {
        guard let jsonResponse  = try? response.asJson() as? [String:Any],
            let records = jsonResponse["records"] as? [[String:Any]]  else {
            SalesforceLogger.d(RootViewController.self, message:"Empty Response for : \(request)")
            return
        }

        if ((self.store.soupExists(forName: "Contact"))) {
            self.store.clearSoup("Contact")
            self.store.upsert(entries: records, forSoupNamed: "Contact")
            os_log("\nSmartStore loaded records.", log: self.mylog, type: .debug)
        }

        // Remove the following lines
        SalesforceLogger.d(type(of:self), message:"Invoked: \(request)")
        DispatchQueue.main.async {
            self.dataRows = records
            self.tableView.reloadData()
        }
    }// end of handleSuccess method
    ```

7.  Using `self`, call your new `loadFromStore()` method immediately after the `upsert(entries:forSoupNamed:)` call.<!-- Do any of the SmartStore methods below throw?-->

    ```nolang
    func handleSuccess(response: RestResponse, request: RestRequest) {
        guard let jsonResponse  = try? response.asJson() as? [String:Any],
            let records = jsonResponse["records"] as? [[String:Any]]  else {
            SalesforceLogger.d(RootViewController.self, message:"Empty Response for : \(request)")
            return
        }

        if ((self.store.soupExists(forName: "Contact"))) {
            self.store.clearSoup("Contact")
            self.store.upsert(entries: records, forSoupNamed: "Contact")
            self.loadFromStore()
            os_log("\nSmartStore loaded records.", log: self.mylog, type: .debug)
        }
    } // end of loadView
    ```

When you retest your app, you see that the table view is populated as before, but from SmartStore rather than a live REST response. In the real world, you'd create an editing interface for the Contact list, and then upsert your customers' edits to SmartStore. The customer could then continue working on the Contact list even if the mobile device lost connectivity. When connectivity is restored, you could then merge the customer’s work to the server—and also resync SmartStore—using Mobile Sync.
