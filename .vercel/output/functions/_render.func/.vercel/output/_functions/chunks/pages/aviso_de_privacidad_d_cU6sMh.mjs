/* empty css                                      */
import { e as createAstro, f as createComponent, r as renderTemplate, k as renderComponent, m as maybeRenderHead } from '../astro_OSQ-nX93.mjs';
import { $ as $$HeadOnlyLogo, a as $$Layout } from './acerca_de_digital_JJxjzc0L.mjs';

const $$Astro = createAstro();
const $$AvisoDePrivacidad = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AvisoDePrivacidad;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Digitalcerti" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadOnlyLogo", $$HeadOnlyLogo, {})} ${maybeRenderHead()}<h1 class=" text-xl font-semibold text-center">Aviso de privacidad</h1> ` })}`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/aviso_de_privacidad.astro", void 0);

const $$file = "/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/aviso_de_privacidad.astro";
const $$url = "/aviso_de_privacidad";

export { $$AvisoDePrivacidad as default, $$file as file, $$url as url };
