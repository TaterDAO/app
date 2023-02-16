/**
 * ! NOTE: Currently not in use. For a given title, if all tokens are burned
 * !       the metadata is *not* deleted from Firestore.
 */

// Components
import Button from "@components/ui/Button";

// Hooks
import { toast } from "react-toastify";
import { useAuthentication } from "@contexts/authentication";

/**
 * Triggers metadata deletion.
 */
const DeleteMetadataButton: React.FC<{}> = () => {
  const auth = useAuthentication();

  const handleClick = async () => {
    if (!auth.authenticated) await auth.authenticate();
  };

  return (
    <Button onClick={handleClick} primary loading={false}>
      Remove Property from TaterDAO
    </Button>
  );
};

export default DeleteMetadataButton;
