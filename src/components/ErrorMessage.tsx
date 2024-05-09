interface IProps {
  msg: string;
}

const ErrorMessage = ({ msg }: IProps) => {
  return msg ? (
    <span className="text-red-700 text-sm font-semibold block">{msg}</span>
  ) : null;
};

export default ErrorMessage;
