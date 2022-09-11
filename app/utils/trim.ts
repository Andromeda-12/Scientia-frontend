export const trim = (str: string, length: number) => {
  if (str.length <= length) return str
  let res = str.substring(0, length - 3)
  if (res[res.length - 1] === ' ') res = res.substring(0, res.length - 1)
  return res + '...'
}
