import React from "react";
import { styled } from "styled-components";
import burgerMenuIcon from "../assets/burger-menu.svg";

const Wrapper = styled.header`
  display: none;

  @media screen and (max-width: 414px) {
    display: block;
    padding: 16px 32px;
    background-color: ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    position: fixed;
    top: 0%;
    width: 100%;
    height: 68px;
  }
`;

const BurgerMenuContainer = styled.a``;
const BurgerMenuIcon = styled.img`
  height: 100%;
  color: ${({ theme }) => theme.colors.white};
  filter: invert(100%);
  cursor: pointer;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  margin-left: 32px;
`;

export default function Header({ setIsSidebarOn }) {
  return (
    <Wrapper>
      <BurgerMenuContainer
        onClick={() => {
          setIsSidebarOn((prev) => !prev);
        }}
      >
        <BurgerMenuIcon src={burgerMenuIcon} alt="burgerMenu-icon" />
      </BurgerMenuContainer>
      <Title>DesignWorks</Title>
    </Wrapper>
  );
}
