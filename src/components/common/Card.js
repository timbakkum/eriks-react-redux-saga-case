import styled from 'styled-components';

const Card = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  background: white;
  border: none;
  padding: 1rem;

  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
    align-self: center;
  }

  p {
    text-align: center;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }
`;

export default Card;
