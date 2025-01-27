const domain = "http://localhost:8900";

function togglePasswordVisibility(inputId, button) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    button.textContent = "🙈";
  } else {
    input.type = "password";
    button.textContent = "👁️";
  }
}

document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(email, password);

    try {
        const response = await fetch(`${domain}/user/login`,{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ email, password })
                        });

        if (response.status == 200) {
          const data = await response.json();
          console.log(data);
          window.location.href = "./index.html";
        }else{
            const res = await response.json();
            alert(res.msg);
        }

    } catch (error) {
        alert(error);
    }
  });
