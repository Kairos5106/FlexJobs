document.addEventListener('DOMContentLoaded', function () {
    // Get all the <tr> elements inside the table
    var rows = document.querySelectorAll('#inbox-table tr');
    var defaultDisplay = document.getElementById('default-display');
    var messageBox = document.getElementById('message-box');

    // Add a click event listener to each <tr> element
    rows.forEach(function (row) {
        row.addEventListener('click', function () {

            defaultDisplay.style.display = 'none';
            messageBox.style.display = 'flex';

            // Remove the 'selected' class from all rows
            rows.forEach(function (r) {
                r.classList.remove('selected-inbox');
            });

            // Add the 'selected' class to the clicked row
            row.classList.add('selected-inbox');
            
        });
    });


    var messageInput = document.getElementById("message-input");
    var sendIcon = document.getElementById("send-vector");

    messageInput.addEventListener("input", function() {
        if (messageInput.value.trim() !== "") {
            sendIcon.style.display = "inline-block"; // Show the send icon
        } else {
            sendIcon.style.display = "none"; // Hide the send icon
        }
    });


    var imageContainer = document.getElementById("image-container");
    var inboxTable = document.getElementById("inbox-table");

    inboxTable.addEventListener("click", function(event) {
        var target = event.target.closest("tr");
        if (target) {
            var imageUrl = target.getAttribute("data-image");
            if (imageUrl) {
                imageContainer.src = imageUrl;
            }
        }
    });
});
