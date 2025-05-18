import React, {
  Profiler,
  ProfilerOnRenderCallback,
  useCallback,
  memo,
  useRef,
} from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import useFetchWithCache from "../../hooks/useFetchWithCache";

type RowProps = {
  index: number;
  style: React.CSSProperties;
  data: Array<{ id: number; name: string }>;
};

// Memoized Row component to avoid unnecessary re-renders
const Row = memo(({ index, style, data }: RowProps) => {
  const item = data[index];
  return (
    <div style={{ ...style, padding: "8px", borderBottom: "1px solid #ccc" }}>
      Row #{item.name}
    </div>
  );
});

const VirtualizedList: React.FC = () => {
  const { data, loading, error } = useFetchWithCache("/api/items");
  const itemData = React.useMemo(() => data || [], [data]);

  // Profiler callback
  const onRenderCallback: ProfilerOnRenderCallback = useCallback(
    (id, phase, actualDuration) => {
      console.log(
        `Profiler VirtualizedList ===>>> ${id} [${phase}] rendered in ${actualDuration.toFixed(
          2
        )} ms`
      );
    },
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <Profiler id="VirtualizedList" onRender={onRenderCallback}>
      <List
        height={400}
        itemCount={itemData.length}
        itemSize={40} // height of each row in px
        width={"100%"}
        itemData={itemData}
      >
        {Row}
      </List>
    </Profiler>
  );
};

export default VirtualizedList;
