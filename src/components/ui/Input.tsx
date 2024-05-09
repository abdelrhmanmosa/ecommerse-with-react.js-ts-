import { InputHTMLAttributes } from "react";
interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IProps) => {
  return <input type="text" className="border border-gray-300 rounded-md shadow-md p-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" {...rest} />;
};

export default Input;
