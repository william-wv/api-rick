<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    const isMobile = ref(window.innerWidth < 768);
    const isMenuOpen = ref(false);

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth < 768;
      if (!isMobile.value) {
        isMenuOpen.value = false; // Fecha o menu ao mudar para desktop
      }
    };

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    onMounted(() => {
      window.addEventListener("resize", checkScreenSize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkScreenSize);
    });

    return { isMobile, isMenuOpen, toggleMenu, closeMenu };
  },
};
</script>

<template>
  <header class="header">
    <div class="container-header">
      <img src="/src/components/icons/logo.png" alt="Logo" class="logo">

      <!-- Botão Hamburguer (aparece apenas no mobile) -->
      <button v-if="isMobile" class="menu-btn" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
      </button>

      <!-- Menu de Navegação -->
      <nav :class="{ open: isMenuOpen || !isMobile }" class="nav">
        <ul class="nav-links">
          <li @click="closeMenu">
            <router-link to="/">
              Home
            </router-link>
          </li>
          <li @click="closeMenu">
            <router-link to="/character">
              Personagens
            </router-link>
          </li>
          <li @click="closeMenu"> 
            <router-link to="/location">
              Localizações
            </router-link>
          </li>
          <li @click="closeMenu"><a href="#">Episódios</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--Brown);
  margin-bottom: 25px !important;
  padding: 0 40px !important;
}

.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Menu de Navegação */
.nav {
  display: flex;
}

.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
}

.nav-links li {
  font-size: 1.2rem;
}

.nav-links a {
  text-decoration: none;
  color: white;
}

.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.menu-btn span {
  display: block;
  width: 30px;
  height: 4px;
  background: white;
  transition: 0.3s;
}

.menu-btn span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-btn span.open:nth-child(2) {
  opacity: 0;
}

.menu-btn span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 767px) {
  .nav {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background: var(--Brown);
    flex-direction: column;
    align-items: center;
    display: none;
  }

  .nav.open {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    text-align: center;
    padding: 20px 0;
  }
}
</style>
