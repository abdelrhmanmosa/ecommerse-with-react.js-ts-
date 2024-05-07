import { IProduct } from "../interfaces";
import { textCut } from "../utils/functions";
import Images from "./Images";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { title, description, price, imageURL, category } = product;
  return (
    <div className="border rounded-md p-2 flex flex-col max-w-sm md:max-w-lg mx-auto">
      <Images
        textUrl={imageURL}
        alt={category.name}
        className="rounded-md h-52 w-full lg:object-cover"
      />
      <h3 className="text-lg font-semibold">{textCut(title, 20)}</h3>
      <p className="text-xs text-gray-500 break-words">{textCut(description)}</p>
      <div className="flex flex-wrap item-center my-4 space-x-1">
        <span className="w-5 h-5 bg-red-900 rounded-full " />
        <span className="w-5 h-5 bg-red-900 rounded-full " />
        <span className="w-5 h-5 bg-red-900 rounded-full " />
      </div>

      <div className="flex justify-between items-center mb-4">
        <span>{price}$</span>
        <Images
          textUrl={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-bottom "
        />
      </div>

      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-blue-800" >
          EDIT
        </Button>
        <Button className="bg-red-800" >
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
