# Sample Property List Configuration

:::note

Setting key-value pair assignments through a plist is only available on iOS.

:::

One method of setting key-value pair assignments is through an XML property list, or plist. The plist contains the key-value pair assignments that an MDM provider sends to a mobile app to enforce security configurations.

Here's a sample configuration.

<!-- prettier-ignore -->
```nolang
<dict>
	<key>AppServiceHosts</key>
	<array>
		<string>host1</string>
		<string>host2</string>
	</array>
	<key>AppServiceHostLabels</key>
	<array>
		<string>Production</string>
		<string>Sandbox</string>
	</array>
	<key>RequireCertAuth</key>
	<true/>
	<key>ClearClipboardOnBackground</key>
	<false/>
	<key>OnlyShowAuthorizedHosts</key>
	<false/>
</dict>
```
