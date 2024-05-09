import Button from "./components/ui/Button";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data/index";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { errorsValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";

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
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  // console.log(error);
  const [product, setProduct] = useState<IProduct>(defaultProductObject);
  //** Handlers
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
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
  const oncancel = () => {
    setProduct(defaultProductObject);
    setIsOpen(false);
  };
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
      console.log("sen data to server");
    }
  };
  //** Render
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
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

  return (
    <main className="container">
      <Button
        className="bg-blue-800 w-fit hover:bg-blue-500"
        onClick={() => {
          openModal();
        }}
      >
        ADD
      </Button>
      <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormList}
          <div className="flex items-center justify-between space-x-3">
            <Button className="bg-blue-800 hover:bg-blue-500">ADD</Button>
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
