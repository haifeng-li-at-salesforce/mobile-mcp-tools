<!-- owner=MobileSDK,date="2019-11-01",repo=”SalesforceMobileSDK-Templates”,path=”/iOSNativeSwiftTemplate/iOSNativeSwiftTemplate/RootViewController.swift”,line=60,length=-->

```nolang

func handleSuccess(response: RestResponse, request: RestRequest) {
    guard let jsonResponse  = try? response.asJson() as? [String:Any],
        let records = jsonResponse["records"] as? [[String:Any]]  else {
            SalesforceLogger.d(RootViewController.self,
                message:"Empty Response for : \(request)")
            return
    }
    SalesforceLogger.d(type(of:self), message:"Invoked: \(request)")
    DispatchQueue.main.async {
        self.dataRows = records
        self.tableView.reloadData()
    }
}
```
