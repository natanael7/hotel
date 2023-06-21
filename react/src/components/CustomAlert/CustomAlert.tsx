import { FC } from "react";
import { Alert } from "antd";
import "./style.css";

type AlertType = "success" | "info" | "warning" | "error" | "hidden";
interface AlertStateInterface {
  text: string;
  type: AlertType;
}

const CustomAlert: FC<AlertStateInterface> = ({ text, type }) => {
  return (
    <div className={`fade-out ${type != "hidden" ? "visible" : "hidden"}`}>
      <Alert
        message={text}
        type={type != "hidden" ? type : "success"}
        style={{
          position: "absolute",
          left: "46.5%",
          top: "10px",
        }}
      />
    </div>
  );
};

export default CustomAlert;
