// ======================================
// ALFISHA RAILWAY - COMPLETE SCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", function () {
// ==================================
// TITLE TRAIN IMAGE SLIDER
// ==================================

const titleTrainImage =
    document.getElementById("titleTrainImage");

if (titleTrainImage) {

    const trainImages = [
        "images/about-railway.jpg",
        "images/vande-bharat.jpg",
        "images/login-train2.jpg",
        "images/vande-bharat.jpg",
        "images/login-train3.jpg"
    ];

    let trainImageIndex = 0;

    setInterval(function () {

        trainImageIndex++;

        if (trainImageIndex >= trainImages.length) {
            trainImageIndex = 0;
        }

        titleTrainImage.style.opacity = "0";

        setTimeout(function () {

            titleTrainImage.src =
                trainImages[trainImageIndex];

            titleTrainImage.style.opacity = "1";

        }, 500);

    }, 3000);

}

    // ==================================
    // TRAIN SEARCH
    // ==================================

    const trainSearchForm =
        document.getElementById("trainSearchForm");

    if (trainSearchForm) {

        trainSearchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const from =
                document.getElementById("fromStation").value.trim();

            const to =
                document.getElementById("toStation").value.trim();

            const date =
                document.getElementById("journeyDate").value;

            const travelClass =
                document.getElementById("travelClass").value;

            const results =
                document.getElementById("trainResults");


            if (!from || !to || !date) {

                results.innerHTML = `
                    <div class="search-error">
                        Please enter all journey details.
                    </div>
                `;

                return;
            }


            // Save journey information

            localStorage.setItem("fromStation", from);
            localStorage.setItem("toStation", to);
            localStorage.setItem("journeyDate", date);
            localStorage.setItem("travelClass", travelClass);
            localStorage.setItem("trainName", "Deccan Express");


            // Show result

            results.innerHTML = `

                <div class="train-result">

                    <div class="train-result-header">

                        <div>
                            <span>AVAILABLE TRAIN</span>

                            <h3>
                                🚆 Deccan Express
                            </h3>
                        </div>

                        <strong class="train-status">
                            AVAILABLE
                        </strong>

                    </div>


                    <div class="train-route">

                        <div>
                            <small>FROM</small>
                            <strong>${from}</strong>
                        </div>

                        <div class="route-arrow">
                            →
                        </div>

                        <div>
                            <small>TO</small>
                            <strong>${to}</strong>
                        </div>

                    </div>


                    <div class="train-details">

                        <div>
                            <small>JOURNEY DATE</small>
                            <strong>${date}</strong>
                        </div>

                        <div>
                            <small>DEPARTURE</small>
                            <strong>06:30 AM</strong>
                        </div>

                        <div>
                            <small>ARRIVAL</small>
                            <strong>02:45 PM</strong>
                        </div>

                        <div>
                            <small>CLASS</small>
                            <strong>${travelClass}</strong>
                        </div>

                        <div>
                            <small>SEATS</small>
                            <strong>48 Available</strong>
                        </div>

                    </div>


                    <button
                        type="button"
                        id="bookTrainButton"
                        class="book-train-button">

                        Book Now →

                    </button>

                </div>
            `;


            // Book Now

            const bookButton =
                document.getElementById("bookTrainButton");

            if (bookButton) {

                bookButton.addEventListener("click", function () {

                    window.location.href = "seat.html";

                });

            }


            results.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }


    // ==================================
    // SEAT SELECTION
    // ==================================

    const seats =
        document.querySelectorAll(".seat");

    const continueButton =
        document.getElementById("continueBooking");

    let selectedSeat = null;


    seats.forEach(function (seat) {

        // Ignore booked seats

        if (seat.classList.contains("booked")) {
            return;
        }


        seat.addEventListener("click", function () {

            // Remove old selection

            seats.forEach(function (item) {
                item.classList.remove("selected");
            });


            // Select current seat

            this.classList.add("selected");

            selectedSeat =
                this.textContent.trim();


            // Save seat

            localStorage.setItem(
                "selectedSeat",
                selectedSeat
            );

            localStorage.setItem(
                "bookingSeat",
                selectedSeat
            );

        });

    });


    // ==================================
    // CONTINUE TO PASSENGER DETAILS
    // ==================================

    if (continueButton) {

        continueButton.addEventListener("click", function () {

            if (!selectedSeat) {

                // Check saved seat

                selectedSeat =
                    localStorage.getItem("selectedSeat");

            }


            if (!selectedSeat) {

                alert("Please select a seat first.");

                return;

            }


            localStorage.setItem(
                "bookingSeat",
                selectedSeat
            );


            window.location.href =
                "booking.html";

        });

    }


    // ==================================
// PASSENGER BOOKING
// ==================================

const passengerForm =
    document.getElementById("passengerForm");


