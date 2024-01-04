import { useState, MouseEvent } from "react";
import names from "../names.json";

// Define the interface for the MentionHook custom hook
interface MentionHook {
  inpVal: string;
  mentionOptions: string[];
  selectedMentions: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameSelect: (e: MouseEvent<HTMLDivElement>) => void;
}

// Custom hook for handling mentions logic
const useMentions: (
  onMentionChange: (text: string, mentions: string[]) => void
) => MentionHook = (onMentionChange) => {
  // State variables for input value, mention options, and selected mentions
  const [inpVal, setInpVal] = useState("");
  const [mentionOptions, setMentionOptions] = useState<string[]>([]);
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInpVal(text);

    // Check if the text includes '@' for mentions
    if (text.includes("@")) {
      const query = text.split("@").pop()?.toLowerCase() || "";
      const filteredOptions = names
        .filter((name) => name.toLowerCase().includes(query))
        .filter((name) => !selectedMentions.includes(name));

      setMentionOptions(filteredOptions);
    } else {
      setMentionOptions([]);
    }

    // Extract mentions from the input text
    const words = text.split(" ");
    const newMentions = words
      .filter((word) => word.startsWith("@"))
      .map((mention) => mention.slice(1));

    // Update selected mentions and trigger the callback
    setSelectedMentions(newMentions);
    onMentionChange(text, newMentions);
  };

  // Function to handle the selection of a mention from the dropdown
  const handleNameSelect = (e: MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as HTMLElement;
    const selectedName: string = targetElement.textContent!;
    const mentionIndex = inpVal.lastIndexOf("@");

    // If '@' is found, replace it with the selected mention
    if (mentionIndex !== -1) {
      const newText =
        inpVal.slice(0, mentionIndex) +
        `@${selectedName} ` +
        inpVal.slice(mentionIndex + selectedName.length + 1);

      // Update state variables and trigger the callback
      setInpVal(newText);
      setMentionOptions([]);
      setSelectedMentions([...selectedMentions, selectedName]);
      onMentionChange(newText, [...selectedMentions, selectedName]);
    }
  };

  // Return the state variables and functions for external use
  return {
    inpVal,
    mentionOptions,
    selectedMentions,
    handleInputChange,
    handleNameSelect,
  };
};

// Export the useMentions custom hook
export default useMentions;
