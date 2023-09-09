import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, List, NavBar, Form, Grid, Modal } from "antd-mobile";

import RadioGroup from "../components/RadioGroup";
import CheckboxGroup from "../components/CheckboxGroup";

import { remarkValidator, requireValidator } from "../validate";
import { storage } from "../utils/utils";

const FormItem = Form.Item;
const alert = Modal.alert;

const rate = [
  { value: 5, label: "完全不同意" },
  { value: 4, label: "不太同意" },
  { value: 3, label: "一般" },
  { value: 2, label: "比较同意" },
  { value: 1, label: "非常同意" },
];

export default function Page() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState<boolean>();

  useEffect(() => {
    const cache = storage.get("fieldsValue") || {};
    if (cache.part2) {
      form.setFieldsValue(cache.part2);
      setDisabled(!!cache.part2["3"]?.includes(-2));
    }
  }, []);

  const onChangeThree = (v: any) => {
    const disabled = !!v?.includes(-2);
    setDisabled(disabled);
    if (disabled) {
      form.setFieldsValue({ "4": undefined, "5": undefined, "6": undefined });
    }
  };

  return (
    <>
      <NavBar onBack={() => navigate(-1)}>第二部分</NavBar>
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
                    storage.set("fieldsValue", { ...cache, part2: values });
                    navigate("/part-3");
                  }
                }}
              >
                下一部分
              </Button>
            </Grid.Item>
          </Grid>
        }
      >
        <FormItem
          name="1"
          rules={[{ validator: remarkValidator }]}
          label="1、请您回忆一下，是否经历过（包括自身感染或周围发生过）以下事件（可多选）？"
        >
          <CheckboxGroup
            options={[
              { value: 1, label: "“非典”（SARS）" },
              { value: 2, label: "甲型H1N1流感" },
              { value: 3, label: "禽流感" },
              { value: -2, label: "未经历过" },
              { value: -1, label: "其他（请注明）" },
            ]}
            remark
          />
        </FormItem>
        <FormItem
          name="2"
          rules={[{ validator: requireValidator }]}
          label="2、是否害怕自己会感染上新冠病毒？"
        >
          <RadioGroup
            options={[
              { value: 1, label: "非常害怕" },
              { value: 2, label: "比较害怕" },
              { value: 3, label: "有点害怕" },
              { value: 4, label: "不太害怕" },
              { value: 5, label: "不害怕" },
            ]}
          />
        </FormItem>
        <FormItem
          name="3"
          rules={[{ validator: remarkValidator }]}
          label="3、新冠疫情期间，您是否出现过以下情绪？（可多选，如选有最后一项，则跳至第7题）"
        >
          <CheckboxGroup
            options={[
              { value: 1, label: "焦虑" },
              { value: 2, label: "悲伤" },
              { value: 3, label: "恐惧" },
              { value: 4, label: "愤怒" },
              { value: -2, label: "以上都没有" },
            ]}
            onSelfChange={onChangeThree}
          />
        </FormItem>

        <FormItem
          name="4"
          {...(disabled ? {} : { rules: [{ validator: remarkValidator }] })}
          label="4、如若因疫情出现不良情绪，您是如何应对的？（可多选）"
        >
          <CheckboxGroup
            disabled={disabled}
            options={[
              { value: 1, label: "专业医疗机构就诊" },
              { value: 2, label: "心理援助热线" },
              { value: 3, label: "网络咨询" },
              { value: 4, label: "告知亲友，寻求帮助" },
              { value: 5, label: "自行调节" },
              { value: -2, label: "不知道该怎么办" },
            ]}
          />
        </FormItem>
        <FormItem
          name="5"
          {...(disabled ? {} : { rules: [{ validator: requireValidator }] })}
          label="5、经过以上调整后，是否还出现不良情绪？"
        >
          <RadioGroup
            disabled={disabled}
            options={[
              { value: 1, label: "不再出现" },
              { value: 2, label: "偶尔会出现" },
              { value: 3, label: "经常会出现" },
            ]}
          />
        </FormItem>

        <FormItem
          name="6"
          {...(disabled ? {} : { rules: [{ validator: requireValidator }] })}
          label="6、不良情绪对您的日常生活、工作和学习等的影响程度如何？"
        >
          <RadioGroup
            disabled={disabled}
            options={[
              { value: 1, label: "完全没影响" },
              { value: 2, label: "影响很小" },
              { value: 3, label: "有一些影响" },
              { value: 4, label: "有较大影响" },
              { value: 5, label: "影响很大" },
            ]}
          />
        </FormItem>

        {[
          {
            order: 7,
            desc: "关于新冠肺炎疫情，您是否同意以下说法？",
            type: "children",
            children: [
              { order: 1, desc: "新冠病毒会变得越来越危险" },
              { order: 2, desc: "患新冠肺炎后，死亡的风险很大" },
              { order: 3, desc: "新冠疫情对我的生活造成了很大影响" },
              { order: 4, desc: "如果患了新冠肺炎，会影响到下一代" },
              { order: 5, desc: "目前科学家还不完全了解新冠病毒" },
              { order: 6, desc: "无法预知新冠肺炎还会流行多久" },
            ],
            options: rate,
          },
          {
            order: 8,
            desc: "关于重大突发公共卫生事件，您是否同意以下说法？",
            type: "children",
            children: [
              { order: 1, desc: "重大突发公共卫生事件经常会发生" },
              { order: 2, desc: "人们可以控制重大突发公共卫生事件的发生" },
              { order: 3, desc: "会对我们的生活造成很大影响" },
              { order: 4, desc: "会威胁到我们的生命安全" },
              { order: 5, desc: "会影响到下一代" },
              { order: 6, desc: "通常是一场全球性灾难" },
              { order: 7, desc: "我非常害怕发生重大突发公共卫生事件" },
              { order: 8, desc: "造成的后果会延迟发生" },
              { order: 9, desc: "其发生是无法预知的" },
              {
                order: 10,
                desc: "您所在的城市（地区）非常安全，足以应对重大突发公共卫生事件",
              },
            ],
            options: rate,
          },
        ].map((ques) => (
          <List
            key={ques.order}
            header={
              <div style={{ display: "flex" }}>
                <span>{ques.order}、</span>
                <div style={{ marginLeft: 0 }}>{ques.desc}</div>
              </div>
            }
          >
            {ques.children.map((c) => (
              <FormItem
                key={c.order}
                name={`${ques.order}.${c.order}`}
                rules={[{ validator: requireValidator }]}
                label={`${ques.order}.${c.order}、${c.desc}`}
              >
                <RadioGroup options={ques.options} />
              </FormItem>
            ))}
          </List>
        ))}
      </Form>
    </>
  );
}
