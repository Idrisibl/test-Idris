import React from "react";
import MenuPopup from "../../MenuPopup";

const Header = () => {
  const [opened, setOpened] = React.useState(false);

  return (
    <header>
      <div className="menu" onClick={() => setOpened(!opened)}>
        <span className="menu__line"></span>
        <span className="menu__line"></span>
        <span className="menu__line"></span>
        {opened && <MenuPopup />}
      </div>
      <h1 className="title">Он. Курьер</h1>
    </header>
  );
};

export default Header;
