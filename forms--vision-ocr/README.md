# Google Forms OCR

_This is not an official Google product_

## Image upload OCR (Optical character recognition) using GCP Vision API

This script allows OCR via Vision API for Image upload using Google Forms.

## Deploying the Script

### Copy and Editthe script

**Note**: Make sure that you already have a Google Form that [collects image attachments](https://support.google.com/a/users/answer/9308632?hl=en) from respondents.

Create a new [Container-bound script](https://developers.google.com/apps-script/guides/bound) from Google Sheets that collects the [Form responses](https://support.google.com/docs/answer/139706?hl=en#spreadsheet).

1.  Within the Google Sheet that contains the Google Form Responses, select **Tools** > **Script Editor**

    _Note: Because bound scripts do not appear in Google Drive, that menu is the only way to find or open the script._

1.  Copy the contents of **ocr.js** into your script file (_i.e. Code.gs_).
1.  Modify the **sheet name** on _Line 70_ of the script file to match the sheet name where responses are stored. By default, Google names the sheet as _Form Responses 1_
1.  Modify the **column number** (where A is 1, B is 2, etc.) on _Line 71_ of the script file to match the column number on the responses Sheet where the OCR text will be written.
1.  Modify the **question name** on _Line 76_ of the script file to match the Google Form question that collects the image file to be uploaded.

### Set Vision API Key

1.  From the Apps Script editor, update the question constant with the following values:

    | Key      | Value            |
    | -------- | ---------------- |
    | `apiKey` | {Vision API key} |

    _Note: Refer to the following guide on how to generate GCP API keys: [Using API Keys](https://cloud.google.com/docs/authentication/api-keys?hl=en)_

### Allow Public View Access to Image folder

_Note: This is required in order to grant the Vision API access to the uploaded image._

1.  In [Google Forms](https://forms.google.com/), open the Form with the Image Upload option.
1.  Click **Responses**.
1.  To open the upload location, click **View Folder**.
1.  Hover over **People** icon to access the sharing settings.
1.  Click **Advanced**.
1.  Change permissions to **On - Anyone with the link**.
1.  Click **Save** changes and click **Done**..

### Run script and allow OAuth2 access

1.  From the Apps Script editor, click **Run** ->
    **Run Function** -> **onFormSubmit**.
1.  Click on _Review Permissions_ on the **Authorization Required** dialog.
1.  Select your Google Account.
1.  Review the scopes required, then click _Allow_.

### Create an installable trigger

1. From the script editor, choose **Edit > Current project's triggers**.
1. Click the link that says: **No triggers set up. Click here to add one now**.
1. Under **Run**, select the name of function you want to trigger.
1. Under **Events**, select **onFormSubmit()**.
1. Optionally, click **Notifications** to configure how and when you are contacted by email if your triggered function fails.
1. Click **Save**.
