// Menu loader for Kelly's Kitchen - loads menu items from SWA Data API
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch menu items from the database
        const response = await fetch('/rest/MenuItems');
        
        if (response.ok) {
            const menuItems = await response.json();
            loadMenuItems(menuItems.value || menuItems);
        } else {
            console.error('Failed to load menu items from database');
            // Keep existing static menu items as fallback
        }
    } catch (error) {
        console.error('Error loading menu items:', error);
        // Keep existing static menu items as fallback
    }
});

function loadMenuItems(items) {
    // Group items by category
    const categories = {
        'Breakfast': [],
        'Main': [],
        'Dessert': [],
        'Kids': [],
        'Milkshakes': []
    };
    
    items.forEach(item => {
        const categoryName = getCategoryName(item.category_id);
        if (categories[categoryName]) {
            categories[categoryName].push(item);
        }
    });
    
    // Update each category section
    Object.keys(categories).forEach(categoryName => {
        updateCategorySection(categoryName, categories[categoryName]);
    });
}

function getCategoryName(categoryId) {
    const categoryMap = {
        1: 'Breakfast',
        2: 'Main', 
        3: 'Dessert',
        4: 'Kids',
        5: 'Milkshakes'
    };
    return categoryMap[categoryId] || 'Other';
}

function updateCategorySection(categoryName, items) {
    // Find the section heading with this category name
    const headings = document.querySelectorAll('.section-heading h1');
    let targetSection = null;
    
    headings.forEach(heading => {
        if (heading.textContent.trim() === categoryName) {
            targetSection = heading.closest('.section-heading');
        }
    });
    
    if (!targetSection || items.length === 0) return;
    
    // Find the next menu-grid-container after this heading
    let nextElement = targetSection.nextElementSibling;
    while (nextElement && !nextElement.classList.contains('menu-grid-container')) {
        nextElement = nextElement.nextElementSibling;
    }
    
    if (!nextElement) return;
    
    // Clear existing items
    nextElement.innerHTML = '';
    
    // Add items from database
    items.forEach(item => {
        const menuItemElement = createMenuItemElement(item);
        nextElement.appendChild(menuItemElement);
    });
}

function createMenuItemElement(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.dataset.price = item.price;
    
    menuItem.innerHTML = `
        <img src="${item.image_path || 'images/default-menu-item.png'}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description || ''}</p>
        <span class="price">R${item.price}</span>
    `;
    
    return menuItem;
}