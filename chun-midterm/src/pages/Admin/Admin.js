import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

const TableHead = styled.th`
  padding: 5px 15px;
`;

const TableData = styled.td`
  padding: 10px 25px;
`;

const DeleteButton = styled.button`
  padding: 5px 15px;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 15px;
  cursor: pointer;
`;

export default function Admin() {
  const [db, setDb] = useState([]);

  async function deleteHandler(id) {
    const requestOptions = {
      method: "DELETE"
    };
    await fetch(`http://localhost:3004/messages/${id}`, requestOptions);
    setDb((prev) => prev.filter((msg) => msg.id !== id));
  }

  useEffect(() => {
    fetch("http://localhost:3004/messages")
      .then((res) => res.json())
      .then((data) => setDb(data));
  }, []);

  return (
    <>
      <table id="messageTable">
        <thead>
          <tr>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </tr>
        </thead>
        <tbody>
          {db.map((msg) => (
            <tr key={msg.id}>
              <TableData>{msg.name}</TableData>
              <TableData>{msg.email}</TableData>
              <TableData>{msg.message}</TableData>
              <TableData>{msg.timestamp}</TableData>
              <TableData>
                <img src={msg.imgUrl} alt={msg.imgUrl} width={100} />
              </TableData>
              <TableData>
                <DeleteButton onClick={() => deleteHandler(msg.id)}>
                  Delete
                </DeleteButton>
              </TableData>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
