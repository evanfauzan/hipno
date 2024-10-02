// ... kode sebelumnya ...

// Fungsi untuk menampilkan pesan peringatan
function tampilkanPeringatan(pesan) {
    alert(pesan);
}

// Mencegah klik kanan
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    tampilkanPeringatan("Klik kanan dinonaktifkan pada halaman ini.");
});

// Mencegah penggunaan F12 dan shortcut keyboard lainnya
document.addEventListener('keydown', function(e) {
    // Mencegah F12
    if(e.key == 'F12' || e.keyCode == 123) {
        e.preventDefault();
        tampilkanPeringatan("Penggunaan F12 dinonaktifkan pada halaman ini.");
        return false;
    }
    // Mencegah Ctrl+Shift+I (Chrome DevTools)
    if(e.ctrlKey && e.shiftKey && (e.key == 'I' || e.keyCode == 73)) {
        e.preventDefault();
        tampilkanPeringatan("Penggunaan Ctrl+Shift+I dinonaktifkan pada halaman ini.");
        return false;
    }
    // Mencegah Ctrl+U (View Source)
    if(e.ctrlKey && (e.key == 'U' || e.keyCode == 85)) {
        e.preventDefault();
        tampilkanPeringatan("Penggunaan Ctrl+U dinonaktifkan pada halaman ini.");
        return false;
    }
    // Mencegah Ctrl+C (Copy)
    if(e.ctrlKey && (e.key == 'C' || e.keyCode == 67)) {
        e.preventDefault();
        tampilkanPeringatan("Penyalinan konten dinonaktifkan pada halaman ini.");
        return false;
    }
    // Mencegah Ctrl+V (Paste)
    if(e.ctrlKey && (e.key == 'V' || e.keyCode == 86)) {
        e.preventDefault();
        tampilkanPeringatan("Penempelan konten dinonaktifkan pada halaman ini.");
        return false;
    }
});

// Mencegah copy
document.addEventListener('copy', function(e) {
    e.preventDefault();
    tampilkanPeringatan("Penyalinan konten dinonaktifkan pada halaman ini.");
    return false;
});

// Mencegah paste
document.addEventListener('paste', function(e) {
    e.preventDefault();
    tampilkanPeringatan("Penempelan konten dinonaktifkan pada halaman ini.");
    return false;
});

// Mencegah pemilihan teks
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    tampilkanPeringatan("Pemilihan teks dinonaktifkan pada halaman ini.");
    return false;
});

// Mencegah drag and drop
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    tampilkanPeringatan("Drag and drop dinonaktifkan pada halaman ini.");
    return false;
});

// Menonaktifkan developer tools menggunakan interval
setInterval(function() {
    if(window.devtools.isOpen) {
        window.location.href = "about:blank";
    }
}, 1000);

// Mendeteksi jika developer tools dibuka
(function() {
    var devtools = {
        isOpen: false,
        orientation: undefined
    };
    var threshold = 160;
    var emitEvent = function(isOpen, orientation) {
        window.dispatchEvent(new CustomEvent('devtoolschange', {
            detail: {
                isOpen: isOpen,
                orientation: orientation
            }
        }));
    };

    setInterval(function() {
        var widthThreshold = window.outerWidth - window.innerWidth > threshold;
        var heightThreshold = window.outerHeight - window.innerHeight > threshold;
        var orientation = widthThreshold ? 'vertical' : 'horizontal';

        if (!(heightThreshold && widthThreshold) &&
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
            if (!devtools.isOpen || devtools.orientation !== orientation) {
                emitEvent(true, orientation);
            }
            devtools.isOpen = true;
            devtools.orientation = orientation;
        } else {
            if (devtools.isOpen) {
                emitEvent(false, undefined);
            }
            devtools.isOpen = false;
            devtools.orientation = undefined;
        }
    }, 500);

    window.devtools = devtools;
})();

// ... kode selanjutnya ...
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
