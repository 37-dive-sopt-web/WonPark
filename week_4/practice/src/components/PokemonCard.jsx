// components/PokemonCard.jsx

import { useNavigate } from "react-router-dom";

const PokemonCard = ({ name, url }) => {
  const navigate = useNavigate();

  const id = url ? url.split("/").filter(Boolean).pop() : null;
  const imgSrc = id
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    : null;

  const handleClick = () => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        cursor: "pointer",
        width: "120px",
        textAlign: "center",
        background: "#f9f9f9",
      }}
      onClick={handleClick}
    >
      {imgSrc && (
        <img
          src={imgSrc}
          alt={name}
          width={72}
          height={72}
          style={{ objectFit: "contain" }}
        />
      )}
      <p style={{ marginTop: "0.5rem", textTransform: "capitalize" }}>{name}</p>
    </div>
  );
};

export default PokemonCard;
