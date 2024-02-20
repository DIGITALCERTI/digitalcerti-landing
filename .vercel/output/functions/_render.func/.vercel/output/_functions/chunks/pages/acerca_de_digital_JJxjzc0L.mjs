/* empty css                                      */
import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderSlot, j as renderHead, k as renderComponent } from '../astro_OSQ-nX93.mjs';
import { i as isESMImportedImage, a as isLocalService, b as isRemoteImage, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_GbwopepM.mjs';

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_GbwopepM.mjs'
    ).then(n => n.g).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$5 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/node_modules/.pnpm/astro@4.3.5_typescript@5.2.2/node_modules/astro/components/Image.astro", void 0);

const $$Astro$4 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/node_modules/.pnpm/astro@4.3.5_typescript@5.2.2/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///Users/jeanpaul/Projects/digitalcerti-landing/.vercel/output/static/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$3 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="scroll-smooth" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", '</title><script src="https://kit.fontawesome.com/73da2e88a8.js" crossorigin="anonymous"><\/script>', "</head> <body data-astro-cid-sckkx6r4> ", " </body></html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/layouts/Layout.astro", void 0);

const LogoWhite = new Proxy({"src":"/_astro/logo-white.z7BX5WCW.png","width":189,"height":47,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/logo-white.png";
							}
							
							return target[name];
						}
					});

const $$Astro$2 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<div class=" bg-primary-800"> <div class=" py-20 px-12 lg:flex gap-5 justify-around  border-b border-primary-600 "> <div class="flex-1 mb-5"> <h1 class="text-white text-3xl font-bold mb-6">Digitalcerti</h1> <p class="text-slate-300">Sistema de gestión de certificados diseñado para simplificar el proceso de administración y distribución de certificados en entornos educativos y empresariales. Digitalcerti ofrece una solución integral que mejora la accesibilidad, la eficiencia y la organización en todo el proceso de certificación </p> </div> <div class="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"> <div class="flex-1"> <h5 class="text-white text-xl  font-semibold mb-3 lg:mb-6">Plataforma</h5> <ul class="text-slate-300 flex flex-col gap-2"> <li> <a href="/preguntas_frecuentes">Preguntas frecuentes</a> </li> <li> <a href="#clients">Nuestros clientes</a> </li> <li> <a href="#demo">Demos disponibles</a> </li> <!-- <li>
            <a href="#comments">Comentarios</a>
          </li> --> </ul> </div> <div class="flex-1"> <h5 class="text-white text-xl  font-semibold mb-3 lg:mb-6">Sistema</h5> <ul class="text-slate-300 flex flex-col gap-2"> <li> <a href="#sistem">Sistema</a> </li> <li> <a href="/beneficios">Beneficios</a> </li> <li> <a href="/configuraciones">Configuraciones</a> </li> <li> <a href="">Plan premium</a> </li> <li> <a href="">Panel de administración</a> </li> </ul> </div> <div class="flex-1"> <h5 class="text-white text-xl  font-semibold mb-3 lg:mb-6">Empresa</h5> <ul class="text-slate-300 flex flex-col gap-2"> <li> <a href="">Acerca de digitalcerti</a> </li> <li> <a href="/contacto">Contacto</a> </li> <li> <a href="/terminos_y_condiciones">Terminos y condiciones</a> </li> <li> <a href="/politicas_privacidad">Politicas de privacidad</a> </li> <li> <a href="/politicas_reeembolso">Politicas de reembolso</a> </li> <li> <a href="/renuncia_responsabilidades">Renuncia de responsabilidades</a> </li> </ul> </div> </div> </div> <div class="flex flex-col lg:flex-row justify-between py-9 px-12 items-center gap-4"> ${renderComponent($$result, "Image", $$Image, { "src": LogoWhite, "alt": "logo", "loading": "lazy", "height": 32 })} <p class=" text-white font-light">2023  Digitalcerti. Todos los derechos reservados</p> </div> </div>`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro();
const $$HeadOnlyLogo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HeadOnlyLogo;
  const menuData = [
    {
      name: "Inicio",
      href: "./"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class=" p-6 bg-gradient-to-r from-primary-500 to-primary-800 flex justify-between items-center relative pb-4 "> <div class="m-auto lg:w-[75rem] flex  justify-between h-full pb-3 px-4"> <div class="flex gap-10"> <a href="./"> ${renderComponent($$result, "Image", $$Image, { "src": LogoWhite, "alt": "logo", "loading": "lazy" })} </a> <div class="hidden lg:relative lg:flex items-center"> <nav class=""> <ul class="flex space-x-8 text-white font-normal text-lg"> ${menuData.map((el) => renderTemplate`<li><a${addAttribute(el.href, "href")} class="hover:font-semibold  relative before:absolute before:bottom-[-4px] before:w-0 before:h-1 hover:before:w-full before:bg-white before:transition-all ">${el.name}</a></li>`)} </ul> </nav> </div> </div> <a href="https://go.digitalcerti.com/admin/" target="_blank" class="w-[8.25rem] h-[2.5rem] hidden bg-primary-500 rounded-full text-white font-medium lg:flex justify-center items-center cursor-pointer hover:bg-primary-600 active:bg-primary-600">
Ingresar
</a> </div> </div>`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/components/HeadOnlyLogo.astro", void 0);

