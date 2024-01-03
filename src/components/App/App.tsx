import "./App.css";

import Mentions from "../Mentions/Mentions.tsx";

const App: React.FC = () => {
  const handleMentionChange = (text: string, mentions: string[]) => {
    // console.log("Text:", text);
    // console.log("Mentions:", mentions);
  };

  return (
    <div>
      <h1>Frontend Assignmnet</h1>
      <Mentions onChange={handleMentionChange} />
    </div>
  );
};

export default App;
