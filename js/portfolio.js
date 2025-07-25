document.addEventListener('DOMContentLoaded', function() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let portfolioItems = [];

    // Load portfolio items from JSON
    async function loadPortfolioItems() {
        try {
            const response = await fetch('../data/portfolio.json');
            const data = await response.json();
            portfolioItems = data.items;
            displayPortfolioItems(portfolioItems);
            setupFilterButtons();
        } catch (error) {
            console.error('Error loading portfolio items:', error);
            portfolioGrid.innerHTML = '<p>Error loading portfolio items. Please try again later.</p>';
        }
    }

    // Display portfolio items
    function displayPortfolioItems(items) {
        if (!portfolioGrid) return;
        
        if (items.length === 0) {
            portfolioGrid.innerHTML = '<p>No portfolio items found.</p>';
            return;
        }

        const portfolioHTML = items.map(item => `
            <div class="portfolio-item" data-category="${item.category}">
                <div class="portfolio-image">
                    <img src="${item.image}" alt="${item.alt}" onerror="this.style.display='none';">
                    <div class="portfolio-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.category.toUpperCase()}</p>
                    </div>
                </div>
            </div>
        `).join('');

        portfolioGrid.innerHTML = portfolioHTML;
    }

    // Filter portfolio items
    function filterPortfolio(category) {
        const filteredItems = category === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === category);
        
        displayPortfolioItems(filteredItems);
    }

    // Set up filter buttons
    function setupFilterButtons() {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                // Filter items
                const filter = this.getAttribute('data-filter');
                filterPortfolio(filter);
            });
        });
    }

    // Initialize
    loadPortfolioItems();
});
