<!-- owner=MobileSDK,date="2019-05-16",repo=”SalesforceMobileSDK-Template”,path=”MobileSyncExplorerSwift/MobileSyncExplorerSwift/SObjects/SObjects.swift”,line=358,length=-->

```nolang

func updateRemoteData(_ onSuccess: @escaping ([SObjectData]) -> Void, onFailure:@escaping (NSError?, SyncState?) -> Void) -> Void {
    do {
        try self.syncMgr.reSync(named: kSyncUpName) { [weak self] (syncState) in
            guard let strongSelf = self else {
                return
            }
            switch (syncState.status) {
            case .done:
                do {
                    let objects = try strongSelf.queryLocalData()
                    strongSelf.populateDataRows(objects)
                    try strongSelf.refreshRemoteData({ (sobjs) in
                        onSuccess(sobjs)
                    }, onFailure:  { (error,syncState) in
                        onFailure(error,syncState)
                    }
                    )
                } catch let error as NSError {
                    MobileSyncLogger.e(SObjectDataManager.self, message: "Error with Resync \(error)" )
                    onFailure(error,syncState)
                }
                break
            case .failed:
                MobileSyncLogger.e(SObjectDataManager.self, message: "Resync \(syncState.syncName) failed" )
                onFailure(nil,syncState)
                break
            default:
                break
            }
        }
    } catch {
        onFailure(error as NSError, nil)
    }
}
```
