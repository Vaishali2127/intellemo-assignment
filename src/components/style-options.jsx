const StyleOptions = ({ textStyle, onStyleChange }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onStyleChange("bold")}
        className={`border text-xl w-14 px-2 py-1 rounded-md hover:bg-gray-50 shadow-sm ${
          textStyle.includes("bold") && "bg-gray-300"
        }`}
      >
        <b>B</b>
      </button>
      <button
        onClick={() => onStyleChange("italic")}
        className={`border text-xl w-14 px-2 py-1 rounded-md hover:bg-gray-50 shadow-sm ${
          textStyle.includes("italic") && "bg-gray-300"
        }`}
      >
        <i>I</i>
      </button>
    </div>
  );
};

export default StyleOptions;
