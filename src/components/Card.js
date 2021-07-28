import React from 'react';
import styled from "styled-components";

const Card = ({ cardData }) => {
    return (
        <CardItem>
            <div>
                <CardTitle>Comment id</CardTitle>
                <span>{cardData.id}</span>
            </div>
            <EmailWrapper>
                <CardTitle>Email</CardTitle>
                <span>{cardData.email}</span>
            </EmailWrapper>
            <div>
                <CardTitle>Comment</CardTitle>
                <p>{cardData.body}</p>
            </div>
        </CardItem>
    );
};

const CardItem = styled.div`
  width: 500px;
  padding: 20px;
  border: 0.5px solid #CED4D4;
  border-radius: 20px;
  background: #F8F9FA;
  
  & + & {
    margin-top: 14px;
  } 
`;

const CardTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #212529;
  margin-right: 12px;
`;

const EmailWrapper = styled.div`
  margin: 10px 0;
`;

export default Card;