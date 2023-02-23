function createCalEvent() {
    const fetchString = "/add-cal-event";

    const title = document.getElementById("title").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const location = document.getElementById("location").value;
    const eventDetails = document.getElementById("eventDetails").value;

    fetch((fetchString), {
        method: 'POST',
        body: JSON.stringify({ 
            title: title,
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime,
            location: location,
            eventDetails: eventDetails
        }),
    }).then((_res) => {
        window.location.href = "/schedule";
    });
}