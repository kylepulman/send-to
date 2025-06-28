# Send To

Send web page elements to your friends from a custom context menu option.

## MVP

Send image urls to a Discord channel from a custom context menu option.

### Usage

- Users must supply an access key in the extension setup. The key is refreshed at a regular cadence and can only be retrieved by emailing the address listed in my GitHub profile

#### Discord Setup
- [Click here](https://discord.com/oauth2/authorize?client_id=1385257721330143404) to install the "Send To App" Discord app.
- Grant "Send To App" permission to send messages in the server of your choosing.
- Authorizing and installing "Send To App" will install a bot user "send-to-bot" to the selected server. You can verify that the installation was successful by checking for a welcome message for "send-to-bot" in the server's general text chat channel.
- The "Send To" extension will need the ID of the channel where "send-to-bot" will send messages. Navigate to the desired channel, and in the address bar, select and copy the entire string immediately after the final forward slash.
  >Select and copy only the emboldened portion of the URL.
  >
  >https://discord.com/channels/1386692967586336960/**1386692968026472512**

#### Extension Setup
- In a Chrome browser window, click the puzzle piece icon ("Extensions") that is just right of the address bar.
- Click "Manage Extensions" at the bottom of the list.
- Toggle "Developer mode" `on` in the upper right hand corner of the Extensions page.
- Click, drag, and drop `release/crx.send.to-*.*.*.zip` onto the Extensions page.
- The extension popup should appear as soon as the extension is installed with a prompt to enter some information.
- Enter (or paste) the desired Discord channel ID, edit the message template to your liking, and include the access key. Click "Save" to store the information in the extension.
  > The message template must include "\<url\>". This indicates where the URL of the selected image will appear in the sent message.
  
  > Data stored in the extension will live as long as the extension does. When updating the extension, you will be prompted to review the previously stored information. If the extension is removed and re-installed, you must save valid information before using the extension.

#### Extension Usage
- Find an image on a web page and right-click on it
- Click the custom menu option titled "Send to your friends on Discord?"
- In the upper-right corner of the page, you should see an alert indicating that the message is sending, has sent successfully, or could not be sent due to an error.
  > If you do not see the custom menu option, try refreshing the page. If you still don't see the option, ensure that you are right-clicking a valid HTML image element (`<img>`).

  > If you get an error alert, the most likely cause is an invalid channel ID. Ensure that you have successfully installed the "Send To App" to your server, that the bot user "send-to-bot" appears in the server, and that the channel ID is a valid, and that the channel belongs to a server where the bot has permission to send messages.
- On a successful request, you should see the message template with the image's URL posted in the desired channel by "send-to-bot".

#### Developer Tasks

  - API
    - [ ] Error format
  - Popup
    - [ ] Validate initial empty input value on save
    - [ ] Channel ID invalid if not all numbers
  - Background
    - [ ] Context menu option opens popup with prompt if invalid values
  - Content

#### Usage Flow
  - Install Send To bot on a Discord server
  - Copy Channel ID from url (last path parameter)
  - Store Discord channel ID and message template in the extension via a form in the extension popup
  - Navigate to an image element and right-click on it to reveal the custom option 
  - Click the custom option, triggering a request to the intermediary endpoint that requests the Discord API
  - Display a toast message on the page that indicates the pending request, then a success or error message  
  - On a successful request, the message template with image url should post to the channel from the Discord bot corresponding with the provided channel ID

## Wishlist

- [ ] Send using to Google Messages for Web
- [ ] Send files instead of URLs
- [ ] Store files locally
- [ ] Send other types of media, including selected text
- [ ] Implement using the WebExtensions API
- [ ] Make context menu option title customizable
- [ ] Advanced configuration in popup form (intermediate API hostname, whether to display toast or not, reset hints, etc...)
- [ ] Send as an authenticated user, instead of bot
- [ ] Custom auth solution: log in from extension, send as bot

## Idea Source

https://www.upwork.com/jobs/~021934648780323123966

> Need a solution for quickly posting images to discord and android
> 
> I dunno man, I'm real tired here. Okay, here we go
>
> Everyday I read my comics. Like the Sunday Funnies, but on weekdays because like I said it's every day. And I send those comics to different people on Android Messenger or Discord or nothing else.
>
> And. It's. Killing me.
> My current setup is taking all the joy out of reading the comics because I'm behind on the posting and everything sucks. and I'm miserable and I just want to share the comics with the people I love again. My parents don't even read them anymore.
>
> This is what I need, I think.
>
> I need an extension in firefox that will copy an image to a specific folder. Then I need a program in C# or Java that will take all the images, in all the folders, and send them to the correct recipient in either Android Messages or discord. And as an afterthought, I need a button that will dump all the files from all the folders into one master file.
>
> And because I'm real tired and this place is full of ai slop, put the words Fluffy Bunny in your reply title and you go to the front of the line
