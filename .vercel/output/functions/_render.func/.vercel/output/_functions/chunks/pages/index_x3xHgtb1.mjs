/* empty css                                      */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, k as renderComponent } from '../astro_OSQ-nX93.mjs';
import { b as $$Image, L as LogoWhite, c as $$Footer, a as $$Layout } from './acerca_de_digital_JJxjzc0L.mjs';
import { $ as $$Contact } from './contacto_0XHGh5Ed.mjs';

const $$Astro$5 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Card;
  const { icon, title, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="rounded-3xl	border border-slate-200  shadow-sm p-8 hover:border-primary-500"> <i${addAttribute(`${icon} fa-xl text-primary-500 mb-7`, "class")}></i> <h4 class="text-slate-900 text-lg font-medium mb-4"> ${title} </h4> <p class="text-slate-800 text-sm"> ${description} </p> </div>`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/components/Card.astro", void 0);

const $$Astro$4 = createAstro();
const $$Steps = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Steps;
  const { icon, title, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-5"> <div class="border-2 border-primary-500 h-10 w-10 flex justify-center items-center rounded-full relative "> <i${addAttribute(`${icon} fa-sm text-primary-500 absolute`, "class")}></i> </div> <div> <h4 class="text-slate-900 text-lg font-medium mb-2"> ${title} </h4> <p class="text-slate-800 text-sm w-80"> ${description} </p> </div> </div>`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/components/Steps.astro", void 0);

const $$Astro$3 = createAstro();
const $$Menu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Menu;
  const menuData = [
    {
      name: "Inicio",
      href: "#home"
    },
    {
      name: "Sistema",
      href: "#sistem"
    },
    {
      name: "Clientes",
      href: "#clients"
    },
    {
      name: "Precios",
      href: "#prices"
    },
    {
      name: "Contactos",
      href: "#contact"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-between items-center relative pb-4"> ${renderComponent($$result, "Image", $$Image, { "src": LogoWhite, "alt": "logo", "loading": "lazy" })} <div class="hidden lg:relative lg:flex items-center"> <nav class=""> <ul class="flex space-x-8 text-white font-normal text-lg"> ${menuData.map((el) => renderTemplate`<li><a${addAttribute(el.href, "href")} class="hover:font-semibold  relative before:absolute before:bottom-[-4px] before:w-0 before:h-1 hover:before:w-full before:bg-white before:transition-all ">${el.name}</a></li>`)} </ul> </nav> </div> <div class="lg:flex lg:items-center"> <a href="https://go.digitalcerti.com/admin/" target="_blank" class="w-[8.25rem] h-[2.5rem] hidden bg-primary-500 rounded-full text-white font-medium lg:flex justify-center items-center cursor-pointer hover:bg-primary-600 active:bg-primary-600">
Ingresar
</a> <div class="lg:hidden cursor-pointer" id="menuTrigger"> <i class="fa-solid fa-bars fa-xl text-primary-500 hover:text-white active:text-primary-600"></i> </div> </div> <div class=" absolute w-full bg-white top-full h-[0px] overflow-hidden transition-all" id="menuMovil"> <nav class=""> <ul class="font-normal text-lg text-gray-700"> ${menuData.map((el) => renderTemplate`<li class="p-4  border-b border-solid border-primary-500 "> <a${addAttribute(el.href, "href")} class="hover:font-semibold hover:text-primary-500 relative  ">${el.name}</a> </li>`)} </ul> </nav> </div> </div>  <!-- 164bfad5974b9f9a99e39fa0d9b5bd53-us21 -->`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/components/Menu.astro", void 0);

const Client1 = new Proxy({"src":"/_astro/client1.skVGDvSM.png","width":100,"height":100,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/client1.png";
							}
							
							return target[name];
						}
					});

const Client2 = new Proxy({"src":"/_astro/client2.ErDhBPa6.png","width":384,"height":100,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/client2.png";
							}
							
							return target[name];
						}
					});

const Client3 = new Proxy({"src":"/_astro/client3.AsYKW7D6.png","width":285,"height":100,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/client3.png";
							}
							
							return target[name];
						}
					});

const Client4 = new Proxy({"src":"/_astro/client4.om0_ZxfR.png","width":89,"height":100,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/client4.png";
							}
							
							return target[name];
						}
					});

const Clock = new Proxy({"src":"/_astro/clock.d9JUSXfE.png","width":480,"height":730,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/clock.png";
							}
							
							return target[name];
						}
					});

const ClientImg = new Proxy({"src":"/_astro/client.TMDGhB6b.png","width":325,"height":325,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/client.png";
							}
							
							return target[name];
						}
					});

const $$Astro$2 = createAstro();
const $$Clients = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Clients;
  const { name, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-5 "> ${renderComponent($$result, "Image", $$Image, { "src": ClientImg, "alt": "logo", "loading": "lazy", "width": 250, "height": 250 })} <div class="w-[34rem] flex flex-col justify-center"> <h4 class="text-slate-900 font-normal text-lg mb-6"> ${description} </h4> <p class="text-primary-500 font-normal text-lg"> ${name} </p> </div> </div>`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/components/Clients.astro", void 0);

const ImgGirlNav = new Proxy({"src":"/_astro/img_girl_nav.QrLs87GA.png","width":545,"height":426,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/img_girl_nav.png";
							}
							
							return target[name];
						}
					});

const $$Astro$1 = createAstro();
const $$PricesCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PricesCard;
  return renderTemplate`${maybeRenderHead()}<div class="border-2 border-primary-500 rounded-3xl p-10 w-[25rem]"> <p class="text-3xl font-extrabold text-slate-900 text-center mb-5">Premium desde</p> <p class="text-xl font-light text-center text-slate-900 mb-8">Para instituciones que buscan una gestión eficiente de certificados</p> <p class="text-primary-500 text-6xl font-black text-center">$ 9.99</p> <p class="text-slate-900 text-xl font-medium text-center">por mes</p> <div class="flex flex-col gap-3 mt-14 mb-7"> <div class="flex gap-4 items-center"> <i class="fa-regular fa-circle-check text-primary-500"></i> <p>Panel de administración</p> </div> <div class="flex gap-4 items-center"> <i class="fa-regular fa-circle-check text-primary-500"></i> <p>30 GB almacenamiento</p> </div> <div class="flex gap-4 items-center"> <i class="fa-regular fa-circle-check text-primary-500"></i> <p>Soporte continuo</p> </div> <div class="flex gap-4 items-center"> <i class="fa-regular fa-circle-check text-primary-500"></i> <p>Funciones adicionales</p> </div> </div> <div class="flex justify-center items-center"> <a class="w-[8.25rem] h-[2.5rem] bg-primary-500 rounded-full text-white font-medium flex justify-center items-center cursor-pointer">
Obtener
</a> </div> </div>`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/components/PricesCard.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Digitalcerti" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="h-[40rem] bg-gradient-to-r from-primary-500 to-primary-800 pt-10" id="home"> <section class="m-auto lg:max-w-[75rem] flex  flex-col justify-between h-full pb-3 px-4"> ${renderComponent($$result2, "Menu", $$Menu, {})} <div class="my-0 m-auto lg:flex lg:justify-around"> <div class="mt-14"> <h1 class="text-center text-3xl lg:text-4xl font-extrabold text-white mb-6 w-[30rem]">La solución perfecta para administrar tus certificados</h1> <h3 class="text-center text-xl text-white w-[30rem]">Simplifica y mejora el proceso de gestión de tus certificados con nuestra plataforma innovadora.</h3> </div> <div class="max-w-sm lg:max-w-lg"> ${renderComponent($$result2, "Image", $$Image, { "src": ImgGirlNav, "alt": "logo", "loading": "lazy", "class": "w-full" })} </div> </div> </section> <section class="px-4 lg:max-w-[75rem] m-auto pt-[4.5rem] pb-[5.6rem]" id="sistem"> <h2 class="text-base font-extrabold text-primary-500 text-center my-0	m-auto">Administración eficiente</h2> <h3 class="text-3xl font-bold text-slate-900 text-center my-0	m-auto	mt-2">Gana tiempo y eficiencia con nuestra plataforma</h3> <div class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-4 mt-14"> ${renderComponent($$result2, "Card", $$Card, { "icon": "fa-solid fa-laptop", "title": "Automatizaci\xF3n eficiente", "description": "Simplifica la gesti\xF3n de tus certificados con nuestro sistema automatizado y mejora la eficiencia de tus procesos" })} ${renderComponent($$result2, "Card", $$Card, { "icon": "fa-solid fa-mobile-screen", "title": "Acceso m\xF3vil", "description": "Accede a tus certificados desde cualquier lugar y en cualquier momento gracias a nuestra aplicaci\xF3n m\xF3vil intuitiva" })} ${renderComponent($$result2, "Card", $$Card, { "icon": "fa-solid fa-chart-simple", "title": "Informes y estad\xEDsticas", "description": "Nuestros clientes pueden acceder a informes detallados y estad\xEDsticas en tiempo real para realizar un seguimiento de sus certificados y su rendimiento" })} ${renderComponent($$result2, "Card", $$Card, { "icon": "fa-solid fa-file", "title": "Gesti\xF3n personalizada", "description": "Administra tus certificados de forma personalizada y adapta nuestro sistema a tus necesidades espec\xEDficas" })} ${renderComponent($$result2, "Card", $$Card, { "icon": "fa-solid fa-paperclip", "title": "Integraci\xF3n f\xE1cil", "description": "Integra nuestro sistema de gesti\xF3n de certificados f\xE1cilmente con tus sistemas existentes y aumenta la productividad de tu empresa" })} ${renderComponent($$result2, "Card", $$Card, { "icon": "fa-solid fa-headset", "title": "Asistencia en l\xEDnea", "description": "Ofrecemos asistencia en l\xEDnea para ayudar a Nuestros clientes a resolver cualquier problema o pregunta que puedan tener con el sistema" })} </div> </section> <section class=" bg-gray-100"> <div class="lg:max-w-[75rem] m-auto flex py-[4rem] gap-16"> <div class="flex-1"> <h2 class="text-base font-extrabold text-primary-500 text-center my-0	m-auto">Proceso fácil</h2> <h3 class="text-3xl font-bold text-slate-900 text-center my-0	m-auto	mt-2">Entonces... ¿Cómo funciona?</h3> <div class="mt-10 flex flex-col gap-14 justify-center items-center"> ${renderComponent($$result2, "Steps", $$Steps, { "icon": "fa-solid fa-file-arrow-up", "title": "Sube tus certificados", "description": "Sube tus certificados de forma sencilla desde cualquier lugar y dispositivo." })} ${renderComponent($$result2, "Steps", $$Steps, { "icon": "fa-regular fa-square-check", "title": "Verifica tus certificados", "description": "Nuestro sistema verifica tus certificados autom\xE1ticamente para asegurar la autenticidad y validez" })} ${renderComponent($$result2, "Steps", $$Steps, { "icon": "fa-solid fa-file-contract", "title": "Accede a tus certificados", "description": "Accede a tus certificados desde cualquier lugar y dispositivo con nuestro sistema f\xE1cil y seguro." })} ${renderComponent($$result2, "Steps", $$Steps, { "icon": "fa-solid fa-check", "title": "Vamos!", "description": "" })} </div> </div> <div class="hidden lg:block flex-1"> ${renderComponent($$result2, "Image", $$Image, { "src": Clock, "alt": "logo", "loading": "lazy" })} </div> </div> </section> <section class="lg:max-w-[75rem] m-auto pt-[4.5rem] pb-[5.6rem] px-4" id="demo"> <h3 class="text-3xl font-bold text-slate-900 text-center my-0	m-auto	mb-3">Explora nuestro sistema de gestión de certificados en acción</h3> <h4 class="text-sm  text-slate-800 text-center my-0	m-auto">EXPLORA Y DESCUBRE CÓMO SIMPLIFICAR LA ADMINISTRACIÓN DE TUS CERTIFICADO</h4> <div class="">
video
</div> </section> <section class=" bg-gray-100" id="clients"> <div class="lg:max-w-[75rem] m-auto py-[4rem] gap-16 px-4"> <h2 class="text-base font-extrabold text-primary-500 text-center my-0	m-auto">Nuestros cliente</h2> <h3 class="text-3xl font-bold text-slate-900 text-center my-0	m-auto	mt-2">Que dicen de nosotros críticas honestas</h3> <div class="mt-10 flex flex-col gap-14 justify-center items-center"> ${renderComponent($$result2, "Clients", $$Clients, { "name": "Salma Bernabeu", "description": "Excelente sistema de gesti\xF3n de certificado, fac\xEDl de usar, organizado y con un dise\xF1o profesional. Muy safisfecho!" })} </div> <div class="flex justify-around mt-20 overflow-x-auto w-full"> ${renderComponent($$result2, "Image", $$Image, { "src": Client1, "alt": "logo", "loading": "lazy", "height": 80 })} ${renderComponent($$result2, "Image", $$Image, { "src": Client2, "alt": "logo", "loading": "lazy", "height": 80 })} ${renderComponent($$result2, "Image", $$Image, { "src": Client3, "alt": "logo", "loading": "lazy", "height": 80 })} ${renderComponent($$result2, "Image", $$Image, { "src": Client4, "alt": "logo", "loading": "lazy", "height": 80 })} </div> </div> </section> <section class="lg:max-w-[75rem] m-auto pt-[4.5rem] pb-[5.6rem]" id="prices"> <h2 class="text-base font-extrabold text-primary-500 text-center my-0	m-auto">Nuestros planes</h2> <h3 class="text-3xl font-bold text-slate-900 text-center my-0	m-auto	mt-2 mb-16">Mejor paquete de precios, comience ahora!</h3> <div class="flex justify-center "> ${renderComponent($$result2, "PricesCard", $$PricesCard, {})} </div> </section> <section class=" bg-gray-100" id="contact"> ${renderComponent($$result2, "Contact", $$Contact, {})} </section> ${renderComponent($$result2, "Footer", $$Footer, {})} </main> ` })}`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/index.astro", void 0);

const $$file = "/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
