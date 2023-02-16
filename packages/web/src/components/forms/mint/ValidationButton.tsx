/**
 * ValidationButton validates and serializes form state.
 */

import { Row } from "@components/ui/Form";
import Button from "@components/ui/Button";

// Hooks
import useMintForm from "./useMintForm";
import { useAuthentication } from "@contexts/authentication";

const ValidationButton: React.FC<{}> = ({}) => {
  const form = useMintForm();
  const auth = useAuthentication();

  /**
   * If user is not already logged in, prompt them to login.
   * Once login is complete, proceed with form validation. Otherwise, if user
   * has previously authenticated (or resumed auth from a previous session),
   * validate the form fields immediately.
   */
  const handleClick = async () => {
    if (!auth.authenticated)
      await auth.authenticate({ onSuccess: form.validateFormState });
    else await form.validateFormState();
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
