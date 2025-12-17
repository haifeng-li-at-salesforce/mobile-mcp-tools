# Using Identity URLs

The Identity URL is returned in the id scope parameter. For example, `https://login.salesforce.com/id/00Dx0000000BV7z/005x00000012Q9P`.

<!-- ::include{src="../../shared/p1def.md"} -->

::include{src="../../shared/p2def.md"}
The format of the URL is `https://login.salesforce.com/id/_orgID_/_userID_`, where _orgId_ is the ID of the Salesforce org that the user belongs to and _userID_ is the Salesforce user ID.

<!-- :::note

For a [sandbox](https://help.salesforce.com/s/articleView?id=sf.create_test_instance.htm), `login.salesforce.com` is replaced with `test.salesforce.com`. For an Experience Cloud site, `login.salesforce.com` is replaced with the site’s URL, such as `_MyDomainName_.my.site.com/.well-known/openid-configuration.` The URL must be HTTPS.

::: -->

::include{src="../../shared/params.md"}
::include{src="../../shared/response.md"}
