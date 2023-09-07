import { useEffect, useState } from "react";
import { Form, Input, Toast, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import SendCode from "../components/SendCode";
import { useValidateCode, useGetCode } from "../service";
import { storage } from "../utils";
import "./SMS.css";

export default function SMS() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { run: fetchCode } = useGetCode();
  const { run: validate, loading } = useValidateCode();

  const [start, setStart] = useState(false);
  const onClickSendCode = () => {
    const tel = form.getFieldValue("tel");

    if (tel) {
      fetchCode({ tel: tel.replace(/\s/g, "") });
      setStart(true);
    } else {
      Toast.show({ icon: "fail", content: "请输入11位手机号码！" });
    }
  };

  const onValidate = async () => {
    const v = await form.validateFields().catch(() => {
      Toast.show({ icon: "fail", content: "请输入11位手机号码！" });
    });

    const { tel, code } = v || {};

    if (!tel)
      return Toast.show({ icon: "fail", content: "请输入11位手机号码！" });

    if (!code) return Toast.show({ icon: "fail", content: "请输入验证码！" });

    if (tel && code) {
      const num = tel.replace(/\s/g, "");
      validate({ tel: num, code }, () => {
        Toast.show({
          icon: "success",
          content: "验证成功",
          duration: 1,
          afterClose: () => {
            navigate("/part-1");
            storage.set("identity", num);
          },
        });
      });
      //   history.push("/part-1");
      //   storage.set("identity", num);
    }
  };

  useEffect(() => {
    if (storage.get("identity")) {
      navigate("/part-1");
    }
  }, []);

  return (
    <div className="sms">
      <header>
        <h1>四川省应对重大突发公共卫生事件公众认知及行为调查问卷</h1>
      </header>
      <div className="sms-description">
        <p>
          为确保问卷数据的真实性，我们需要进行短信验证！每个手机号只能提交一次问卷，且不可修改，请认真填写！
        </p>

        <p>感谢您的配合。</p>
      </div>
      <Form
        form={form}
        layout="horizontal"
        footer={
          <Button
            loading={loading}
            block
            type="submit"
            color="primary"
            onClick={onValidate}
          >
            开始验证
          </Button>
        }
      >
        <Form.Item
          label="手机号码"
          rules={[{ required: true, message: "姓名不能为空" }]}
          name="tel"
          extra={
            <SendCode
              size="small"
              fill="outline"
              start={start}
              storageKey="plus-send-code"
              onClick={onClickSendCode}
              onEnd={() => setStart(false)}
            />
          }
          required={false}
          hasFeedback={false}
        >
          <Input placeholder="请输入手机号码" />
        </Form.Item>
        <Form.Item
          label="验证码"
          name="code"
          rules={[{ required: true, message: "请输入验证码" }]}
          required={false}
          hasFeedback={false}
        >
          <Input type="number" placeholder="请输入验证码" maxLength={6} />
        </Form.Item>
      </Form>
    </div>
  );
}
