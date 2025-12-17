<!-- owner=MobileSDK,date="2019-05-16",repo=”SalesforceMobileSDK-Template”,path=”MobileSyncExplorerSwift/MobileSyncExplorerSwift/SObjects/SObjects.swift”,line=335,length=-->

```nolang

func refreshRemoteData(_ completion: @escaping ([SObjectData]) -> Void,
                          onFailure: @escaping (NSError?, SyncState) -> Void)
                          throws -> Void {
    try self.syncMgr.reSync(named: kSyncDownName) { [weak self] (syncState) in
        switch (syncState.status) {
        case .done:
            do {
                let objects = try self?.queryLocalData()
                self?.populateDataRows(objects)
                completion(self?.fullDataRowList ?? [])
            } catch {
                MobileSyncLogger.e(SObjectDataManager.self, message: "Resync \(syncState.syncName) failed \(error)" )
            }
             break
        case .failed:
             MobileSyncLogger.e(SObjectDataManager.self, message: "Resync \(syncState.syncName) failed" )
             onFailure(nil,syncState)
        default:
            break
        }
    }
}
```
