import "./Gallery.css";

// Galeria de fotos, por enquanto só o modelo.
const galleryItems = [
  {
    title: "corte degradê",
    category: "Corte",
    image: "",
  },
  {
    title: "Barba alinhada",
    category: "Barba",
    image: "",
  },
  {
    title: "Ambiente de trabalho",
    category: "Ambiente",
    image: "",
  },
  {
    title: "Acabamento",
    category: "Detalhes",
    image: "",
  },
  {
    title: "Espaço de atendimento",
    category: "Ambiente",
    image: "",
  },
  {
    title: "Corte finalizado",
    category: "Corte",
    image: "",
  },
];

function GalleryCard({ item }) {
  return (
    <article className="gallery-card">
      <div className="gallery-image-area">
        {item.image ? (
          <img className="gallery-image" src={item.image} alt={item.title} />
        ) : (
          <div className="gallery-placeholder">
            <span>{item.category}</span>
          </div>
        )}
      </div>

      <div className="galelry-card-content">
        <span className="galelry-category">{item.category}</span>
        <h3 className="gallery-card-title">{item.title}</h3>
      </div>
    </article>
  );
}

function Gallery() {
  return (
    <section className="gallery" id="galeria">
      <div className="gallery-container">
        <div className="gallery-header">
          <p className="gallery-eyebrow">Galeria</p>

          <h2 className="gallery-title">
            Cortes, ambiente e detalhes do atendimento
          </h2>

          <p className="gallery-subtitle">
            Uma prévia do espaço, dos acabamentos e do cuidado em cada atendimento.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <GalleryCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;