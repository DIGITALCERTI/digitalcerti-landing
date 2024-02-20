/* empty css                                      */
import { e as createAstro, f as createComponent, r as renderTemplate, k as renderComponent, m as maybeRenderHead, h as addAttribute } from '../astro_OSQ-nX93.mjs';
import { $ as $$HeadOnlyLogo, b as $$Image, a as $$Layout } from './acerca_de_digital_JJxjzc0L.mjs';

const FrequentQuestions = new Proxy({"src":"/_astro/questions.CieYuemZ.png","width":500,"height":500,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/questions.png";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro();
const $$PreguntasFrecuentes = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PreguntasFrecuentes;
  const Questions = [
    {
      id: 1,
      question: "\xBFC\xF3mo puedo crear un nuevo certificado en el sistema?",
      answer: 'Para crear un nuevo certificado, inicia sesi\xF3n en tu cuenta y ve a la secci\xF3n de "Creaci\xF3n de Certificados". Llena los detalles requeridos y sigue las instrucciones para generar un certificado.'
    },
    {
      id: 2,
      question: "\xBFC\xF3mo inicio sesi\xF3n en el sistema?",
      answer: 'Visita la p\xE1gina de inicio de sesi\xF3n https://go.digitalcerti.com/admin/. Ingresa tu nombre de usuario y contrase\xF1a, luego haz clic en "Iniciar Sesi\xF3n"'
    },
    {
      id: 3,
      question: "\xBFC\xF3mo cambio mi informaci\xF3n personal en el sistema?",
      answer: 'En el panel de usuario, encuentra la opci\xF3n "Configuraci\xF3n de Cuenta". All\xED podr\xE1s editar tu informaci\xF3n personal como nombre, direcci\xF3n de correo electr\xF3nico, etc.'
    },
    {
      id: 4,
      question: "\xBFC\xF3mo crear un nuevo usuario en el sistema?",
      answer: 'En el panel de administraci\xF3n, busca la secci\xF3n de "Gesti\xF3n de Usuarios" o similar. Deber\xEDas encontrar opciones para agregar un nuevo usuario y asignarle roles.'
    },
    {
      id: 5,
      question: "\xBFC\xF3mo contacto con el soporte t\xE9cnico si tengo problemas?",
      answer: 'Encuentra la secci\xF3n de "Soporte T\xE9cnico" en el men\xFA o en la p\xE1gina de inicio. All\xED deber\xEDas tener informaci\xF3n de contacto, como un correo electr\xF3nico o n\xFAmero de tel\xE9fono.'
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Digitalcerti" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadOnlyLogo", $$HeadOnlyLogo, {})} ${maybeRenderHead()}<div class="bg-gradient-to-r from-primary-500 to-primary-800 p-20"> <h1 class="  font-semibold text-center text-4xl text-slate-100">Preguntas frecuentes</h1> </div> <div class="container flex  items-center justify-between flex-wrap"> ${renderComponent($$result2, "Image", $$Image, { "src": FrequentQuestions, "alt": "preuntas_frecuentes", "loading": "lazy", "class": "hidden lg:block w-[400px] " })} <div class="lg:w-[50%]"> ${Questions.map((el) => renderTemplate`<div class="mb-4 cursor-pointer questionItem"${addAttribute(`question_${el.id}`, "data-question")}> <div class="flex items-center gap-2 mb-2 pointer-events-none"> <i class="fa-solid fa-plus text-slate-800 "${addAttribute(`icon_question_${el.id}`, "id")}></i> <p class="text-lg font-bold text-slate-800">${el.question}</p> </div> <p class="text-slate-600  transition-all max-h-0 overflow-hidden" data-open="0"${addAttribute(`question_${el.id}`, "data-answer")}>${el.answer}</p> </div>`)} </div> </div> ` })} `;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/preguntas_frecuentes.astro", void 0);

const $$file = "/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/preguntas_frecuentes.astro";
const $$url = "/preguntas_frecuentes";

export { $$PreguntasFrecuentes as default, $$file as file, $$url as url };
