import styled from "styled-components";
import { SunLight } from "iconoir-react";

const ButtonSC = styled.button<{
  primary?: boolean;
  secondary?: boolean;
  $loading?: boolean;
}>`
  border-radius: var(--global-border-radius);
  background-color: ${({ primary }) =>
    primary ? "var(--global-color-attention)" : "transparent"};
  border: 1px solid;
  border-color ${({ primary }) =>
    primary ? "var(--global-color-attention)" : "var(--global-color-border)"};
  color: var(--global-color-font);

  padding: 0.75rem 1.25rem;

  width: ${({ primary, secondary }) =>
    primary || secondary ? "100%" : "auto"};

  font-weight: 600;
  font-size: ${({ primary }) => (primary ? "1" : "0.9")}rem;
  font-family: inherit;

  transition: var(--global-transition);


  ${({ $loading, primary }) =>
    $loading
      ? `
    filter: grayscale(0.5);
    position: relative;
    cursor: default;
  `
      : `

    cursor: pointer;

    &:hover {
      border-color ${
        primary ? "transparent" : "var(--global-color-border-hover)"
      };
      background-color: ${primary ? "var(--color-indigo)" : "transparent"};
    }

    &:disabled {
      background-color: var(--global-color-bg-disabled);
      border-color: transparent;
      cursor: default;
      color: var(--global-color-font-secondary);
    }
  `}
`;

const Loading = styled.div`
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  svg {
    animation: rotate 4s linear infinite;
  }

  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span<{ $loading: boolean }>`
  ${({ $loading }) => $loading && `opacity: 0;`}
`;

const Button: React.FC<{
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children: string | React.ReactElement;
  onClick: () => any;
}> = ({
  children,
  primary = false,
  secondary = false,
  loading = false,
  disabled = false,
  onClick
}) => {
  return (
    <ButtonSC
      primary={primary}
      secondary={secondary}
      $loading={loading}
      onClick={onClick}
      disabled={loading || disabled}
    >
      <Text $loading={loading}>{children}</Text>
      {loading && (
        <Loading>
          <SunLight fontSize={12} color="var(--global-color-font)" />
        </Loading>
      )}
    </ButtonSC>
  );
};

export default Button;
export { ButtonSC };
