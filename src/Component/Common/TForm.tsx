/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Input,
  SelectPicker,
  Checkbox,
  InputGroup,
  RadioGroup,
  Radio,
} from "rsuite";
import TButton from "./TButton";

import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { FieldOptionProps, FieldProps } from "../../Interfaces/models/common.model";

const TForm: React.FC<FieldProps> = ({
  title,
  placeholder,
  name,
  type,
  options = [],
  value,
  searchable = false,
  validationMessage,
  onChange,
}) => {
  const [visible, setVisible] = useState(false);

  // Handle value change
  const handleChange = (val: any) => {
    onChange?.(name, val);
  };

  return (
    <>
      {type === "input_btn" ? (
        <InputGroup inside style={{ width: "100%" }}>
          <Input
            placeholder={placeholder}
            value={value as string}
            onChange={(e) => handleChange(e)}
          />
          <TButton label="Apply" />
        </InputGroup>
      ) : (
        <div style={{ flex: 2, marginBottom: "20px" }}>
          {type === "radio" ? (
            // Radio Group Input
            <RadioGroup
              name={name}
              value={value as string}
              onChange={(val) => handleChange(val)}
            >
              {options.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          ) : type === "terms" || type === "checkbox" ? (
            // Checkbox Input
            <Checkbox
              checked={value as boolean}
              onChange={(event) => {
                handleChange(event);
              }}
            >
              {placeholder}
            </Checkbox>
          ) : (
            <>
              {/* Label for Input */}
              {title && (
                <div
                  style={{
                    marginBottom: "4px",
                    color: "grey",
                    fontWeight: "700",
                  }}
                >
                  {title}
                </div>
              )}

              {/* Input Group */}
              <InputGroup inside style={{ width: "100%" }}>
                {type === "password" ? (
                  // Password Input with Toggle Visibility
                  <InputGroup inside>
                    <Input
                      type={visible ? "text" : "password"}
                      value={value as string}
                      onChange={handleChange}
                      placeholder={placeholder}
                    />
                    <InputGroup.Button onClick={() => setVisible(!visible)}>
                      {visible ? <EyeIcon /> : <EyeSlashIcon />}
                    </InputGroup.Button>
                  </InputGroup>
                ) : type === "select" ? (
                  // Select Picker Input
                  <SelectPicker
                    data={options as FieldOptionProps[]}
                    placeholder={placeholder}
                    value={value as number}
                    onChange={(val) => handleChange(val)}
                    searchable={searchable}
                    style={{ width: "100%" }}
                  />
                ) : (
                  // Regular Input (text, email, etc.)
                  <Input
                    placeholder={placeholder}
                    type={type}
                    value={value as string}
                    onChange={(value) => handleChange(value)}
                  />
                )}
              </InputGroup>

              {/* Validation Message */}
              {validationMessage && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationMessage}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TForm;
