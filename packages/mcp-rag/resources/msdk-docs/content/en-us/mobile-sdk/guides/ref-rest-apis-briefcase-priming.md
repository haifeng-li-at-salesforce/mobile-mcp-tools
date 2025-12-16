# Briefcase Priming Records

Returns a request object that obtains record IDs from briefcases assigned to the connected app.

Mobile SDK provides a custom response object for parsing the results of Briefcase Priming Records requests. See [Briefcase Priming Records Response](ref-rest-apis-briefcase-priming-response.md).

## Using Relay Tokens to Acquire Record IDs

Retrieve batches of record IDs in an iterative loop that's controlled by a relay token, as follows:

- In your first request, set relayToken to null. The response to this request will contain a new relay token.
- In each subsequent request, set relayToken to the relay token value of the previous response.

In your request, you can also set a timestamp to retrieve only records that changed after the given time.

## Parameters

- API version (string)
- Relay token (string; can be null)
- "Changed after" timestamp (ISO timestamp; can be null)

## iOS

- Swift

  - : Request factory method:

    ```swift
    let request = RestClient.shared.requestForPrimingRecords(relayToken: relayToken,
        changedAfter: changedAfter, apiVersion: nil)
    ```

- Objective-C

  - : Request factory method:

    ```nolang
    - (SFRestRequest*) requestForPrimingRecords:(*nullable* NSString *)relayToken
        changedAfterTimestamp:(nullable NSNumber *)timestamp apiVersion:(*nullable* NSString *)apiVersion;
    ```

## Android

- Kotlin

  - : Request factory method:

    ```kotlin
    val request =
        RestRequest.getRequestForPrimingRecords(ApiVersionStrings.getVersionNumber(this),
            relayToken, changedAfter)
    ```

- Java

  - : Request factory method:

    ```java
    public static RestRequest getRequestForPrimingRecords(
      String apiVersion,
      String relayToken,
      Long changedAfterTime)
    ```

## See Also

- [“Briefcase Priming Records Resource" in _Connect REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_resources_briefcase_priming_records.htm)
- [“Priming Record Collection" in _Connect REST API Developer Guide_ (Priming Records response)](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_responses_priming_record_collection.htm)
