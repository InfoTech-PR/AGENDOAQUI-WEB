import React from 'react';
import styled from 'styled-components';

const ButtonCustom = ({ 
    children, 
    bgColor, 
    textColor, 
    padding, 
    borderColor, 
    borderRadius, 
    fontSize, 
    width, 
    hoverColor, 
    focusColor, 
    ...props 
}) => {
    return (
        <StyledButton
            bgColor={bgColor}
            textColor={textColor}
            padding={padding}
            borderColor={borderColor}
            borderRadius={borderRadius}
            fontSize={fontSize}
            width={width}
            hoverColor={hoverColor}
            focusColor={focusColor}
            {...props}
        >
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    background-color: ${({ bgColor }) => bgColor || '#007bff'};
    color: ${({ textColor }) => textColor || 'white'};
    padding: ${({ padding }) => padding || '0.75rem 1.5rem'};
    border: ${({ borderColor }) => borderColor || 'none'};
    border-radius: ${({ borderRadius }) => borderRadius || '4px'};
    cursor: pointer;
    font-weight: bold;
    font-size: ${({ fontSize }) => fontSize || '1rem'};
    width: ${({ width }) => width || 'auto'};
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ hoverColor }) => hoverColor || '#0056b3'};
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${({ focusColor }) => focusColor || '#0056b3'};
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export default ButtonCustom;
