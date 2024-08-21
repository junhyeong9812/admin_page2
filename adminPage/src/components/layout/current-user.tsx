import { Popover, Button } from "antd";
//ant Design >>인터넷 디자인 및 UI키트
const CurrentUser = () => {
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        Test
      </Popover>
    </>
  );
};

export default CurrentUser;
