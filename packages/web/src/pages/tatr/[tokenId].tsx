// Types
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { v230203TaterMetadataSchema } from "@T/TATR";

// Firestore
import { admin, METADATA_COLLECTION_ID } from "@services/Firebase";

const TitlePage: NextPage<{
  title: { id: string; metadata: v230203TaterMetadataSchema };
}> = ({ title }) => {
  return <></>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const db = admin.firestore();
  const snapshot = await db.collection(METADATA_COLLECTION_ID).get();
  const paths = !snapshot.empty
    ? snapshot.docs.map((doc) => ({ params: { tokenId: doc.id } }))
    : [];
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId as string;

  const db = admin.firestore();
  const doc = await db.collection(METADATA_COLLECTION_ID).doc(tokenId).get();

  if (!doc.exists) return { notFound: true };

  // TODO: Determine which chains title is on

  // TODO: Include contract address

  // TODO: Include link to Explorer

  // TODO: Include owner address

  return {
    props: {
      title: {
        id: tokenId,
        metadata: doc.data()
      }
    }
  };
};

export default TitlePage;
