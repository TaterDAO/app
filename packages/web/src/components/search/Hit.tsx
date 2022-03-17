import type { Hit as T_Hit } from "@T/Search";

const Hit: React.FC<{ data: T_Hit }> = ({ data }) => {
  console.log(data);
  return (
    <div key={data.objectID}>
      <h2>{data.name}</h2>
    </div>
  );
};

export default Hit;
