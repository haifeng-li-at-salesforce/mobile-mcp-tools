# Using External Storage for Large Soup Elements

Some years ago, Mobile SDK implemented external storage to address limitations with storing large JSON strings in the database—for example, a 1-MB cursor window limitation on Android. These limitations no longer exist. Furthermore, recent performance analysis shows that external storage is now _slower_ than internal storage.

Mobile SDK no longer recommends using external storage with SmartStore soups. The external storage feature has been removed in Mobile SDK 11.0.

<!-- shortdesc: If your soup includes large elements, you can get better performance by using external encrypted storage. For example, if you see warnings that you’ve exceeded an index limit, try switching to external storage. Trade-offs are minimal.When you populate a soup, SmartStore formats your data elements as JSON strings and writes the soup data to the underlying SQLite database. This strategy proves efficient and easy to use for most cases. However, if your JSON blobs are 1 MB or larger, you can direct SmartStore to store them, encrypted, in the device file system. Mobile SDK 4.3 and later define a special SmartStore feature, external storage, for this use case.

Using external storage for large elements can reduce memory usage and, hence, improve SmartStore performance. This benefit grows with the size of the soup elements. We don’t recommend external storage for soup elements smaller than 1 MB.

To use external storage, you:

1.  Create a soup spec object. Configure this object with the soup name and a list of features that includes external storage.
2.  Register the soup using a soup registration method that takes a soup spec object rather than the soup name.
3.  To change the soup specs after you register the soup, use an `alterSoup` method that takes a soup spec object.

:::important

SmartStore treats external elements exactly as normal soup elements, with one exception: You cannot use JSON1 indexes with external storage. If you attempt to register a soup that uses external storage and JSON1 indexes, SmartStore throws an error.:::

-->
