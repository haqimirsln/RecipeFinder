// Replace with your API key and Custom Search Engine ID
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const CX = 'YOUR_CUSTOM_SEARCH_ENGINE_ID';

// Event listener for the search input
document.getElementById('search-input').addEventListener('input', (event) => {
    const query = event.target.value.trim();
    if (query) {
        fetchRecipes(query);
    } else {
        document.getElementById('suggestions').style.display = 'none';
        document.getElementById('clear-search').style.display = 'none';
    }
});

// Event listener for the clear button
document.getElementById('clear-search').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.getElementById('suggestions').style.display = 'none';
    document.getElementById('clear-search').style.display = 'none';
});

// Fetch recipes using Google Custom Search API
async function fetchRecipes(query) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';

    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${query}+recipe&key=${API_KEY}&cx=${CX}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.items) {
            // Loop through the results and create suggestion elements
            data.items.forEach(item => {
                const suggestion = document.createElement('p');
                suggestion.textContent = item.title;
                suggestion.addEventListener('click', () => {
                    window.open(item.link, '_blank');
                });
                suggestionsContainer.appendChild(suggestion);
            });
            suggestionsContainer.style.display = 'block';
            document.getElementById('clear-search').style.display = 'block';  // Show the clear button
        } else {
            suggestionsContainer.innerHTML = '<p>No recipes found!</p>';
            suggestionsContainer.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        suggestionsContainer.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
        suggestionsContainer.style.display = 'block';
    }
}
