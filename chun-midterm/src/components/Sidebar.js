import React from "react";
import { styled } from "styled-components";
import closeIcon from "../assets/close.svg";

const Wrapper = styled.div`
  width: 300px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};
  padding: 94px 48px;
  position: fixed;
  left: 0;
  top: 0%;
  z-index: 100;

  @media screen and (max-width: 414px) {
    display: ${(props) => (props.$isSidebarOn ? "block" : "none")};
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 94px;
  gap: 24px;
`;

const NavLink = styled.a`
  font-size: 18px;
  line-height: 27px;
  font-weight: 500;
  cursor: pointer;
`;

const CloseButton = styled.img`
  display: none;
  position: absolute;
  top: 27px;
  right: 32px;
  cursor: pointer;
  @media screen and (max-width: 414px) {
    display: block;
  }
`;

export default function Sidebar({ isSidebarOn, setIsSidebarOn }) {
  return (
    <Wrapper $isSidebarOn={isSidebarOn}>
      <CloseButton
        src={closeIcon}
        onClick={() => setIsSidebarOn((prev) => !prev)}
      />
      <Title>DesignWorks</Title>
      <NavLinks>
        <NavLink>Home</NavLink>
        <NavLink>Showcase</NavLink>
        <NavLink>Services</NavLink>
        <NavLink>Contact</NavLink>
      </NavLinks>
    </Wrapper>
  );
}
