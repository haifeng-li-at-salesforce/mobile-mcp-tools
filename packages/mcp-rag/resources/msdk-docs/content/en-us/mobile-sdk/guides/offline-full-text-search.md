# Using Full-Text Search Queries

To perform efficient and flexible searches in SmartStore, you use full-text queries. Full-text queries yield significant performance advantages over “like” queries when you’re dealing with large data sets.

Beginning with Mobile SDK 3.3, SmartStore supports full-text search. Full-text search is a technology that internet search engines use to collate documents placed on the web.

## About Full-Text

Here's how full-text search works: A customer inputs a term or series of terms. Optionally, the customer can connect terms with binary operators or group them into phrases. A full-text search engine evaluates the given terms, applying any specified operators and groupings. The search engine uses the resulting search parameters to find matching documents, or, in the case of SmartStore, matching soup elements. To support full text search, SmartStore provides a full-text index spec for defining soup fields, and a query spec for performing queries on those fields.

Full-text queries, or "match" queries, are more efficient than "like" queries. "Like" queries require full index scans of all keys, with run times proportional to the number of rows searched. "Match" queries find the given term or terms in the index and return the associated record IDs. The full-text search optimization is negligible for fewer than 1000 records, but, beyond that threshold, run time stays nearly constant as the number of records increases. If you're searching through tens of thousands of records, “match” queries can be 10–100 times faster than “like” queries.

Keep these points in mind when using full-text fields and queries:

- Insertions with a full-text index field take longer than ordinary insertions.
- You can't perform MATCH queries in a Smart SQL statement. For example, the following query is **not supported**:

  ```sql
  SELECT {soupName:_soup} FROM {soupName} WHERE {soupName:name} MATCH 'cat'
  ```

  Instead, use a “match” query spec.

## Staying Current with Full-Text Search

In Mobile SDK 4.2, SmartStore updates its full-text search version from FTS4 to FTS5. This upgrade lets Mobile SDK take advantage of full-text index specs.

If you upgrade an app from Mobile SDK 4.1 to 4.2, existing FTS4 virtual tables remain intact. On the other hand, new soups that you create after upgrading use FTS5 virtual tables. These soups all work seamlessly together, but you can choose to upgrade legacy soups. Simply call `alterSoup` and pass in your original set of index specs. This call uses FTS5 to recreate the virtual tables that back full-text index specs.

See “Appendix A” at [www.sqlite.org/fts5.html](https://www.sqlite.org/fts5.html) for a comparison of FTS4 to FTS5.
