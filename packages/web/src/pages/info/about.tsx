// Types
import type { NextPage } from "next";

// Libs
import styled from "styled-components";

// Components
import Divider from "@components/ui/Divider";
import Image from "next/image";

const Section = styled.section`
  margin-bottom: var(--global-space-y-margin);

  h1 {
    margin-bottom: var(--global-space-y-margin);
  }

  h3 {
    display: inline-block;
    color: var(--global-color-font);
  }
`;

const Bio = styled.div`
  display: grid;
  grid-template-columns: 3fr 10fr;
  column-gap: var(--global-space-x-margin);
`;

const AboutPage: NextPage = () => {
  return (
    <div>
      <Section>
        <h1>Why TaterDAO?</h1>
        <p>
          You&apos;re probably wondering why we chose TaterDAO as the name of
          this business. Well, TaterDAO, LLC is (legal jargon). More
          importantly, we wanted to have web3 fun and we have combined
          backgrounds in agriculture and real estate. Potato farms kept seeming
          to come up in our trash talk. TaterDAO made us laugh. That&apos;s the
          complexity of the decision.
        </p>
      </Section>
      <Divider />
      <Section>
        <h1>Mission</h1>
        <p>
          You&apos;re probably wondering why we chose TaterDAO as the name of
          this business. Well, TaterDAO, LLC is (legal jargon). More
          importantly, we wanted to have web3 fun and we have combined
          backgrounds in agriculture and real estate. Potato farms kept seeming
          to come up in our trash talk. TaterDAO made us laugh. That&apos;s the
          complexity of the decision.
        </p>
      </Section>
      <Divider />
      <Section>
        <h1>Team</h1>
        <Section>
          <Bio>
            <Image
              src="/images/james.jpg"
              height={190}
              width={190}
              layout="fixed"
            />
            <p>
              <h3>James McCall</h3> is a former practicing attorney and
              accounting/finance professional, who left the doldrums of white
              collar work to the wide-open spaces of agri-finance. He is
              currently a VP for a land and mortgage company where he originates
              and services a large agricultural commercial loan portfolio. James
              is also the founder of agritech company Farmapper, a cloud-based
              mapping application built for farmers, ranchers, landlords and
              more. An early-adopter, he&apos;s been in the Web3 and crypto
              space since 2014, with a desire to improve land transfer
              transactions. He&apos;s been an active member of LexDAO, since
              2019. He can be found on Twitter{" "}
              <a href="https://twitter.com/taterdao">@taterdao</a> and{" "}
              <a href="https://twitter.com/mccallios">@mccallios</a>.
            </p>
          </Bio>
        </Section>
        <Section>
          <Bio>
            <Image
              src="/images/nick.jpg"
              height={190}
              width={190}
              layout="fixed"
            />
            <p>
              <h3>Nick Rishwain, JD</h3>, is a VP of business development at a
              Web2 legal technology and expert witness marketing platform.
              Formerly a local government employee, Nick was frustrated with the
              inefficiency that plagues bureaucracies and decided to venture
              into the private sector. He is a real estate agent and investor
              with experience in commercial and multifamily residential real
              estate. He was brought into the Web3 and crypto space by friends
              in LexDAO in 2020. He can be found on Twitter{" "}
              <a href="https://twitter.com/taterdao">@taterdao</a> and{" "}
              <a href="https://twitter.com/NickJRishwain">@NickJRishwain</a>.
            </p>
          </Bio>
        </Section>
      </Section>
      <Divider />
      <Section>
        <h1>Consulting</h1>
        <p>
          Are you in the agricultural industry? The real estate industry? Have
          you heard that you can transfer property via NFT? Wondering how to
          transfer real property in a more efficient manner? Don&apos;t want to
          miss out on incorporating blockchain into your farm or real estate
          practice? Haven&apos;t got a clue what the hell we&apos;re talking
          about but you know there&apos;s something happening in crypto and
          Blockchain and you want to see if it is right for your business? Hit
          us at{" "}
          <a href="mailto:consult@taterdao.com?subject=Consulting">
            consult@taterdao.com
          </a>
          .
        </p>
      </Section>
    </div>
  );
};

export default AboutPage;
