import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from "slate-react";
import { Element } from "./Element";
import { toggleCodeElement } from "./toggleCodeElement";
import './editor.css';
import { Toolbar } from "./Toolbar";
import { toggleMark } from "./toggleMark";
import { Leaf } from "./Leaf";

export const Editor: React.FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const handleChange = (value: Descendant[]) => {
    setValue(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {

    if (event.ctrlKey) {
      switch (event.key) {
        // コードブロック
        case "1": {
          event.preventDefault();
          toggleCodeElement(editor);
          return;
        }
        // 太字
        case "b": {
          event.preventDefault();
          toggleMark(editor);
          return;
        }
      }
    }
  };

  return (
    <div>
      <Slate value={value} editor={editor} onChange={handleChange}>
        <Toolbar editor={editor} />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
          style={{ border: '2px solid #8888ff' }} />
      </Slate>
    </div>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "Hello World!" }],
  },
];