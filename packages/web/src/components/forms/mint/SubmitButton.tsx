// Components
import { Row } from "@components/ui/Form";
import Button from "@components/ui/Button";

// Hooks
import useMintForm from "./useMintForm";
import { useRouter } from "next/router";
import useWeb3 from "@hooks/useWeb3";

// Libs
import { toast } from "react-toastify";

const SubmitButton: React.FC<{}> = ({}) => {
  const form = useMintForm();
  const router = useRouter();
  const web3 = useWeb3();

  const handleClick = async () => {
    try {
      await form.submit();
      toast.success(`Transaction submitted to ${web3.network.name}`);
      router.push("/profile");
    } catch (error) {
      const message = (error as unknown as any).message as string;
      if (!!message) toast.error(message);
      //@ts-ignore
      else if (error.type && error.type === "field-validation") {
        (
          document.getElementById(
            //@ts-ignore
            `form-input-metadata-${error.fieldId}`
          ) as HTMLElement
        ).scrollIntoView({ block: "center", behavior: "smooth" });
      }

      form.setSubmitting(false);
    }
  };

  return (
    <Row>
      <Button primary onClick={handleClick} loading={form.submitting}>
        Mint
      </Button>
    </Row>
  );
};

export default SubmitButton;
