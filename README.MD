# Focus YouTube Extension

This Chrome extension helps you stay focused by limiting YouTube video viewing to specific topics. Videos that do not match your allowed topics are paused and require manual confirmation before resuming.

## Features

- **Allowed Topics:** Set your allowed topics (e.g., "coding", "motivation") via the options page.
- **Video Pausing:** If a video title doesn't match any allowed topic, the video is automatically paused.
- **Manual Confirmation:** A modal popup asks for confirmation with the exact sentence:
  > Yes I want to see this useless video and not achieve my dreams  
  to resume playback.
- **MutationObserver:** Watches for DOM changes on YouTube (a single-page app) to trigger the check automatically.

## Folder Structure

```
d:\Resume_Project\Focus
│   manifest.json
│   content.js
│   options.html
│   options.js
│   README.md
│   cap_focus.png
```

## Installation

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked** and select your project folder `d:\file_location`.
4. The extension should now be active.

## Usage

1. Click the extension's **Options** (or navigate to the options page via the Extensions page) to set your allowed topics. Enter topics separated by commas.
2. Navigate to YouTube. When a video is opened:
   - If the video title matches one of your allowed topics, the video plays as usual.
   - If the title does not match, the video pauses and a modal popup appears.
3. To resume playback, type the following sentence exactly in the modal's input field:
   ```
   Yes I want to see this useless video and not achieve my dreams
   ```

## Known Issues

- **Performance Lag:** The MutationObserver may introduce some lag since it watches for a lot of DOM mutations. Consider optimizing the observer (using debouncing or checking if the modal already exists) if performance becomes an issue.
- **DOM Selectors:** YouTube's DOM structure can change. If the extension stops working, inspect the page and update the selectors in `content.js`.

## License

This project is open source and free to use.
