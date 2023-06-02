import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, List, NavBar, Grid, Input, Modal, Form } from "antd-mobile";
import RadioGroup from "./components/RadioGroup";
import CheckboxGroup from "./components/CheckboxGroup";

import { remarkValidator, requireValidator } from "./validate";
import { storage } from "./utils";
import { useMutate } from "./service";

const FormItem = Form.Item;

const alert = Modal.alert;
const rate = [
  { value: 1, label: "非常满意" },
  { value: 2, label: "比较满意" },
  { value: 3, label: "一般" },
  { value: 4, label: "比较不满意" },
  { value: 5, label: "非常不满意" },
];

const rateImportant = [
  { value: 1, label: "非常重要" },
  { value: 2, label: "比较重要" },
  { value: 3, label: "一般" },
  { value: 4, label: "不太重要" },
  { value: 5, label: "不重要" },
];

function Page() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState<boolean>(false);

  const { loading, run } = useMutate();

  useEffect(() => {
    const cache = storage.get("fieldsValue") || {};
    if (cache.part4) {
      form.setFieldsValue(cache.part4);
      setDisabled(!(+cache.part4["6"] === 2));
    }
  }, []);

  const onChangeSix = (v: any) => {
    const disabled = !(+v === 2);

    setDisabled(disabled);

    if (disabled) {
      form.setFieldsValue({ "7": undefined });
    }
  };

  const onSubmit = async () => {
    const values = await form.validateFields().catch(({ errorFields }) => {
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

      const final = { ...cache, part4: values };

      storage.set("fieldsValue", final);

      const submitValues = Object.entries(final).reduce(
        (prev, [key, val]) => ({
          ...prev,
          [key]: Object.entries(val as any).reduce(
            (a, b) => ({
              ...a,
              [`q${b[0].replace(/\./gi, "_")}`]: b[1],
            }),
            {} as any
          ),
        }),
        {} as any
      );

      run(submitValues, () => {
        storage.clear();
        navigate("/", { replace: true });
        navigate("/result");
      });
    }
  };
  return (
    <>
      <NavBar onBack={() => navigate(-1)}>第四部分</NavBar>
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
                loading={loading}
                onClick={onSubmit}
              >
                提交
              </Button>
            </Grid.Item>
          </Grid>
        }
      >
        {[
          {
            order: 1,
            desc: "此次疫情防控中，政府采取了一系列措施，请根据您对此次新冠疫情防控工作的感受如实客观填写。",
            children: [
              { order: 1, desc: "您对政府的反应速度是否满意？" },
              { order: 2, desc: "您对政府的社会动员能力是否满意？" },
              {
                order: 3,
                desc: "您对政府与公众之间的信息沟通和反馈机制是否满意？",
              },
              { order: 4, desc: "您对疫情相关健康知识宣传是否满意？" },
              {
                order: 5,
                desc: "您对此次新冠疫情政府采取的防疫措施是否满意？",
              },
              { order: 6, desc: "您对此次的医疗救治能力是否满意？" },
              { order: 7, desc: "您对此次的医疗保障政策是否满意？" },
              { order: 8, desc: "您对疫情期间开展的心理健康服务是否满意？" },
              { order: 9, desc: "您对疫情信息公布的及时性是否满意？" },
              { order: 10, desc: "您对疫情信息数据公开透明情况是否满意？" },
              {
                order: 11,
                desc: "您对疫情防控中，政府的物资供应保障是否满意？",
              },
              {
                order: 12,
                desc: "您对政府实施的人员管控措施（如隔离、健康码通行等）是否满意？",
              },
              { order: 13, desc: "您对所在社区（村）的疫情防控工作是否满意？" },
              { order: 14, desc: "总体来看，您对此次疫情防控工作是否满意？" },
            ],
            options: rate,
          },
          {
            order: 2,
            desc: "在发生重大突发公共卫生事件时，您认为政府向公众提供的以下服务是否重要？",
            children: [
              { order: 1, desc: "防护知识宣传" },
              { order: 2, desc: "疫情动态数据（如确诊病例数）公布" },
              { order: 3, desc: "开展医疗救治" },
              { order: 4, desc: "医疗救治相关费用保障" },
              { order: 5, desc: "心理健康咨询服务" },
              { order: 6, desc: "疫苗接种" },
              { order: 7, desc: "必备防疫物资供应" },
              { order: 8, desc: "生活物资保障" },
              { order: 9, desc: "复工复产相关保障" },
              { order: 10, desc: "疫情相关科研进展信息公布" },
            ],
            options: rateImportant,
          },
        ].map((ques) => (
          <List
            key={ques.order}
            header={
              <div style={{ display: "flex" }}>
                <span>{ques.order}、</span>
                <div>{ques.desc}</div>
              </div>
            }
          >
            {ques.children.map((c) => (
              <FormItem
                key={c.order}
                name={`${ques.order}.${c.order}`}
                rules={[{ validator: requireValidator }]}
                label={
                  <>
                    {ques.order}.{c.order}、{c.desc}
                  </>
                }
              >
                <RadioGroup options={ques.options} />
              </FormItem>
            ))}
          </List>
        ))}

        <FormItem
          name="3"
          rules={[{ validator: remarkValidator }]}
          label="3、为减少重大突发公共卫生事件的发生，您认为政府在管理上还需要加强哪些方面的工作？（选择您认为最重要的3项）"
        >
          <CheckboxGroup
            options={[
              { value: 1, label: "保持环境卫生" },
              { value: 2, label: "加强社会动员" },
              { value: 3, label: "及时公开信息" },
              { value: 4, label: "加强预警监测" },
              { value: 5, label: "提高基层的治理水平" },
              { value: 6, label: "加强疾控机构能力建设" },
              { value: 7, label: "改善社区医院/乡镇卫生院和诊所的条件" },
              { value: 8, label: "加强科研能力" },
              { value: 9, label: "提高信息化技术应用水平" },
              { value: -1, label: "其他（请注明）" },
            ]}
            remark
            max={3}
          />
        </FormItem>
        <FormItem
          name="4"
          rules={[{ validator: requireValidator }]}
          label="4、重大突发公共卫生事件的应对需要政府、社会和个人的共同参与，您是否愿意参与其中？"
        >
          <RadioGroup
            options={[
              { value: 1, label: "非常愿意" },
              { value: 2, label: "愿意" },
              { value: 3, label: "一般" },
              { value: 4, label: "不太愿意" },
              { value: 5, label: "非常不愿意" },
            ]}
          />
        </FormItem>
        <FormItem
          name="5"
          rules={[{ validator: remarkValidator }]}
          label="5、如果愿意参与，您希望通过什么方式参与进来？（可多选）"
        >
          <CheckboxGroup
            options={[
              { value: 1, label: "主动学习卫生应急相关知识，提升应对能力" },
              { value: 2, label: "积极主动参与配合抗疫工作" },
              { value: 3, label: "平时主动搜集和上报相关风险信息" },
              { value: -1, label: "其他（请注明）" },
            ]}
            remark
          />
        </FormItem>
        <FormItem
          name="6"
          rules={[{ validator: requireValidator }]}
          label="6、目前您是否愿意接种新冠疫苗？（如果不愿意，请继续回答第7题）"
        >
          <RadioGroup
            options={[
              { value: 1, label: "愿意" },
              { value: 2, label: "不愿意" },
              { value: 3, label: "已接种过新冠疫苗" },
            ]}
            onSelfChange={onChangeSix}
          />
        </FormItem>

        <FormItem
          name="7"
          {...(disabled ? {} : { rules: [{ validator: remarkValidator }] })}
          label="7、如果不愿意，您不愿意接种的原因是？（可多选）"
          shouldUpdate
        >
          <CheckboxGroup
            disabled={disabled}
            options={[
              { value: 1, label: "担心疫苗的有效性" },
              { value: 2, label: "担心疫苗的安全性" },
              { value: 3, label: "疫苗刚上市需要时间考虑" },
              { value: 4, label: "担心疫苗的副作用大" },
              { value: 5, label: "对疫苗的真假心存疑虑" },
              { value: 6, label: "觉得没有必要接种" },
              { value: -1, label: "其他（请注明）" },
            ]}
            remark
          />
        </FormItem>
        <FormItem
          name="tel"
          label="为确保问卷数据的真实性，请填写您的手机号码！感谢您的配合！"
          rules={[
            { required: true, message: "请输入手机号码!" },
            { pattern: /^1\d{10}$/, message: "请输入11位手机号码！" },
          ]}
        >
          <Input placeholder="请输入手机号码" />
        </FormItem>
      </Form>
    </>
  );
}

export default Page;
