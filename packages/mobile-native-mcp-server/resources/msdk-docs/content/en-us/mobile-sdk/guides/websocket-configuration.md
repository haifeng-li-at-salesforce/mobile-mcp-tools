# Configure WebSockets

A WebSocket is a bidirectional TCP connection between a client and server that's kept open until the app closes it. WebSockets can be configured to work with our authentication features and products like Agentforce Speech Foundation.

## WebSockets and HTTP

With a WebSocket, an app uses HTTP to make an initial connection. The connection then gets upgraded to a TCP socket-based connection.

On Android, Mobile SDK uses `okhttp3.OkHttpClient.newWebSocket(okhttp3.Request, okhttp3.WebSocketListener)` to return instances of `okhttp3.WebSocket`. See Square's documentation: [https://square.github.io/okhttp/](https://square.github.io/okhttp/).

On iOS, Mobile SDK uses `URLSessionWebSocketTask`, available through Apple's URLSession API. See Apple's documentation: [https://developer.apple.com/documentation/foundation/urlsessionwebsockettask](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask).

## Set Up a WebSocket Connection

To create a WebSocket connection, use one of these RestClient methods. The methods return a ready-to-use WebSocket client instance that handles token injection and retry logic internally.

### Android

```kotlin
val websocket = restClient.newWebSocket(Request, WebSocketListener)
```

### iOS

On iOS, you have the option to create a connection from a URLRequest or a RestRequest.

```swift
let websocket = try await restClient.newWebSocket(from: urlRequest)

let websocket = try await restClient.newWebSocket(from: restRequest)
```

## Send Data with WebSockets

To send data to a Salesforce API endpoint, use the `send` method. Internally, `send` automatically refreshes the token if authentication fails and retries once with a new token before surfacing an error.

### Android

```kotlin
websocket.send(ByteString)

websocket.send(String)
```

### iOS

```swift
try await websocket.send(.data(yourAudioData))

try await websocket.send(.string("Your text message"))
```

## Receive Data with WebSockets

WebSockets receive data by listening for incoming messages. Our listen methods:

- Automatically resume the WebSocket task
- Continuously listen for new messages
- Refresh the token and reestablish the connection once, if needed

### Android

To receive data on Android, use the `WebSocketListener` adapter object.

```kotlin
WebSocketListener() {
  override fun onMessage(webSocket: WebSocket, text: String) {
    super.onMessage(webSocket, text)

    // Handle incoming text message
  }

  override fun onMessage(webSocket: WebSocket, bytes: ByteString) {
    super.onMessage(webSocket, bytes)

    // Handle incoming binary message
  }

  override fun onFailure(
    webSocket: WebSocket,
    t: Throwable, response: Response?
  ) {
    super.onFailure(webSocket, t, response)
    // Handle error
  }
}
```

### iOS

To receive data on iOS, use the `listen(onReceive:)` method.

```swift
client.listen { result in
    switch result {
    case .success(let message):
        // Handle incoming message (text or binary)
    case .failure(let error):
        // Handle error
    }
}
```
