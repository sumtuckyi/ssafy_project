<!-- Footer.vue -->
<template>
    <footer>
      <div class="footer-content">
        <p>&copy; 2023 BankMATE. All rights reserved.</p>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>
</template>
  
<script>

</script>

<style scoped>
footer {
background-color: #1B4DFE;
color: #fff;
padding: 20px 0;
text-align: center;
z-index: 9000;

}

.footer-content {
display: flex;
justify-content: space-between;
max-width: 800px;
margin: 0 auto;
}

nav ul {
list-style: none;
padding: 0;
margin: 0;
display: flex;
}

nav li {
margin-right: 20px;
}

nav a {
color: #fff;
text-decoration: none;
}
</style>
