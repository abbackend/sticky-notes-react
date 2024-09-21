import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Color from "./Color";

const Controls = () => {
  return (
    <div className="flex flex-col gap-5 items-center fixed top-1/2 left-5 bg-[#35363e] p-4 rounded-full -translate-y-1/2">
      <AddButton />
      {colors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
    </div>
  );
};

export default Controls;
