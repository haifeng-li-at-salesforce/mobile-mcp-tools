# Add the User View

Finally, you add a simple page view that displays a selected customer’s details. This view is the second page in this app. The customer navigates to it by tapping an item in the Users list view. The `user-page` template defines a **Back** button that returns the customer to the search list.

1.  Immediately after the `UserListItemView` view definition, create the view for a customer’s details. Extend `Backbone.View` again. For the remainder of this procedure, add all code in the `extend({})` block.

    ```javascript
    app.views.UserPage = Backbone.View.extend({});
    ```

2.  Specify the template to be instantiated.

    ```javascript
    app.views.UserPage = Backbone.View.extend({
      template: _.template($("#user-page").html()),
    });
    ```

3.  Implement a `render()` function. This function re-reads the model and converts it first to JSON and then to HTML.

    ```javascript
    app.views.UserPage = Backbone.View.extend({
      template: _.template($("#user-page").html()),

      render: function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      },
    });
    ```

## Example

Here’s the complete extension.

```javascript
app.views.UserPage = Backbone.View.extend({
  template: _.template($("#user-page").html()),
  render: function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },
});
```
