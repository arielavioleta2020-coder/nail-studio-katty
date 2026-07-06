import React, { useState } from 'react';
import {collection,addDoc,query,where,getDocs} from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
  // --- 1. ESTADOS Y ENLACES ---
  const [visitas, setVisitas] = useState([true, true, true, false, false]);
  const [fotoActual, setFotoActual] = useState(0);
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");

  const linkWhatsapp = "https://wa.me/593981096346";
  const linkFacebook = "https://www.facebook.com/share/1DtyQ8Pu3W/";
  const linkInstagram = "https://www.instagram.com/km.akeup_art?utm_source=qr&igsh=NWRzczJwMnNxbml0";

  // --- 2. DATOS DE LA PÁGINA ---
  const servicios = [
  {
    nombre: "ESMALTADO SEMIPERMANENTE",
    precio: "$12",
    imagen: "/uñas1.png"
  },
  {
    nombre: "SOFT GEL",
    precio: "$17",
    imagen: "/uñas5.png"
  },
  {
    nombre: "KAPPING EN GEL",
    precio: "$15",
    imagen: "/uñas6.png"
  },
  {
    nombre: "PEDICURÍA",
    precio: "$8",
    imagen: "/uñas7.png"
  }
];

  const misFotos = ['/uñas2.png', '/uñas3.png', '/uñas4.png'];

  // --- 3. FUNCIONES DEL CARRUSEL ---
  const fotoAnterior = () => {
    setFotoActual((prev) => (prev === 0 ? misFotos.length - 1 : prev - 1));
  };

  const fotoSiguiente = () => {
    setFotoActual((prev) => (prev === misFotos.length - 1 ? 0 : prev + 1));
  };

  const guardarCita = async () => {

  if (
  !nombreCliente ||
  !telefonoCliente ||
  !servicioSeleccionado ||
  !horarioSeleccionado ||
  !fechaSeleccionada
 ) {
    alert("Completa todos los campos");
    return;
  }

  try {

    const consulta = query(
  collection(db, "citas"),
  where("fecha", "==", fechaSeleccionada),
  where("horario", "==", horarioSeleccionado)
);

const resultado = await getDocs(consulta);

if (!resultado.empty) {
  alert("⚠️ Este horario ya está reservado. Selecciona otro.");
  return;
}
    await addDoc(collection(db, "citas"), {
  nombre: nombreCliente,
  telefono: telefonoCliente,
  servicio: servicioSeleccionado,
  horario: horarioSeleccionado,
  fecha: fechaSeleccionada,
  estado: "Pendiente",
  fechaRegistro: new Date()
 });

    alert("Cita registrada correctamente");

    setServicioSeleccionado("");
    setHorarioSeleccionado("");
    setFechaSeleccionada("");
    setNombreCliente("");
    setTelefonoCliente("");

  } catch (error) {
    console.error(error);
    alert("Error al guardar la cita");
  }
};
  // --- 4. DISEÑO DE LA PÁGINA ---
  return (
    <div className="min-h-screen bg-[#FCF8F8] text-[#4A3B32] font-sans antialiased">
      
      {/* NAVBAR */}
      <nav className="bg-white border-b border-[#F0E2E2] px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Nail Studio Logo" 
            className="w-12 h-12 rounded-full object-cover border border-[#F0E2E2]"
            onError={(e) => {
              if (!e.target.src.endsWith('.png') && !e.target.src.includes('retry')) {
                e.target.src = '/logo.png?retry=1';
              }
            }}
          />
          <div className="flex flex-col">
            <span className="font-serif tracking-widest text-sm font-bold text-[#B87373]">NAIL STUDIO</span>
            <span className="text-[9px] tracking-wider text-gray-400 uppercase font-sans">by Katty Malave</span>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-6 text-xs tracking-wider uppercase font-medium text-gray-600">
          <a href="#servicios" className="hover:text-[#B87373] transition-colors">Servicios</a>
          <a href="#lealtad" className="hover:text-[#B87373] transition-colors">Promociones</a>
          <a href="#agenda" className="hover:text-[#B87373] transition-colors">Agendamiento</a>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <a href={linkWhatsapp} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-[#25D366] transition-colors" title="Chat de WhatsApp">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.602-1.012-5.05-2.859-6.892C16.63 2.128 14.178.921 11.59.921c-5.445 0-9.871 4.372-9.875 9.745-.002 1.722.459 3.401 1.346 4.911L2.015 21.97l6.632-1.816z"/></svg>
          </a>
          <a href={linkFacebook} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-[#1877F2] transition-colors" title="Síguenos en Facebook">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href={linkInstagram} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-[#E1306C] transition-colors" title="Síguenos en Instagram">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"></path></svg>
          </a>
          <a href="https://www.tiktok.com/@raquelfigueroa76" target="_blank" rel="noreferrer" className="bg-[#4A3B32] hover:bg-[#332822] text-white text-xs px-3 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-sm">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.2 2.27 2 3.73 2.32v3.83c-1.63-.04-3.23-.52-4.63-1.39A8.66 8.66 0 0 1 15.6 7.14v8.11a6.34 6.34 0 0 1-2.02 4.67 6.27 6.27 0 0 1-8.1-.47 6.35 6.35 0 0 1-.59-8.41 6.28 6.28 0 0 1 6.81-2.22V12.7a2.43 2.43 0 0 0-2.61.54 2.44 2.44 0 0 0-.21 3.27 2.42 2.42 0 0 0 3.14.47 2.44 2.44 0 0 0 1.05-2v-14.9c-.18-.03-.36-.05-.54-.06z"/></svg>
            <span className="font-medium hidden sm:inline">@raquelfigueroa76</span>
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative h-[550px] overflow-hidden">

  <img
    src="/banner.png"
    alt="Nail Studio"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/30"></div>

  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
    
    <img
      src="/logo.png"
      alt="Logo"
      className="w-28 h-28 rounded-full border-4 border-white shadow-xl mb-6"
    />

    <h1 className="text-4xl md:text-6xl font-serif text-white drop-shadow-lg">
      Nail Studio - Tu Oasis de Belleza
    </h1>

    <p className="text-white/90 mt-4 max-w-lg">
      Consintiéndote con las últimas tendencias en manicura y pedicuría profesional.
    </p>

    <a
      href="#agenda"
      className="mt-8 bg-[#B87373] hover:bg-[#A15F5F] text-white px-8 py-4 rounded-full shadow-lg"
    >
      Reservar Ahora
    </a>

  </div>

</header>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        
      {/* SECCIÓN DE EXPERIENCIA: TÍTULO CON ESTILO */}
        <div className="flex flex-col items-center justify-center gap-8 px-4 my-20 max-w-4xl mx-auto">
          
          {/* TÍTULO CON ESTILO HOMOGÉNEO */}
          <div className="text-center">
             <h3 className="font-serif text-3xl md:text-5xl text-[#B87373] mb-4">
               Experiencia en Nail Studio
             </h3>
             <div className="w-24 h-1 bg-[#B87373] mx-auto rounded-full"></div>
          </div>
          
          {/* VIDEO PROMO */}
          <div className="w-full max-w-[400px] shadow-2xl rounded-3xl overflow-hidden border-[6px] border-white transform transition-transform hover:scale-105 duration-500">
            <video src="/video-promo.mp4" controls autoPlay muted loop className="w-full h-auto" />
          </div>
          
        </div>

        {/* SECCIÓN GALERÍA / CARRUSEL */}
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-[#B87373] tracking-wide mb-2">
            El arte de consentirte, detalle a detalle
          </h2>
          <p className="text-gray-500 mb-8 text-sm">Inspírate con algunos de nuestros trabajos más recientes</p>

          <div className="relative w-full max-w-[400px] h-[500px] mx-auto group">
            <div className="w-full h-full rounded-3xl shadow-2xl border-4 border-white overflow-hidden bg-gray-100">
              <img 
                src={misFotos[fotoActual]} 
                alt={`Trabajo ${fotoActual + 1}`} 
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <button onClick={fotoAnterior} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:scale-110 transition active:scale-95">
              ❮
            </button>
            <button onClick={fotoSiguiente} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:scale-110 transition active:scale-95">
              ❯
            </button>
            <div className="flex justify-center gap-2 mt-4">
              {misFotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setFotoActual(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    fotoActual === index ? 'bg-[#B87373] w-6' : 'bg-gray-300 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        

        {/* SECCIÓN SERVICIOS + LEALTAD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section id="servicios" className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-serif text-[#B87373] tracking-wide border-b border-[#F0E2E2] pb-2">
              Nuestros Servicios
            </h2>
            <div className="space-y-6">

  {servicios.map((srv, idx) => (
    <div
      key={idx}
      className="bg-white rounded-2xl overflow-hidden shadow-lg flex items-center"
    >

      <img
        src={srv.imagen}
        alt={srv.nombre}
        className="w-28 h-28 md:w-36 md:h-36 object-cover"
      />

      <div className="flex-1 px-4">
        <h3 className="text-[#4A3B32] font-medium text-sm md:text-lg">
          {srv.nombre}
        </h3>
      </div>

      <div className="pr-4">
        <span className="bg-[#B87373] text-white px-5 py-2 rounded-full font-bold">
          {srv.precio}
        </span>
      </div>

    </div>
  ))}

</div>
              
          </section>

          <section id="lealtad" className="lg:col-span-5 bg-white border border-[#F0E2E2] rounded-2xl p-6 shadow-xs text-center space-y-4">
            <h3 className="text-xl font-serif text-[#4A3B32] tracking-wide">TARJETA DE LEALTAD</h3>
            <p className="text-sm text-gray-500">¡Junta 5 visitas y la 6ª es completamente GRATIS!</p>
            <div className="flex justify-center flex-wrap gap-3 py-4">
              {visitas.map((activa, index) => (
                <div key={index} className={`w-12 h-12 rounded-full flex items-center justify-center border text-lg transition-all shadow-inner ${activa ? 'bg-[#F2D6D6] border-[#B87373] text-[#B87373]' : 'bg-[#FCF8F8] border-gray-200 text-gray-300'}`}>
                  ♥
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-[#B87373] text-white flex items-center justify-center text-lg shadow-md">
                🎁
              </div>
            </div>
          </section>
        </div>

        {/* AGENDAMIENTO ONLINE - VERSIÓN MEJORADA Y LLAMATIVA */}
        <section id="agenda" className="bg-white border border-[#F0E2E2] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif text-[#B87373] tracking-wide">Agendamiento Online</h2>
            <p className="text-sm text-gray-500">AGENDA ABIERTA — Selecciona tu turno de forma inmediata</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#FCF8F8] p-4 md:p-6 rounded-xl border border-[#F0E2E2]">
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-3xl font-serif text-[#B87373] tracking-widest leading-none">AGENDA<br/>ABIERTA</h4>
              <p className="text-xs text-gray-500 max-w-xs">Elige el servicio deseado, la fecha en el calendario y confirma tu cita en menos de un minuto.</p>
            </div>
            
       <div className="space-y-5 bg-white p-5 rounded-xl border border-[#F0E2E2] shadow-sm">

  {/* NOMBRE */}
  <div>
    <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
      Nombre completo
    </label>

    <input
      type="text"
      value={nombreCliente}
      onChange={(e) => setNombreCliente(e.target.value)}
      placeholder="Ingresa tu nombre"
      className="w-full bg-[#FCF8F8] border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-[#B87373]"
    />
  </div>

  {/* TELÉFONO */}
  <div>
    <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
      Teléfono
    </label>

    <input
      type="tel"
      value={telefonoCliente}
      onChange={(e) => setTelefonoCliente(e.target.value)}
      placeholder="09xxxxxxxx"
      className="w-full bg-[#FCF8F8] border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-[#B87373]"
    />
  </div>

  {/* FECHA */}
  <div>
    <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
      Fecha
    </label>

    <input
      type="date"
      value={fechaSeleccionada}
      onChange={(e) => setFechaSeleccionada(e.target.value)}
      className="w-full bg-[#FCF8F8] border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-[#B87373]"
    />
  </div>

  {/* SERVICIO */}
  <div>
    <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
      Servicio
    </label>
                <select
  value={servicioSeleccionado}
  onChange={(e) => setServicioSeleccionado(e.target.value)}
  className="w-full bg-[#FCF8F8] border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-[#B87373]"
>
  <option value="">Seleccionar servicio...</option>

  {servicios.map((s, i) => (
    <option key={i}>
      {s.nombre}
    </option>
  ))}
</select>
              </div>
              <div>
  <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
    Horario disponible
  </label>

  <select
    value={horarioSeleccionado}
    onChange={(e) => setHorarioSeleccionado(e.target.value)}
    className="w-full bg-[#FCF8F8] border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-[#B87373]"
  >
    <option value="">Seleccionar horario...</option>
    <option value="02:00 p.m.">02:00 p.m.</option>
    <option value="04:00 p.m.">04:00 p.m.</option>
    <option value="06:00 p.m.">06:00 p.m.</option>
  </select>
</div>

              {/* --- MENSAJE DE POLÍTICA DE CANCELACIÓN REDISEÑADO Y LLAMATIVO --- */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 shadow-md transition-all hover:shadow-lg">
                {/* Detalle decorativo */}  
                <div className="absolute top-0 right-0 w-16 h-16 bg-rose-200 rounded-bl-full opacity-40"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-pink-200 rounded-tr-full opacity-30"></div>
                
                <div className="relative p-4 space-y-3 text-center">
                  {/* Primera parte: Pago de confirmación */}
                  <div className="flex items-center justify-center gap-2 bg-rose-100 rounded-full py-1.5 px-4 w-fit mx-auto shadow-inner">
                    <span className="text-lg">💅</span>
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">Confirmación Rápida</span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-700">
                      Para agendar te pido solo <span className="text-2xl font-black text-rose-500 mx-1">$5</span> de confirmación
                    </p>
                    <p className="text-xs text-gray-500">
                      por transferencia (se descuentan de tu servicio)
                    </p>
                  </div>

                                    {/* Badge de 24h - Versión clara y sin contradicciones */}
                  <div className="flex justify-center">
                    <div className="bg-white rounded-full px-3 py-1 shadow-sm border border-rose-200">
                      <p className="text-[11px] font-medium text-gray-600">
                        ⏰ Si avisas con <span className="font-black text-rose-500">24h</span> de anticipación, te los guardo para otra fecha
                      </p>
                    </div>
                  </div>

                  {/* Separador decorativo */}
                  <div className="border-t border-rose-200 my-2"></div>

                  {/* Mensaje de cancelación simplificado y amigable */}
                  <div className="bg-rose-100 rounded-lg p-2.5 border border-rose-300 shadow-sm">
                    <div className="flex items-center justify-center gap-2 text-rose-700 mb-1">
                      <span className="text-md">❌</span>
                      <p className="text-xs font-black uppercase tracking-wide">Cancelación tardía</p>
                      <span className="text-md">❌</span>
                    </div>
                    <p className="text-[12px] font-semibold text-red-600">
                      Si no avisas o cancelas con menos de 24h, se pierde el apartado de <span className="font-black">$5</span>
                    </p>
                  </div>
                  
                  {/* Ícono de información extra */}
                  <div className="flex justify-center text-[10px] text-gray-400 gap-1">
                    <span>📌</span> <span>Lee con atención nuestra política de reservas</span>
                  </div>
                </div>
              </div>

              <button
  onClick={guardarCita}
  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-sm uppercase tracking-wider font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
>
  ✨ Confirmar Mi Cita ✨
</button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#F0E2E2] py-8 px-6 mt-16 text-center text-xs text-gray-400 space-y-4">
        <div className="flex justify-center">
          <img 
            src="/logo.png" 
            alt="Nail Studio Logo" 
            className="w-10 h-10 rounded-full object-cover grayscale opacity-70"
            onError={(e) => {
              if (!e.target.src.endsWith('.png') && !e.target.src.includes('retry')) {
                e.target.src = '/logo.png?retry=1';
              }
            }}
          />
        </div>
        <div className="space-y-1">
          <p className="font-medium text-gray-500">Nail Studio, by Katty Malave</p>
          <p>La Libertad Santa Elena</p>
        </div>
        <div className="flex justify-center gap-4 text-gray-400 pt-2 font-medium">
          <a href={linkWhatsapp} target="_blank" rel="noreferrer" className="hover:text-[#25D366]">WhatsApp</a>
          <span>•</span>
          <a href={linkFacebook} target="_blank" rel="noreferrer" className="hover:text-[#1877F2]">Facebook</a>
          <span>•</span>
          <a href={linkInstagram} target="_blank" rel="noreferrer" className="hover:text-[#E1306C]">Instagram</a>
          <span>•</span>
          <a href="https://www.tiktok.com/@raquelfigueroa76" target="_blank" rel="noreferrer" className="hover:text-[#B87373]">TikTok</a>
        </div>
        <p className="text-[10px]">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}