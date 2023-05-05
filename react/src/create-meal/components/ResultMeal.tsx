import { useState, FC, ReactNode } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

interface Props {
  description: string;
  title: string;
  image: string;
}

type Status = "success" | "fail" | "pending";
const ResultMeal = ({ description, title, image }: Props) => {
  const Pending = () => {
    return (
      <div className="result-meal__container">
        <h4 className="result-meal__title">{title}</h4>
        <img src={image} alt="" className="result-meal__img" />
        <p className="result-meal__desc">{description}</p>
        <button className="result-meal__button" onClick={createNewMeal}>
          Agiungi
        </button>
      </div>
    );
  };
  const Executed: FC<{
    children: ReactNode;
    color: string;
  }> = ({ children, color }) => {
    return (
      <div className="result-meal__container">
        <div
          className="result__status-container"
          style={{ backgroundColor: color }}
        >
          {children}
        </div>
      </div>
    );
  };
  const Success = () => {
    return (
      <Executed color="#ccffcc">
        <FaCheckCircle size={90} color="green" />
      </Executed>
    );
  };
  const Fail = () => {
    return (
      <Executed color="#ffcccc">
        <FaTimes size={90} color="red" />
      </Executed>
    );
  };

  const [status, setStatus] = useState<Status>("pending");

  const createNewMeal = async () => {
    try {
      console.log({ description, title, image });
      setStatus("success");
    } catch (err) {
      console.log(err);
      setStatus("fail");
    }
  };

  switch (status) {
    case "pending":
      return <Pending />;
      break;
    case "success":
      return <Success />;
      break;
    case "fail":
      return <Fail />;
      break;
    default:
      return null;
  }
};

export default ResultMeal;
