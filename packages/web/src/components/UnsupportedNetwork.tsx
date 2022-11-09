// Components
import TitledPage from "@components/layouts/TitledPage";

const UnsupportedNetwork = () => {
  return (
    <TitledPage title="Please connect">
      <div>
        <h3 style={{ color: "var(--global-color-font-secondary)" }}>
          Please connect to Arbitrum.
        </h3>
      </div>
    </TitledPage>
  );
};

export default UnsupportedNetwork;
