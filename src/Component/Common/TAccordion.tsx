

import React from "react";
import { Panel, PanelGroup } from "rsuite";
import { AccordionProps } from "../../Interfaces/models/common.model";

const TAccordion: React.FC<AccordionProps> = ({
  header,
  render,
  classname,
  defaultExpanded = false,
  icon,
}) => {
  return (
    <PanelGroup accordion bordered className={classname}>
      <Panel
        header={
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {icon && <img src={icon} alt="ico" />} {header}
          </div>
        }
        expanded={defaultExpanded}
      >
        {render}
      </Panel>
    </PanelGroup>
  );
};

export default TAccordion;
