// Contenido y flujo de datos para el bot
export const menuAcademia = {
  start: {
    text: `¡Hola! Soy el asistente de la academia.
      Elige una opción:

      1) Cursos y niveles
      2) Horarios
      3) Próximas convocatorias
      4) Datos de contacto
      5) Quiero que me llamen

      Escribe un número (1-5)`,
    next: {
      1: "cursos",
      2: "horarios",
      3: "convocatorias",
      4: "contacto",
      5: "humano",
    },
  },

  exit: {
    text: "Escribe 0 para volver al menú."
  },

  cursos: {
    text: `Cursos y niveles:
      1) FrontEnd (HTML/CSS/JS/ReactJS)
      2) Backend (Node/Express)
      3) Bases de datos (MySQL,MongoDB)
      4) Ruta completa Full-Stack
      5) A medida

      Escribe un número (1-5) o 0 para volver al menú.`,
  },

  horarios: {
    text: `Horarios:
      • Presencial: 09:00-14:00
      • Stream: 15:00-18:00
      • ATR: Full time
      (Se puede adaptar según grupo)

      Escribe 0 para volver al menú.`,
  },

  convocatorias: {
    text: `Próximas convocatorias:
      • Presenciales: Según publicaciones
      • Stream/ATR: 4 convocatorias anuales

      Escribe 0 para volver al menú.`,
  },

  contacto: {
    text: `Contacto:
      • Email: info@codespaceacademy.com
      • WhatsApp: +34 682 827 017
      • Ubicación: C. Sigfrido, 1, Planta 2, Local 7, 29006 Málaga

      Escribe 0 para volver al menú.`,
  },

  humano: {
    text: `Perfecto.  Déjame tu nombre y un medio de contacto (email o WhatsApp) y te contactaremos.`,
    expects: "lead",
  },
};