import styled from "styled-components";
import { SunLight } from "iconoir-react";

const El = styled.button<{ primary?: boolean; $loading?: boolean }>`
  border-radius: var(--global-border-radius);
  background-color: ${({ primary }) =>
    primary ? "var(--color-bright-indigo)" : "transparent"};
  border: 1px solid;
  border-color ${({ primary }) =>
    primary ? "var(--color-bright-indigo)" : "var(--global-color-border)"};
  color: var(--global-color-font);

  padding: 0.75rem 1.25rem;

  width: ${({ primary }) => (primary ? "100%" : "auto")};

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
  `}


  &:disabled {
    background-color: var(--global-color-bg-disabled);
    border-color: transparent;
    cursor: default;
    color: var(--global-color-font-secondary);
  }
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

const defaultProps = {
  primary: false,
  loading: false,
  disabled: false
};

const Button: React.FC<
  {
    primary?: boolean;
    disabled?: boolean;
    loading?: boolean;
    children: string;
    onClick: () => any;
  } & typeof defaultProps
> = ({ children, primary, loading, onClick }) => {
  return (
    <El primary={primary} $loading={loading} onClick={onClick}>
      <Text $loading={loading}>{children}</Text>
      {loading && (
        <Loading>
          <SunLight fontSize={12} color="var(--global-color-font)" />
        </Loading>
      )}
    </El>
  );
};

Button.defaultProps = defaultProps;

export default Button;