if (passengerForm) {

    passengerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("passengerName")
                .value
                .trim();

        const age =
            document
                .getElementById("passengerAge")
                .value;

        const gender =
            document
                .getElementById("gender")
                .value;

        const phone =
            document
                .getElementById("phone")
                .value
                .trim();


        const seat =
            localStorage.getItem("bookingSeat");


        if (!seat) {

            alert("Please select a seat first.");

            window.location.href =
                "seat.html";

            return;

        }


        // Generate PNR

        const pnr =
            "PNR" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        // Save passenger information

        localStorage.setItem(
            "pnr",
            pnr
        );

        localStorage.setItem(
            "passengerName",
            name
        );

        localStorage.setItem(
            "passengerAge",
            age
        );

        localStorage.setItem(
            "passengerGender",
            gender
        );

        localStorage.setItem(
            "passengerPhone",
            phone
        );

        localStorage.setItem(
            "bookingSeat",
            seat
        );


        // Hide the form

        passengerForm.style.display = "none";


        // Show booking confirmation message

        const bookingSuccess =
            document.getElementById("bookingSuccess");


        if (bookingSuccess) {

            bookingSuccess.style.display = "block";

        }

    });

}
    // ==================================
    // PNR DISPLAY
    // ==================================

    const pnrNumber =
        document.getElementById("pnrNumber");


    if (pnrNumber) {

        pnrNumber.textContent =
            localStorage.getItem("pnr") || "---";


        const ticketName =
            document.getElementById("ticketName");

        if (ticketName) {

            ticketName.textContent =
                localStorage.getItem(
                    "passengerName"
                ) || "---";

        }


        const ticketAge =
            document.getElementById("ticketAge");

        if (ticketAge) {

            ticketAge.textContent =
                localStorage.getItem(
                    "passengerAge"
                ) || "---";

        }


        const ticketGender =
            document.getElementById("ticketGender");

        if (ticketGender) {

            ticketGender.textContent =
                localStorage.getItem(
                    "passengerGender"
                ) || "---";

        }


        const ticketSeat =
            document.getElementById("ticketSeat");

        if (ticketSeat) {

            ticketSeat.textContent =
                localStorage.getItem(
                    "bookingSeat"
                ) || "---";

        }

    }


    // ==================================
    // PNR JOURNEY DETAILS
    // ==================================

    const ticketFrom =
        document.getElementById("ticketFrom");

    const ticketTo =
        document.getElementById("ticketTo");


    if (ticketFrom) {

        ticketFrom.textContent =
            localStorage.getItem(
                "fromStation"
            ) || "---";

    }


    if (ticketTo) {

        ticketTo.textContent =
            localStorage.getItem(
                "toStation"
            ) || "---";

    }


    const ticketTrain =
        document.getElementById("ticketTrain");

    const ticketDate =
        document.getElementById("ticketDate");


    if (ticketTrain) {

        ticketTrain.textContent =
            localStorage.getItem(
                "trainName"
            ) || "---";

    }


    if (ticketDate) {

        ticketDate.textContent =
            localStorage.getItem(
                "journeyDate"
            ) || "---";

    }


    // ==================================
    // MY BOOKINGS
    // ==================================

    const bookingCard =
        document.getElementById("bookingCard");


    if (bookingCard) {

        const pnr =
            localStorage.getItem("pnr");

        const name =
            localStorage.getItem(
                "passengerName"
            );

        const age =
            localStorage.getItem(
                "passengerAge"
            );

        const gender =
            localStorage.getItem(
                "passengerGender"
            );

        const seat =
            localStorage.getItem(
                "bookingSeat"
            );

        const train =
            localStorage.getItem(
                "trainName"
            );

        const date =
            localStorage.getItem(
                "journeyDate"
            );

        const from =
            localStorage.getItem(
                "fromStation"
            );

        const to =
            localStorage.getItem(
                "toStation"
            );


        if (pnr) {

            bookingCard.innerHTML = `

                <div class="booking-card">

                    <h3>
                        🚆 ${train || "Railway Express"}
                    </h3>

                    <p>
                        <strong>PNR:</strong>
                        ${pnr}
                    </p>

                    <p>
                        <strong>Passenger:</strong>
                        ${name || "---"}
                    </p>

                    <p>
                        <strong>Age:</strong>
                        ${age || "---"}
                    </p>

                    <p>
                        <strong>Gender:</strong>
                        ${gender || "---"}
                    </p>

                    <p>
                        <strong>Route:</strong>
                        ${from || "---"}
                        →
                        ${to || "---"}
                    </p>

                    <p>
                        <strong>Journey Date:</strong>
                        ${date || "---"}
                    </p>

                    <p>
                        <strong>Seat:</strong>
                        ${seat || "---"}
                    </p>

                    <span class="booking-confirmed">
                        ✓ CONFIRMED
                    </span>

                </div>

            `;

        } else {

            bookingCard.innerHTML = `

                <div class="booking-card">

                    <h3>
                        No Bookings Found
                    </h3>

                    <p>
                        You have not made any railway
                        reservations yet.
                    </p>

                </div>

            `;

        }

    }


    // ==================================
    // ABOUT IMAGE SLIDER
    // ==================================

    const aboutImage =
        document.getElementById("aboutImage");


    if (aboutImage) {

        const aboutImages = [
            "images/about1.jpg",
            "images/about2.jpg",
            "images/about3.jpg",
            "images/about4.jpg"
        ];

        let aboutIndex = 0;


        setInterval(function () {

            aboutIndex++;

            if (aboutIndex >= aboutImages.length) {
                aboutIndex = 0;
            }


            aboutImage.style.opacity = "0";


            setTimeout(function () {

                aboutImage.src =
                    aboutImages[aboutIndex];

                aboutImage.style.opacity = "1";

            }, 400);


        }, 4000);

    }

});