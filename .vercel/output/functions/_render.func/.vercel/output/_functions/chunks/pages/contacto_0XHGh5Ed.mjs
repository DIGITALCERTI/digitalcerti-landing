/* empty css                                      */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, k as renderComponent } from '../astro_OSQ-nX93.mjs';
import { b as $$Image, $ as $$HeadOnlyLogo, c as $$Footer, a as $$Layout } from './acerca_de_digital_JJxjzc0L.mjs';

const LogoWithoutLetter = new Proxy({"src":"/_astro/logo-without-letter.hUmuCEuO.png","width":100,"height":96,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/logo-without-letter.png";
							}
							
							return target[name];
						}
					});

const $$Astro$1 = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${maybeRenderHead()}<div class="lg:max-w-[75rem] m-auto py-[4rem] gap-16"> <h2 class="text-base font-extrabold text-primary-500 text-center my-0	m-auto">Contactenos</h2> <h3 class="text-3xl font-bold text-slate-900 text-center my-0	m-auto mt-2">¿Necesitas simplificar la gestión de certificados?</h3> <h3 class="text-3xl font-bold text-slate-900 text-center my-0	m-auto mt-2">Estamos aquí para ayudarte!</h3> <div class="lg:flex justify-center mt-20"> <div class="bg-gradient-to-r from-primary-500 to-primary-800 p-10 lg:rounded-s-3xl	"> <div class="flex gap-4 items-center mb-6"> ${renderComponent($$result, "Image", $$Image, { "src": LogoWithoutLetter, "alt": "logo", "loading": "lazy", "height": 80 })} <div> <div class="flex gap-4 items-center mb-2"> <i class="fa-solid fa-phone text-white"></i> <p class="text-white">+51 992149752</p> </div> <div class="flex gap-4 items-center"> <i class="fa-solid fa-envelope text-white"></i> <p class="text-white">trujillomjulia@gmail.com</p> </div> </div> </div> <div> <div class="flex gap-4 items-center mb-4"> <i class="fa-solid fa-signal text-white"></i> <p class="text-white">Acceso desde cualquier lugar</p> </div> <div class="flex gap-4 items-center"> <i class="fa-solid fa-headset text-white"></i> <p class="text-white">Disponible siempre para ayudarte</p> </div> </div> </div> <div class="bg-white py-10 px-12 lg:rounded-e-3xl"> <form class="flex flex-col gap-6 " action="https://api.web3forms.com/submit" method="POST"> <!-- <input type="hidden" name="access_key" value="c8d12656-86e0-4b4e-aefa-fcee2e29b27f"> --> <input type="hidden" name="access_key" value="03170827-e444-400a-8a9b-1c5c088bf155"> <input type="hidden" name="subject" value="Contacto Digitalcerti"> <input type="text" name="name" required placeholder="Nombre" class="lg:w-80 border border-slate-200 rounded-xl p-2 h-11 text-xs"> <input type="email" name="email" required placeholder="Correo electronico" class="lg:w-80 border border-slate-200 rounded-xl p-2 h-11 text-xs"> <textarea name="message" required placeholder="Tu mensaje" class="lg:w-80 border border-slate-200 rounded-xl p-2 text-xs h-36" rows="10" cols="50"></textarea> <input type="hidden" name="redirect" value="https://web3forms.com/success"> <div class="flex justify-end"> <button type="submit" class="w-[8.25rem] h-[2.5rem] bg-primary-500 rounded-full text-white font-medium flex justify-center items-center cursor-pointer">
Enviar
</button> </div> </form> </div> </div> </div>`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/components/contact.astro", void 0);

const $$Astro = createAstro();
const $$Contacto = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contacto;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Digitalcerti" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadOnlyLogo", $$HeadOnlyLogo, {})} ${maybeRenderHead()}<section class="max-w-[1280px] m-auto px-6 my-10"> ${renderComponent($$result2, "Contact", $$Contact, {})} </section> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/contacto.astro", void 0);

const $$file = "/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/contacto.astro";
const $$url = "/contacto";

const contacto = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Contacto,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Contact as $, contacto as c };
