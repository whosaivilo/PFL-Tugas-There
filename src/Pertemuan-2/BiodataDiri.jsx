import "./custom.css"; 

export default function BiodataDiri() {
  return (
    <Container>
      <Profile nama="Theresa Olivia" nim="2457301144" />
      <About nama="Theresa Olivia" />
      <Education />

      <section className="section">
        <h2 className="section-title">Projects</h2>
        <div className="project-grid">
          <Projects
            judul="Point of Sale (POS) & Inventory Management System"
            tools="PHP, MySQL, MVC Architecture, Laragon"
            deskripsi="Mengembangkan Sistem Kasir (POS) dan Inventori berbasis web menggunakan arsitektur MVC untuk merampingkan proses transaksi, pencatatan stok barang UMKM, dan pengelolaan database relasional secara efisien."
          />

          <Projects
            judul="Public Complaint & Aspiration Management System"
            tools="Laravel, MySQL, Laragon"
            deskripsi="Membangun platform pengaduan dan aspirasi masyarakat berbasis web dengan fitur manajemen hak akses (role-based) yang disesuaikan dengan alur administrasi nyata di tingkat warga."
          />

          <Projects
            judul="MedConnect | Digital Health UI/UX Design"
            tools="Figma, Behance"
            deskripsi="Merancang desain UI/UX aplikasi kesehatan digital end-to-end, mulai dari riset alur pengguna (user flow) hingga pembuatan prototype interaktif yang mengutamakan kemudahan akses layanan medis."
          />
        </div>
      </section>

      <Skills />

      <Contact
        email="theresa24si@mahasiswa.pcr.ac.id"
        linkedin="https://www.linkedin.com/in/theresa-olivia-t/"
        github="github.com/whosaivilo"
        instagram="https://www.instagram.com/theresaolivia_/"
      />
    </Container>
  );
}

function About(props) {
  return (
    <section className="section">
      <h2 className="section-title">About Me</h2>
      <div className="card about-content">
        <img
          src="/img/foto.png"
          alt="Foto Theresa Olivia"
          className="about-photo"
        />

        <p
          style={{
            lineHeight: "1.8",
            fontSize: "16px",
            color: "#334155",
            margin: 0,
          }}
        >
          Hai, saya <strong>{props.nama.toUpperCase()}</strong>! Mahasiswa
          Sistem Informasi semester 4 di Politeknik Caltex Riau yang sedang
          semangat mengeksplorasi banyak hal. Perjalanan belajarku mencakup
          UI/UX <em>design</em>, pengolahan data, hingga IT Project Management.
          Entah itu saat melakukan riset untuk merancang aplikasi yang{" "}
          <em>user-centric</em>, atau menyusun logika <em>web development</em>,
          aku selalu <em>enjoy</em> menikmati proses mengubah ide menjadi solusi
          digital yang nyata.
        </p>
      </div>
    </section>
  );
}

function Profile(props) {
  return (
    <section className="hero">
      <p className="hero-subtitle">Selamat datang di,</p>
      <h1 className="hero-title">PORTOFOLIO</h1>
      <h3 className="hero-name">{props.nama}</h3>
    </section>
  );
}

function Education() {
  return (
    <section className="section">
      <h2 className="section-title">Education</h2>
      <div className="card">
        <h3 style={{ margin: "0 0 5px 0", color: "#0f172a" }}>
          Politeknik Caltex Riau
        </h3>
        <p
          style={{ margin: "0 0 10px 0", color: "#3b82f6", fontWeight: "600" }}
        >
          D4 Sistem Informasi
        </p>
        <p style={{ margin: "0", color: "#64748b", fontSize: "14px" }}>
          2024 - 2028
        </p>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section">
      <h2 className="section-title">Technical Skills</h2>

      {/* Menggunakan class skills-container menggantikan inline style */}
      <div className="card skills-container">
        <span className="skill-badge badge-blue">HTML, CSS, React</span>

        <span className="skill-badge badge-red">Laravel, CodeIgniter</span>

        <span className="skill-badge badge-green">MySQL, Oracle</span>

        <span className="skill-badge badge-orange">UI/UX Figma</span>
      </div>
    </section>
  );
}

function Contact(props) {
  return (
    <section className="section">
      <h2 className="section-title">Let's Connect</h2>
      <div className="contact">
        <a href={`mailto:${props.email}`}>✉️ Email</a>
        <a href={props.instagram} target="_blank" rel="noopener noreferrer">
          📸 Instagram
        </a>
        <a href={props.linkedin} target="_blank" rel="noopener noreferrer">
          💼 LinkedIn
        </a>
        <a
          href={`https://${props.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          💻 GitHub
        </a>
      </div>
    </section>
  );
}

function Projects( props ) {
  return (
    <div className="card project-card">
      <h3 style={{ color: "#0f172a", marginBottom: "10px" }}>{props.judul}</h3>
      <p className="project-tools">🛠️ {props.tools}</p>
      <p style={{ color: "#475569", lineHeight: "1.6" }}>{props.deskripsi}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2025 Theresa Olivia. All rights reserved.</p>
      <p>Building digital solutions with data and design.</p>
    </footer>
  );
}

function Container({ children }) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {children}
      <Footer />
    </div>
  );
}
