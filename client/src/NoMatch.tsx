import { Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";

function NoMatch() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h3 style={{ marginTop: "-20%" }}>404</h3>
      <p>Sorry, the page you visited does not exist.</p>
      <Button
        style={{ width: 160, marginTop: 48 }}
        color="primary"
        onClick={() => navigate("/")}
      >
        返回主页
      </Button>
    </div>
  );
}

export default NoMatch;
