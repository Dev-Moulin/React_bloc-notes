import { useEffect, useState } from "react"; // Importation des hooks

const MarkdownInput = ({ onTextChange, defaultValue }) => {
  // État local pour stocker le texte Markdown
  const [text, setText] = useState(defaultValue);

  // Met à jour le champ de texte quand la note active change
  useEffect(() => {
    setText(defaultValue);
  }, [defaultValue]);

  // Fonction appelée lorsque l'utilisateur tape dans la zone de texte
  const handleChange = (event) => {
    setText(event.target.value);
    onTextChange(event.target.value);
  };

  return (
    <div className="markdown-input">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Écris ici en Markdown..."
      />
    </div>
  );
};

export default MarkdownInput;
