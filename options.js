document.getElementById('topicsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const topicsInput = document.getElementById('topicsInput').value;
    // Split by commas and trim whitespace
    const topics = topicsInput.split(',').map(topic => topic.trim()).filter(topic => topic);
    
    chrome.storage.sync.set({ allowedTopics: topics }, () => {
        alert('Allowed topics saved!');
    });
});