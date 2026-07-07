const loader = document.getElementById("loader");
const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const story = document.getElementById("story");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const bgVideo = document.getElementById("bgVideo");
const particles = document.getElementById("particles");

let musicPlaying = false;

/* ===========================
   PANTALLA DE CARGA
=========================== */

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 2800);
});

/* ===========================
   BOTÓN DE INICIO
=========================== */

startBtn.addEventListener("click", async () => {
  welcome.style.opacity = "0";
  welcome.style.transition = "1.2s ease";

  setTimeout(() => {
    welcome.style.display = "none";
    story.classList.add("show");
    musicBtn.classList.add("show");
    document.body.style.overflowY = "auto";

    aparecerParrafos();
    aparecerFinal();
  }, 1200);

  try {
    music.volume = 0;
    await music.play();
    musicPlaying = true;
    musicBtn.innerHTML = "⏸️";
    fadeInMusic();
  } catch (error) {
    console.log("La música necesita interacción del usuario.");
  }

  try {
    bgVideo.play();
  } catch (error) {
    console.log("El video no pudo reproducirse automáticamente.");
  }
});

/* ===========================
   BOTÓN DE MÚSICA
=========================== */

musicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    musicBtn.innerHTML = "🎵";
  } else {
    music.play();
    musicPlaying = true;
    musicBtn.innerHTML = "⏸️";
  }
});

/* ===========================
   FADE IN DE MÚSICA
=========================== */

function fadeInMusic() {
  let volume = 0;

  const interval = setInterval(() => {
    if (volume < 0.42) {
      volume += 0.02;
      music.volume = volume;
    } else {
      clearInterval(interval);
    }
  }, 250);
}

/* ===========================
   CARTA APARECE SUAVEMENTE
=========================== */

function aparecerParrafos() {
  const parrafos = document.querySelectorAll(".letter p");

  parrafos.forEach((parrafo, index) => {
    setTimeout(() => {
      parrafo.classList.add("visible");
    }, index * 1800);
  });
}

/* ===========================
   FINAL CINEMATOGRÁFICO
=========================== */

function aparecerFinal() {
  const finalLines = document.querySelectorAll(".final-line");

  finalLines.forEach((linea, index) => {
    setTimeout(() => {
      linea.classList.add("visible");
    }, 18000 + index * 1800);
  });
}

/* ===========================
   CORAZONES FLOTANDO
=========================== */

function crearCorazon() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-40px";
  heart.style.fontSize = 14 + Math.random() * 24 + "px";
  heart.style.opacity = 0.35 + Math.random() * 0.65;

  document.body.appendChild(heart);

  const duracion = 5000 + Math.random() * 4000;

  heart.animate(
    [
      {
        transform: "translateY(0) rotate(0deg)",
        opacity: heart.style.opacity
      },
      {
        transform: `translateY(-110vh) rotate(${Math.random() * 360}deg)`,
        opacity: 0
      }
    ],
    {
      duration: duracion,
      easing: "linear"
    }
  );

  setTimeout(() => {
    heart.remove();
  }, duracion);
}

/* ===========================
   PÉTALOS DE ROSA
=========================== */

function crearPetalo() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  petal.style.left = Math.random() * 100 + "vw";
  petal.style.top = "-30px";
  petal.style.transform = `rotate(${Math.random() * 360}deg)`;
  petal.style.opacity = 0.35 + Math.random() * 0.5;

  document.body.appendChild(petal);

  const duracion = 7000 + Math.random() * 5000;
  const movimientoX = -80 + Math.random() * 160;

  petal.animate(
    [
      {
        transform: "translate(0, 0) rotate(0deg)"
      },
      {
        transform: `translate(${movimientoX}px, 110vh) rotate(${360 + Math.random() * 360}deg)`
      }
    ],
    {
      duration: duracion,
      easing: "linear"
    }
  );

  setTimeout(() => {
    petal.remove();
  }, duracion);
}

/* ===========================
   ESTRELLAS
=========================== */

function crearEstrella() {
  const star = document.createElement("div");
  star.classList.add("star");

  star.style.left = Math.random() * 100 + "vw";
  star.style.top = Math.random() * 100 + "vh";
  star.style.opacity = Math.random();

  particles.appendChild(star);

  const duracion = 1800 + Math.random() * 2200;

  star.animate(
    [
      {
        opacity: 0,
        transform: "scale(0)"
      },
      {
        opacity: 1,
        transform: "scale(1.2)"
      },
      {
        opacity: 0,
        transform: "scale(0)"
      }
    ],
    {
      duration: duracion,
      easing: "ease-in-out"
    }
  );

  setTimeout(() => {
    star.remove();
  }, duracion);
}

/* ===========================
   GENERADORES
=========================== */

setInterval(crearCorazon, 900);
setInterval(crearPetalo, 1200);
setInterval(crearEstrella, 220);

/* ===========================
   EFECTO AL TOCAR LA PANTALLA
=========================== */

document.addEventListener("click", (e) => {
  const sparkle = document.createElement("div");
  sparkle.classList.add("star");

  sparkle.style.left = e.clientX + "px";
  sparkle.style.top = e.clientY + "px";
  sparkle.style.width = "6px";
  sparkle.style.height = "6px";

  document.body.appendChild(sparkle);

  sparkle.animate(
    [
      {
        opacity: 1,
        transform: "scale(1)"
      },
      {
        opacity: 0,
        transform: "scale(4)"
      }
    ],
    {
      duration: 900,
      easing: "ease-out"
    }
  );

  setTimeout(() => {
    sparkle.remove();
  }, 900);
});
