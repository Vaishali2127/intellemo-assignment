import { useEffect, useRef, useState } from "react";
import { Image, Layer, Stage, Text, Transformer } from "react-konva";
import { CgAdd, CgClose, CgSoftwareDownload } from "react-icons/cg";
import Colorful from "@uiw/react-color-colorful";
import StyleOptions from "./components/style-options";
import AlignmentOptions from "./components/alignment-options";

const App = () => {
  const stageRef = useRef();
  const [text, setText] = useState("");
  const [textSize, setTextSize] = useState(27);
  const [textStyle, setTextStyle] = useState("");
  const [textAlign, setTextAlign] = useState("center");
  const [textColor, setTextColor] = useState("#000000");
  const [image, setImage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [ratio, setRatio] = useState(0);
  const transformerRef = useRef();

  useEffect(() => {
    if (selectedId) {
      const selectedNode = transformerRef.current
        .getStage()
        .findOne("#" + selectedId);
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        const maxW = 400;
        const maxH = 300;
        const ratio = Math.min(maxW / img.width, maxH / img.height);
        setRatio(ratio);
        setImage(img);
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleStageMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const handleStyleChange = (style) => {
    let arr = textStyle.split(" ");
    if (arr.includes(style)) arr = arr.filter((s) => s !== style);
    else arr.push(style);

    setTextStyle(arr.join(" "));
  };

  const handleDownload = () => {
    const dataURL = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.download = "canvas-image.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex h-screen gap-2 bg-gray-100">
      <section className="w-full h-full overflow-hidden bg-white px-4 py-8 flex flex-col items-center justify-center">
        {!image && !text && <p>Select image or edit text to continue</p>}
        <Stage
          ref={stageRef}
          width={500}
          height={400}
          onMouseDown={handleStageMouseDown}
          onTouchStart={handleStageMouseDown}
          className="border-2 border-gray-300 w-fit"
        >
          <Layer>
            {image && (
              <Image
                image={image}
                x={50}
                y={50}
                width={image.width * ratio}
                height={image.height * ratio}
                draggable
                id="editableImage"
                onClick={() => setSelectedId("editableImage")}
                onTap={() => setSelectedId("editableImage")}
              />
            )}

            <Text
              text={text}
              x={50}
              y={15}
              fontSize={textSize}
              fontStyle={textStyle}
              fill={textColor}
              align={textAlign}
              draggable
              id="editableText"
              onClick={() => setSelectedId("editableText")}
              onTap={() => setSelectedId("editableText")}
            />

            {selectedId && (
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
          </Layer>
        </Stage>
        {image ? (
          <div className="w-36 h-24 mt-8 border-4 relative border-blue-400 rounded-md">
            <div
              onClick={() => setImage(null)}
              className="rounded-full bg-red-600 p-1 w-fit hover:bg-red-400 cursor-pointer absolute -top-3 -right-3"
            >
              <CgClose className="text-white" />
            </div>
            <img
              className="object-cover w-full h-full rounded-md"
              src={image.src}
            />
          </div>
        ) : (
          <label
            htmlFor="file-upload"
            className="mt-8 flex flex-col justify-center items-center w-fit p-8 bg-white text-gray-700 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 hover:text-gray-500"
          >
            <div className="flex flex-col justify-center items-center">
              <CgAdd className="text-xl" />
              <p className="mt-2 text-gray-500">Select Image</p>
            </div>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}

        <button
          className="mt-8 bg-blue-500 text-white flex gap-2 items-center rounded-md px-4 py-2"
          onClick={handleDownload}
        >
          <CgSoftwareDownload className="text-2xl" /> Download
        </button>
      </section>
      <section className="w-full h-full bg-white overflow-auto px-4 py-8">
        <h1 className="text-gray-800 font-semibold text-2xl pb-3 border-b">
          Editor
        </h1>
        <div className="mt-8">
          <label htmlFor="title">Product Title</label>
          <input
            id="title"
            className="w-full mt-1 px-3 py-2 border-2 rounded-md border-gray-200 outline-none"
            placeholder="Eg: Diamong ring, Premium shoes, etc"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="mt-8 border-t pt-4">
          <label htmlFor="font-size">Font Size</label>
          <input
            type="range"
            min="1"
            max="100"
            className="w-full mt-1"
            id="font-size"
            onChange={(e) => setTextSize(e.target.value)}
          />
        </div>
        <div className="mt-8 border-t pt-4">
          <p>Font Styling</p>
          <div className="flex justify-between w-full gap-6 mt-4">
            <StyleOptions
              textStyle={textStyle}
              onStyleChange={handleStyleChange}
            />
            <AlignmentOptions
              textAlign={textAlign}
              onAlignmentChange={setTextAlign}
            />
          </div>
        </div>
        <div className="mt-8">
          <Colorful
            className="!w-full"
            color={textColor}
            onChange={(color) => {
              setTextColor(color.hexa);
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default App;
