module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) { return false }
  if (str.length === 0) { return true }
  let res = true;
  const stack = [];
  const getConfig = (bracket) => {
    const config = bracketsConfig.find(config => config.some(configElem => configElem === bracket));
    if (config[0] === config[1]) { return { bracketType: 'both', config } }
    if (bracket === config[0]) { return { bracketType: 'opening', config } }
    if (bracket === config[1]) { return { bracketType: 'closing', config } }
  }
  for (let i = 0; i < str.length; i++) {
    const bracket = str[i];
    const currentConfig = getConfig(bracket);
    if (currentConfig.bracketType === 'opening') { stack.push(bracket) }
    if (stack.length === 0 && currentConfig.bracketType === 'closing') {
      res = false;
      break;
    }
    if (currentConfig.bracketType === 'both') {
      if (stack[stack.length - 1] === bracket) {
        stack.pop();
      } else {
        stack.push(bracket);
      }
    }
    if (stack.length > 0 && currentConfig.bracketType === 'closing') {
      if (stack[stack.length - 1] === currentConfig.config[0]) {
        stack.pop();
      } else {
        res = false;
        break;
      }
    }
  }
  if (stack.length > 0) { res = false }
  return res;
}
