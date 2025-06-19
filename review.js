document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('review-form');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                rating: document.querySelector('input[name="rating"]:checked')?.value,
                review: document.getElementById('review-text').value
            };
            
            // Validate required fields
            if (!formData.name || !formData.surname || !formData.email || !formData.rating) {
                document.getElementById('review-response').innerHTML = 
                    `<div class="alert alert-danger">
                        <p>Please fill in all required fields and select a rating.</p>
                    </div>`;
                return;
            }
            
            try {
                const response = await fetch('/rest/Reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        surname: formData.surname,
                        email: formData.email,
                        phone: formData.phone,
                        rating: parseInt(formData.rating),
                        review_text: formData.review,
                        is_approved: false
                    })
                });
                
                if (response.ok) {
                    // Show success message
                    document.getElementById('review-response').innerHTML = 
                        `<div class="alert alert-success">
                            <h4>Thank You!</h4>
                            <p>Your review has been submitted successfully. We appreciate your feedback!</p>
                        </div>`;
                    
                    // Clear the form
                    reviewForm.reset();
                } else {
                    const result = await response.json();
                    document.getElementById('review-response').innerHTML = 
                        `<div class="alert alert-danger">
                            <h4>Submission Failed</h4>
                            <p>${result.message || 'Please try again later.'}</p>
                        </div>`;
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('review-response').innerHTML = 
                    `<div class="alert alert-danger">
                        <h4>System Error</h4>
                        <p>Sorry, we couldn't process your review. Please try again later.</p>
                    </div>`;
            }
        });
    }
});