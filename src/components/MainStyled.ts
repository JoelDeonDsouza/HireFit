import styled from 'styled-components';

export const HeroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  padding: 0px 2%;
  @media screen and (max-width: 960px) {
    height: auto;
    padding: 0;
    margin-top: 20px;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 85vh;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    padding: 0 10px;
    height: auto;
  }
`;

export const FormSection = styled.div`
  flex: 1;
  max-width: 500px;
  padding: 8% 5% 8% 3%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 960px) {
    padding: 5% 2%;
  }
`;

export const Title = styled.span`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #16404d;
  @media screen and (max-width: 960px) {
    margin-bottom: 15px;
  }
`;

export const Subtitle = styled.span`
  font-size: 16px;
  color: #4c585b;
  opacity: 0.8;
  margin-bottom: 20px;
  line-height: 1.6;
`;

export const Form = styled.form`
  width: 100%;
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 30px;
  border: 1px solid #ddd;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: #2196f3;
  }
`;

export const UploadInput = styled.input`
  width: 100%;
  padding: 13px;
  border-radius: 30px;
  border: 1px solid #ddd;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  background-color: #efefef;
`;

export const ResumeUpload = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ResumeTextUpload = styled.span`
  font-size: 16px;
  color: #4c585b;
  opacity: 0.8;
  line-height: 1.6;
`;

export const UploadButton = styled.button`
  width: 30%;
  padding: 12px;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  gap: 10px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #16404d;
  @media screen and (max-width: 960px) {
    width: 100%;
    padding: 14px;
  }
`;

export const AIResultsSection = styled.div`
  flex: 1.2;
  background-color: #efefef;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  border-radius: 20px;
  padding: 10px 60px;
  overflow: hidden;
  @media screen and (max-width: 960px) {
    height: auto;
    margin-bottom: 10%;
    padding: 100px 30px;
  }
`;

export const InitialOutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 960px) {
    padding-bottom: 10px;
  }
`;

export const AvatarImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  position: relative;
  @media screen and (max-width: 960px) {
    margin-top: 0;
  }
`;

export const UploadTextDisplay = styled.span`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 30px;
  max-height: 400px;
  overflow-y: auto;
  word-wrap: break-word;
  text-align: center;
  @media screen and (max-width: 960px) {
    max-height: 100%;
  }
`;

// Loading //
export const LoadingBlock = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingGif = styled.img`
  width: 50px;
`;
