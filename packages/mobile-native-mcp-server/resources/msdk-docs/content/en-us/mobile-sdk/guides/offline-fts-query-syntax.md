# Full-Text Query Syntax

Mobile SDK full-text queries use SQLite's enhanced query syntax. With this syntax, you can use logical operators to refine your search.

The following table shows the syntactical options that Mobile SDK queries support. Following the table are keyed examples of the various query styles and sample output. For more information, see Sections 3.1, “Full-text Index Queries,” and 3.2, “Set Operations Using The Enhanced Query Syntax,” at [sqlite.org](https://sqlite.org/fts3.html).

<sfdocstbl><table><col /><col /><col /><thead><tr><th>Query Option</th><th>SmartStore Behavior</th><th>Related Examples</th></tr></thead><tbody><tr><td>Specify one or more full-text indexed paths</td><td>Performs match against values only at the paths you defined.</td><td><p>g, h, i, j, and k</p></td></tr><tr><td>Set the path to a null value</td><td>Performs match against all full-text indexed paths<br><br><i>Note: If your path is null, you can still specify a target field in the <code>matchKey</code> argument. Use this format: <code>{soupName\:path}\:term</code></i></td><td><p>a,b,c,d,e, and f</p></td></tr><tr><td>Specify more than one term without operators or grouping</td><td>Assumes an “AND” between terms</td><td>b and h</td></tr><tr><td>Place a star at the end of a term</td><td>Matches rows containing words that start with the query term</td><td>d and j</td></tr><tr><td>Use “OR” between terms</td><td>Finds one or both terms</td><td>c and i</td></tr><tr><td>Use the unary “NOT” operator before a term</td><td>Ignores rows that contain that term</td><td>e, f, and k</td></tr><tr><td>Specify a phrase search by placing multiple terms within double quotes (“ ”).</td><td>Returns soup elements in which the entire phrase occurs in one or more full-text indexed fields</td><td> </td></tr></tbody></table></sfdocstbl>

## Example

For these examples, a soup named “animals” contains the following records. The `name` and `color` fields are indexed as `full_text`.

```js
{"id”: 1, "name": "cat", "color": "black"}
{"id”: 2, "name": "cat", "color": "white"}
{"id”: 3, "name": "dog", "color": "black"}
{"id”: 4, "name": "dog", "color": "brown"}
{"id”: 5, "name": "dog", "color": "white"}
```

## Query Syntax Examples

| Example | Path    | Match Key                       | Selects...                                                                                                          | Records Returned |
| ------- | ------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------- |
| a.      | null    | “black”                         | Records containing the word “black” in any full-text indexed field                                                  | 1, 3             |
| b.      | null    | “black cat”                     | Records containing the words “black” and “cat” in any full-text indexed field                                       | 1                |
| c.      | null    | “black OR cat”                  | Records containing either the word “black” or the word “cat” in any full-text indexed field                         | 1, 2, 3          |
| d.      | null    | “b\*”                           | Records containing a word starting with “b” in any full-text indexed field                                          | 1, 3             |
| e.      | null    | “black NOT cat”                 | Records containing the word “black” but not the word “cat” in any full-text indexed field                           | 3                |
| f.      | null    | “{animals:color}:black NOT cat” | Records containing the word “black” in the color field and not having the word “cat” in any full-text indexed field | 3                |
| g.      | “color” | “black”                         | Records containing the word “black” in the `color` field                                                            | 1, 3             |
| h.      | “color” | “black cat”                     | Records containing the words “black” and “cat” in the `color` field                                                 | No records       |
| i.      | “color” | “black OR cat”                  | Records containing either the word “black” or the word “cat” in the `color` field                                   | 1, 3             |
| j.      | “color” | “b\*”                           | Records containing a word starting with “b” in the `color` field                                                    | 1, 3             |
| k.      | “color” | “black NOT cat”                 | Records containing the word “black” but not the word “cat” in the `color` field                                     | 1, 3             |
