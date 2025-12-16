# About Hybrid Development

JavaScript development in a browser is straightforward. After you’ve altered the code, you merely refresh the browser to see your changes. Developing hybrid apps with the Mobile SDK container requires you to recompile and rebuild after you make changes. For this reason, we recommend you develop your hybrid app directly in a browser, and only run your code in the container in the final stages of testing.

We recommend developing in a browser such as Google Chrome that comes bundled with developer tools. These tools let you access the symbols and code of your web application during runtime.

Mobile SDK JavaScript libraries give you a choice to code with traditional callback functions:

```nolang
traditionalCallbackMethod(args, onSuccess, onFailure)
```

or using promises:

```javascript
promiseBasedMethod(args).then(onSuccess).catch(onFailure);
```

Using the callback function, you can write:

```javascript
self.smartstoreClient.removeSoup(soupName,
    onSuccessRemoveSoup(soupName),
    onErrorRemoveSoup(soupName));
...

function onSuccessRemoveSoup(name) {…}
function onErrorRemoveSoup(name) {…}
```

Promises help you keep your asynchonous code inline, making it easier to follow. Using the promise function, you can rewrite the callback code like this:

```javascript
self.smartstoreClient.removeSoup(soupName)
    .then(function(soupName) {
        ...
    })
    .catch(function(soupName) {
	  ...
    })

```
