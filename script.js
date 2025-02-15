document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bg-music");

    // Start music after user interaction (for autoplay restrictions)
    document.body.addEventListener("click", function () {
        if (audio.paused) {
            audio.play().catch(error => console.error("Autoplay blocked:", error));
        }
    }, { once: true });

    // Replace content when button is clicked
    document.getElementById("startButton").addEventListener("click", function () {
        let content = document.getElementById("content");

        // Clear everything inside the div and replace it with full content
        content.innerHTML = `
            <div class="envelope-wrapper">
                <div id="envelope" class="close">
                    <div class="front flap"></div>
                    <div class="front pocket"></div>
                    <div class="letter">
                        <p class="words line1">Baby Michele, </p>
                        <p class="words line2">I'm very lucky to have you in my life</p>
                        <p class="words line3">Can't wait to celebrate valentine's with you!</p>
                        <p class="words line4">I love you more than you’ll ever know!</p>
                    </div>
                </div>
            </div>
            <div class="continue">
                <button id="continue">Continue</button>
            </div>
        `;

        // Adding event listeners to Open and Continue buttons after content is loaded
        const envelope = document.getElementById("envelope");
        const btnContinue = document.getElementById("continue");

        setTimeout(() => {
            envelope.classList.add("open");
            envelope.classList.remove("close");
        }, 1000);

        // Continue button functionality to show question
        btnContinue.addEventListener("click", function () {
            content.innerHTML = `
                <img src="pictures/what.gif" alt="asking tonton">
                <div class="question">
                    <p style="font-size: 24px;">Will you be my Valentine?</p>
                    <button class="yesBtn">Yes</button>
                    <button class="noBtn">No</button> <!-- Ensure noBtn is enabled -->
                </div>
            `;

            // "Yes" button functionality
            document.querySelectorAll('.yesBtn').forEach(button => {
                button.addEventListener("click", function () {
                    content.innerHTML = `
                        <div style="text-align: center;">
                            <img src="pictures/love.gif" alt="Love GIF" style="display: block; margin: 0 auto;">
                            <p style="font-size: 24px;">Yaaaaaay! I love you!</p>
                        </div>
                        <div style="text-align: center; margin-top: 50px;">
                            <button id="surpriseBtn" style="padding: 12px 25px; font-size: 18px; background: #FF6863; color: white; border: none; cursor: pointer; border-radius: 5px;">Click for a Surprise</button>
                        </div>
                    `;

                    // Surprise button functionality
                    document.getElementById("surpriseBtn").addEventListener("click", function () {
                        content.innerHTML = `
                        <div style="text-align: center; margin-top: 20px;">
                            <img src="pictures/itinerary.png" alt="Itinerary Image" style="width: 70%; max-width: 500px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); margin-bottom: 20px;">
                            <br>
                            <a id="downloadBtn" href="pictures/itinerary.png" download style="display: inline-block; padding: 12px 25px; background: #FF6863; color: white; border-radius: 5px; text-decoration: none; font-size: 18px; font-weight: bold; transition: 0.3s;">Download Itinerary</a>
                        </div>
                    `;
                    });
                });
            });

            // Ensure "No" button is enabled
            const noButton = document.querySelector('.noBtn');
            noButton.disabled = false;

            // Tap on the "No" button to trigger shake animation
            noButton.addEventListener('click', function () {
                noButton.classList.add('shake');
                setTimeout(() => {
                    noButton.classList.remove('shake');
                }, 2000);
            });

            // Adding touch event for mobile support
            noButton.addEventListener('touchstart', function () {
                noButton.classList.add('shake');
				if (navigator.vibrate) {
					navigator.vibrate([100, 100, 100]);  // Vibrates 3 times with 100ms intervals
				}
                setTimeout(() => {
                    noButton.classList.remove('shake');
                }, 2000);
            });
        });
    });
});
