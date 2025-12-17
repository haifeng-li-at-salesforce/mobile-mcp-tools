# SmartStore Data Types

Like any database, SmartStore defines a set of data types that you use to create soups. SmartStore data types mirror the underlying SQLite database.

SmartStore supports the following data types for declaring index specs. In a SmartStore soup definition, an index spec defines the data type that SmartStore expects to find in the given field.

| Type        | Description                                                                                                                                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `integer`   | Signed integer, stored in 4 bytes (SDK 2.1 and earlier) or 8 bytes (SDK 2.2 and later)                                                                                                                                               |
| `floating`  | Floating point value, stored as an 8-byte IEEE floating point number                                                                                                                                                                 |
| `string`    | Text string, stored with database encoding (UTF-8)                                                                                                                                                                                   |
| `full_text` | String that supports full-text searching                                                                                                                                                                                             |
| `JSON1`     | Index type based on the SQLite JSON1 extension. Can be used in place of integer, floating, and string types. Behaves identically to those types of index specs, except that JSON1 does not support index paths that traverse arrays. |

**See Also**

- [Date Representation](offline-date-representation.md)
- [Using Arrays in Index Paths](offline-arrays.md)
