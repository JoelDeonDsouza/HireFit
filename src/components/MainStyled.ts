import styled from 'styled-components';

export const HeroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 2%;
  @media screen and (max-width: 960px) {
    height: auto;
    padding: 0;
    margin-top: 20px;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
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
  position: relative;
  border-radius: 20px;
  padding: 5px 8px;
  overflow: hidden;
  @media screen and (max-width: 960px) {
    height: auto;
    margin-bottom: 10%;
    padding: 5px 10px;
  }
`;

export const InitialOutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 10px 60px;
  @media screen and (max-width: 960px) {
    padding-bottom: 10px;
    padding: 100px 0px;
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
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingGif = styled.img`
  width: 50px;
`;

// Template Container //
export const TemplateContainer = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

// User Data Container //
export const UserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px 5px;
  @media screen and (max-width: 960px) {
    width: 100%;
    padding: 5px 0px;
  }
`;

export const CandidateData = styled.div`
  display: flex;
  padding: 15px 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const CandidateName = styled.span`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #16404d;
  margin-bottom: 10px;
  @media screen and (max-width: 960px) {
    margin-bottom: 15px;
  }
`;

export const SubcardTitle = styled.span`
  font-size: 18px;
  color: #4c585b;
  opacity: 0.9;
  line-height: 1.6;
`;

export const SkillStrengthList = styled.div`
  display: flex;
  padding: 13px 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const SkillListText = styled.span`
  font-size: 15px;
  color: #4c585b;
  opacity: 0.8;
  line-height: 1.6;
  margin-top: 15px;
`;

export const RemarksList = styled.div`
  display: flex;
  padding: 13px 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  flex-direction: column;
`;

// AI Chart Container //
export const AISuggestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px 5px;
  @media screen and (max-width: 960px) {
    width: 100%;
    padding: 5px 0px;
  }
`;
