import React, { useState, useEffect, useRef } from "react";
import { Button, ButtonProps } from "antd-mobile";

// 获取格式化的模板文本
function getTemplateText(runText: string, second: number): string {
  console.log(runText, second);
  if (runText?.indexOf("{%s}") !== -1) {
    return runText.replace(/\{([^{]*?)%s(.*?)\}/g, second?.toString());
  } else {
    return runText;
  }
}

export interface SendCodeProps extends ButtonProps {
  // 是否开始倒计时
  start?: boolean;
  // 倒计时时长（秒）默认60
  second?: number;
  // 初始化按钮显示文本
  initText?: string;
  // 运行时显示文本
  // 自己设置必须包含{%s}
  runText?: string;
  // 运行结束后显示文本
  resetText?: string;
  // 储存倒计时剩余时间sessionStorage的键值，设置不为空后，刷新页面倒计时将继续
  storageKey?: string;
  // 倒计时结束执行函数
  onEnd?: () => void;
}

export interface SendCodeLocale {
  initText: string;
  runText: string;
  resetText: string;
}

/**
 * 状态 0: 初始 1: 运行  2: 结束
 */
export type SendCodeStatus = 0 | 1 | 2;

const SendCode: React.FC<SendCodeProps> = ({
  start,
  initText = "获取验证码",
  runText = "{%s}秒后重新获取",
  resetText = "重新获取验证码",
  onEnd,
  second,
  storageKey,
  ...rest
}) => {
  const [status, setStatus] = useState<SendCodeStatus>(start ? 1 : 0);
  const [runSecond, setRunSecond] = useState<number | undefined>(second);
  const timer: any = useRef<NodeJS.Timer>(null);

  useEffect(() => {
    // 获取存储的倒计时时间
    const storageLastSecond = ~~(
      (+(window.sessionStorage.getItem(storageKey || "") || 0) -
        new Date().getTime()) /
      1000
    );
    // 执行剩下的倒计时
    if (storageLastSecond > 0 && storageKey) {
      startCountdown(storageLastSecond);
    }

    start && startCountdown();

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [start]);

  const startCountdown = (value?: number) => {
    let second = value || runSecond || 0;

    setStatus(1);
    setRunSecond(second);

    if (storageKey) {
      const runSecond = new Date().getTime() + second * 1000;
      window.sessionStorage.setItem(storageKey, runSecond + "");
    }

    timer.current = setInterval(() => {
      second -= 1;

      setRunSecond(second);

      if (second <= 0) {
        timeout();
      }
    }, 1000);
  };

  const timeout = () => {
    // 设置为运行结束后状态
    setStatus(2);
    setRunSecond(second);
    if (timer.current) {
      clearInterval(timer.current);
    }
    if (storageKey) {
      window.sessionStorage.removeItem(storageKey);
    }
    // 发出倒计时结束事件
    onEnd?.();
  };

  const getText = () => {
    switch (status) {
      case 1:
        return getTemplateText(runText, runSecond as any);
      case 2:
        return resetText;
      default:
        return initText;
    }
  };

  const renderSendCode = () => {
    return (
      <Button {...rest} disabled={status === 1}>
        {getText()}
      </Button>
    );
  };

  return renderSendCode();
};

SendCode.displayName = "SendCode";
SendCode.defaultProps = {
  start: false,
  second: 60,
};

export default SendCode;
