const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const React = require("react");
const { render } = require("@testing-library/react");

const Alert = require("../../../src/components/layouts/Alert");
const AlertContext = require("../../../context/alert/AlertContext");

describe("Alert Component", () => {
  it("should not render when alert is null", () => {
    // Create a spy for useContext to return null
    const useContextSpy = sinon.spy(AlertContext, "useContext");
    useContextSpy.returns({ alert: null });

    // Render the Alert component
    const { container } = render(<Alert />);

    // Expect that the alert element is not in the DOM
    expect(container.querySelector(".alert")).to.be.null;

    // Restore the original useContext function
    useContextSpy.restore();
  });

  it("should render with the correct CSS class and message when alert is not null", () => {
    // Define a sample alert
    const alert = { type: "success", msg: "Success message" };

    // Create a spy for useContext to return the sample alert
    const useContextSpy = sinon.spy(AlertContext, "useContext");
    useContextSpy.returns({ alert });

    // Render the Alert component
    const { container } = render(<Alert />);

    // Expect that the alert element is in the DOM with the correct CSS class and message
    expect(container.querySelector(".alert")).to.exist;
    expect(container.querySelector(".alert-success")).to.exist;
    expect(container.textContent).to.include("Success message");

    // Restore the original useContext function
    useContextSpy.restore();
  });
});
