/* eslint-disable react-refresh/only-export-components */
import { InputHTMLAttributes, Ref, forwardRef, memo } from "react";
interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      type="text"
      className="border border-gray-300 rounded-md shadow-md p-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      {...rest}
    />
  );
});

export default memo(Input);
