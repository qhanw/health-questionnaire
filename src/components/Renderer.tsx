import React from "react";

import { List, Input, Picker, Form, Radio } from "antd-mobile";

import RadioGroup from "./RadioGroup";
import CheckboxGroup from "./CheckboxGroup";
// import FormItem from "./FormItem";
import area from "../area";
import Location from "./Location";

export type QuestionType = {
  order: number;
  desc: React.ReactNode;
  type?: "radio" | "checkbox" | "children" | "input" | "pick";
  remark?: boolean;
  children?: QuestionType[];
  options?: { value: string | number; label: string }[];
  rules?: any;
};

type RendererType = {
  data: QuestionType[];
};

const FormItem = Form.Item;

function Renderer({ data }: RendererType) {
  const renderNode = (question: QuestionType) => {
    switch (question.type) {
      case "input":
        return (
          <FormItem
            name={`${question.order}`}
            label={
              <>
                {question.order}、{question.desc}
              </>
            }
            rules={question.rules}
          >
            <Input type="number" placeholder="请填写" />
          </FormItem>
        );
      case "radio":
        return (
          <FormItem
            name={`${question.order}`}
            label={
              <>
                {question.order}、{question.desc}
              </>
            }
            rules={question.rules}
          >
            <RadioGroup
              options={question.options || []}
              remark={question.remark}
            />
          </FormItem>
        );
      case "checkbox":
        return (
          <FormItem
            name={`${question.order}`}
            label={
              <>
                {question.order}、{question.desc}
              </>
            }
            rules={question.rules}
          >
            <CheckboxGroup
              options={question.options || []}
              remark={question.remark}
            />
          </FormItem>
        );

      case "children":
        return question.children?.map((c) => (
          <List
            key={c.order}
            header={
              <div style={{ display: "flex" }}>
                <div>
                  {question.order}.{c.order}
                </div>
                <div>{c.desc}</div>
              </div>
            }
          >
            <FormItem
              name={`${question.order}.${c.order}`}
              label={
                <>
                  {question.order}.{c.order}、{question.desc}
                </>
              }
              rules={question.rules}
            >
              <RadioGroup options={c.options || []} />
            </FormItem>
          </List>
        ));

      case "pick":
        return (
          <FormItem
            name={`${question.order}`}
            label={
              <>
                {question.order}、{question.desc}
              </>
            }
            rules={question.rules}
          >
            {/* <Picker extra="请选择" data={area} title="地址" cols={2}>
              <List.Item arrow="horizontal">地址（四川省）</List.Item>
            </Picker> */}
            <Location />
          </FormItem>
        );
    }
  };

  return (
    <>
      {data.map((q) => (
        <React.Fragment key={q.order}>
          {renderNode(q as QuestionType)}
        </React.Fragment>
      ))}
    </>
  );
}

export default Renderer;
