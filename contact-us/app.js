// document.addEventListener('DOMContentLoaded', function () {
// const sendFormButton = document.getElementById('sendFormButton');
// sendFormButton.addEventListener('click', function (event) {
// // Prevent the default form submission behavior
//         event.preventDefault(); //seems pointless though
//         submitForm();
//     });
// });

    function showCustomPopup(message) {
        const modal = document.createElement('div');
        modal.classList.add('custom-popup');
        modal.textContent = message;
    
        document.body.appendChild(modal);
    
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 2000); 
    }

    function submitForm() {
        const form = document.getElementById('contact-form');

        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const message = form.querySelector('textarea[name="message"]').value;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;        

        const formData = { name, email, message };
        if (name.trim() !== '' && email.trim() !== '' && message.trim() !== '') {
        
        if (emailRegex.test(email)) {
            
            fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.text())
                .then(data => {
                    console.log(`${data}`);
                    showCustomPopup("Email send successfuly");
                    document.getElementById("contactFormform").reset();
                    // Handle success, e.g., show a thank you message to the user
                })
                .catch(error=> {
                    console.error('Error:', error);
                    showCustomPopup("Error sending email");
                });
        
        } else {
            showCustomPopup("Email is invalid")
            console.log("email invalid")
            }
        
        
        } else {
            showCustomPopup("Missing date all fields are required");
            console.log("missing date")
        }
    }