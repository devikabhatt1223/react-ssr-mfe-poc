import React, { Profiler, ProfilerOnRenderCallback } from "react";
import useFetchWithCache from "../../hooks/useFetchWithCache";

type RowProps = {
  index: number | string; // your example used data.name which may be string
};

const Row: React.FC<RowProps> = ({ index }) => {
  return (
    <div style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
      Row #{index}
    </div>
  );
};

const NonVirtualizeList: React.FC = () => {
  const { data, loading, error } = useFetchWithCache("/api/items");

  const onRenderCallback: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration
  ) => {
    console.log(
      `Profiler NonVirtualizeList ===>>> ${id} [${phase}] rendered in ${actualDuration.toFixed(
        2
      )} ms`
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <Profiler id="NonVirtualizeList" onRender={onRenderCallback}>
      <div style={{ height: 400, overflow: "scroll" }}>
        {data.map((item: any) => (
          <Row key={item.id} index={item.name} />
        ))}
      </div>
    </Profiler>
  );
};

export default NonVirtualizeList;
