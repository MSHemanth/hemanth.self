function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

window.onscroll = function() {
  var backToTopBtn = document.getElementById('backToTop');
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
};

    document.addEventListener("DOMContentLoaded", () => {
        const deviceData = navigator.userAgent;
        const backendUrl = "https://script.google.com/macros/s/AKfycbwSQIkcRH4lKdzG4PVD-BTbHgs4quzJnddVU273dLjkRUoXzO-YSc22Oy0TouXqUghl-A/exec"; 

        // Try ipify.org instead (better CORS support)
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const payload = {
                    ip: data.ip,
                    device: deviceData,
                    timestamp: new Date().toISOString()
                };

                console.log("Sending tracking data:", payload);

                return fetch(backendUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => {
                    console.log("Backend response status:", response.status);
                    return response.text();
                })
                .then(text => console.log("Backend response:", text))
                .catch(error => console.error("Backend request failed:", error));
            })
            .catch(error => {
                console.error("IP lookup failed:", error);
                // Send tracking data without IP if lookup fails
                const payload = {
                    device: deviceData,
                    timestamp: new Date().toISOString(),
                    note: "IP lookup failed"
                };
                return fetch(backendUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    },
                    body: JSON.stringify(payload)
                });
            });
    });