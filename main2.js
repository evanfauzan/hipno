function toggleNav() {
    var navList = document.getElementById('nav-list');
    if (navList.classList.contains('active')) {
        navList.classList.remove('active');
    } else {
        navList.classList.add('active');
    }
}
// ... kode sebelumnya ...

// Fungsi untuk membuka popup
function openPopup(src) {
    document.getElementById('popup-img').src = src;
    document.getElementById('popup').style.display = 'flex';
}

// Fungsi untuk menutup popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Pilih semua elemen biography-section
const biographySections = document.querySelectorAll('.biography-section');

// Tambahkan event listener ke window scroll
window.addEventListener('scroll', () => {
  const windowScrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  // Periksa setiap biography-section
  biographySections.forEach((section, index) => {
    const sectionOffsetTop = section.offsetTop;
    const biographyImage = section.querySelector('.biography-image');
    const biographyText = section.querySelector('.biography-text');

    // Periksa apakah section berada dalam tampilan
    if (windowScrollY > sectionOffsetTop - windowHeight / 2) {
      // Tambahkan kelas active ke elemen-elemen
      section.classList.add('active');
      biographyImage?.classList.add('active');
      biographyText?.classList.add('active');

      // Tambahkan event listener klik untuk biography-section kedua
      if (index === 1 && biographyImage) {
        biographyImage.style.cursor = 'pointer';
        biographyImage.onclick = function() {
          const imgSrc = this.querySelector('img').src;
          openPopup(imgSrc);
        };
      }
    } else {
      // Hapus kelas active dari elemen-elemen
      section.classList.remove('active');
      biographyImage?.classList.remove('active');
      biographyText?.classList.remove('active');
    }
  });
});

// ... kode selanjutnya ...
const popupVideoBtn = document.querySelector('.popup-video-btn');
const popupVideoContainer = document.querySelector('.popup-video-container');
const closePopupVideoBtn = document.querySelector('.close-popup-video-btn');

popupVideoBtn.addEventListener('click', () => {
  popupVideoContainer.style.display = 'block';
  popupVideoContainer.style.visibility = 'visible';
  popupVideoContainer.style.opacity = 1;
});

closePopupVideoBtn.addEventListener('click', () => {
  popupVideoContainer.style.display = 'none';
  popupVideoContainer.style.visibility = 'hidden';
  popupVideoContainer.style.opacity = 0;
});
function openPopup(src) {
    document.getElementById('popup-img').src = src;
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
function daftar(kursus) {
    alert(`Anda telah memilih untuk mendaftar ${kursus}.`);
}
const listaVideo = [
    { url: 'https://www.youtube.com/embed/Orw-CfTnz60', descrizione: 'Descrizione del video 1' },
    { url: 'https://www.youtube.com/embed/CyPK6wLYZG4', descrizione: 'Descrizione del video 2' },
    { url: 'https://www.youtube.com/embed/VIDEO_ID_3', descrizione: 'Descrizione del video 3' }
];

let indiceVideoCorrente = 0;

function mostraPopup(url, descrizione) {
    videoAttualeIndex = videos.findIndex(video => video.url === url);
    document.getElementById('popup-iframe').src = url;
    document.getElementById('popup-descrizione').textContent = descrizione;
    document.getElementById('popup-modale').style.display = 'block';
}

function chiudiPopup() {
    document.getElementById('popup-iframe').src = '';
    document.getElementById('popup-modale').style.display = 'none';
}

function videoPrecedente() {
    videoAttualeIndex = (videoAttualeIndex - 1 + videos.length) % videos.length;
    const video = videos[videoAttualeIndex];
    mostraPopup(video.url, video.descrizione);
}

function videoSuccessivo() {
    if (indiceVideoCorrente < listaVideo.length - 1) {
        indiceVideoCorrente++;
        const currentVideo = listaVideo[indiceVideoCorrente];
        mostraPopup(currentVideo.url, currentVideo.descrizione);
    }
}

function handleParallax() {
  const parallaxContainer = document.querySelector('.parallax-container');
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const containerRect = parallaxContainer.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    const containerBottom = containerTop + containerRect.height;

    if (scrollTop >= containerTop && scrollTop <= containerBottom) {
      const relativeScroll = scrollTop - containerTop;
      parallaxLayers.forEach((layer, index) => {
        const speed = index === 0 ? 0.5 : 0.2;
        const yOffset = relativeScroll * speed;
        layer.style.transform = `translateY(${yOffset}px)`;
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', handleParallax);
function openAdvancedPopup(videoId) {
  document.getElementById('kursus-advanced-iframe').src = `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`;
  document.getElementById('kursus-advanced-popup').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeAdvancedPopup() {
  document.getElementById('kursus-advanced-iframe').src = '';
  document.getElementById('kursus-advanced-popup').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Tutup popup jika mengklik di luar konten
document.getElementById('kursus-advanced-popup').addEventListener('click', function(event) {
  if (event.target === this) {
    closeAdvancedPopup();
  }
});

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function handleScroll() {
  var biographySection = document.querySelector('.biography-section');
  var biographyImage = document.querySelector('.biography-image');
  var biographyText = document.querySelector('.biography-text');

  if (isElementInViewport(biographySection)) {
    biographySection.classList.add('active');
    biographyImage.classList.add('active');
    biographyText.classList.add('active');
  }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

function startDownload(event) {
  event.preventDefault();
  const btn = document.getElementById('downloadBtn');
  
  if (btn.classList.contains('downloaded')) {
    return;
  }
  
  btn.classList.add('downloading');
  
  setTimeout(() => {
    btn.classList.remove('downloading');
    btn.classList.add('downloaded');
    btn.querySelector('.btn-text').textContent = 'TERUNDUH';
    
    // Mulai unduhan sebenarnya
    window.location.href = btn.href;
  }, 3000);
}
