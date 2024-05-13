import Button from "./components/ui/Button";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data/index";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { errorsValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import SelectMenu from "./components/ui/Select";
import { TproductName } from "./types";

function App() {
  const defaultProductObject = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  //? state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [product, setProduct] = useState<IProduct>(defaultProductObject);
  const [temp, setTemp] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObject);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  // console.log(productToEdit);
  // console.log(productToEditIdx);
  //** Handlers
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeEditModal() {
    setIsOpenModalEdit(false);
  }
  function openEditModal() {
    setIsOpenModalEdit(true);
  }
  const renderInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  //* Edit form
  const renderInputEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const oncancel = () => {
    setProductToEdit(defaultProductObject);
    setIsOpen(false);
  };
  // * on submit
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = errorsValidation({ title, description, imageURL, price });
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    } else {
      setProducts((prev) => [
        ...prev,
        { ...product, id: uuid(), colors: temp, category: selectedCategory },
      ]);
      setProduct(defaultProductObject);
      setTemp([]);
      closeModal();
    }
  };
  //* on submitEdit
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = productToEdit;
    const errors = errorsValidation({ title, description, imageURL, price });
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: temp.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);
    setProductToEdit(defaultProductObject);
    setTemp([]);
    closeEditModal();
  };
  //** Render
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      setProductToEditIdx={setProductToEditIdx}
      idx={idx}
    />
  ));
  const renderFormList = formInputsList.map((input) => (
    <div className="flex flex-col " key={input.id}>
      <label
        htmlFor={input.id}
        className="mb text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={renderInputHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));
  //* edit form
  const renderEditFormListWithError = (
    id: string,
    label: string,
    name: TproductName
  ) => (
    <div className="flex flex-col ">
      <label htmlFor={id} className="mb text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input
        type={"text"}
        id={id}
        name={name}
        value={productToEdit[name]}
        onChange={renderInputEditHandler}
      />
      <ErrorMessage msg={errors[name]} />
    </div>
  );
  const renderProductColor = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (temp.includes(color)) {
          setTemp((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTemp((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTemp((prev) => [...prev, color]);
      }}
    />
  ));

  return (
    <main className="container">
      <div className="flex justify-center m-3">
        <Button
          className="bg-blue-800 hover:bg-blue-500 m-auto"
          width="w-fit"
          onClick={() => {
            openModal();
          }}
        >
          Create New Product
        </Button>
      </div>
      <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderProductList}
      </div>
      {/* ADD PRODUCT MODAL */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormList}
          <SelectMenu
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="flex flex-wrap item-center my-4 space-x-1 ">
            {renderProductColor}
          </div>
          <div className="flex flex-wrap item-center my-4 space-x-1 ">
            {temp.map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className={
                  "text-white p-1 mr-1 mb-1 rounded-md text-xm cursor-pointer"
                }
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between space-x-3">
            <Button className="bg-blue-800 hover:bg-blue-500">SUBMIT</Button>
            <Button
              className="bg-gray-800 hover:bg-gray-500"
              onClick={oncancel}
            >
              CANCEL
            </Button>
          </div>
        </form>
      </Modal>
      {/* EDIT PRODUCT MODAL */}
      <Modal
        isOpen={isOpenModalEdit}
        closeModal={closeEditModal}
        title="Edit This Product"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderEditFormListWithError("title", "Product Title", "title")}
          {renderEditFormListWithError(
            "description",
            "Product Description",
            "description"
          )}
          {renderEditFormListWithError(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderEditFormListWithError("price", "Product Price", "price")}
          <SelectMenu
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex flex-wrap item-center my-4 space-x-1 ">
            {renderProductColor}
          </div>
          <div className="flex flex-wrap item-center my-4 space-x-1 ">
            {!colors.length ? (
              <p className="min-h-[20px]">Not available colors</p>
            ) : (
              renderProductColor
            )}
          </div>
          <div className="flex flex-wrap item-center my-4 space-x-1 ">
            {temp.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className={
                  "text-white p-1 mr-1 mb-1 rounded-md text-xm cursor-pointer"
                }
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between space-x-3">
            <Button className="bg-blue-800 hover:bg-blue-500">EDIT</Button>
            <Button
              className="bg-gray-800 hover:bg-gray-500"
              onClick={oncancel}
            >
              CANCEL
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
