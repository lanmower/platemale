module.exports =  (str)=>{
  return str.replace(/^\w/, c => c.toUpperCase());
}
