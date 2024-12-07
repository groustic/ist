$(document).ready(function() {
    $('#userForm').on('submit', function(event) {
        event.preventDefault();

        const userData = {
            name: $('#userName').val(),
            bio: $('#userBio').val(),
            id: $('#userID').val()
        };

        $.ajax({
            url: '/api/user',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                alert(response.message);
            },
            error: function(error) {
                console.error("Error saving user data:", error);
                alert("Failed to save user data.");
            }
        });
    });
});
