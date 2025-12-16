# OkHttp: The Underlying Network Library

Beginning with Mobile SDK 4.2, the Android REST request system uses OkHttp (v3.2.0), an open-source external library from Square Open Source, as its underlying architecture. This library replaces the Google Volley library from past releases. As a result, Mobile SDK no longer defines the `WrappedRestRequest` class.

The following examples show how to perform some common network operations with `OkHttpClient`.

- Common Imports

  - :

    ```java
    import okhttp3.Headers;
    import okhttp3.HttpUrl;
    import okhttp3.OkHttpClient;
    import okhttp3.Call;
    import okhttp3.Dispatcher;
    import okhttp3.Request;
    import okhttp3.RequestBody;
    import okhttp3.Response;
    ```

## Obtain the Current OkHttp Client Handle

To get the handle of the `OkHttpClient` that the current `RestClient` instance is using:

- Kotlin

  - :
    ::include{src="../../shared/kotlin_okhttp_get_client.md"}

- Java

  - :
    ::include{src="../../shared/okhttp_get_client.md"}

## Obtain the OkHttp Dispatcher

- Kotlin

  - :
    ::include{src="../../shared/kotlin_okhttp_dispatcher.md"}

- Java

  - :
    ::include{src="../../shared/okhttp_dispatcher.md"}

## Cancel All Pending Calls

- Kotlin

  - :
    ::include{src="../../shared/kotlin_okhttp_cancel_all.md"}

- Java

  - :
    ::include{src="../../shared/okhttp_cancel_all.md"}

## Store the OkHttp Handle to a REST Request

- Kotlin

  - :
    ::include{src="../../shared/kotlin_okhttp_call_handle.md"}

- Java

  - :
    ::include{src="../../shared/okhttp_call_handle.md"}

## Cancel a Specific REST Request Using a Stored Handle

- Kotlin

  - :
    ::include{src="../../shared/kotlin_okhttp_cancel_one.md"}

- Java

  - :
    ::include{src="../../shared/okhttp_cancel_one.md"}

For more information, see [square.github.io/okhttp/](http://square.github.io/okhttp/).
