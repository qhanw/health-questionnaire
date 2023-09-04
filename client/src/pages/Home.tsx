import { useNavigate } from "react-router-dom";

import { Button } from "antd-mobile";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <header>
        <h1>四川省应对重大突发公共卫生事件公众认知及行为调查问卷</h1>
      </header>
      <main>
        <p>您好！</p>
        <p>
          为了解公众对重大突发公共卫生事件（如：新冠疫情）的认知、行为和政策需求，提高我省应对重大突发公共卫生事件的能力，我单位诚邀您参与此次公众认知及行为调查。问卷匿名填写，不涉及个人隐私，请您根据自己真实感知如实填写，您的回答我们不会予以公开，仅用于四川省卫生政策研究分析，请您放心填写，谢谢您的支持！
        </p>
        <div className="subtitle">四川省卫生健康政策和医学情报研究所</div>
        <small>
          注：突发公共卫生事件定义：指突然发生，造成或者可能造成社会公众健康严重损害的重大传染病疫情、群体性不明原因疾病、重大食物和职业中毒以及其他严重影响公众健康的事件。如此次发生的新冠肺炎疫情、2003年发生的“非典”等。
        </small>
      </main>
      <Button color="primary" block onClick={() => navigate("/part-1")}>
        开始答卷
      </Button>
    </div>
  );
}

export default Home;
