# Google Forms Dynamic Update

## Dynamic dropdown choices update from Google Sheets

This script allows automatic update of Google Form dropdown choices based on Google Sheet data.

_This is not an official Google product_

## Deploying the Script

### Copy the script

Create a new [Container-bound script](https://developers.google.com/apps-script/guides/bound) from Google Sheets.

1.  Within the Google Sheet that contains the dynamic data, select **Tools** > **Script Editor**

    **Note: Because bound scripts do not appear in Google Drive, that menu is the only way to find or open the script.**

1.  Copy the contents of **update.js** into your script file (_i.e. Code.gs_).

### Set Properties

1.  From the Apps Script editor, click **File** ->
    **Project Properties** -> **Script Properties**.

1.  Add the following key-value pairs.

    | Key      | Value                                   |
    | -------- | --------------------------------------- |
    | `title`  | {Title of question to modify}           |
    | `sheet`  | {Sheet name that contains the data}     |
    | `range`  | {Range (column) that contains the data} |
    | `formId` | {ID of the Google Form to update}       |

### Allow OAuth access

1.  From the Apps Script editor, click **Run** ->
    **Run Function** -> **Update Form**.
1.  Click on _Review Permissions_ on the **Authorization Required** dialog.
1.  Select your Google Account.
1.  Review the scopes required, then click _Allow_.

### Create an installable trigger

1. From the script editor, choose **Edit > Current project's triggers**.
1. Click the link that says: **No triggers set up. Click here to add one now**.
1. Under **Run**, select the name of function you want to trigger.
1. Under **Events**, select **onEdit()**.
1. Optionally, click **Notifications** to configure how and when you are contacted by email if your triggered function fails.
1. Click **Save**.

## Examples and use cases covered in this example

- **Using Project Properties** Example of how to use Project Properties
  (Specifically Script Properties) to save data needed for script execution.
  Script Properties are useful in situations where values are needed for
  script execution, but shouldn't be put into source files. In this case, we
  put the Spreadsheet and Form data into the Script Properties.
