// const chai = require("chai");
// const expect = chai.expect;
// const sinon = require("sinon");
// const React = require("react");
// const { render } = require("@testing-library/react");
// import { useContext } from "react";
// const Alert = require("../src/components/layouts/Alert");
// const AlertContext = require("../src/context/alert/AlertContext");

// describe("Alert Component", () => {
//   it("should not render when alert is null", () => {
//     // Create a spy for useContext to return null
//     const useContextSpy = sinon.spy(AlertContext, "useContext");
//     useContextSpy.returns({ alert: null });

//     // Render the Alert component
//     const { container } = render(<Alert />);

//     // Expect that the alert element is not in the DOM
//     expect(container.querySelector(".alert")).to.be.null;

//     // Restore the original useContext function
//     useContextSpy.restore();
//   });

//   it("should render with the correct CSS class and message when alert is not null", () => {
//     // Define a sample alert
//     const alert = { type: "success", msg: "Success message" };

//     // Create a spy for useContext to return the sample alert
//     const useContextSpy = sinon.spy(AlertContext, "useContext");
//     useContextSpy.returns({ alert });

//     // Render the Alert component
//     const { container } = render(<Alert />);

//     // Expect that the alert element is in the DOM with the correct CSS class and message
//     expect(container.querySelector(".alert")).to.exist;
//     expect(container.querySelector(".alert-success")).to.exist;
//     expect(container.textContent).to.include("Success message");

//     // Restore the original useContext function
//     useContextSpy.restore();
//   });
// });
// ==================================================================

const chai = require("chai");
const expect = chai.expect;
const React = require("react");
const { render } = require("@testing-library/react");
const { AlertProvider } = require("../src/context/alert/AlertContext"); // Import your context provider
const Alert = require("../src/components/layouts/Alert");
const { assert } = require("console");


describe("Alert Component", () => {
  it("should not render when alert is null", () => {
    // Render the Alert component within an AlertProvider with a null alert
    const { container } = render(
      <AlertProvider value={{ alert: null }}>
        <Alert />
      </AlertProvider>
    );

    // Expect that the alert element is not in the DOM
    expect(container.querySelector(".alert")).to.be.null;
  });

  it("should render with the correct CSS class and message when alert is not null", () => {
    // Define a sample alert
    const alert = { type: "success", msg: "Success message" };

    // Render the Alert component within an AlertProvider with the sample alert
    const { container } = render(
      <AlertProvider value={{ alert }}>
        <Alert />
      </AlertProvider>
    );

    // Expect that the alert element is in the DOM with the correct CSS class and message
    expect(container.querySelector(".alert")).to.exist;
    expect(container.querySelector(".alert-success")).to.exist;
    expect(container.textContent).to.include("Success message");
  });
  it('should run test', ()=>{
    console.log("hi there!!")
  })
});
