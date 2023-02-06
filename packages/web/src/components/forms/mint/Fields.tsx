// Components
import { Container } from "@components/ui/Form";
import NameInput from "@components/forms/mint/fields/NameInput";
import DescriptionInput from "@components/forms/mint/fields/DescriptionInput";
import ExternalUrlInput from "@components/forms/mint/fields/ExternalUrlInput";
import LandClassificationInput from "@components/forms/mint/fields/LandClassificationInput";
import BuildingClassificationInput from "@components/forms/mint/fields/BuildingClassificationInput";
import LocationInput from "@components/forms/mint/fields/LocationInput";
import DeedInput from "@components/forms/mint/fields/DeedInput";
import ParcelsInput from "@components/forms/mint/fields/ParcelsInput";
import OwnerInput from "@components/forms/mint/fields/OwnerInput";
import KMLInput from "@components/forms/mint/fields/KMLInput";
import TagsInput from "@components/forms/mint/fields/TagsInput";
import ImageInput from "@components/forms/mint/fields/ImageInput";
import SubmitButton from "@components/forms/mint/SubmitButton";
import ValidationButton from "./ValidationButton";
import SignatureButton from "./SignatureButton";

// Hooks
import useMintForm from "./useMintForm";

const MintFormFields: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <Container>
      {form.validated ? (
        <>
          {!!form.state.metadataSignature ? (
            <SubmitButton />
          ) : (
            <SignatureButton />
          )}
        </>
      ) : (
        <>
          <NameInput />
          <DescriptionInput />
          <ImageInput />
          <ExternalUrlInput />
          <LandClassificationInput />
          <BuildingClassificationInput />
          <KMLInput />
          <LocationInput />
          <DeedInput />
          <ParcelsInput />
          <OwnerInput />
          <TagsInput />
          <ValidationButton />
        </>
      )}
    </Container>
  );
};

export default MintFormFields;
