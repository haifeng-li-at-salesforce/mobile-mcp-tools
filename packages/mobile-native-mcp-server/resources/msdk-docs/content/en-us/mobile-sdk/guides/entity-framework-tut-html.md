# Edit the Application HTML File

To create your app’s basic structure, define an empty HTML page that contains references, links, and code infrastructure.

1.  From the `www` folder, open `UserSearch.html` in your code editor and delete all its contents.

2.  Delete the contents and add the following basic structure:

    ```html
    <!DOCTYPE html>
    <html>
      <head> </head>
      <body></body>
    </html>
    ```

3.  In the `<head>` element:

    1.  Specify that the page title is “Users”.

        ```html
        <title>Users</title>
        ```

    2.  Turn off scaling to make the page look like an app rather than a web page.

        ```html
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0,
            maximum-scale=1.0, user-scalable=no;"
        />
        ```

    3.  Provide a mobile “look” by adding links to the `styles.css` and `ratchet.css` files.

        ```html
        <link rel="stylesheet" href="css/styles.css" />
        <link rel="stylesheet" href="css/ratchet.css" />
        ```

4.  Now let’s start adding content to the body. In the `<body>` block, add an empty `div` tag, with ID set to “content”, to contain the app’s generated UI.

    ```html
    <body>
      <div id="content"></div>
    </body>
    ```

5.  Include the necessary JavaScript files.

    ```html
    <script src="js/jquery.min.js"></script>
    <script src="js/underscore-min.js"></script>
    <script src="js/backbone-min.js"></script>
    <script src="cordova.js"></script>
    <script src="js/"></script>
    <script src="js/force+promise.js"></script>
    <script src="js/"></script>
    <script src="js/fastclick.js"></script>
    <script src="js/stackrouter.js"></script>
    <script src="js/auth.js"></script>
    ```

## Example

Here’s the complete application to this point.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Users</title>
    <meta
      name="viewport"
      content="width=device-width,
      initial-scale=1.0, maximum-scale=1.0;
      user-scalable=no"
    />
    <link rel="stylesheet" href="css/styles.css" />
    <link rel="stylesheet" href="css/ratchet.css" />
  </head>
  <body>
    <div id="content"></div>
    <script src="js/jquery.min.js"></script>
    <script src="js/underscore-min.js"></script>
    <script src="js/backbone-min.js"></script>
    <script src="cordova.js"></script>
    <script src="js/"></script>
    <script src="js/force+promise.js"></script>
    <script src="js/"></script>
    <script src="js/fastclick.js"></script>
    <script src="js/stackrouter.js"></script>
    <script src="js/auth.js"></script>
  </body>
</html>
```
