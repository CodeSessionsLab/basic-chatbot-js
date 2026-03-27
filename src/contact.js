import './css/style.css';

// Contenido en main
const rootElement = document.querySelector('main');

const contactContainer = document.createElement('div');
contactContainer.className = 'contact-container';

const sectionCodespace = document.createElement('div');

const contact1 = document.createElement('p');
const contact2 = document.createElement('p');
const contact3 = document.createElement('p');

contact1.innerHTML = 'info@codespaceacademy.com';
contact2.innerHTML = '+34 682 827 017';
contact3.innerHTML = 'C. Sigfrido, 1, Planta 2, Local 7, 29006 Málaga';

sectionCodespace.appendChild(contact1);
sectionCodespace.appendChild(contact2);
sectionCodespace.appendChild(contact3);
contactContainer.appendChild(sectionCodespace);

rootElement.appendChild(contactContainer);
