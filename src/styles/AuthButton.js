import styled from 'styled-components';

const AuthButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #1db954 0%, #169c46 100%);
  color: #08110b;
  font-weight: 700;
  font-size: 13.5px;
  letter-spacing: 0.2px;
  padding: 9px 22px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(29, 185, 84, 0.28);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #1ed760 0%, #1db954 100%);
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 6px 20px rgba(29, 185, 84, 0.42);
  }

  &:active {
    transform: translateY(0) scale(0.99);
  }
`;

export default AuthButton;
