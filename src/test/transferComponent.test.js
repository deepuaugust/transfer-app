import React from "react";
import ReactDOM from "react-dom";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TransferComponent from "../components/transferComponent";

configure({ adapter: new Adapter() });

const div = global.document.createElement("div");

let data = [
  {
    id: 1,
    value: "Option 1",
  },
  {
    id: 2,
    value: "Option 2",
  },
  {
    id: 3,
    value: "Option 3",
  },
  {
    id: 4,
    value: "Option 4",
  },
  {
    id: 5,
    value: "Option 5",
  },
  {
    id: 6,
    value: "Option 6",
  },
  {
    id: 7,
    value: "Option 7",
  },
  {
    id: 8,
    value: "Option 8",
  },
  {
    id: 9,
    value: "Option 9",
  },
  {
    id: 10,
    value: "Option 10",
  },
];

describe("Transfer Component", () => {
  it("renders without crashing", () => {
    ReactDOM.render(<TransferComponent data={data} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should mount transfer component", () => {
    const wrapper = mount(<TransferComponent data={data} />, {
      attachTo: document.body.appendChild(div),
    });
    expect(wrapper).toBeDefined();
    wrapper.unmount();
  });

  it("change functionality of checkbox in left div", () => {
    const event = { target: {} };
    const wrapper = mount(<TransferComponent data={data} />, {
      attachTo: document.body.appendChild(div),
    });
    wrapper.find('input[name="leftoption"]').at(0).simulate("change", event);
    wrapper.unmount();
  });

  it("change functionality of checkbox on right", () => {
    const event = { target: {} };
    const wrapper = shallow(<TransferComponent data={data} />)
      .dive()
      .dive()
      .dive();
    wrapper.setState({
      rightOptions: [
        {
          id: 1,
          value: "Option 1",
        },
      ],
    });
    wrapper.find('input[name="rightoption"]').at(0).simulate("change", event);
    wrapper.unmount();
  });

  it("select functionality to move items from left to right", () => {
    const event = { target: {} };
    const wrapper = mount(<TransferComponent data={data} />, {
      attachTo: document.body.appendChild(div),
    });
    wrapper.find('button[value="Select"]').at(0).simulate("click", event);
    wrapper.unmount();
  });

  it("select functionality to move items from right to left", () => {
    const event = { target: {} };
    const wrapper = shallow(<TransferComponent data={data} />)
      .dive()
      .dive()
      .dive();
    wrapper.setState({
      rightOptions: [
        {
          id: 1,
          value: "Option 1",
        },
      ],
    });
    wrapper.find('input[name="rightoption"]').at(0).simulate("change", event);
    wrapper.find('button[value="Deselect"]').at(0).simulate("click", event);
    wrapper.unmount();
  });

  it("Move items up", () => {
    const event = { target: {} };
    const wrapper = shallow(<TransferComponent data={data} />)
      .dive()
      .dive()
      .dive();
    wrapper.setState({
      rightOptions: [
        {
          id: 1,
          value: "Option 1",
        },
        {
          id: 2,
          value: "Option 2",
        },
        {
          id: 3,
          value: "Option 3",
        },
      ],
    });
    wrapper.find('input[name="rightoption"]').at(2).simulate("change", event);
    wrapper.find('button[value="Moveup"]').at(0).simulate("click", event);
    wrapper.unmount();
  });

  it("Move items below", () => {
    const event = { target: {} };
    const wrapper = shallow(<TransferComponent data={data} />)
      .dive()
      .dive()
      .dive();
    wrapper.setState({
      rightOptions: [
        {
          id: 1,
          value: "Option 1",
        },
        {
          id: 2,
          value: "Option 2",
        },
        {
          id: 3,
          value: "Option 3",
        },
      ],
    });
    wrapper.find('input[name="rightoption"]').at(2).simulate("change", event);
    wrapper.find('button[value="Movedown"]').at(0).simulate("click", event);
    wrapper.unmount();
  });
});
