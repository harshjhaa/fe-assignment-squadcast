import React, { useEffect, useRef } from "react";
import useMentions from "../../utils/customHooks/useMentions";
import "./Mentions.css";

interface MentionProps {
  onChange: (text: string, mentions: string[]) => void;
}
const Mentions: React.FC<MentionProps> = ({ onChange }) => {
  const { inpVal, mentionOptions, handleInputChange, handleNameSelect } =
    useMentions(onChange);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="container">
      <input
        id="mention-inp"
        name="inp"
        ref={inputRef}
        value={inpVal}
        onChange={(e) => handleInputChange(e)}
        placeholder="Mention"
      />
      {mentionOptions.length > 0 && (
        <div
          className="dropdown-container"
          onClick={(e) => handleNameSelect(e)}
        >
          {mentionOptions.map((name: string, index: number) => {
            return (
              <p className="list-name" key={name + index}>
                {name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(Mentions);
