// Search and account functionality removed

const bar = document.querySelector('.fa-bars');
const cross = document.querySelector('#hdcross');
const headerbar = document.querySelector('.headerbar');

bar.addEventListener('click', function() {
    setTimeout(() => {
        cross.style.display = 'block';
    }, 200);
    headerbar.style.right = '0%';
})

cross.addEventListener('click', function() {
    cross.style.display = 'none';
    headerbar.style.right = '-100%';
})

// Menu filtering and sorting functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Set up dietary attributes for menu items (for demo purposes)
    // In a real application, these would come from your database
    const dietaryInfo = {
        // Breakfast items
        'Eggs Benedict': { vegetarian: true, glutenFree: false },
        'French Toast': { vegetarian: true, glutenFree: false },
        'Full English': { vegetarian: false, glutenFree: false },
        'Pancake Stack': { vegetarian: true, glutenFree: false },
        
        // Main items
        'Ribeye Steak': { vegetarian: false, glutenFree: true },
        'Gourmet Burger': { vegetarian: false, glutenFree: false },
        'Creamy Pasta': { vegetarian: true, glutenFree: false },
        'Grilled Salmon': { vegetarian: false, glutenFree: true },
        
        // Dessert items
        'New York Cheesecake': { vegetarian: true, glutenFree: false },
        'Chocolate Fondant': { vegetarian: true, glutenFree: false },
        'Tiramisu': { vegetarian: true, glutenFree: false },
        'Ice Cream Sundae': { vegetarian: true, glutenFree: true },
        
        // Kids items
        'Chicken Nuggets': { vegetarian: false, glutenFree: false },
        'Mac & Cheese': { vegetarian: true, glutenFree: false },
        'Mini Pizza': { vegetarian: false, glutenFree: false },
        'Fish Fingers': { vegetarian: false, glutenFree: false }
    };
    
    // Apply dietary attributes to menu items
    menuItems.forEach(item => {
        const itemName = item.querySelector('h3').textContent;
        if (dietaryInfo[itemName]) {
            // Add data attributes for filtering
            item.dataset.vegetarian = dietaryInfo[itemName].vegetarian;
            item.dataset.glutenFree = dietaryInfo[itemName].glutenFree;
            
            // Add price as data attribute for sorting
            const priceText = item.querySelector('.price').textContent;
            const priceValue = parseInt(priceText.replace('R', ''));
            item.dataset.price = priceValue;
        }
    });
    
    // Set up additional attributes for menu items
    menuItems.forEach(item => {
        const itemName = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent.toLowerCase();
        const priceText = item.querySelector('.price').textContent;
        const priceValue = parseInt(priceText.replace('R', ''));
        
        // Set budget-friendly flag
        item.dataset.budget = priceValue < 100 ? 'true' : 'false';

        // Set sweet/savoury flags
        item.dataset.sweet = (description.includes('pancake') || 
                             description.includes('french toast') ||
                             description.includes('ice cream') ||
                             description.includes('chocolate') ||
                             description.includes('cheesecake') ||
                             description.includes('tiramisu') ||
                             description.includes('berries')) ? 'true' : 'false';
        
        item.dataset.savoury = item.dataset.sweet === 'true' ? 'false' : 'true';
    });
    
    // Filter dropdown functionality
    const filterSelect = document.getElementById('filter-select');
    filterSelect.addEventListener('change', () => {
        const filter = filterSelect.value;
        
        // Apply filter
        menuItems.forEach(item => {
            if (filter === 'all') {
                item.classList.remove('hidden');
            } else if (filter === 'vegetarian') {
                item.dataset.vegetarian === 'true' ? item.classList.remove('hidden') : item.classList.add('hidden');
            } else if (filter === 'gluten-free') {
                item.dataset.glutenFree === 'true' ? item.classList.remove('hidden') : item.classList.add('hidden');
            } else if (filter === 'fish') {
                item.dataset.fish === 'true' ? item.classList.remove('hidden') : item.classList.add('hidden');
            } else if (filter === 'poultry') {
                item.dataset.poultry === 'true' ? item.classList.remove('hidden') : item.classList.add('hidden');
            } else if (filter === 'sweet') {
                item.dataset.sweet === 'true' ? item.classList.remove('hidden') : item.classList.add('hidden');
            } else if (filter === 'savoury') {
                item.dataset.savoury === 'true' ? item.classList.remove('hidden') : item.classList.add('hidden');
            } else if (filter === 'budget') {
                item.dataset.budget === 'true' ? item.classList.remove('hidden') : item.classList.add('hidden');
            }
        });
    });
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const menuSections = document.querySelectorAll('.menu-grid-container');
        
        menuSections.forEach(section => {
            const items = Array.from(section.querySelectorAll('.menu-item'));
            
            if (sortValue === 'price-low') {
                items.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
            } else if (sortValue === 'price-high') {
                items.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
            }
            
            // If default, we don't need to sort as items are already in their original order
            
            // Re-append items in the new order
            if (sortValue !== 'default') {
                items.forEach(item => {
                    section.appendChild(item);
                });
            }
        });
    });
    
    // Set default filter
    document.getElementById('filter-select').value = 'all';
});

