//Age verification section
function ageverification() {
    const age = parseInt(document.getElementById("ageinput").value);

    //in case of age 0 or invalid
    if (!age || age < 1) {
        showModal("Please enter a valid age!");
        return;
    }

    //for greater than 18 age
    if (age < 18) {
        showModal("Access Denied. Age must be above 18");

    } else {

        // store it in local storage
        localStorage.setItem("age", age);

        // slide out the age verification div
        const ageWrapper = document.querySelector(".central-wrapper");
        ageWrapper.classList.add("slide-out");

        // After animation, hide and show next sections
        setTimeout(() => {
            ageWrapper.style.display = "none";

            const dobSection = document.getElementById("dob-selection");
            const ipSection = document.getElementById("ip-info");
            const countrySection = document.getElementById("country-selection");
            const resetButton = document.getElementById("reset-button");

            dobSection.style.display = "block";
            ipSection.style.display = "block";
            countrySection.style.display = "block";
            resetButton.style.display = "block";

            // fade animation
            dobSection.classList.add("fade-in");
            ipSection.classList.add("fade-in");
            countrySection.classList.add("fade-in");
            resetButton.classList.add("fade-in");

            getIPInfo();

            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 500); // match CSS duration
    }
}

// modal instead of alert
function showModal(message) {
  document.getElementById('modal-message').textContent = message;
  document.getElementById('custom-modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('custom-modal').style.display = 'none';
}
