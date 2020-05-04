const uuid = () => {
  const p1 = Math.random().toString(36).slice(-8);
  const p2 = Math.random().toString(36).slice(-4);
  const p3 = Math.random().toString(36).slice(-4);
  const p4 = Math.random().toString(36).slice(-4);
  const p5 = Math.random().toString(36).slice(-10);
  return `${p1}-${p2}-${p3}-${p4}-${p5}`;
};

module.exports = uuid;