const ImgConfigurations = new Proxy({"src":"/_astro/configurations.tww4r-TJ.svg","width":652,"height":433,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/svg/configurations.svg";
							}
							
							return target[name];
						}
					});

const Marca = new Proxy({"src":"/_astro/marca.k2KzOO_5.png","width":437,"height":432,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/marca.png";
							}
							
							return target[name];
						}
					});

const FastConfiguration = new Proxy({"src":"/_astro/fast_configuration.WaryA5X4.png","width":474,"height":456,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/fast_configuration.png";
							}
							
							return target[name];
						}
					});

const DataConfig = new Proxy({"src":"/_astro/dataConfig.SNBCgk7L.png","width":500,"height":500,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/dataConfig.png";
							}
							
							return target[name];
						}
					});

const TextConfig = new Proxy({"src":"/_astro/textConfig.dZSgdwkq.png","width":500,"height":500,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/textConfig.png";
							}
							
							return target[name];
						}
					});

const SupportConfig = new Proxy({"src":"/_astro/supportConfig.ZP-WPDZk.png","width":500,"height":500,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/jeanpaul/Projects/digitalcerti-landing/src/assets/supportConfig.png";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro();
const $$AcercaDeDigital = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AcercaDeDigital;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Digitalcerti" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadOnlyLogo", $$HeadOnlyLogo, {})} ${maybeRenderHead()}<div class="h-[20rem] bg-gradient-to-r from-primary-500 to-primary-800 pt-10"> <div class="m-auto lg:max-w-[75rem] flex justify-around flex-row items-center  h-full pb-3 px-4 gap-20"> <h1 class="w-[400px] text-center text-2xl lg:text-3xl font-semibold text-slate-50">Configuraciones Personalizadas en Digitalcerti</h1> ${renderComponent($$result2, "Image", $$Image, { "class": " hidden md:block w-[350px]", "src": ImgConfigurations, "alt": "beneficios", "loading": "lazy" })} </div> </div> <div class=" max-w-[1280px] m-auto px-6 my-20"> <div class="flex items-center gap-5 justify-between mb-10 flex-col md:flex-row"> <div class="flex-1"> <h2 class="text-slate-800 text-2xl xl:text-3xl lg:text-4xl text-left font-semibold mb-5">Identidad de Marca</h2> <p class="text-slate-700">Asocia tu sistema con tu marca mediante un Dominio Web Propio (por ejemplo, certificados.tumarca.com), proporcionando una experiencia cohesiva.</p> </div> <div class="flex-1  md:flex items-center justify-center"> ${renderComponent($$result2, "Image", $$Image, { "class": "  md:block w-[250px] md:w-[350px]", "src": Marca, "alt": "beneficios", "loading": "lazy" })} </div> </div> <div class="flex items-center gap-5  justify-between mb-10  flex-col-reverse md:flex-row "> <div class="flex-1  md:flex items-center justify-center"> ${renderComponent($$result2, "Image", $$Image, { "class": "  md:block w-[250px] md:w-[350px]", "src": FastConfiguration, "alt": "beneficios", "loading": "lazy" })} </div> <div class="flex-1"> <h2 class="text-slate-800 text-2xl xl:text-3xl lg:text-4xl text-left font-semibold mb-5">Configuración Rápida</h2> <p class="text-slate-700">Integración sencilla con cualquier proveedor de dominios, con activación en tan solo 1 hora, tanto para registros nuevos como existentes.</p> </div> </div> <div class="flex items-center gap-5  justify-between mb-10  flex-col md:flex-row"> <div class="flex-1"> <h2 class="text-slate-800 text-2xl xl:text-3xl lg:text-4xl text-left font-semibold mb-5">Flexibilidad en Datos</h2> <p class="text-slate-700">Personaliza los campos adicionales según tus necesidades, incluyendo Identificación, Ubicación, Email, Dirección y más. Accesible y descargable desde el Panel de Administración. Estadísticas detalladas de uso para optimizar tu enfoque.</p> </div> <div class="flex-1  md:flex items-center justify-center"> ${renderComponent($$result2, "Image", $$Image, { "class": "  md:block w-[250px] md:w-[350px]", "src": DataConfig, "alt": "beneficios", "loading": "lazy" })} </div> </div> <div class="flex items-center gap-5  justify-between mb-10  flex-col-reverse md:flex-row"> <div class="flex-1  md:flex items-center justify-center"> ${renderComponent($$result2, "Image", $$Image, { "class": "  md:block w-[250px] md:w-[350px]", "src": TextConfig, "alt": "beneficios", "loading": "lazy" })} </div> <div class="flex-1"> <h2 class="text-slate-800 text-2xl xl:text-3xl lg:text-4xl text-left font-semibold mb-5">Personalización de Textos</h2> <p class="text-slate-700">Adapta el sistema a tu estilo con textos personalizados. Define títulos, acciones y etiquetas que resuenen con tu audiencia. Control total sobre el Título del Formulario, opciones de envío, botones y otros elementos clave.</p> </div> </div> <div class="flex items-center gap-5  justify-between mb-10  flex-col md:flex-row"> <div class="flex-1"> <h2 class="text-slate-800 text-2xl xl:text-3xl lg:text-4xl text-left font-semibold mb-5">Soporte Continuo</h2> <p class="text-slate-700">Mantente respaldado con nuestro equipo de soporte, asegurando que todas tus configuraciones se implementen y funcionen sin problemas.</p> </div> <div class="flex-1  md:flex items-center justify-center"> ${renderComponent($$result2, "Image", $$Image, { "class": "  md:block w-[250px] md:w-[350px]", "src": SupportConfig, "alt": "beneficios", "loading": "lazy" })} </div> </div> </div> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/acerca_de_digital.astro", void 0);

const $$file = "/Users/jeanpaul/Projects/digitalcerti-landing/src/pages/acerca_de_digital.astro";
const $$url = "/acerca_de_digital";

const acerca_de_digital = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AcercaDeDigital,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$HeadOnlyLogo as $, DataConfig as D, FastConfiguration as F, ImgConfigurations as I, LogoWhite as L, Marca as M, SupportConfig as S, TextConfig as T, $$Layout as a, $$Image as b, $$Footer as c, acerca_de_digital as d, getConfiguredImageService as g, imageConfig as i };
