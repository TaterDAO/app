// Types
import type { NextPage } from "next";

// Libs
import styled from "styled-components";

// Components
import Divider from "@components/ui/Divider";
import Image from "next/image";
import { Section } from "@components/layouts/Info";

const Bio = styled(Section)`
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
          this business. Well, Tater, LLC is our Wyoming Series LLC. More
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
          TaterDAO core mission is to develop data standards and processes
          allowing digital organizations to manage, buy, sell, and lease real
          property using smart contracts, decentralized financial and legal
          structures. The core primitives begin with the TaterDAO NFT platform
          that will quickly enable parties to mint and manage real world asset
          NFT&apos;s to use in their ventures.
        </p>
        <br />
        <p>
          If that&apos;s too lofty and confusing for you. We&apos;d like to help
          you make money and do so more efficiently with the financial rails
          enabled by web3.
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
              alt="Portrait of James McCall"
            />
            <p>
              <h3>James McCall</h3> is a former practicing attorney and
              accounting/finance professional, who left the doldrums of white
              collar work to the wide-open spaces of agri-finance. He is
              currently a VP for a land and mortgage company where he originates
              and services a large agricultural commercial loan portfolio. James
              is also the founder of agritech company{" "}
              <a
                href="https://www.farmapper.com/"
                target="_blank"
                rel="noreferrer"
              >
                Farmapper
              </a>
              , a cloud-based mapping application built for farmers, ranchers,
              landlords and more. An early-adopter, he&apos;s been in the Web3
              and crypto space since 2014, with a desire to improve land
              transfer transactions. He&apos;s been an active member of LexDAO,
              since 2019. He can be found on Twitter{" "}
              <a
                href="https://twitter.com/taterdao"
                target="_blank"
                rel="noreferrer"
              >
                @taterdao
              </a>{" "}
              and{" "}
              <a
                href="https://twitter.com/mccallios"
                target="_blank"
                rel="noreferrer"
              >
                @mccallios
              </a>
              .
            </p>
          </Bio>
        </Section>
        <Bio>
          <Image
            src="/images/nick.jpg"
            height={190}
            width={190}
            layout="fixed"
            alt="Portrait of Nick Rishwain, JD"
          />
          <p>
            <h3>Nick Rishwain, JD</h3>, is a VP of business development at a
            Web2 legal technology and expert witness marketing platform.
            Formerly a local government employee, Nick was frustrated with the
            inefficiency that plagues bureaucracies and decided to venture into
            the private sector. He is a real estate agent and investor with
            experience in commercial and multifamily residential real estate. He
            was brought into the Web3 and crypto space by friends in{" "}
            <a href="https://www.lexdao.coop/" target="_blank" rel="noreferrer">
              LexDAO
            </a>{" "}
            in 2020. He can be found on Twitter{" "}
            <a
              href="https://twitter.com/taterdao"
              target="_blank"
              rel="noreferrer"
            >
              @taterdao
            </a>{" "}
            and{" "}
            <a
              href="https://twitter.com/NickJRishwain"
              target="_blank"
              rel="noreferrer"
            >
              @NickJRishwain
            </a>
            .
          </p>
        </Bio>
        <Bio>
          <Image
            src="/images/will.jpg"
            height={190}
            width={190}
            layout="fixed"
            alt="Portrait of Will Holley"
          />
          <p>
            <h3>Will Holley</h3> is the founder and CTO of{" "}
            <a href="https://721.dev/" target="_blank" rel="noreferrer">
              721 Labs
            </a>{" "}
            where he pioneered the usage of NFTs as property titles for Real
            World Assets such as luxury Rolexes, fine art, and cultural
            collectibles. He currently runs an independent chapter of{" "}
            <a
              href="https://www.radicalxchange.org/"
              target="_blank"
              rel="noreferrer"
            >
              RadicalxChange
            </a>{" "}
            focused on developing token standards for{" "}
            <a
              href="https://partialcommonownership.com"
              target="_blank"
              rel="noreferrer"
            >
              Partial Common Ownership
            </a>
            , and is on Twitter{" "}
            <a
              href="https://twitter.com/waholleyiv"
              target="_blank"
              rel="noreferrer"
            >
              @waholleyiv
            </a>
            .
          </p>
        </Bio>
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
