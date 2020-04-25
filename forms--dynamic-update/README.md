# Google Forms Dynamic Update

_This is not an official Google product_

## Dynamic dropdown choices update from Google Sheets

This script allows automatic update of Google Form dropdown choices based on Google Sheet data.

## Deploying the Script

### Copy the script

Create a new [Container-bound script](https://developers.google.com/apps-script/guides/bound) from Google Sheets.

1.  Within the Google Sheet that contains the dynamic data, select **Tools** > **Script Editor**

    _Note: Because bound scripts do not appear in Google Drive, that menu is the only way to find or open the script._

1.  Remove all the previous code from _code.gs_.
1.  Copy the contents of **update.js** into your script file (_i.e. Code.gs_).

### Set Questions

1.  From the Apps Script editor, update the questions by modifying or adding new array items (objects):

    | Key      | Value                                   |
    | -------- | --------------------------------------- |
    | `title`  | {Title of question to modify}           |
    | `sheet`  | {Sheet name that contains the data}     |
    | `range`  | {Range (column) that contains the data} |
    | `formId` | {ID of the Google Form to update}       |

1.  Add more questions (elements) to the array of questions if required.

### Allow OAuth2 access

1.  From the Apps Script editor, click **Run** ->
    **Run Function** -> **updateForm**.
1.  Click on _Review Permissions_ on the **Authorization Required** dialog.
1.  Select your Google Account.
1.  Review the scopes required, then click _Allow_.

### Create an installable trigger

1. From the script editor, choose **Edit > Current project's triggers**.
1. Click the blue button on the lower-right: **+ Add Trigger**.
1. Under **Choose which function to run**, select **updateForm**.
1. Under **Which runs at deployment**, select **Head**.
1. Under **Select event source**, select **From spreadsheet**.
1. Under **Select event type**, select **on edit**.
1. Optionally, click **Notifications** to configure how and when you are contacted by email if your triggered function fails.
1. Click **Save**.

### Test if Google Form choices are synced with the Google Sheet data

1. Open the Google Sheet that contains the range of choices specified as source.
1. Modify the choices, then check the Google Form dropdown choices for updates.
