# Example: Configure an Experience Cloud Site For Mobile SDK App Access

Configuring your Experience Cloud site to support logins from Mobile SDK apps can be tricky. This tutorial helps you see the details and correct sequence first-hand.

When you configure Experience Cloud site users for mobile access, sequence and protocol affect your success. For example, a user that’s not associated with a contact cannot log in on a mobile device. Here are some important guidelines to keep in mind:

- Create users only from contacts that belong to accounts. You can’t create the user first and then associate it with a contact later.
- Be sure you’ve assigned a role to the owner of any account you use. Otherwise, the user gets an error when trying to log in.
- When you define a custom login host in an iOS app, be sure to remove the `http[s]://` prefix. The iOS core appends the prefix at runtime. Explicitly including it could result in an invalid address.

1.  [Add Permissions to a Profile](communities-tutorial-profile.md)

2.  [Create an Experience Cloud Site](communities-tutorial-community.md)

3.  [Add the API User Profile To Your Experience Cloud Site](communities-tutorial-addprofile.md)

4.  [Create a New Contact and User](communities-tutorial-contact.md)

5.  [Test Your New Experience Cloud Site Login](communities-tutorial-test.md)
