import { SendMail } from '../SendMail';

const Contact = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    console.log(name);
    console.log(email);
    console.log(message);
    try {
      await SendMail(name, email, message);
      // await SendMail(name, email, message);
    } catch {}
  };

  return (
    <form className="flex flex-col gap-6 " onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        className="lg:w-80 border border-slate-200 rounded-xl p-2 h-11 text-xs"
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electronico"
        className="lg:w-80 border border-slate-200 rounded-xl p-2 h-11 text-xs"
      />
      <textarea
        name="message"
        placeholder="Tu mensaje"
        className="lg:w-80 border border-slate-200 rounded-xl p-2 text-xs h-36"
        rows="10"
        cols="50"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="w-[8.25rem] h-[2.5rem] bg-primary-500 rounded-full text-white font-medium flex justify-center items-center cursor-pointer"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default Contact;
