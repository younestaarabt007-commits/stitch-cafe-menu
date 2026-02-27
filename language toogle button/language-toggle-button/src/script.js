document.getElementById('language-toggle').addEventListener('change', function() {
    const currentLanguage = document.getElementById('current-language');
    
    if (this.checked) {
        currentLanguage.textContent = 'العربية'; // Arabic
        // Add logic to switch the application language here
    } else {
        currentLanguage.textContent = 'Français'; // French
        // Add logic to switch the application language here
    }
});