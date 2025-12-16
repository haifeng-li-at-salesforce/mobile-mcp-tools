# Upload Binary Content

You can upload binary content to any `force.com` endpoint that supports the binary upload feature.

The `sendRequest()` method in `react.force.net.js` has a new optional parameter named `fileParams`.

```javascript
function sendRequest(endPoint, path, successCB, errorCB, method, payload, headerParams, fileParams)
```

This parameter expects the following form:

```javascript
{
    <fileParamNameInPost>: // value depends on the endpoint
    {
        fileMimeType:<SOMEMIMETYPE>,  
        fileUrl:<FILEURL>, // url to file to upload
        fileName:<FILENAMEFORPOST>
    }
}

```

For example:

```javascript
{
    fileUpload:
    {
        fileMimeType:'image/jpeg',
        fileUrl:localPhotoUrl,
        fileName:'pic.jpg'
    }
}
```

## Example

The [github.com/wmathurin/MyUserPicReactNative](https://github.com/wmathurin/MyUserPicReactNative) sample app demonstrates binary upload. This sample allows you to change your profile picture. Binary upload of the new pic happens in the `uploadPhoto()` function of the `UserPic.js` file.

Here’s the sample’s `sendRequest()` call in the `getUserInfo()` function:

```javascript
getUserInfo(callback) {
    forceClient.sendRequest('/services/data',
        '/v36.0/connect/user-profiles/' + this.state.userId + '/photo',            
        (response) => {                
            callback(response);            
        },            
        (error) => {                
            console.log('Failed to upload user photo:' + error);            
        },            
        'POST',            
        {},            
        {'X-Connect-Bearer-Urls': 'true'},            
        {fileUpload:
            {
                fileUrl:localPhotoUrl,
                fileMimeType:'image/jpeg',
                fileName:'pic.jpg'
            }
        }       
    );
},
```
