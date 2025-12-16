# Briefcase Priming Records Response

Handles responses for all Mobile SDK Briefcase Priming requests.

In addition to the request factory method, Mobile SDK provides a custom Briefcase response object. Use the properties of this object to obtain parsed Briefcase response values.

## Properties

- Priming records (map or dictionary; contains record IDs and their modification timestamps)
- Relay token (string; if null, no more records are available)
- Rule errors (string array; contains IDs of priming rules that were processed but resulted in an error)
- Stats (object containing number of rules, number of records, number of rules served, and number of records served)

## iOS

### Swift

Response handling:

```nolang
let parsedResponse =
    PrimingRecordsResponse(try response.asJson() as! [AnyHashable : Any])
let records = parsedResponse.primingRecords
let token = parsedResponse.relayToken
let ruleErrors = parsedResponse.ruleErrors
let stats = parsedResponse.stats
```

### Objective-C

Response handling:

```nolang
SFSDKPrimingRecordsResponse* parsedResponse = [[SFSDKPrimingRecordsResponse alloc]
    initWith:response];
NSDictionary<NSString*, NSDictionary<NSString*,
    NSArray<SFSDKPrimingRecord*>*>*>* primingRecords =
    parsedResponse.primingRecords;
NSString *relayToken = parsedResponse.relayToken;
NSArray<SFSDKPrimingRuleError*>* ruleErrors = parsedResponse.ruleErrors;
SFSDKPrimingStats * stats = parsedResponse.stats;
```

## Android

### Kotlin

Request factory method:

```java
val parsedResponse = PrimingRecordsResponse(result.asJSONArray())
val primingRecords = parsedResponse.primingRecords
val relayToken = parsedResponse.relayToken
val ruleErrors = parsedResponse.ruleErrors
val stats = parsedResponse.stats
```

### Java

Response handling:

```nolang
PrimingRecordsResponse parsedResponse =
    new PrimingRecordsResponse(result.asJSONObject());
String stats = parsedResponse.stats;
Map<String, Map<String, List<PrimingRecordsResponse.PrimingRecord>>> records =
    parsedResponse.primingRecords;
String relayToken = parsedResponse.relayToken;
List<PrimingRecordsResponse.PrimingRuleError> ruleErrors = parsedResponse.ruleErrors;
```

## See Also

- [SFSDKPrimingRecordsResponse.h](https://github.com/forcedotcom/SalesforceMobileSDK-iOS/blob/dev/libs/SalesforceSDKCore/SalesforceSDKCore/Classes/RestAPI/SFSDKPrimingRecordsResponse.h) in the `SalesforceMobileSDK-iOS` repo.
- [PrimingRecordsResponse.java](https://github.com/forcedotcom/SalesforceMobileSDK-Android/blob/dev/libs/SalesforceSDK/src/com/salesforce/androidsdk/rest/PrimingRecordsResponse.java) in the `SalesforceMobileSDK-Android` repo.
- Priming Records request:[“Briefcase Priming Records Resource" in _Connect REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_resources_briefcase_priming_records.htm)
- [“Priming Record Collection" in _Connect REST API Developer Guide_ (Priming Records response)](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_responses_priming_record_collection.htm)
