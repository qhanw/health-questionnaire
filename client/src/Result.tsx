import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd-mobile";
import { SmileOutline } from "antd-mobile-icons";
import "./Result.css";

function Page() {
  const navigate = useNavigate();
  return (
    <div className="result">
      <Result
        icon={<SmileOutline />}
        title="提交成功"
        description="感谢参与此次问卷的调查"
      />
      <Button
        color="primary"
        onClick={() => {
          sessionStorage.clear();
          navigate("/");
        }}
      >
        完成
      </Button>
    </div>
  );
}

export default Page;
