// Observe DOM changes to detect page updates (YouTube is a single-page app)
const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
        // Find the video title element (adjust the selector if needed)
        const titleElement = document.querySelector('h1.title, h1.ytd-video-primary-info-renderer');
        if (titleElement) {
            const videoTitle = titleElement.innerText.toLowerCase();

            // Fetch allowed topics from chrome.storage (assumed to be an array: ["coding", "motivation"])
            chrome.storage.sync.get(['allowedTopics'], (result) => {
                const topics = result.allowedTopics || [];
                // Check if any allowed topic is contained in the video title.
                const isAllowed = topics.some(topic => videoTitle.includes(topic.toLowerCase()));

                // If not allowed, pause the video and show a modal for confirmation.
                if (!isAllowed) {
                    const videoPlayer = document.querySelector('video');
                    if (videoPlayer) {
                        videoPlayer.pause();
                    }
                    showBlockModal(videoPlayer);
                }
            });
        }
    });
});

// Start observing DOM mutations on the entire document body.
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Function to display a modal that unlocks video playback after correct input.
function showBlockModal(videoPlayer) {
    // Create a full-screen overlay for the modal.
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '10000';

    // Create a container for modal content.
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.textAlign = 'center';

    // Instruction text for the user.
    const message = document.createElement('p');
    message.innerText = 'Type "Yes I want to see this useless video and not achieve my dreams" to continue watching:';
    modalContent.appendChild(message);

    // Input field for user input.
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.style.width = '80%';
    inputField.style.marginBottom = '10px';
    modalContent.appendChild(inputField);

    // Submit button.
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    modalContent.appendChild(submitButton);

    // Append the content to the modal, and the modal to the document.
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Handle submission: if user types the exact sentence, resume video playback; otherwise, show an alert.
    submitButton.addEventListener('click', () => {
        if (inputField.value === "Yes I want to see this useless video and not achieve my dreams") {
            if (videoPlayer) {
                videoPlayer.play();
            }
            document.body.removeChild(modal);
        } else {
            alert("Incorrect input. Please type the exact sentence to continue.");
        }
    });
}