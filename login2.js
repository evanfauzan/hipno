let isLoggedIn = false;

// Menyimpan pengguna dan kata sandi dengan hashing (simulasi)
const users = {
  advance: 'jiwahipnotis', // Hash: e.g., hash('jiwahipnotis')
  master: 'bertanggungjawab', // Hash: e.g., hash('bertanggungjawab')
  instruktur: 'menjaditeladan' // Hash: e.g., hash('menjaditeladan')
};

// Menunjukkan popup login
function showLoginPopup() {
  document.getElementById('loginPopup').style.display = 'block';
}

// Menutup popup login
function closeLoginPopup() {
  document.getElementById('loginPopup').style.display = 'none';
}

// Fungsi login
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!validateInput(username, password)) {
    alert('Username dan password tidak boleh kosong.');
    return;
  }

  const accessLevel = authenticateUser(username, password);
  if (accessLevel === null) {
    alert('Username atau password yang Anda masukkan salah');
    return;
  }

  isLoggedIn = true;
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('accessLevel', accessLevel.toString());
  closeLoginPopup();
  updateLoginStatus();
  unlockVideos();
}

// Autentikasi pengguna
function authenticateUser(username, password) {
  if (users[username] && users[username] === password) {
    return Object.keys(users).indexOf(username) + 1; // 1-based access level
  }
  return null;
}

// Validasi input
function validateInput(username, password) {
  return username !== '' && password !== '';
}

// Logout pengguna
function logout() {
  isLoggedIn = false;
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('accessLevel');
  updateLoginStatus();
  lockVideos();
}

// Memperbarui status login
function updateLoginStatus() {
  const loginButton = document.getElementById('loginButton');
  const logoutButton = document.getElementById('logoutButton');

  if (isLoggedIn) {
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
  } else {
    loginButton.style.display = 'block';
    logoutButton.style.display = 'none';
  }
}

// Mengunci video berdasarkan level akses
function unlockVideos() {
  const accessLevel = parseInt(localStorage.getItem('accessLevel')) || 0;
  const currentPage = window.location.pathname.split('/').pop();
  const videoContainer = document.querySelector('.kursus-advanced__video-container');

  if (!videoContainer) return;

  const videos = videoContainer.querySelectorAll('.kursus-advanced__video-item');
  videos.forEach((video, index) => {
    if (index === 0) {
      video.classList.remove('kursus-advanced__video-item--locked');
    } else {
      if (
        (currentPage === 'Kursus-Advance.html' && accessLevel >= 1) ||
        (currentPage === 'Kursus-Master.html' && accessLevel >= 2) ||
        (currentPage === 'Kursus-Instruktur.html' && accessLevel >= 3)
      ) {
        video.classList.remove('kursus-advanced__video-item--locked');
      } else {
        video.classList.add('kursus-advanced__video-item--locked');
      }
    }
  });
}

// Mengunci video
function lockVideos() {
  const videos = document.querySelectorAll('.kursus-advanced__video-item:not(:first-child)');
  videos.forEach(video => {
    video.classList.add('kursus-advanced__video-item--locked');
  });
}

// Memeriksa login dan membuka video
function checkLoginAndOpenVideo(videoId) {
  if (isLoggedIn) {
    openAdvancedPopup(videoId);
  } else {
    alert('Silakan login terlebih dahulu untuk mengakses video ini.');
    showLoginPopup();
  }
}

// Inisialisasi status login
function initializeLoginStatus() {
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  updateLoginStatus();
  if (isLoggedIn) {
    unlockVideos();
  } else {
    lockVideos();
  }
}

// Mendengarkan event submit pada form login
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  login();
});

// Panggil initializeLoginStatus saat halaman dimuat
document.addEventListener('DOMContentLoaded', initializeLoginStatus);
