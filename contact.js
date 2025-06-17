document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Verify reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                document.getElementById('contact-response').innerHTML = 
                    `<div class="alert alert-danger">
                        <h4>Verification Required</h4>
                        <p>Please complete the CAPTCHA verification.</p>
                    </div>`;
                return;
            }
            
            const formData = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value,
                recaptchaResponse: recaptchaResponse
            };
            
            try {
                const response = await fetch('/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    document.getElementById('contact-response').innerHTML = 
                        `<div class="alert alert-success">
                            <h4>Message Sent!</h4>
                            <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
                        </div>`;
                    
                    contactForm.reset();
                    grecaptcha.reset();
                } else {
                    document.getElementById('contact-response').innerHTML = 
                        `<div class="alert alert-danger">
                            <h4>Message Failed</h4>
                            <p>${result.message || 'Please try again or contact us directly.'}</p>
                        </div>`;
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('contact-response').innerHTML = 
                    `<div class="alert alert-danger">
                        <h4>System Error</h4>
                        <p>Sorry, we couldn't send your message. Please try again later or call us directly.</p>
                    </div>`;
            }
        });
    }
});