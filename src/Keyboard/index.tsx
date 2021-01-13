import React, { MouseEvent } from "react";

import "./index.scss";
interface Props {
  onClick(e: MouseEvent): void;
  buttonsList: string[];
  id: string;
  className: string;
}

const KeyBoard = ({ id, className, buttonsList, onClick }: Props) => {
  return (
    <div id={id} className={className} onClick={onClick}>
      {
        buttonsList.map((key) => (
          <div className="button" key={key}>
            {key}
          </div>
        ))
      }
    </div>
  );
};

export default KeyBoard;
