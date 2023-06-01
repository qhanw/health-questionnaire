export const VALIDATE_MESSAGES =  {
    // default: '${name} 看起来怪怪的……',
    // eslint-disable-next-line no-template-curly-in-string
    // required: "问题${name}必须填写！",
    string: {
      // eslint-disable-next-line no-template-curly-in-string
      max: "问题${name}最多输入${max}个字符！",
    },
    types: {
      // eslint-disable-next-line no-template-curly-in-string
      number: "问题${name} 不是一个合格的 ${type}",
    },
    // enum: '${name} 不在 ${enum} 中呢',
    // eslint-disable-next-line no-template-curly-in-string
    whitespace: "问题${name} 不可以是空的啦",
    pattern: {
      // eslint-disable-next-line no-template-curly-in-string
      mismatch: "问题${name} 并不符合格式：${pattern}",
    },
  }