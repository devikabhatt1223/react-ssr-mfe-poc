const BrokenComponent = () => {
  throw new Error("Broken Component!");
  return <div>Broken Component, This won't render.</div>;
};

export default BrokenComponent;
