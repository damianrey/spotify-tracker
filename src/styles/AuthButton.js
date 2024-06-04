import styled from 'styled-components';

const AuthButton = styled.button`
  background-color: #1DB954;
  color: #fff;
  margin-right: 30px;
  margin-left: 106px;
  padding: 7px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #189e47;
  }
`;

export default AuthButton;