import { guardarArchivo } from '../utils/utils';
import { menuAcademia as menu } from './dataWidget';

// Variable de estado para saber en que punto de la conversación estamos
let state = 'start';
let viewed = false;

// Funcion para verificar, acorde a la interacción del usuario, que debemos mostrar o contestar.
function getBotReply(input) {
  // Eliminamos espacios anteriores o posteriores
  const msg = input.trim();

  // Volver al menú principal
  if (msg === '0') {
    state = 'start';
    viewed = false;
    // Obtenemos del menu el texto inicial y lo mostramos
    return menu.start.text;
  }

  // Si en el estado se espera algo específico (tiene expects como propiedad)
  // El expect contiene la parte de prueba de contactar
  if (menu[state]?.expects === 'lead') {
    // Aquí se envía el lead al backend.
    // Test para simplemente guardar en descarga para testeo
    if (msg.length < 10) {
      return `Necesito que el mensaje sea más largo.`;
    }
    const message =
      'Aquí se daría una llamada a una Api para enviar este mensaje:\n' + msg;
    guardarArchivo(message, 'contactosChatBot', 'md');
    if (msg.length >= 10) {
      state = 'start';
      return `¡Gracias! Hemos recibido tu mensaje. "${msg}".\n\nEn breve le contactaremos.\n\n${menu.exit.text}`;
    }
  }

  // Para de la navagación por el menú del chatBot

  // Verificamos si es salida desde la principal y si el usuario ha escrito algo valido existente en nuestro menu inicial
  if (state === 'start' && menu.start.next[msg]) {
    state = menu.start.next[msg];
    return menu[state].text;
  }

  // Sub-menús dentro de "cursos"
  if (state === 'cursos') {
    const courses = {
      1: 'FrontEnd (HTML/CSS/JS): Para empezar desde cero y dominar fundamentos + DOM + proyectos.',
      2: 'Backend (Node/Express): APIs REST, auth JWT, seguridad, despliegue.',
      3: 'BBDD (MySQL,MongoDB): modelos, relaciones, claves',
      4: 'Full-Stack: ruta completa front/back con proyecto real.',
      5: 'Cursos a medida',
    };
    if (courses[msg] && !viewed) {
      viewed = true;
      return `${courses[msg]}\n\nEscribe 0 para volver al menú.`;
    }
    if (viewed) {
      return 'Escribe 0 para volver al menú.';
    } else {
      return 'Elige un número del 1 al 5, o 0 para volver';
    }
  }

  // Control de respuesta simple por palabras clave (por si no usa números)
  const text = msg.toLowerCase();
  if (text.includes('horario')) return menu.horarios.text;
  if (text.includes('menu')) return menu.start.text;
  if (
    text.includes('curso') ||
    text.includes('react') ||
    text.includes('html') ||
    text.includes('js')
  ) {
    return menu.cursos.text;
  }
  if (
    text.includes('contacto') ||
    text.includes('email') ||
    text.includes('whatsapp')
  )
    return menu.contacto.text;

  state = 'start';
  return `No te he entendido\n\n${menu.start.text}`;
}

// ======= UI del widget (botón + panel) =======
const container = document.createElement('div');
container.className = 'cw-container';

const fab = document.createElement('img');
fab.src = '/chatbot.png';
fab.type = 'button';
fab.title = 'Haz click aquí para recibir ayuda';
fab.className = 'cw-fab';

const panel = document.createElement('div');
panel.className = 'cw-panel';

panel.innerHTML = `
    <div class="cw-header">
      <div class="cw-title">
        <strong>Asistente CodeSpace</strong>
        <span>Respuestas rápidas</span>
      </div>
      <button class="cw-close" type="button" aria-label="Cerrar">✕</button>
    </div>

    <div class="cw-messages" role="log" aria-live="polite"></div>

    <div class="cw-footer">
      <input class="cw-input" type="text" placeholder="Escribe un número (1-5)" />
      <button class="cw-send" type="button">Enviar</button>
    </div>
  `;

container.appendChild(panel);
container.appendChild(fab);

// Aquí incorporamos el chatbot a la página (Insertamos al DOM)
document.body.appendChild(container);

const messagesEl = panel.querySelector('.cw-messages');
const inputEl = panel.querySelector('.cw-input');
const sendEl = panel.querySelector('.cw-send');
const closeEl = panel.querySelector('.cw-close');

function addBubble(who, text) {
  const div = document.createElement('div');
  div.className = `cw-bubble ${who === 'bot' ? 'cw-bot' : 'cw-user'}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addBubbleInner(who, text) {
  const div = document.createElement('div');
  div.className = `cw-bubble ${who === 'bot' ? 'cw-bot' : 'cw-user'}`;
  div.innerHTML = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Apertura del chat inyectando nueva clase que lo muestra y ocultando el icono
function openChat() {
  panel.classList.add('open');
  fab.style.display = 'none';
  inputEl.focus();

  // Si es la primera vez, saludo
  if (!messagesEl.hasChildNodes()) {
    addBubble('bot', menu.start.text);
  }
}

// Fucnion apra cerrar el chat y volver al icono del chat
function closeChat() {
  panel.classList.remove('open');
  fab.style.display = 'grid';
  messagesEl.textContent = '';
  // Reseteo chat a inicio
  state = 'start';
}

// fucnión para enviar el mensaje de usuairo y que se le responda acorde a lo escrito
function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  addBubble('user', text);
  inputEl.value = '';

  const reply = getBotReply(text);
  addBubbleInner('bot', reply);
}

fab.addEventListener('click', openChat);
closeEl.addEventListener('click', closeChat);
sendEl.addEventListener('click', sendMessage);
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
  if (e.key === 'Escape') closeChat();
});
