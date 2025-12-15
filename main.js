document.getElementById("bookingForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const bookingData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        roomType: document.getElementById("roomType").value,
        checkInDate: document.getElementById("checkInDate").value
    };

    try {
        const response = await fetch("http://localhost:8080/api/bookings",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData)
        });

        if (!response.ok) {
            console.error(await response.text());
            alert("Booking failed!");
            return;
        }

        const result = await response.json();
        console.log("Saved booking:", result);

        document.getElementById("popup").style.display = "flex";
        document.getElementById("bookingForm").reset();

    } catch (error) {
        console.error(error);
        alert("Server not running or CORS error");
    }
});

document.getElementById("popup-close").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
});
