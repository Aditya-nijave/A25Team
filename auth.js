// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      window.location.href = "index.html"
    }
    return currentUser
  }
  
  // Initialize user info
  function initUserInfo() {
    const currentUser = checkAuth()
    const usernameDisplay = document.getElementById("username-display")
    if (usernameDisplay) {
      usernameDisplay.textContent = currentUser
    }
  
    // Setup logout button
    const logoutBtn = document.querySelector(".nav__logout")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser")
        window.location.href = "index.html"
      })
    }
  }
  
  // Export functions
  export { checkAuth, initUserInfo }
  
  