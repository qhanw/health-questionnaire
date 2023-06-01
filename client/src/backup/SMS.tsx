import React, { useEffect, useRef, useState } from "react";
import { InputItem, Toast, Button, List, NavBar } from "antd-mobile";
import SendCode from "../components/SendCode";
import "./SMS.css";

function SMS() {
  const ref = useRef<any>();
  const [code, setCode] = useState("");
  const [focused, setFocused] = useState(false);

  // phone
  const [hasError, setHasError] = useState(false);
  const [value, setValue] = useState("");

  const onErrorClick = () => {
    if (hasError) {
      Toast.info("请输入11位手机号码！");
    }
  };
  const onChange = (value: string) => {
    if (value.replace(/\s/g, "").length < 11) {
      setHasError(true);
    } else {
      setHasError(false);
    }
    setValue(value);
  };

  useEffect(() => {
    if (code.length > 5) {
      // this.telDisabled = true
      ref.current.blur();
      setTimeout(() => {
        alert(`vcode: ${code}`);
      }, 500);
    }
    console.log(code);
  }, [code]);

  const [start, setStart] = useState(false);
  function handleClick() {
    setStart(true);
  }

  return (
    <div id="app" className="app">
      <div className="sms-description">
        为确保问卷数据的真实性，我们需要进行短信验证！感谢您的配合。
      </div>
      <List className="sms-number">
        <InputItem
          type="phone"
          placeholder="请输入手机号码"
          error={hasError}
          onErrorClick={onErrorClick}
          onChange={onChange}
          extra={
            <SendCode
              size="small"
              type="ghost"
              start={start}
              storageKey="plus-send-code"
              onClick={handleClick}
              onEnd={() => setStart(false)}
            />
          }
        >手机号码</InputItem>
        <InputItem
          type="phone"
          placeholder="请输入验证码"
          error={hasError}
          onErrorClick={onErrorClick}
          onChange={onChange}
        >
          验证码
        </InputItem>
      </List>
      {/* <div className="heading-2">请输入获取的验证码</div>
      <div className="v-code">
        <input
          ref={ref}
          id="vcode"
          type="tel"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          //   maxlength="6"
          //   @focus="focused = true"
          //   @blur="focused = false"
        />

        {Array(6)
          .fill("")
          .map((_, i) => (
            <label
              htmlFor="vcode"
              className={`line${
                focused && code.length === i ? " animated" : ""
              }`}
            >
              {code.split("")[i]}
            </label>
          ))}
      </div> */}
    </div>
  );
}

export default SMS;
