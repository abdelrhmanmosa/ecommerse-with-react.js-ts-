import { IProduct } from "../interfaces";
import { textCut } from "../utils/functions";
import CircleColor from "./CircleColor";
import Images from "./Images";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
}
const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
}: IProps) => {
  const { title, description, price, imageURL, category, colors } = product;

  //** Render
  const renderProductColor = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));
  //** Handler
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  };

  return (
    <div className="border rounded-md p-2 flex flex-col max-w-sm md:max-w-lg mx-auto">
      <Images
        imageURL={imageURL}
        alt={category.name}
        className="rounded-md h-52 w-full lg:object-cover"
      />
      <h3 className="text-lg font-semibold">{textCut(title, 20)}</h3>
      <p className="text-xs text-gray-500 break-words">
        {textCut(description)}
      </p>

      <div className="flex flex-wrap item-center my-4 space-x-1 ">
        {renderProductColor}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg text-indigo-600 font-semibold">${price}</span>
        <div className="flex items-center">
          <span className="text-xs font-semibold mr-2">{category.name}</span>
          <Images
            imageURL={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-bottom "
          />
        </div>
      </div>

      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-blue-800" onClick={onEdit}>
          EDIT
        </Button>
        <Button className="bg-red-800">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
