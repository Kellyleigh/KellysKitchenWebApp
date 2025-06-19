document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const partySizeInput = document.getElementById('party_size');
    const availabilityStatus = document.getElementById('availability-status');
    
    // Set minimum date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${yyyy}-${mm}-${dd}`;
    dateInput.setAttribute('min', formattedToday);
    
    // Check availability when date, time or party size changes
    function checkAvailability() {
        if (dateInput.value && timeInput.value && partySizeInput.value) {
            // Show loading state
            availabilityStatus.innerHTML = '<span class="checking">Checking availability...</span>';
            
            // Simulate API call to check availability (replace with actual API call)
            setTimeout(() => {
                const date = new Date(dateInput.value);
                const time = timeInput.value;
                const partySize = parseInt(partySizeInput.value);
                
                // This is a simulation - in a real app, you would call your backend
                const isAvailable = simulateAvailabilityCheck(date, time, partySize);
                
                if (isAvailable) {
                    availabilityStatus.innerHTML = '<span class="available">✓ Tables available at this time</span>';
                } else {
                    availabilityStatus.innerHTML = '<span class="unavailable">✗ Sorry, no tables available at this time</span>';
                }
            }, 500);
        } else {
            availabilityStatus.innerHTML = '';
        }
    }
    
    // Simulate availability check (replace with actual API call)
    function simulateAvailabilityCheck(date, time, partySize) {
        // This is just a simulation - in a real app, you would call your backend
        // For demo purposes: weekends are busier, large parties harder to accommodate
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const hour = parseInt(time.split(':')[0]);
        
        // Peak hours: 12-2pm and 6-8pm
        const isPeakHour = (hour >= 12 && hour <= 14) || (hour >= 18 && hour <= 20);
        
        // Simulate lower availability during weekends and peak hours
        if (isWeekend && isPeakHour && partySize > 4) {
            return Math.random() > 0.7; // 30% chance of availability
        } else if (isWeekend && isPeakHour) {
            return Math.random() > 0.4; // 60% chance of availability
        } else if (isWeekend || isPeakHour) {
            return Math.random() > 0.2; // 80% chance of availability
        } else {
            return Math.random() > 0.1; // 90% chance of availability
        }
    }
    
    // Add event listeners for real-time availability checking
    if (dateInput && timeInput && partySizeInput) {
        dateInput.addEventListener('change', checkAvailability);
        timeInput.addEventListener('change', checkAvailability);
        partySizeInput.addEventListener('change', checkAvailability);
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                partySize: document.getElementById('party_size').value,
                seatingPreference: document.getElementById('seating_preference').value
            };
            
            try {
                const response = await fetch('/rest/Bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        booking_date: formData.date,
                        booking_time: formData.time,
                        party_size: parseInt(formData.partySize),
                        seating_preference: formData.seatingPreference,
                        status: 'pending'
                    })
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    // Show success message
                    document.getElementById('booking-response').innerHTML = 
                        `<div class="alert alert-success">
                            <h4>Booking Confirmed!</h4>
                            <p>Thank you ${formData.name}! Your table for ${formData.partySize} has been reserved for ${formData.date} at ${formData.time}.</p>
                            <p>We will contact you shortly to confirm your reservation.</p>
                        </div>`;
                    
                    // Clear the form
                    bookingForm.reset();
                } else {
                    document.getElementById('booking-response').innerHTML = 
                        `<div class="alert alert-danger">
                            <h4>Booking Failed</h4>
                            <p>${result.message || 'Please try again or contact us directly.'}</p>
                        </div>`;
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('booking-response').innerHTML = 
                    `<div class="alert alert-danger">
                        <h4>System Error</h4>
                        <p>Sorry, we couldn't process your booking. Please try again later or call us directly.</p>
                    </div>`;
            }
        });
    }
});