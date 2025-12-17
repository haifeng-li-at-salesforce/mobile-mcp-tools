# Using Arrays in Index Paths

Index paths can contain arrays, but certain rules apply.

Before Mobile SDK 4.1, index paths supported only maps—in other words, dictionaries, or associative arrays. For example, in a path such as `a.b.c`, SmartStore required both `b` and `c` to be maps. Otherwise, when evaluating the path, SmartStore returned nothing.

In Mobile SDK 4.1 and later, index paths can contain arrays and maps. In the `a.b.c` example, if the value of `b` is an array, SmartStore expects the array to contain maps that define `c`. SmartStore then returns an array containing values of `c` keys found in the `b` array’s maps.

:::note

You can’t use index paths that traverse arrays with JSON1 index specs.

:::

## Example

The following sections show various examples of `a.b.c` paths and the values returned by a SmartStore query.

### No arrays

#### Example soup element

```
{
    "a":{
        "b":{ "c":1 }
    }
}
```

#### Value for path a.b.c

`1`

### 'c' points to an array (internal node)

#### Example soup element

```
{
   "a":{
      "b":{
         "c":[1,2,3]
      }
   }
}
```

#### Value for path a.b.c

```
[
   1,
   2,
   3
]
```

### 'b' points to an array of maps

Some maps contain the `c` key. Other maps are ignored.

#### Example soup element

```
{
   "a":{
      "b":[
         {
            "c":1
         },
         {
            "c":2
         },
         {
            "no-c":3
         }
      ]
   }
}
```

#### Value for path a.b.c

```
[
   1,
   2
]
```

### 'a' points to an array of maps

In some maps, `b` points to a map containing a key. In other maps, `b` points to an array of maps. Only values from `c` keys are returned.

#### Example soup element

```
{
   "a":[
      {
         "b":{
            "c":0
         }
      },
      {
         "b":[
            {
               "c":1
            },
            {
               "c":2
            },
            {
               "no-c":3
            }
         ]
      }
   ]
}
```

#### Value for path a.b.c

```
[
   0,
   [
      1,
      2
   ]
]
```
