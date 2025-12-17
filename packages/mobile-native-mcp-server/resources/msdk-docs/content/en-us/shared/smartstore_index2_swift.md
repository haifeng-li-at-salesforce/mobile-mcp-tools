```swift
func createAccountsSoup(name: String) {
    guard let user = UserAccountManager.shared.currentUserAccount,
        let store = SmartStore.shared(withName: SmartStore.defaultStoreName,
            forUserAccount: user),
        let  index1 = SoupIndex(path: "Name", indexType: "String",
            columnName: "Name"),
        let  index2 = SoupIndex(path: "Id", indexType: "String",
            columnName: "Id")
    else {
        return
    }

    do {
        try store.registerSoup(withName: name, withIndices:[index1,index2])
    } catch (let error) {
        SalesforceLogger.d(RootViewController.self,
            message:"Couldn’t create soup \(name).
                Error: \(error.localizedDescription)")
        return
    }
}
```
