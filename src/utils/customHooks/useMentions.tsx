import { useState, MouseEvent } from "react";
import names from "../names.json";

interface MentionHook {
  inpVal: string;
  mentionOptions: string[];
  selectedMentions: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameSelect: (e: MouseEvent<HTMLDivElement>) => void;
}

const useMentions: (
  onMentionChange: (text: string, mentions: string[]) => void
) => MentionHook = (onMentionChange) => {
  const [inpVal, setInpVal] = useState("");
  const [mentionOptions, setMentionOptions] = useState<string[]>([]);
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInpVal(text);

    if (text.includes("@")) {
      const query = text.split("@").pop()?.toLowerCase() || "";
      const filteredOptions = names
        .filter((name) => name.toLowerCase().includes(query))
        .filter((name) => !selectedMentions.includes(name));

      setMentionOptions(filteredOptions);
    } else {
      setMentionOptions([]);
    }

    const words = text.split(" ");
    const newMentions = words
      .filter((word) => word.startsWith("@"))
      .map((mention) => mention.slice(1));

    setSelectedMentions(newMentions);
    onMentionChange(text, newMentions);
  };

  const handleNameSelect = (e: MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as HTMLElement;
    const selectedName: string = targetElement.textContent!;
    const mentionIndex = inpVal.lastIndexOf("@");

    if (mentionIndex !== -1) {
      const newText =
        inpVal.slice(0, mentionIndex) +
        `@${selectedName} ` +
        inpVal.slice(mentionIndex + selectedName.length + 1);

      setInpVal(newText);
      setMentionOptions([]);
      setSelectedMentions([...selectedMentions, selectedName]);
      onMentionChange(newText, [...selectedMentions, selectedName]);
    }
  };

  return {
    inpVal,
    mentionOptions,
    selectedMentions,
    handleInputChange,
    handleNameSelect,
  };
};

export default useMentions;
