# Validating Configuration Files

When you’re writing formally structured text files, schema validation is useful at any level. For SmartStore and Mobile Sync configuration files, schema validation is especially welcome for complex configurations that handle related records.

Beginning in Mobile SDK 8.0, you can validate your configuration files using any of the following Mobile SDK utilities:

- forceios
- forcedroid
- forcereact
- sfdx Mobile SDK plugin

To validate your configurations, you use the `checkconfig` action.

## Validating with Mobile SDK Utilities

Here’s a Mobile SDK npm utility call to `checkconfig`.

```nolang
$ forceios checkconfig
```

The tool then prompts you for the following information:

- `configpath`—Path to the configuration file
- `configtype`—Type of the configuration file. Must be either ”store” or “syncs”.

## Validating with the sfdx Command Line

Here’s an `sfdx` call to `checkconfig`.

```nolang
$ sfdx mobilesdk:ios:checkconfig
```

You can replace `ios` with `android`, `hybrid`, or `reactnative`—in every case, though, the result is the same. You then provide the following required options:

- `-c, --configpath=`\<_path to the configuration file_>
- `-y, --configtype=`\<_either ”store” or “syncs”_>

## Using Other Validators

If you prefer, you can use Mobile SDK schemas with third-party JSON validators. You can find the published schema definitions here:

- For store configurations: [`store.schema.json`](https://raw.githubusercontent.com/forcedotcom/SalesforceMobileSDK-Package/master/shared/store.schema.json)
- For sync configurations: [`syncs.schema.json`](https://raw.githubusercontent.com/forcedotcom/SalesforceMobileSDK-Package/master/shared/syncs.schema.json)

## Schema Change History

- Mobile SDK 9.1 Updates

  - : Targets of type `soql` now accept an optional `maxBatchSize` property. This property accepts any integer between 200 and 2,000. Default value is 2,000.

- Mobile SDK 8.0 Updates

  - : To overcome differences between iOS and Android syncs configuration syntax, the iOS schema was revised as follows to match Android’s syntax.

    - The type for parent-children sync down configurations is now `parent_children`. Formerly, iOS used `parentChildren`.
    - Create field list for parents in parent-children sync up configurations is labeled `createFieldlist`. Formerly, iOS used `parentCreateFieldlist`.
    - Update field list for parents in parent-children sync up configurations is labeled `updateFieldlist`. Formerly, iOS used `parentUpdateFieldlist`.

## Example

Sample configuration files:

- [`userstore.json`](https://raw.githubusercontent.com/forcedotcom/SalesforceMobileSDK-Package/master/shared/example.userstore.json)
- [`usersyncs.json`](https://raw.githubusercontent.com/forcedotcom/SalesforceMobileSDK-Package/master/shared/example.usersyncs.json)
