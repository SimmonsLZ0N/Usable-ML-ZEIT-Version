act_reluOption = document.getElementById("act_reluOption")
act_sigmoidOption = document.getElementById("act_sigmoidOption")
act_tanhOption = document.getElementById("act_tanhOption")




function handleActivationFunctionChange(event) {
// Get the text of the selected option
    var selectedOptionText = event.target.textContent;

// Update the title text with the selected option
    var titleElement = document.getElementById("selectedOption");
    titleElement.innerHTML = "Activation Function: <br>" +selectedOptionText;

// Call a function or perform an action based on the selected option
switch (selectedOptionText) {
    case "Retified Linear Activation (ReLU)":
        // Call a function for ReLU activation
        // Example: performReLUActivation();
        break;
    case "Logistics (Sigmoid)":
        // Call a function for Sigmoid activation
        // Example: performSigmoidActivation();
        break;
    case "Hyperbolic Tangent (tanh)":
        // Call a function for tanh activation
        // Example: performTanhActivation();
        break;
    default:
        // Handle any other cases or do nothing
        break;
}}

// Add a "click" event listener to the dropdown options
act_reluOption.addEventListener("click", handleActivationFunctionChange);
act_sigmoidOption.addEventListener("click", handleActivationFunctionChange);
act_tanhOption.addEventListener("click", handleActivationFunctionChange);


// Function to disable slider and button when button is pressed
playButton.addEventListener('click', function () {
    startTraining();
    slider.disabled = true;
    playButton.disabled = true;
    print("TEST SUCCES")
});

// Function to update accuracy value on the page
function updateAccuracy() {
    fetch("/get_accuracy")
        .then(response => response.json())
        .then(data => {
            accuracyElement.textContent = data.acc;
        });
}

// Function to update slider value display
function updateSliderValue() {
    sliderValueElement.textContent = slider.value;
}

// Function to start training
function startTraining() {
    fetch("/start_training", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(response => response.json())
}

// Update accuracy every second
setInterval(function() {
    updateAccuracy();
}, 1000);

// Function to change seed value when slider is changed
slider.addEventListener("input", function() {
    updateSliderValue();
    fetch("/update_seed", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "seed=" + slider.value
    });
});
