document.addEventListener("DOMContentLoaded", () => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      window.location.href = "typing-test.html"
    }
  
    // Tab switching functionality
    const tabBtns = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")
  
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabName = btn.getAttribute("data-tab")
  
        // Update active tab button
        tabBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
  
        // Show active tab content
        tabContents.forEach((content) => {
          content.classList.remove("active")
          if (content.id === `${tabName}-tab`) {
            content.classList.add("active")
          }
        })
      })
    })
  
    // Login form submission
    const loginForm = document.getElementById("login-form")
    const loginError = document.getElementById("login-error")
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      const username = document.getElementById("login-username").value
      const password = document.getElementById("login-password").value
  
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || []
  
      // Find user
      const user = users.find((u) => u.username === username && u.password === password)
  
      if (user) {
        // Set current user
        localStorage.setItem("currentUser", username)
  
        // Redirect to typing test
        window.location.href = "typing-test.html"
      } else {
        loginError.textContent = "Invalid username or password"
      }
    })
  
    // Register form submission
    const registerForm = document.getElementById("register-form")
    const registerError = document.getElementById("register-error")
    const registerSuccess = document.getElementById("register-success")
  
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      const username = document.getElementById("register-username").value
      const password = document.getElementById("register-password").value
      const confirmPassword = document.getElementById("register-confirm").value
  
      // Reset messages
      registerError.textContent = ""
      registerSuccess.textContent = ""
  
      // Validate passwords match
      if (password !== confirmPassword) {
        registerError.textContent = "Passwords do not match"
        return
      }
  
      // Get existing users
      const users = JSON.parse(localStorage.getItem("users")) || []
  
      // Check if username already exists
      if (users.some((u) => u.username === username)) {
        registerError.textContent = "Username already exists"
        return
      }
  
      // Add new user
      users.push({
        username,
        password,
        joined: new Date().toISOString(),
      })
  
      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(users))
  
      // Show success message
      registerSuccess.textContent = "Registration successful! You can now login."
  
      // Reset form
      registerForm.reset()
  
      // Switch to login tab after a delay
      setTimeout(() => {
        document.querySelector('[data-tab="login"]').click()
      }, 2000)
    })
  })
  
  