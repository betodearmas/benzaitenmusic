/*HAM MENU*/

const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', ()=>{
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active')
})

document.addEventListener('DOMContentLoaded', function() {
    const hamMenu = document.querySelector('.ham-menu');
    const scrollThreshold = 450; // Change this value to your desired scroll amount
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
});


/*POP-UP*/
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const close = document.getElementById("close");

    // Ensure the popup starts hidden
    popup.style.display = "none";

    // Show the popup after 5 seconds if it hasn't been shown already
    if (!sessionStorage.getItem("popupShown")) {
        setTimeout(() => {
            popup.style.display = "flex";
        }, 5000);
        sessionStorage.setItem("popupShown", "true");
    }

    // Close the popup
    close.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Handle form submission
    document.getElementById("subscriptionForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;

        fetch("https://script.google.com/macros/s/AKfycbzA3YgAJEQtO2hoFEi7G5JOxHM26N_exjo6kkJMUBiB3UfaP9EELBCI5rxKD65RwkNQvg/exec", {  // Replace with your actual Google Apps Script URL
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "email=" + encodeURIComponent(email)
        })
        .then(response => response.text())
        .then(data => {
            alert(data.includes("Success") ? "Subscribed!" : "Error. Try again.");
            document.getElementById("email").value = ""; // Clear input after submission
            popup.style.display = "none";
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});
