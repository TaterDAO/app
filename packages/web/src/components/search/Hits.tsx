// Libs
import styled from "styled-components";

// Components
import Hit from "./Hit";
import { v230203TaterMetadataSchema } from "@T/TATR";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--global-space-margin);
`;

const Hits: React.FC<{
  hits: Array<{ id: string; metadata: v230203TaterMetadataSchema }>;
  loaded: boolean;
}> = ({ hits, loaded }) => {
  return (
    <div>
      <Container>
        {loaded ? (
          hits.length > 0 ? (
            hits.map((hit) => (
              <Hit key={hit.id} id={hit.id} metadata={hit.metadata} />
            ))
          ) : (
            <i>No Results</i>
          )
        ) : (
          <i>Loading...</i>
        )}
      </Container>
    </div>
  );
};

export default Hits;
