import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Button, NavBar, Modal, Form, Grid } from "antd-mobile";

import {
  ageValidator,
  familyPopulationValidator,
  requireValidator,
} from "../validate";
import { storage } from "../utils/utils";
import Renderer from "../components/Renderer";
import type { QuestionType } from "../components/Renderer";

const alert = Modal.alert;

const questions: QuestionType[] = [
  // {
  //   order: 1,
  //   desc: "问卷归属地是？",
  //   type: "pick",
  //   rules: [
  //     {
  //       validator: (_: any, value: any) => {
  //         if (value === undefined) {
  //           return Promise.reject(`问题${_.field}：请先获取地址！`);
  //         }

  //         return Promise.resolve();
  //       },
  //     },
  //   ],
  // },
  {
    order: 2,
    desc: "您现在居住在？",
    type: "radio",
    options: [
      { value: 1, label: "农村" },
      { value: 2, label: "城填" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 3,
    desc: "您的性别是？",
    type: "radio",
    options: [
      { value: 1, label: "男" },
      { value: 2, label: "女" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 4,
    desc: "您的年龄多少岁？",
    type: "input",
    rules: [{ validator: ageValidator }],
  },
  {
    order: 5,
    desc: "您的婚姻状况是？",
    type: "radio",
    options: [
      { value: 1, label: "未婚" },
      { value: 2, label: "已婚" },
      { value: 3, label: "离婚" },
      { value: 4, label: "丧偶" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 6,
    desc: "您的民族是？",
    type: "radio",
    remark: true,
    options: [
      { value: 1, label: "汉族" },
      { value: 2, label: "藏族" },
      { value: 3, label: "彝族" },
      { value: 4, label: "羌族" },
      { value: -1, label: "其他（请注明）" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 7,
    desc: "您已经完成的最高学历是？",
    type: "radio",
    options: [
      { value: 1, label: "小学及以下" },
      { value: 2, label: "初中" },
      { value: 3, label: "高中/中专/技校/职高" },
      { value: 4, label: "大专" },
      { value: 5, label: "大学本科" },
      { value: 6, label: "硕士" },
      { value: 7, label: "博士" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 8,
    desc: "您的家庭常住人口人数?（指每年在家居住半年以上）",
    type: "input",
    rules: [{ validator: familyPopulationValidator }],
  },
  {
    order: 9,
    desc: "您主要从事什么工作？",
    type: "radio",
    options: [
      { value: 1, label: "党政机关/事业单位/国有企业工作人员" },
      { value: 2, label: "民营企业人员" },
      { value: 3, label: "自由职业者/灵活就业（含打工）" },
      { value: 4, label: "个体户" },
      { value: 5, label: "农民" },
      { value: 6, label: "学生" },
      { value: 7, label: "离退休人员" },
      { value: 8, label: "无业" },
      { value: -1, label: "其他" },
    ],
    rules: [{ validator: requireValidator }],
  },
  {
    order: 10,
    desc: "您每个月的收入有多少？",
    type: "radio",
    options: [
      { value: 1, label: "2000元以下" },
      { value: 2, label: "2000~5000元" },
      { value: 3, label: "5001~1万元" },
      { value: 4, label: "1~2万元" },
      { value: 5, label: "2~3万元" },
      { value: 6, label: "3万元以上" },
    ],
    rules: [{ validator: requireValidator }],
  },
];

export default function Page() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const cache = storage.get("fieldsValue") || {};
    if (cache.part1) form.setFieldsValue(cache.part1);
  }, []);

  return (
    <>
      <NavBar onBack={() => navigate(-1)}>第一部分</NavBar>

      <Form
        form={form}
        footer={
          <Grid columns={2} gap={8}>
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
                        title: "提交验证失败",
                        content: errs.map((c: any) => <div key={c}>{c}</div>),
                      });
                    });

                  if (values) {
                    const cache = storage.get("fieldsValue") || {};
                    storage.set("fieldsValue", { ...cache, part1: values });
                    navigate("/part-2");
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
