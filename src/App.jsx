import { useEffect, useMemo, useState } from "react";

const CLINIC_NAME = "Clínica Avançar - Psicoterapia e Terapias Integradas";
const TAGLINE = "A Clínica Avançar é um espaço acolhedor e especializado em psicoterapia e terapias integradas, voltado para o bem-estar emocional e o desenvolvimento pessoal. Nossa equipe é formada por profissionais experientes, comprometidos com um atendimento humanizado, ético e individualizado. Trabalhamos com diversas abordagens terapêuticas para atender crianças, adolescentes, adultos e famílias, sempre com foco na saúde mental, equilíbrio e qualidade de vida..";
const CONTACT_WHATS = "https://wa.me/5581986117021";
const CONTACT_EMAIL = "admavancar@clinicaavancarpe.com.br";
const TARGET_ISO = "2025-09-30T00:00:00-03:00";

const pad = (n) => String(n).padStart(2, "0");
function getRemainingTime(target) {
  const diff = target.getTime() - Date.now();
  const totalMs = diff;
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { totalMs, days, hours, minutes, seconds };
}

function Pill({ label, value }) {
  return (
    <div className="pill">
      <span className="val">{pad(value)}</span>
      <span className="lab">{label}</span>
    </div>
  );
}

export default function App() {
  const targetDate = useMemo(() => new Date(TARGET_ISO), []);
  const [remaining, setRemaining] = useState(getRemainingTime(targetDate));
  const isReleased = remaining.totalMs <= 0;

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemainingTime(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <>
      {/* Banner topo */}
      <div className="topbar">
        <div className="container">
          Estamos em desenvolvimento • Lançamento previsto: <strong>30/09</strong>
        </div>
      </div>

      <header className="container header">
        {/* LOGO controlada */}
        <div className="logo-wrap">
          <img src="/logo.jpg" alt={`${CLINIC_NAME} logo`} className="logo" />
        </div>

        <h1 className="title" style={{ fontSize: 28, fontWeight: 800 }}>
          {CLINIC_NAME}
        </h1>
        <p className="about">
          A Clínica Avançar é um espaço acolhedor e especializado em psicoterapia e
          terapias integradas, voltado para o bem-estar emocional e o desenvolvimento
          pessoal. Nossa equipe é formada por profissionais experientes, comprometidos
          com um atendimento humanizado, ético e individualizado.
        </p>
        <p className="about">
          Trabalhamos com diversas abordagens terapêuticas para atender crianças,
          adolescentes, adultos e famílias, sempre com foco na saúde mental, equilíbrio
          e qualidade de vida.
        </p>
      </header>

      <main className="container">
        <section className="card">
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>Nosso site está em desenvolvimento</h2>
          <p>Lançamento previsto para <strong>30/09</strong>.</p>

          {!isReleased ? (
            <>
              <div className="pills">
                <Pill label="Dias" value={remaining.days} />
                <Pill label="Horas" value={remaining.hours} />
                <Pill label="Min" value={remaining.minutes} />
                <Pill label="Seg" value={remaining.seconds} />
              </div>
              <p className="muted">
                A partir de <strong>30/09</strong> você poderá acessar conteúdos e agendar atendimentos diretamente pelo site.
              </p>
            </>
          ) : (
            <p style={{ color: "#16a34a", fontWeight: 700 }}>🎉 O site já está disponível!</p>
          )}

          <div className="btns">
            <a href={CONTACT_WHATS} target="_blank" rel="noreferrer" className="btn primary">
              Agendar pelo WhatsApp
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn ghost">
              Enviar e-mail
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} {CLINIC_NAME}. Todos os direitos reservados.
      </footer>
    </>
  );
}
