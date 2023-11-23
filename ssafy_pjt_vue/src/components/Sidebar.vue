<template>
    <div class="container">
        <div class="sidebar">
        <h2>Sidebar</h2>
        <ul>
            <li v-for="link in links" :key="link.id">
            <a :href="link.url">{{ link.text }}</a>
            </li>
        </ul>
        </div>
    </div>
</template>

<script setup>
const links= [
        { id: 1, text: 'Link 1', url: '#' },
        { id: 2, text: 'Link 2', url: '#' },
        { id: 3, text: 'Link 3', url: '#' },
]
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}

.sidebar {
  width: 100px;
  background-color: rgba(244, 244, 244, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  margin-top: 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.sidebar a:hover {
  color: #007bff;
}
</style>