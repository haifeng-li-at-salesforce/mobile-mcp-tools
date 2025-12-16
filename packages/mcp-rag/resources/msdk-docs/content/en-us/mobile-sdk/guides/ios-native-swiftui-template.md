# Native Swift Template

The [native iOS Swift template](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/master/iOSNativeSwiftTemplate) supports the latest Swift features:

- SwiftUI
- Combine `Publisher`
- `SceneUI` and `SceneDelegate` flow

Also, this template demonstrates Mobile SDK offline features.

This template defines two initialization classes: `AppDelegate` and `SceneDelegate`. These classes interact to enable a dynamic arrangement of multiple windows.

Architecturally, this template uses strict model-view separation, with one model class per view class. Model classes implement the `ObservableObject` protocol, while view classes implement the `View` protocol.

## AppDelegate

`AppDelegate` manages high-level setup—app launch and the `UISceneSession` lifecycle. In Mobile SDK terms, `AppDelegate` in this template

- Initializes Mobile SDK
- Registers and unregisters push notification services, if implemented
- Sets up IDP, if implemented

As in earlier Mobile SDK templates, you can customize settings in the `application(_:didFinishLaunchingWithOptions:)` method of `AppDelegate`.

## SceneDelegate

`SceneDelegate` handles the life cycles of scenes in the `UISceneSession` container. The following initializer method configures a scene and adds it to the scene collection.

```swift
func scene(_:UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions)
```

After instantiating the scene as a `UIWindow`, this method registers a handler for current user changes. If the `CurrentUserChange` event occurs, the template resets the view state by setting up the root view controller.

```swift

AuthHelper.registerBlock(forCurrentUserChangeNotifications: {
    self.resetViewState {
               self.setupRootViewController()
    }
})
```

Later, in the `sceneDidBecomeActive(_:)` method, the template reinitializes the app view state and resets the root view controller. If no user is logged into Salesforce, the template requires the user to log in before it performs this reset.

```swift

func sceneWillEnterForeground(_ scene: UIScene) {
    // Called as the scene transitions from the background to the foreground.
    //  Use this method to undo the changes made on entering the background.
    self.initializeAppViewState()
    AuthHelper.loginIfRequired {
        self.setupRootViewController()
    }
}

```

## Model Classes

Models for the template’s views differ in how they download Salesforce information.

- The `AccountsListModel` class uses the Mobile Sync `SyncManager` publisher to sync down information for all accounts. When the response arrives, the publisher stores the information in a SmartStore soup, according to the sync and SmartStore configurations.

  ```swift

      func fetchAccounts(){
          _ = syncManager?.publisher(for: "syncDownAccounts")
              .receive(on: RunLoop.main)
              .sink(receiveCompletion: { _ in }, receiveValue: { _ in
                  self.loadFromSmartStore()
              })

          self.loadFromSmartStore()
      }
  ```

  To send account information to the view, the `loadFromSmartStore()` method uses the SmartStore publisher to extract the data from the SmartStore soup.

  ```swift

  private func loadFromSmartStore(){
      storeTaskCancellable =
          self.store?.publisher(for: "select {Account:Name},
          {Account:Industry}, {Account:Id} from {Account}")
          .receive(on: RunLoop.main)
          .tryMap{
              $0.map { (row) -> Account in
                  let r = row as! [String?]

                  return Account(id: r[2] ?? "", name: r[0] ?? "",
                      industry: r[1] ?? "Unknown Industry" )
          }
      }
      .catch { error -> Just<[Account]> in
          print(error)
          return Just([Account]())
      }
      .assign(to: \AccountsListModel.accounts, on:self)
  }
  ```

- The `ContactsForAccountModel` class uses a `RestClient` factory method to create the REST request.

  ```swift
  let request = RestClient.shared.request(forQuery: "SELECT id, firstName, lastName, phone, email, mailingStreet, mailingCity, mailingState, mailingPostalCode FROM Contact WHERE AccountID = '\(acct.id)'", apiVersion: nil)
  ```

  To send a request to Salesforce and process the asynchronous response, this model uses the `RestClient` shared Combine publisher.

  ```swift

    contactsCancellable = RestClient.shared.publisher(for: request)
    .receive(on: RunLoop.main)
    .tryMap({ (response) -> Data in
        response.asData()
    })
    .decode(type: ContactResponse.self, decoder: JSONDecoder())
    .map({ (record) -> [Contact] in
        record.records
    })
    .catch( { error in
        Just([])
    })
    .assign(to: \.contacts, on:self)

  ...

  ```

  This model stores details for all displayed contacts in a published array. See [Handling REST Requests](ios-rest-apis-send-request.md).

## View Classes

Views include a list of accounts, and list and detail views of related contacts. The Account list view displays a list of account names. Selecting an account brings up a list view of the account’s contacts. When the customer selects a contact record, a detail view displays the contact’s information.

- **Accounts**
  - **Account** | **Contacts**
    - **Contact** | **Details**

Views serve to configure a visual interface that imports and presents data from the related model object. To handle taps on view items, the view object sets up a navigation link to the destination view and passes it the necessary data. Here’s the definition for the Accounts list view.

```swift

struct AccountsListView: View {
  @ObservedObject var viewModel = AccountsListModel()

  var body: some View {
    NavigationView {
      List(viewModel.accounts) { dataItem in
        NavigationLink(destination:
            ContactsForAccountListView(account: dataItem)){
          HStack(spacing: 10) {
            VStack(alignment: .leading, spacing: 3) {
              Text(dataItem.name)
              Text(dataItem.industry).font(.subheadline).italic()
            }
          }
        }
      }
      .navigationBarTitle(Text("Accounts"), displayMode: .inline)
    }
    .onAppear{ self.viewModel.fetchAccounts() }
  }
}
```

## See Also

- [Scenes (Apple Developer Documentation)](https://developer.apple.com/documentation/uikit/app_and_environment/scenes)
- [Ray Wenderlich’s MVVM with Combine Tutorial for iOS](https://www.raywenderlich.com/4161005-mvvm-with-combine-tutorial-for-ios)
- [https://www.vadimbulavin.com/ios-13-ipados-app-life-cycle-with-uiscene-scene-session-and-scene-delegate/](https://www.vadimbulavin.com/ios-13-ipados-app-life-cycle-with-uiscene-scene-session-and-scene-delegate/)
