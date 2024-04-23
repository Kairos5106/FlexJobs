document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("feedback-form").addEventListener("submit", function(event) {
        var form = event.target;
        if (form.checkValidity()) {
            form.reset();

            alert("Thank you for giving your feedback.");
        } else {
            alert("Please fill in all required fields.");
        }
        event.preventDefault(); // Prevent default form submission
    });
});