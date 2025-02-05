import Showdown from "showdown"; // Importation de Showdown
import DOMPurify from 'dompurify';

const NoteDisplay = ({ markdown }) => {
  // Création d'un convertisseur Showdown
  const converter = new Showdown.Converter();
  let html = converter.makeHtml(markdown);

  // Configuration de DOMPurify (exemple)
  const config = {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'code', 'pre', 'img', 'blockquote'], // Balises autorisées
    ALLOWED_ATTR: ['href', 'title', 'src', 'alt', 'class'], // Attributs autorisés
  };

  const cleanHtml = DOMPurify.sanitize(html, config);

  return (
    <div className="note-display">
      <h2>Prévisualisation</h2>
      <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
    </div>
  );
};

export default NoteDisplay;
