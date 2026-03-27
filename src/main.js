import './css/style.css';

// Contenido en main
const rootElement = document.querySelector('main');

const infoContainer = document.createElement('div');
infoContainer.className = 'info-container';

const sectionCodespace = document.createElement('div');

const info1 = document.createElement('p');
const info2 = document.createElement('p');

info1.innerHTML =
  "CODE SPACE es la escuela tecnológica que impulsa la transformación digital de <span class='bold'>empresas y profesionales</span>.";
info2.innerHTML =
  "Diseñamos <span class='bold'>formación a medida</span> para <span class='bold'>equipos</span> y ofrecemos programas en Desarrollo Web Full Stack, Ciberseguridad, Data Science, Inteligencia Artificial, Front End y UX/UI.";

const imgElement = document.createElement('img');
imgElement.src =
  'https://codespaceacademy.com/wp-content/uploads/2024/05/escuela-tecnologica.webp';
imgElement.className = 'img-codespace';

sectionCodespace.appendChild(info1);
sectionCodespace.appendChild(info2);
infoContainer.appendChild(sectionCodespace);

rootElement.appendChild(infoContainer);
rootElement.appendChild(imgElement);
