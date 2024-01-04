import React, { useEffect, useRef } from "react";
import useMentions from "../../utils/customHooks/useMentions";
import "./Mentions.css";

// Define the props interface for the Mentions component
interface MentionProps {
  onChange: (text: string, mentions: string[]) => void;
}

// Mentions component is a functional component
const Mentions: React.FC<MentionProps> = ({ onChange }) => {
  // Destructure values from the useMentions custom hook
  const { inpVal, mentionOptions, handleInputChange, handleNameSelect } =
    useMentions(onChange);

  // Create a reference for the input element
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect to focus on the input element when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // JSX structure for the Mentions component
  return (
    <div className="container">
      {/* Input element for user text input */}
      <input
        id="mention-inp"
        name="inp"
        ref={inputRef}
        value={inpVal}
        onChange={(e) => handleInputChange(e)}
        placeholder="Mention"
      />

      {/* Dropdown container for mention options */}
      {mentionOptions.length > 0 && (
        <div
          className="dropdown-container"
          onClick={(e) => handleNameSelect(e)}
        >
          {/* Map through mention options and display them */}
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

// Memoize the Mentions component using React.memo for performance optimization
export default React.memo(Mentions);
