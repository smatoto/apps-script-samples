# Hangouts Chat notifications for GCP status updates

_This is not an official Google product_

## Send GCP status updates to Hangouts Chat using a JSON feed

This script allows posting of GCP status updates to Hangouts Chat. The script utilizes the [JSON feed](https://status.cloud.google.com/incidents.json) of the GCP status dashboard and Google Apps Script's [time-driven triggers](https://developers.google.com/apps-script/guides/triggers/installable#time-driven_triggers).

## Deploying the Script

### Copy the script

Create a new [standalone script](https://developers.google.com/apps-script/guides/standalone).

1. Open [script.google.com](https://script.google.com/home).
1. Click **+ New script** to proceed to the script editor.
1. Remove all the previous code from _code.gs_.
1. Copy the contents of **incidents.js** into your script file (_i.e. Code.gs_).

### Add the Hangouts Chat incoming webhook URL

_Note: You can generate an incoming webhook URL using the steps from this [guide](https://developers.google.com/hangouts/chat/how-tos/webhooks#define_an_incoming_webhook)._

1.  From the Apps Script editor, update the webhook URL by modifying the following contant:

    | Const         | Line Number | Value description                              |
    | ------------- | ----------- | ---------------------------------------------- |
    | `WEBHOOK_URL` | Line 7      | {URL of the incoming webhook in Hangouts Chat} |

1.  Save your changes on _code.gs_ via **CTRL + S**.

### Allow OAuth2 access

1. From the Apps Script editor, click **Run** -> **Run Function** -> **getIncidents**.
1. Click on _Review Permissions_ on the **Authorization Required** dialog.
1. Select your Google Account.
1. Review the scopes required, then click _Allow_.

### Create an installable trigger

1. From the script editor, choose **Edit > Current project's triggers**.
1. Click the link that says: **No triggers set up. Click here to add one now**.
1. Under **Choose which function to run**, select **getIncidents**.
1. Under **Which runs at deployment**, select **Head**.
1. Under **Select event source**, select **Time-driven**.
1. Under **Select type of time based trigger**, select either **Minutes timer** or **Hour timer**.
1. Select your preferred time inteval under **Select minute/hour interval**
1. Optionally, click **Notifications** to configure how and when you are contacted by email if your triggered function fails.
1. Click **Save**.

### Check for notifications on Hangouts Chat

1. Open the Hangouts Chat room where the incoming webhook URL was configured and see the new notifications come in.
