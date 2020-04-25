# Google Forms Extract Responses

_This is not an official Google product_

## Get Forms Responses when the Google Sheets hits the [5 million cell limit](https://support.google.com/drive/answer/37603?hl=en)

This script allows extraction of Google Forms Responses via the [FormService](https://developers.google.com/apps-script/reference/forms) in scenarios wherein a Form's responses sheet can't add new records due to the [5 million cell limit](https://support.google.com/drive/answer/37603?hl=en). This scenario is best explained by [this forum post](https://support.google.com/docs/thread/17593247?hl=en). During this scenario, [downloading all responses as CSV](https://support.google.com/docs/answer/139706?hl=en#csv) nor [Google Takeout](https://support.google.com/accounts/answer/3024190?hl=en) wouldn't help in getting all the responses. Until a Google Forms REST API is provided by Google, Form responses can only be managed via [FormService](https://developers.google.com/apps-script/reference/forms). See current [developer offerings](https://developers.google.com/gsuite/products) for Google Forms.

## How it works

- This script utilizes the [FormService](https://developers.google.com/apps-script/reference/forms) to extract responses within Google Forms.
- The specific function used to extract responses is [getResponses(timestamp)](https://developers.google.com/apps-script/reference/forms/form#getresponsestimestamp). This is the only function that would work in scenarios wherein Google Forms has 60K+ responses. Using [getResponses()](<https://developers.google.com/apps-script/reference/forms/form#getResponses()>)—without providing the timestamp parameter— will result into a backend error due to the large number of responses fetched on a single request.

## :warning: This script **deletes the latest responses** (based on the timestamp provided) from the Google Form after it has been saved into a separate Google Sheet.

The function [deleteResponse(responseId)](https://developers.google.com/apps-script/reference/forms/form#deleteresponseresponseid) is called to delete the latest responses so the [getResponses(timestamp)](https://developers.google.com/apps-script/reference/forms/form#getresponsestimestamp) can fetch the other responses (that [getResponses()](<https://developers.google.com/apps-script/reference/forms/form#getResponses()>) cannot) from the Form.

- To use this script effectively, repetition of the following cycle is required as long as there are responses stuck in Google Forms:

1. Set the **timestamp** (_startime_ constant, see below)
1. **Run** the script
1. Script **saves the reponses** to a new sheet.
1. Latest responses are **deleted from the form**
1. Repeat **step 1**.

## Deploying the Script

### Copy the script

Create a new [Container-bound script](https://developers.google.com/apps-script/guides/bound) from your Google Forms.

1.  Within the Google Form that contains the responses, click the **Vertical Ellipsis** (on the right of the Send Button) > **Script Editor**

    _Note: Because bound scripts do not appear in Google Drive, that menu is the only way to find or open the script._

1.  Create 2 additional script files, **File** > **New** > **Script File**
1.  Rename the 4 script files to the following: _backup.gs, delete.gs, and extract.gs_
1.  Copy the contents of _backup.js, delete.js, and extract.js_ from this repo into your script files (_i.e. extract.gs_).

### Set Constants

1.  From the Apps Script editor, update the constants under your _extract.gs_ file with the following values:

    | Const       | Line Number | Value description                                                        |
    | ----------- | ----------- | ------------------------------------------------------------------------ |
    | `sheetName` | Line 56     | {The name of the new Sheets that will store the responses}               |
    | `startTime` | Line 58     | {the earliest date and time for which form responses should be returned} |

1.  Add more questions (elements) to the array of questions if required.

### Run the script via extractResponses() function and allow OAuth2 access

1.  From the Apps Script editor, open extract.gs on the left side.
1.  Click **Run** -> **Run Function** -> **extractResponses**.
1.  Click on _Review Permissions_ on the **Authorization Required** dialog.
1.  Select your Google Account.
1.  Review the scopes required, then click _Allow_.

### View Execution Logs (optional)

- Execution logs can be viewed via the [Stackdriver Logging](https://developers.google.com/apps-script/guides/logging#stackdriver_logging) interface in the Developer Console. This provides logs that persist for many days after their creation.

_Feel free to contact the author if you have questions about this script / scenario._
