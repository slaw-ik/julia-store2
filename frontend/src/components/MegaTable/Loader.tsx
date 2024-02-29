import React from 'react';

import './Loader.css';

const Loader = () => (
    <tr>
      <td colSpan={7} style={{height: "500px"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="animation">
            <div className="anim1"/>
          </div>
        </div>
      </td>
    </tr>

  )
;

export default Loader;
