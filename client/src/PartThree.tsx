import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Button, NavBar, Grid, Modal, Form } from "antd-mobile";

import { remarkValidator, requireValidator } from "./validate";
import Renderer from "./components/Renderer";
import type { QuestionType } from "./components/Renderer";
import { storage } from "./utils";

const alert = Modal.alert;
const questions: QuestionType[] = [
  {
    order: 1,
    desc: "关于疫情信息，以下哪些说法与您相符？",
    type: "radio",
    options: [
      { value: 1, label: "我总是找不到想要的疫情信息" },
      { value: 2, label: "我知道去哪儿寻找疫情相关信息" },
      { value: 3, label: "我能比较容易获得所需要的疫情信息" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 2,
    desc: "您一般从哪些渠道获取传染病疫情相关信息？（可多选）",
    type: "checkbox",
    remark: true,
    options: [
      { value: 1, label: "电视" },
      { value: 2, label: "报纸和广播" },
      { value: 3, label: "政府相关部门官方网站" },
      { value: 4, label: "亲戚朋友告知" },
      { value: 5, label: "微信（微信群、公众号、朋友圈）" },
      { value: 6, label: "短视频APP（如抖音、快手等）" },
      { value: 7, label: "市场化媒体及其APP（如今日头条、微博）" },
      { value: -1, label: "其他（请注明）" },
    ],
    rules: [{ validator: remarkValidator }],
  },
  {
    order: 3,
    desc: (
      <>
        <strong>新冠疫情期间</strong>，关于疫情相关信息,以下哪些说法与您相符？
      </>
    ),
    type: "radio",
    options: [
      { value: 1, label: "我会尽最大可能获取更多关于新冠疫情的相关信息" },
      { value: 2, label: "当出现新冠疫情相关信息时，我会尝试了解更多" },
      { value: 3, label: "当出现新冠疫情相关信息时，我不会忽视它" },
      { value: 4, label: "当出现新冠疫情相关信息时，我只偶尔看看推送的信息" },
      { value: 5, label: "根本不关心" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 4,
    desc: (
      <>
        <strong>平时，对于传染病疫情等重大突发公共卫生事件信息</strong>
        ，以下哪些说法与您相符？
      </>
    ),
    type: "radio",
    options: [
      { value: 1, label: "我会尽最大可能获取更多关于突发公共卫生事件的信息" },
      { value: 2, label: "当出现重大突发公共卫生事件信息时，我会尝试了解更多" },
      { value: 3, label: "当出现重大突发公共卫生事件信息时，我不会忽视它" },
      {
        value: 4,
        label: "当出现重大突发公共卫生事件信息时，我只偶尔看看推送的信息",
      },
      { value: 5, label: "根本不关心" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 5,
    desc: "目前您掌握的疫情相关信息能否满足您的需求？",
    type: "radio",
    options: [
      { value: 1, label: "完全能满足" },
      { value: 2, label: "基本能满足" },
      { value: 3, label: "不太能满足" },
      { value: 4, label: "完全不能满足" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 6,
    desc: "您对重大突发公共卫生事件的信息发布政策是否了解？",
    type: "radio",
    options: [
      { value: 1, label: "非常了解" },
      { value: 2, label: "比较了解" },
      { value: 3, label: "一般了解" },
      { value: 4, label: "不太了解" },
      { value: 5, label: "完全不了解" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 7,
    desc: "如果有人散播传染病或突发事件的小道消息，您会如何应对？",
    type: "radio",
    options: [
      { value: 1, label: "相信，但不告知他人" },
      { value: 2, label: "相信，并告知他人" },
      { value: 3, label: "不相信，应从官方渠道获取" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 8,
    desc: "您是否了解发现传染病或疑似传染病病人时，公民的报告责任？",
    type: "radio",
    options: [
      { value: 1, label: "非常了解" },
      { value: 2, label: "比较了解" },
      { value: 3, label: "一般了解" },
      { value: 4, label: "不太了解" },
      { value: 5, label: "完全不了解" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 9,
    desc: "若您的周围出现传染病病人或疑似传染病病人时，您是否会及时向附近的疾控机构或医疗机构报告？",
    type: "radio",
    options: [
      { value: 1, label: "会" },
      { value: 2, label: "不会" },
      { value: 3, label: "不清楚" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 10,
    desc: "假如您周围发生了重大传染性疾病，您是否会积极配合医疗卫生人员采取调查、隔离、消毒等工作？",
    type: "radio",
    options: [
      { value: 1, label: "会" },
      { value: 2, label: "不会" },
      { value: 3, label: "不清楚" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 11,
    desc: "在突发事件卫生应急处置时，政府采取限制聚集性活动、人员活动、封锁疫区的措施，您的态度是？",
    type: "radio",
    options: [
      { value: 1, label: "反对，这是侵犯公民的合法权益" },
      { value: 2, label: "积极配合" },
      { value: 3, label: "不予理睬，按照自己意愿活动" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 12,
    desc: "当地发生重大传染病疫情时，您会做好个人防护，并尽量不去人群聚集的地方吗？",
    type: "radio",
    options: [
      { value: 1, label: "会" },
      { value: 2, label: "不会" },
      { value: 3, label: "不清楚" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 13,
    desc: "假如您从传染病正在流行的国家或地区旅行返回后，出现发热、腹泻等相同症状，您会怎么做？",
    type: "radio",
    options: [
      { value: 1, label: "自己到药店买药治疗" },
      { value: 2, label: "及时到医疗机构就诊，不会主动报告旅行史" },
      { value: 3, label: "及时到医疗机构就诊，并主动报告旅行史" },
      { value: 4, label: "在家卧床休息，等待自愈" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 14,
    desc: "您是否了解，如果拒绝配合传染病的调查、采集样本、隔离治疗等措施，会有什么法律后果？",
    type: "radio",
    options: [
      { value: 1, label: "非常了解" },
      { value: 2, label: "比较了解" },
      { value: 3, label: "一般了解" },
      { value: 4, label: "不太了解" },
      { value: 5, label: "完全不了解" },
    ],
    rules: [{ validator: requireValidator }],
  },
];

function Page() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const cache = storage.get("fieldsValue") || {};
    if (cache.part3) form.setFieldsValue(cache.part3);
  }, []);

  return (
    <>
      <NavBar onBack={() => navigate(-1)}>第三部分</NavBar>
      <Form
        form={form}
        footer={
          <Grid className="btn" columns={2} gap={8}>
            <Grid.Item>
              <Button block onClick={() => navigate(-1)}>
                上一部分
              </Button>
            </Grid.Item>
            <Grid.Item>
              <Button
                block
                color="primary"
                onClick={async () => {
                  const values = await form
                    .validateFields()
                    .catch(({ errorFields }) => {
                      const errs = errorFields.reduce(
                        (prev: any, next: any) => [...prev, ...next.errors],
                        []
                      );

                      alert({
                        content: (
                          <>
                            提交验证失败
                            <div
                              style={{
                                textAlign: "left",
                                overflowY: "auto",
                                maxHeight: "40vh",
                              }}
                            >
                              {errs.map((c: any) => (
                                <div>{c}</div>
                              ))}
                            </div>
                          </>
                        ),
                      });
                    });

                  if (values) {
                    const cache = storage.get("fieldsValue") || {};
                    storage.set("fieldsValue", { ...cache, part3: values });
                    navigate("/part-4");
                  }
                }}
              >
                下一部分
              </Button>
            </Grid.Item>
          </Grid>
        }
      >
        <Renderer data={questions} />
      </Form>
    </>
  );
}

export default Page;
