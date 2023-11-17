import { CgAlignLeft, CgAlignCenter, CgAlignRight } from "react-icons/cg";

const AlignmentOptions = ({ textAlign, onAlignmentChange }) => {
  return (
    <div className="flex bg-gray-100 w-full rounded-md p-1">
      <CgAlignLeft
        onClick={() => onAlignmentChange("left")}
        className={`cursor-pointer text-blue-500 text-3xl w-full py-1 rounded-md ${
          textAlign === "left" && "bg-white shadow-sm"
        }`}
      />
      <CgAlignCenter
        onClick={() => onAlignmentChange("center")}
        className={`cursor-pointer text-3xl text-blue-500 w-full py-1 rounded-md ${
          textAlign === "center" && "bg-white shadow-sm"
        }`}
      />
      <CgAlignRight
        onClick={() => onAlignmentChange("right")}
        className={`cursor-pointer text-blue-500 text-3xl w-full py-1 rounded-md ${
          textAlign === "right" && "bg-white shadow-sm"
        }`}
      />
    </div>
  );
};

export default AlignmentOptions;
