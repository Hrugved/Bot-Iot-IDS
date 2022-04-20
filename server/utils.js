
const parse_result = (data) => {
  // console.log(Object.entries(data));
  data = Object.fromEntries(Object.entries(data).map(([k,v]) => [k,v['0']]))
  // console.log(data);
  return data
}

module.exports = {parse_result}