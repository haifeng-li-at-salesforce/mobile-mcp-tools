# Uploading Files

Native mobile platforms support a method for uploading a file. You provide a path to the local file to be uploaded, the name or title of the file, and a description. If you know the MIME type, you can specify that as well. The upload method returns a platform-specific request object that can upload the file to the server. When you send this request to the server, the server creates a file with version set to 1.

Use the following methods for the given app type:

### Android Native

#### Upload Method

```nolang
FileRequests.uploadFile()
```

#### Signature

```
public static RestRequest
uploadFile(
File theFile,
String name,
String description,
String mimeType)
throws UnsupportedEncodingException
```

### iOS Native

#### Upload Method

```nolang
- requestForUploadFile:
name:description:mimeType:
```

#### Signature

```
- (SFRestRequest *)
requestForUploadFile:(NSData *)data
name:(NSString *)name
description:(NSString *)description
mimeType:(NSString *)mimeType
```

<!-- <sfdocstbl><table><col /><col /><col /><thead><tr><th>App Type</th><th>Upload Method</th><th>Signature</th></tr></thead><tbody><tr><td>Android native</td><td><codeblock>FileRequests.uploadFile()</codeblock></td><td><codeblock>public static RestRequest
uploadFile(
File theFile,
String name,
String description,
String mimeType)
throws UnsupportedEncodingException</codeblock></td></tr><tr><td>iOS native</td><td><codeblock>- requestForUploadFile:
name:description:mimeType:</codeblock></td><td><codeblock>- (SFRestRequest _)
requestForUploadFile:(NSData _)data
name:(NSString _)name
description:(NSString _)description
mimeType:(NSString \*)mimeType</codeblock></td></tr><tr><td>Hybrid (Android and iOS)</td><td>N/A</td><td>N/A</td></tr></tbody></table></sfdocstbl> -->
