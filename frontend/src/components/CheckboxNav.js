import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const CheckboxNav = ({ listCheck, ...props }) => {
  const type = "checkbox"; 

  const onChange = (e) => {
    console.log(e);
  };

  return (
    <div
      style={{
        padding: "20px",

        width: "25%",
      }}
    >
      <div
        key={`default-${type}`}
        style={{
          padding: "20px",
          background: "#f6f6f6 none repeat scroll 0 0",
          boxShadow: "0 0 3px 2px #f8f8f8",
        }}
        className="mb-3"
      >
        {listCheck.map((checkbox, index) => (
          <div
            key={index}
            style={{
              marginBottom: "50px",
            }}
          >
            <h4
              style={{
                background: "#fff none repeat scroll 0 0",
                color: " #000",
                display: " block",
                borderLeft: "1px solid #000",
                fontFamily: " Rubik,sans-serif",
                fontSize: " 14px",
                fontWeight: " 600",
                marginBottom: " 33px",
                padding: " 12px 0 12px 13px",
                position: " relative",
                textTransform: " uppercase",
              }}
            >
              {checkbox.title}
            </h4>
            {checkbox.list.map((i, index) => (
              <Form.Check
                key={index}
                disabled={i.disabled}
                type={type}
                onChange={onChange}
                id={`default-${type}`}
                label={`${i.name}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxNav;
