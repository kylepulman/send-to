# Send To

Send web page elements to your friends from a custom context menu option.

## MVP

Send image urls to a Discord channel from a custom context menu option.

- Tasks
  - [x] (API) Set up a Discord app and bot
  - [x] (API) Write an intermediary endpoint that sends messages to Discord via its API 
  - [x] (popup) Get and store information to interact with the intermediary endpoint
    - [x] Prompt for information on install (in popup and context menu option)
    - [x] Design message template with `url` token
    - [x] Validate fields
  - [x] (background) Add a custom option to the context menu that sends a request to the intermediate endpoint with the provided information
    - [x] Handle `url` token
    - [x] Send request status messages to content script
  - [ ] (content) Display a toast message on-page that indicates the status of the request
    - [ ] Make dismissible
    - [ ] Timeout after success/error

- Flow
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
