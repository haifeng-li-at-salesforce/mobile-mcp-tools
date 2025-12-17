# Create View Templates

Templates let you describe an HTML layout within a container HTML page. To define an inline template in your HTML page, you use a `<script>` tag of type “text/template”. JavaScript code can apply your template to the page design when it instantiates a new HTML page at runtime.

The `search-page` template is simple. It includes a header, a search field, and a list to hold the search results. At runtime, the search page instantiates the `user-list-item` template to render the results list. When a customer clicks a list item, the list instantiates the `user-page` template to show user details.

1.  Add a template script block with an ID set to “search-page”. Place the block within the `<body>` block after the “content” `<div>` tag.

    ```html
    <script id="search-page" type="text/template"></script>
    ```

2.  In the new `<script>` block, define the search page HTML template using Ratchet styles.

    ```html
    <script id="search-page" type="text/template">
      <header class="bar-title">
        <h1 class="title">Users</h1>
      </header>

      <div class="bar-standard bar-header-secondary">
        <input type="search" class="search-key"
            placeholder="Search"/>
      </div>

      <div class="content">
        <ul class="list"></ul>
      </div>
    </script>
    ```

3.  Add a second script block for a user list template.

    ```html
    <script id="user-list-item" type="text/template"></script>
    ```

4.  Define the user list template. Notice that this template contains references to the SmallPhotoUrl, FirstName, LastName, and Title fields from the Salesforce user record. References that use the `<%= varname %>` format are called “free variables” in Ratchet apps.

    ```nolang
    <script id="user-list-item" type="text/template">
      <a href="#users/<%= Id %>" class="pad-right">
        <img src="<%= SmallPhotoUrl %>" class="small-img" />
        <div class="details-short">
          <b><%= FirstName %> <%= LastName %></b><br/>
          Title<%= Title %>
        </div>
      </a>
    </script>
    ```

5.  Add a third script block for a user details template.

    ```html
    <script id="user-page" type="text/template"></script>
    ```

6.  Add the template body. Notice that this template contains references to the SmallPhotoUrl, FirstName, LastName, and Title fields from the Salesforce user record. References that use the `<%= varname %>` format in Ratchet apps are called “free variables”.

    ```html
    <script id="user-page" type="text/template">
      <header class="bar-title">
        <a href="#" class="button-prev">Back</a>
        <h1 class="title">User</h1>
      </header>

      <footer class="bar-footer">
        <span id="offlineStatus"></span>
      </footer>

      <div class="content">
        <div class="content-padded">
          <img id="employeePic" src="<%= SmallPhotoUrl %>"
            class="large-img" />
          <div class="details">
            <b><%= FirstName %> <%= LastName %></b><br/>
            <%= Id %><br/>
            <% if (Title) { %><%= Title %><br/><% } %>
            <% if (City) { %><%= City %><br/><% } %>
            <% if (MobilePhone) { %> <a
              href="tel:<%= MobilePhone %>">
              <%= MobilePhone %></a><br/><% } %>
            <% if (Email) { %><a
              href="mailto:<%= Email %>">
              <%= Email %></a><% } %>
          </div>
        </div>
      </div>
    </script>
    ```
