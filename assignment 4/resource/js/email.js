const bookBtn = document.getElementById("book-btn");
const messageEl = document.getElementById("booking-message");

bookBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const total = totalDisplay.textContent;

  if (cart.length === 0) {
    alert("Please add at least one service before booking.");
    return;
  }
  if (!name || !email || !phone) {
    alert("Please fill all booking details.");
    return;
  }

  const serviceList = cart.map(item => `${item.name} - ₹${item.price}`).join("\n");

  emailjs.send("service_os1pkgd", "template_arqj3q6", {
      to_name: name,
      to_email: email,
      phone_number: phone,
      services_booked: serviceList,
      total_amount: total,
  })
  .then((response) => {
      console.log("✅ Email sent!", response);
      messageEl.style.display = "block";
      messageEl.textContent = "Thank you for booking the service! We will get back to you soon.";
      document.querySelector("form").reset();
      cart = [];
      updateCartTable();
  })
  .catch((error) => {
      console.error("❌ EmailJS error:", error);
      alert("Something went wrong: " + error.text);
  });
});
