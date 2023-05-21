import styled from "@emotion/styled";

export const Line = styled.div`
  width: 80%;
  margin-bottom: 20px;
  display: flex;
  justify-content: start;
  @media screen and (max-width: 900px) {
    justify-content: center;
  }
`;

export const Line2 = styled.div`
  width: 80%;
  margin-bottom: 15px;
  /* display: flex; */
  /* justify-content: space-between; */
  align-items: flex-start;
  /* flex: unset;  */
  @media screen and (max-width: 900px) {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

export const Line3 = styled.div`
  width: 80%;
  /* margin-bottom: 20px; */
  display: flex;
  justify-content: start;
  @media screen and (max-width: 900px) {
    justify-content: center;
  }
`;

export const Line4 = styled.div`
  width: 80%;
  @media screen and (max-width: 900px) {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;