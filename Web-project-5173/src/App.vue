<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="header-content">
      <h1 class="title">Library Booking System</h1>
      <nav>
        <RouterLink class="nav-link" to="/">Room Status</RouterLink>
        <RouterLink class="nav-link" to="/about">login</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #FFF; /* Assuming your header has a white background */
  z-index: 10; /* Ensure the header is above other content */
  /* Other header styles ... */
}


.header-content {
  display: flex;
  justify-content: space-between; /* Space between title and nav links */
  align-items: center; /* Vertically center items */
  max-width: 1200px; /* Max width for the content */
  margin: 0 auto; /* Centering the content */
}

.title {
  font-size: 1.5rem; /* Larger font size for the title */
  color: #333; /* Darker color for the title */
  margin: 0; /* Remove default margin */
}

.nav-link {
  padding: 0.5rem 1rem; /* Padding for clickable area */
  color: #333; /* Color consistent with the title */
  text-decoration: none; /* Remove underline */
  transition: color 0.3s; /* Smooth transition for hover effect */
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: #007bff; /* Highlight color on hover and active state */
}

main {
  padding-top: 4rem; /* Add top padding to avoid overlap with header */
  padding: 1rem; /* Padding around the main content */
}

@media (min-width: 768px) {
  .header-content {
    justify-content: start; /* Align content to the start */
  }

  .nav-link {
    margin-left: 2rem; /* Create space between navigation links */
  }

  main {
    padding-top: 5rem; /* Increase top padding for larger screens */
    padding: 2rem; /* Increased padding around the main content */
  }
}
</style>