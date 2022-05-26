import { useRouter } from "next/router";

const page: React.FC = () => {
  const router = useRouter();

  const lookingForTitle = router.asPath.startsWith("/title/");

  return (
    <>
      <h3 style={{ color: "var(--global-color-font-secondary)" }}>
        404 – Page Not Found
      </h3>
      <br />
      {lookingForTitle && (
        <p style={{ color: "var(--global-color-font-secondary)" }}>
          The Title you are looking for may be in the process of being burned.
        </p>
      )}
    </>
  );
};

export default page;
