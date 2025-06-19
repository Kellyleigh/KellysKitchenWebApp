// Newsletter subscription functionality
document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.getElementById('newsletter-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="text"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            try {
                const response = await fetch('/rest/NewsletterSubscribers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        email: email,
                        is_active: true
                    })
                });
                
                if (response.ok) {
                    // Clear the input field
                    emailInput.value = '';
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'subscription-success';
                    successMessage.textContent = 'Thank you for subscribing!';
                    successMessage.style.color = '#4CAF50';
                    successMessage.style.marginTop = '10px';
                    
                    // Insert the success message after the form
                    subscribeForm.parentNode.insertBefore(successMessage, subscribeForm.nextSibling);
                    
                    // Remove the success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                } else {
                    const result = await response.json();
                    alert(result.message || 'Subscription failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }
});