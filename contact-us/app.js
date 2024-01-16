document.addEventListener('DOMContentLoaded', function () {
const sendFormButton = document.getElementById('sendFormButton');
sendFormButton.addEventListener('click', function (event) {
// Prevent the default form submission behavior
        event.preventDefault(); //seems pointless though
        submitForm();
    });
});
    function submitForm() {
        const form = document.getElementById('contact-form');

        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const message = form.querySelector('textarea[name="message"]').value;

        const formData = { name, email, message };
        fetch('http://localhost:3000/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.text())
            .then(data => {
                console.log(`${data}`);
                // Handle success, e.g., show a thank you message to the user
            })
            .catch(error => console.error('Error:', error));
    }