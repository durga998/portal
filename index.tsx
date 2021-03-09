import React from 'react';
import styled from 'styled-components';
import { ColorMap } from 'app/components/common/ColorMap';
type IconPosition = 'left' | 'right';

export enum Scheme {
  success = 'success',
  dark = 'dark',
  primary = 'primary',
  secondary = 'secondary',
}

interface IButtonProps {
  scheme?: Scheme;
  icon?: JSX.Element;
  iconPosition?: IconPosition;
  text?: string;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

export function Button(props: IButtonProps): React.ReactElement {
  const {
    scheme,
    icon,
    iconPosition = 'right',
    text,
    className,
    disabled = false,
    onClick,
  } = props;
  const color = ColorMap.color[scheme || Scheme.primary];
  const backgroundColor = ColorMap.backgroundColor[scheme || Scheme.primary];
  const borderColor = ColorMap.borderColor[scheme || Scheme.primary];
  return (
    <ButtonContainer
      className={className}
      scheme={scheme || Scheme.primary}
      color={color}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      disabled={disabled}
      onClick={onClick}
    >
      {iconPosition === 'left' ? (
        <>
          {icon && (
            <Icon
              hasMargin={!!text}
              position={iconPosition}
              disabled={disabled}
            >
              {icon}
            </Icon>
          )}
          {text && <Text disabled={disabled}>{text}</Text>}
        </>
      ) : (
        <>
          {text && <Text disabled={disabled}>{text}</Text>}
          {icon && (
            <Icon
              hasMargin={!!text}
              position={iconPosition}
              disabled={disabled}
            >
              {icon}
            </Icon>
          )}
        </>
      )}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button<{
  scheme: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 40px;
  border-radius: 4px;
  font-size: 16px;
  border: 1px solid ${(props): string => props.theme[props.borderColor]};
  background-color: ${(props): string => props.theme[props.backgroundColor]};
  color: ${(props): string => props.theme[props.color]};
  :disabled {
    background-color: ${(props): string => props.theme.gray};
    border: none;
  }
`;

const Text = styled.label<{ disabled: boolean }>`
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const Icon = styled.div<{
  hasMargin: boolean;
  position: IconPosition;
  disabled: boolean;
}>`
  margin: ${(props): string =>
    props.hasMargin
      ? props.position === 'left'
        ? '0 10px 0 0;'
        : '0 0 0 10px;'
      : '0'};
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
`;
