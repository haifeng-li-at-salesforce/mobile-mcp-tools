# Add the Search View

To create the view for a screen, you extend `Backbone.View`. Let’s start by defining the search view. In this extension, you load the template, define subviews and event handlers, and implement the functionality for rendering the views and performing a SOQL search query.

1.  In the `<script>` block where you defined the User and UserCollection models, create a `Backbone.View` extension named `SearchPage` in the `app.views` array.

    ```nolang
    app.views.SearchPage = Backbone.View.extend({
    });
    ```

    For the remainder of this procedure, add all code to the `extend({})` block. Each step adds another item to the implementation list and therefore ends with a comma, until the last item.

2.  Load the search-page template by calling the `_.template()` function. Pass it the raw HTML content of the `search-page` script tag.

    ```nolang
    template: _.template($("#search-page").html()),
    ```

3.  Add a `keyup` event. You define the `search` handler function a little later.

    ```nolang
    events: {
        "keyup .search-key": "search"
    },


    ```

4.  Instantiate a subview named `UserListView` that contains the list of search results. (You define `app.views.UserListView` later.)

    ```nolang
    initialize: function() {
        this.listView = new app.views.UserListView({model: this.model});
    },
    ```

5.  Create a `render()` function for the search page view. Rendering the view consists of loading the template as the app’s HTML content. Restore any criteria previously typed in the search field and render the subview inside the `<ul>` element.

    ```nolang
    render: function(eventName) {
        $(this.el).html(this.template());
        $(".search-key", this.el).val(this.model.getCriteria());
        this.listView.setElement($("ul", this.el)).render();
        return this;
    },
    ```

6.  Implement the `search` function. This function is the `keyup` event handler that performs a search when the customer types a character in the search field.

    ```nolang
    search: function(event) {
        this.model.setCriteria($(".search-key", this.el).val());
        this.model.fetch();
    }

    ```

## Example

Here’s the complete extension.

<!-- owner=MobileSDK,date="2017-10-24",repo=”SalesforceMobileSDK-Shared”,path=”/blob/master/samples/usersearch/UserSearch.html”,line=120,length=24-->

```nolang

app.views.SearchPage = Backbone.View.extend({
    template: _.template($("#search-page").html()),
    events: {
        "keyup .search-key": "search"
    },
    initialize: function() {
        this.listView = new app.views.UserListView({model: this.model});
    },
    render: function(eventName) {
        $(this.el).html(this.template());
        $(".search-key", this.el).val(this.model.getCriteria());
        this.listView.setElement($("ul", this.el)).render();
        return this;
    },
    search: function(event) {
        this.model.setCriteria($(".search-key", this.el).val());
        this.model.fetch();
    }
});

```
