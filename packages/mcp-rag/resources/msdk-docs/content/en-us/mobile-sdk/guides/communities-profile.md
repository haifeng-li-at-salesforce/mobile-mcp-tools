# Set Up an API-Enabled Profile

If you’re new to Experience Cloud sites, start by enabling digital experiences in your org. See [Enable Digital Experiences](https://help.salesforce.com/apex/HTViewHelpDoc?id=networks_enable.htm). When you’re asked to create a domain name, be sure that it doesn’t use SSL (`https://`).

To set up your Experience Cloud sie, see [Create an Experience Cloud Site](https://help.salesforce.com/apex/HTViewHelpDoc?id=networks_creating.htm). Note that you’ll define a site URL based on the domain name you created when you enabled digital experiences.

Next, configure one or more profiles with the API Enabled permissions. You can use these profiles to enable your Mobile SDK app for Experience Cloud site members. For detailed instructions, follow the tutorial at [Example: Configure an Experience Cloud Site For Mobile SDK App Access](communities-tutorial.md).

1.  Create a new profile or edit an existing one.

2.  Edit the profile’s details to select API Enabled under **Administrative Permissions**.

3.  Save your changes, and then edit your Experience Cloud site from Setup by entering `digital experiences` in the Quick Find box and then selecting **All Sites**.

4.  Select **Workspaces** next to the name of your site. Then click **Administration** | **Members**.

5.  Add your API-enabled profile to **Selected Profiles**.

Users to whom these profiles are assigned now have API access. For an overview of profiles, see [User Profiles Overview](https://help.salesforce.com/apex/HTViewHelpDoc?id=admin_userprofiles.htm) in Salesforce Help.
