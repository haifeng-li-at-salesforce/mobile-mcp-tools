# REST Wrappers for SFAP APIs

We provide REST wrappers for `sfap_api` endpoints, simplifying integration for developers. The REST wrappers automatically include the JSON Web Token (JWT) provided to the user at login with each `sfap_api` request. Find these wrappers in the `SfapApiClient` class.

## iOS

```swift
/// The generation ID from the `sfap_api` `generations` endpoint
private var generationId: String? = nil

/**
 * Fetches generated text from the `sfap_api` "generations" endpoint.
 */
private func generateText() async {
    do {
        guard
            let userAccountCurrent = UserAccountManager.shared.currentUserAccount,
            let restClient = RestClient.restClient(for: userAccountCurrent)
        else { return }

        let generationsResponseBody = try await SFapClient(
            apiHostName: "dev.api.salesforce.com",
            modelName: "sfdc_ai__DefaultGPT35Turbo",
            restClient: restClient
        ).fetchGeneratedText(
            "Tell me a story about an action movie hero with really cool hair."
        )

        self.generationId = generationsResponseBody.generation?.id
        print("SFAP_API-TESTS: \(String(describing: generationsResponseBody
        .generation?.generatedText))")
        print("SFAP_API-TESTS: \(String(describing: generationsResponseBody
        .sourceJson))")

        // Test submitting feedback for the generated text.
        await submitFeedback()
    } catch {
        SFSDKCoreLogger().e(
            SFapClient.self,
            message: "Cannot fetch generated text due to an error: '
            \(error.localizedDescription)'."
        )
    }
}

/**
 * Submits feedback for previously generated text from the `sfap_api`
 * endpoints to the `sfap_api` `feedback` endpoint.
 */
private func submitFeedback() async {
    do {
        guard
            let userAccountCurrent = UserAccountManager.shared.currentUserAccount,
            let restClient = RestClient.restClient(for: userAccountCurrent)
        else { return }

        let feedbackResponseBody = try await SFapClient(
            apiHostName: "dev.api.salesforce.com",
            restClient: restClient
        ).submitGeneratedTextFeedback(requestBody: FeedbackRequestBody(
            feedback: "GOOD",
            generationId: generationId
        ))

        print("SFAP_API-TESTS: \(String(describing: feedbackResponseBody.message))")
        print("SFAP_API-TESTS: \(String(describing: feedbackResponseBody.sourceJson))")
    } catch {
        SFSDKCoreLogger().e(
            SFapClient.self,
            message: "Cannot submit feedback due to an error: '
            \(error.localizedDescription)'."
        )
    }
}
```

## Android

```kotlin
// Region `sfap_api` Testing

/** The generation ID from the `sfap_api` `generations` endpoint */
private var generationId: String? = null

/**
 * Fetches generated text from the `sfap_api` `generations` endpoint.
 * @return Job The Kotlin Coroutines Job running the fetch
 */
private fun generateText() = CoroutineScope(Dispatchers.Default).launch {
    runCatching {
        val generationsResponseBody = SfapApiClient(
            apiHostName = "dev.api.salesforce.com",
            modelName = "sfdc_ai__DefaultGPT35Turbo",
            restClient = client ?: return@launch
        ).fetchGeneratedText(
            "Tell me a story about an action movie hero with really cool hair."
        )

        generationId = generationsResponseBody.generation?.id
        Log.i("SFAP_API-TESTS", generationsResponseBody.generation?
        .generatedText ?: "")
        Log.i("SFAP_API-TESTS", generationsResponseBody.sourceJson ?: "")

        // Test submitting feedback for the generated text.
        submitFeedback()
    }.onFailure { throwable ->
        Log.e("App", "Cannot fetch generated text due to an error:
        '${throwable.message}'.")
    }
}

/**
 * Submits feedback for previously generated text from the `sfap_api`
 * endpoints to the `sfap_api` `feedback` endpoint.
 */
private fun submitFeedback() = CoroutineScope(Dispatchers.Default).launch {
    runCatching {
        val feedbackResponseBody = SfapApiClient(
            apiHostName = "dev.api.salesforce.com",
            restClient = client ?: return@launch
        ).submitGeneratedTextFeedback(
            requestBody = SfapApiFeedbackRequestBody(
                feedback = "GOOD",
                generationId = generationId
            )
        )

        Log.i("SFAP_API-TESTS", feedbackResponseBody.message ?: "")
        Log.i("SFAP_API-TESTS", feedbackResponseBody.sourceJson ?: "")
    }.onFailure { throwable ->
        Log.e("App", "Cannot submit feedback due to an error:
        '${throwable.message}'.")
    }
}
// endregion
```

## See Also

- [Access Models API with REST](https://developer.salesforce.com/docs/einstein/genai/guide/access-models-api-with-rest.html)
