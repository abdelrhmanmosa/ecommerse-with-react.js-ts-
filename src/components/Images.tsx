interface IProps {
  textUrl: string;
  alt: string;
  className?: string;
}

const Images = ({ textUrl, alt, className }: IProps) => {
  return (
    <div>
      <img src={textUrl} alt={alt} className={className} />
    </div>
  );
};

export default Images;
