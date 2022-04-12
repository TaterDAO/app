// Types
import type { NextPage } from "next";

// Components
import TitledPage from "@components/layouts/TitledPage";
import Search from "@components/search";

const Home: NextPage = () => {
  return (
    <TitledPage title="Explore Titles">
      <Search />
    </TitledPage>
  );
};

export default Home;
