// Components
import MintFormProvider from "@components/forms/mint/Provider";
import TitledPage from "@components/layouts/TitledPage";
import MintFormFields from "./Fields";

const MultiStepMintForm: React.FC<{}> = ({}) => {
  return (
    <TitledPage title="New Property Title">
      <MintFormProvider>
        <MintFormFields />
      </MintFormProvider>
    </TitledPage>
  );
};

export default MultiStepMintForm;
