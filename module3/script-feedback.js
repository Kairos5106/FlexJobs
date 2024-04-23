document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("feedback-form").addEventListener("submit", function(event) {
        var form = event.target;
        if (form.checkValidity()) {
            form.reset();

            alert("Thank you for giving your feedback!");
        } else {
            alert("Please fill in all required fields.");
        }
        event.preventDefault(); // Prevent default form submission
    });

    document.querySelectorAll('.star').forEach(function(star) {
        star.addEventListener('click', function() {
            const value = parseInt(star.getAttribute('data-value'));
            document.querySelectorAll('.star').forEach(function(s, index) {
                if (index < value) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
});