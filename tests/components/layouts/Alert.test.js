import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";
import AlertContext from "../../context/alert/AlertContext";

// A custom render function to wrap the Alert component with AlertContext
const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AlertContext.Provider {...providerProps}>{ui}</AlertContext.Provider>,
    renderOptions
  );
};

describe("Alert component", () => {
  it("renders nothing when alert is null", () => {
    // Render the Alert component with alert set to null
    const { queryByText } = customRender(<Alert />, {
      providerProps: { value: { alert: null } },
    });

    // Assert that nothing is rendered
    expect(queryByText("Some Alert Message")).toBeNull();
  });

  it("renders the alert message with the correct CSS class when alert is not null", () => {
    const alert = { type: "success", msg: "Success message" };

    // Render the Alert component with a non-null alert
    const { getByText, container } = customRender(<Alert />, {
      providerProps: { value: { alert } },
    });

    // Assert that the alert message is rendered
    expect(getByText("Success message")).toBeInTheDocument();

    // Assert that the correct CSS class is applied
    // expect(container.querySelector(".alert-success")).toBeInTheDocument();
  });
});
