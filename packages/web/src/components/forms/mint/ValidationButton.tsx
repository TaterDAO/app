/**
 * ValidationButton validates and serializes form state.
 */

import { Row } from "@components/ui/Form";
import Button from "@components/ui/Button";

// Hooks
import useMintForm from "./useMintForm";

const ValidationButton: React.FC<{}> = ({}) => {
  const form = useMintForm();

  const handleClick = async () => {
    await form.validateFormState();
  };

  return (
    <Row>
      <Button primary onClick={handleClick} disabled={form.validating}>
        Create
      </Button>
    </Row>
  );
};

export default ValidationButton;
