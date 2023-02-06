import styled from "styled-components";

export const Name = styled.h1``;

export const ChainName = styled.h4``;

export const Row = styled.div`
  margin-top: calc(var(--global-space-y-margin) / 2);
`;

export const NamedProperty = styled.div`
  font-weight: 500;
  span {
    font-weight: 700;
    color: var(--global-color-font-secondary);
    padding-right: calc(var(--global-space-margin) / 4);
  }
`;

export const Description = styled.p`
  margin: var(--global-space-margin) 0;
  line-height: 2;
`;

export const Attributes = styled.table`
  tr {
    td {
      padding-top: 1rem;

      &:first-of-type {
        padding-right: 2rem;
        color: var(--global-color-font-secondary);
      }
      &:nth-of-type(2) {
      }
    }
  }
`;

export const ActionButtons = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--global-space-nav-margin);
`;

export const Banner = styled.div<{ withMap: boolean }>`
  display: grid;
  grid-template-columns: ${({ withMap }) =>
    withMap ? "repeat(2, 50%)" : "repeat(1, 100%)"};
`;
