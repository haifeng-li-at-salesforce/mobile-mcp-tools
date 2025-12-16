# Using TypeScript in React Native Projects

TypeScript brings useful advantages to React Native apps. Not only does it help you write safer code—it also coexists seamlessly with vanilla JavaScript. You can use as much or as little TypeScript as you like.

To demonstrate TypeScript usage, Mobile SDK provides a new template app. You can view or download the new template at [the ReactNativeTypeScriptTemplate directory](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/v9.0.0/ReactNativeTypeScriptTemplate) of the SalesforceMobileSDK-Templates GitHub repo.

Source code for TypeScript apps can reside in `*.ts`, `*.tsx`, or `*.js` files. For example, in the new template app, `app.js` becomes `app.tsx`. A comparison between the old and new files demonstrates how unobtrusive TypeScript is.

- Imports are the same.
- Code changes for new types are minimal.

In `app.tsx`, the template adds the following custom types to the original JavaScript code:

```javascript
interface Response {
  records: Record[];
}

interface Record {
  Id: String;
  Name: String;
}

interface Props {}

interface State {
  data: Record[];
}
```

The `Record` type is used internally in the `Response` interface. The new template applies the other three types to parameters of the original script. For example, `Props` and `State` apply to the constructor:

```javascript
class ContactListScreen extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {data: []};
    }
```

The `Response` type secures the response received from the SOQL query:

<!-- prettier-ignore -->
```javascript
(response: Response) => that.setState({ data: response.records }),
  (error) => console.log('Failed to query:' + error);
```

If Salesforce passes data to `response` that conflicts with definitions in the `Response` type, you get a compile-time error. However, the `Response` interface doesn’t disallow or inspect objects it doesn’t define. Thus, although `Response` specifies only two fields—`Id` and `Name`—accessing `response.records` passes muster as plain JavaScript.
