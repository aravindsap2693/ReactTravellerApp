import React from "react";
import { Nav, Steps } from "rsuite";

interface StepperListProps {
  title: string;
}

interface StepperHeaderProps {
  step: number;
  list: StepperListProps[];
}

const StepperHeader: React.FC<StepperHeaderProps> = ({ step, list }) => {
  return (
    <Nav style={{ flex: 3 }}>
      <Steps current={step} className="custom-stepper">
        {list.map((item, index) => (
          <Steps.Item key={index} title={item.title} />
        ))}
      </Steps>
    </Nav>
  );
};

export default StepperHeader;
