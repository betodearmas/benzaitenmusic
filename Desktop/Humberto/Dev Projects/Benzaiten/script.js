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

    // Show the popup after 5 seconds
    setTimeout(() => {
        popup.style.display = "flex";
    }, 5000);

    // Close the popup
    close.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // POP-UP STOPS APPEARING AFTER ONE SESSION LOAD
    if (!sessionStorage.getItem("popupShown")) {
        popup.style.display = "block";
        sessionStorage.setItem("popupShown", "true");
    }

    // Handle form submission
    document.getElementById("subscriptionForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;

        fetch("https://script.google.com/macros/s/AKfycbx6PKLcw21M13SKoynCh6YdAwCeAr8PNUZCvib3He_EjpwSOb1VXR7xr0WDRr4bjKJ41g/exec", {  // Google Apps Script URL
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
