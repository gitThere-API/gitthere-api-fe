import React from 'react';

function LeftPanel() {
  return (
    <>
      <section>
        <button>Go to Nearest</button>
      </section>
      <section>
        <input type="radio">500m</input>
        <input type="radio">1000m</input>
        <input type="radio">3000m</input>
      </section>
      <section>
        <input type="checkbox">Bird</input>
        <input type="checkbox">Bolt</input>
        <input type="checkbox">Lime</input>
        <input type="checkbox">Nike</input>
        <input type="checkbox">Spin</input>
        <input type="checkbox">Trimet</input>
      </section>
      <section>
        <input type="checkbox">Google Play Store</input>
        <input type="checkbox">iPhone App Store</input>
      </section>
    </>
  );
}

export default LeftPanel;
