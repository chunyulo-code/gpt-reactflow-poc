import React, { useState } from "react";
import { styled } from "styled-components";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import bedroom1 from "../../assets/bedroom 1.png";
import diningroom1 from "../../assets/diningroom 1.png";
import livingroom1 from "../../assets/livingroom 1.png";
import livingroom2 from "../../assets/livingroom2 1.png";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MainContent = styled.div`
  padding: 75px 64px;
  @media screen and (max-width: 414px) {
    padding: 16px;
  }
`;

const Title = styled.h2`
  font-size: 64px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  line-height: 96px;
`;

const Section = styled.div`
  margin-top: 72px;

  &:first-of-type {
    margin-top: 0;
  }
`;

const Subtitle = styled.h3`
  font-size: 48px;
  font-weight: 500;
  line-height: 72px;
  color: ${({ theme }) => theme.colors.main};
`;

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
`;

const Image = styled.img`
  width: calc(50% - 8px);
  @media screen and (max-width: 414px) {
    width: 100%;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin-top: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  @media screen and (max-width: 414px) {
    flex-direction: column;
    align-items: start;
  }
`;

const FormLabel = styled.label`
  font-size: 16px;
  line-height: 24px;
  width: 104px;
`;

const FormInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0px 5px;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
`;

const FormInputFile = styled.input``;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.main};
  width: 100%;
  height: 40px;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  margin-top: 16px;
  cursor: pointer;
`;

const formInputs = [
  { label: "Name", key: "name", type: "text" },
  { label: "Email", key: "email", type: "text" },
  { label: "Message", key: "message", type: "text" },
  { label: "Image", key: "image", type: "file" }
];

export default function Home() {
  const storage = getStorage();
  const [isSidebarOn, setIsSidebarOn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [uploadedImg, setUploadedImg] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    const isFormValid = Object.values(formData).every((value) => value !== "");
    const imgName = `userPicture_${formData.name}_${Date.now()}`;
    const storageRef = ref(storage, imgName);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        timestamp: Date.now()
      })
    };

    if (uploadedImg) {
      uploadBytes(storageRef, uploadedImg)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((downloadURL) => {
          if (isFormValid) {
            fetch("http://localhost:3004/messages", {
              ...requestOptions,
              body: JSON.stringify({
                ...formData,
                timestamp: Date.now(),
                imgUrl: downloadURL
              })
            }).then(window.alert("Send message successfully"));
          }
        });
    } else {
      if (isFormValid) {
        fetch("http://localhost:3004/messages", requestOptions).then(
          window.alert("Send message successfully")
        );
      }
    }
  }

  return (
    <>
      <Header setIsSidebarOn={setIsSidebarOn} />
      <Sidebar isSidebarOn={isSidebarOn} setIsSidebarOn={setIsSidebarOn} />
      <MainContent>
        <Title>Interior Design</Title>
        <Section>
          <Subtitle>Showcase.</Subtitle>
          <Images>
            <Image src={bedroom1} />
            <Image src={diningroom1} />
            <Image src={livingroom1} />
            <Image src={livingroom2} />
          </Images>
        </Section>
        <Section>
          <Subtitle>Services.</Subtitle>
          <Description>
            We are a interior design service that focus on what's best for your
            home and what's best for you! Some text about our services - what we
            do and what we offer. We are lorem ipsum consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Description>
        </Section>
        <Section>
          <Subtitle>Contact.</Subtitle>
          <form>
            {formInputs.map((input) => (
              <FormGroup key={input.key}>
                <FormLabel>{input.label}</FormLabel>
                {input.type === "file" ? (
                  <FormInputFile
                    type="file"
                    onChange={(e) => setUploadedImg(e.target.files[0])}
                  />
                ) : (
                  <FormInput
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [input.key]: e.target.value
                      }))
                    }
                  />
                )}
              </FormGroup>
            ))}
            <SubmitButton onClick={sendMessage}>Send Message</SubmitButton>
          </form>
        </Section>
      </MainContent>
    </>
  );
}
