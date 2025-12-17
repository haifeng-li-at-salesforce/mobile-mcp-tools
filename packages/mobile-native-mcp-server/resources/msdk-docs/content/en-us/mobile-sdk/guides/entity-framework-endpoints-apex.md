# Using Apex REST Resources

To support Apex REST resources, Mobile SDK provides two classes: `Force.ApexRestObject` and `Force.ApexRestObjectCollection`. These classes subclass `Force.RemoteObject` and `Force.RemoteObjectCollection`, respectively, and can talk to a REST API that you have created using Apex REST.

## `Force.ApexRestObject`

`Force.ApexRestObject` is similar to `Force.SObject`. Instead of an `sobjectType`, `Force.ApexRestObject` requires the Apex REST resource path relative to `services/apexrest`. For example, if your full resource path is `services/apexrest/simpleAccount/*`, you specify only `/simpleAccount/*`. `Force.ApexRestObject` also expects you to specify the name of your ID field if it's different from "Id".

## Example

Let's assume you’ve created an Apex REST resource called "simple account," which is just an account with two fields: `accountId` and `accountName`.

<!-- owner=MobileSDK,date="2019-08-12",repo=”none”,path=””,line=,length=-->

```apex
@RestResource(urlMapping='/simpleAccount/*')
  global with sharing class SimpleAccountResource {
      static String getIdFromURI() {
          RestRequest req = RestContext.request;
          return req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
      }

      @HttpGet global static Map&lt;String, String&gt; doGet() {
          String id = getIdFromURI();
          Account acc = [select Id, Name from Account
                         where Id = :id];
          return new Map&lt;String, String&gt;{
              'accountId'=>acc.Id, 'accountName'=>acc.Name};
      }

      @HttpPost global static Map&lt;String, String&gt;
          doPost(String accountName) {
              Account acc = new Account(Name=accountName);
              insert acc;
              return new Map&lt;String, String&gt;{
                  'accountId'=>acc.Id, 'accountName'=>acc.Name};
      }

      @HttpPatch global static Map&lt;String, String&gt;
          doPatch(String accountName) {
              String id = getIdFromURI();
              Account acc = [select Id from Account
                                 where Id = :id];
              acc.Name = accountName;
              update acc;
              return new Map&lt;String, String&gt;{
                  'accountId'=>acc.Id, 'accountName'=>acc.Name};
      }

      @HttpDelete global static void doDelete() {
          String id = getIdFromURI();
          Account acc = [select Id from Account where Id = :id];
          delete acc;
          RestContext.response.statusCode = 204;
      }
  }

```

With Mobile Sync, you do the following to create a "simple account".

<!-- owner=MobileSDK,date="2019-08-12",repo=”none”,path=””,line=,length=-->

```apex
var SimpleAccount = Force.ApexRestObject.extend(
    {apexRestPath:"/simpleAccount",
      idAttribute:"accountId",
        fieldlist:["accountId", "accountName"]});
var acc = new SimpleAccount({accountName:"MyFirstAccount"});
acc.save();

```

You can update that "simple account".

<!-- owner=MobileSDK,date="2019-08-12",repo=”none”,path=””,line=,length=-->

```apex
acc.set("accountName", "MyFirstAccountUpdated");
acc.save(null, {fieldlist:["accountName"]);
// our apex patch endpoint only expects accountName

```

You can fetch another "simple account".

<!-- owner=MobileSDK,date="2019-08-12",repo=”none”,path=””,line=,length=-->

```apex
var acc2 = new SimpleAccount({accountId:"&lt;valid id&gt;"})
acc.fetch();
```

You can delete a "simple account".

```apex
acc.destroy();
```

:::note

In Mobile Sync calls such as `fetch()`, `save()`, and `destroy()`, you typically pass an options parameter that defines success and error callback functions. <!-- “options” parameter? Is this documented somewhere?-->For example:

<!-- owner=MobileSDK,date="2019-08-12",repo=”none”,path=””,line=,length=-->

```apex
acc.destroy({success:function(){alert("delete succeeded");}});
```

:::

## `Force.ApexRestObjectCollection`

`Force.ApexRestObjectCollection` is similar to `Force.SObjectCollection`. The config<!-- Is “config” a standard term, or should this say “configuration”?--> you specify for fetching doesn't support SOQL, SOSL, or MRU. Instead, it expects the Apex REST resource path, relative to `services/apexrest`. For example, if your full resource path is `services/apexrest/simpleAccount/*`, you specify only `/simpleAccount/*`.

You can also pass parameters for the query string if your endpoint supports them. The Apex REST endpoint is expected to return a response in this format:

<!-- owner=MobileSDK,date="2019-08-12",repo=”none”,path=””,line=,length=-->

```apex
{   totalSize: <NUMBER OF RECORDS RETURNED>
   records: <ALL FETCHED RECORDS>
   nextRecordsUrl: <URL TO GET NEXT RECORDS OR NULL>
}
```

## Example

Let's assume you’ve created an Apex REST resource called "simple accounts". It returns "simple accounts" that match a given name.

<!-- owner=MobileSDK,date="2019-08-12",repo=”none”,path=””,line=,length=-->

```apex
@RestResource(urlMapping='/simpleAccounts/*')
global with sharing class SimpleAccountsResource {
    @HttpGet global static SimpleAccountsList doGet() {
        String namePattern =
            RestContext.request.params.get('namePattern');
        List<SimpleAccount> records = new List<SimpleAccount>();
        for (SObject sobj : Database.query(
            'select Id, Name from Account
             where Name like \'' + namePattern + '\'')) {
                 Account acc = (Account) sobj;
	          records.add(new
                     SimpleAccount(acc.Id, acc.Name));
        }
        return new SimpleAccountsList(records.size(), records);
    }

    global class SimpleAccountsList {
        global Integer totalSize;
        global List<SimpleAccount> records;

        global SimpleAccountsList(Integer totalSize,
            List<SimpleAccount> records) {
                this.totalSize = totalSize;
                this.records = records;
        }
    }

    global class SimpleAccount {
        global String accountId;
        global String accountName;

        global SimpleAccount(String accountId, String accountName)
        {
            this.accountId = accountId;
            this.accountName = accountName;
        }
    }
}
```

With Mobile Sync, you do the following to fetch a list of "simple account" records.

<!-- owner=MobileSDK,date="2019-08-12",repo=”SalesforceMobileSDK-Shared”,path=”/test/SFMobileSyncTestSuite.js”,line=2458,length=-->

```apex

var getSimple = function() {
    console.log("## Trying fetch with apex rest end point");
    var config = {
        apexRestPath:"/simpleAccounts",
        params:{namePattern:accountNamePrefix + "%"}
    }
    return Force.fetchApexRestObjectsFromServer(config);
}
```
