# Implementing Offline Caching

To support offline caching, Mobile Sync requires you to supply your own implementations of a few tasks:

- Tracking offline status and specifying the appropriate cache control flag for CRUD operations, as shown in the [`app.models.Account` example](samples-account-editor.md#accounteditor-models).
- Collecting records that were edited locally and saving their changes to the server when the device is back online. The following example uses a SmartStore cache query to retrieve locally changed records, then calls the `SyncPage` function to render the results in HTML.

  ```js
  sync: function() {
  	var that = this;
  	var localAccounts = new app.models.AccountCollection();
  	localAccounts.fetch({
  		config: {type:"cache", cacheQuery: {queryType:"exact",
         indexPath:"__local__", matchKey:true}},
  		success: function(data) {
  			that.slidePage(new app.views.SyncPage({model: data}).render());
  		}
  	});
  }

  app.views.SyncPage = Backbone.View.extend({

      template: _.template($("#sync-page").html()),

      render: function(eventName) {
          $(this.el).html(this.template(_.extend(
              {countLocallyModified: this.model.length},
              this.model.toJSON())));
          this.listView = new app.views.AccountListView(
              {el: $("ul",  this.el), model: this.model});
          this.listView.render();
          return this;
      },
  ...
  });
  ```
