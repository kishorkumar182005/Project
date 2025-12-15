const apiUrl = "http://localhost:8080/api/bookings";

document.addEventListener("DOMContentLoaded", loadData);

// LOAD DATA
function loadData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#dataTable tbody");
            tableBody.innerHTML = "";

            data.forEach(booking => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${booking.id}</td>
                    <td>${booking.name}</td>
                    <td>${booking.phone}</td>
                    <td>${booking.email}</td>
                    <td>${booking.roomType}</td>
                    <td>${booking.checkInDate}</td>
                    <td>
                        <button onclick="deleteBooking(${booking.id})">
                            Delete
                        </button>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error:", error));
}

// DELETE BOOKING
function deleteBooking(id) {
    if (!confirm("Are you sure you want to delete this booking?")) {
        return;
    }

    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Delete failed");
        }
        return response.text();
    })
    .then(msg => {
        alert(msg);
        loadData(); // REFRESH TABLE
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error deleting booking");
    });
}
